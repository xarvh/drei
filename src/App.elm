module App exposing (programWithFlags)

import Dict
import Game exposing (Game)
import Gamepad
import GamepadPort
import Html exposing (..)
import Html.Attributes exposing (style)
import Input
import Keyboard.Extra exposing (Key)
import LocalStoragePort
import Modal
import Player
import Task
import Time exposing (Time)
import Scene
import WebGL
import Window


-- types


type alias Model =
    { game : Game
    , gamepadDatabase : Gamepad.Database
    , gamepadDatabaseKey : String -- This is the key we use for the database in the browser's local storage
    , maybeModal : Maybe Modal.Model
    , pressedKeys : List Key
    , windowSize : Window.Size
    }


type Msg
    = OnAnimationFrame ( Time, Gamepad.Blob )
    | OnKeyboardMsg Keyboard.Extra.Msg
    | OnModalMsg Modal.Msg
    | OnWindowResizes Window.Size


type alias Flags =
    { gamepadDatabaseAsString : String
    , gamepadDatabaseKey : String
    }



-- init


init : Flags -> ( Model, Cmd Msg )
init flags =
    let
        gamepadDatabase =
            flags.gamepadDatabaseAsString
                |> Gamepad.databaseFromString
                |> Result.withDefault Gamepad.emptyDatabase

        game =
            Game.init
                |> Game.addPlayer Player.KeyboardAndMouse
                |> Tuple.second
                |> Game.addPlayer Player.TestKeyboard
                |> Tuple.second
    in
        ( { game = game
          , gamepadDatabase = gamepadDatabase
          , gamepadDatabaseKey = flags.gamepadDatabaseKey
          , maybeModal = Just Modal.initSplash
          , pressedKeys = []
          , windowSize =
                { width = 100
                , height = 100
                }
          }
        , Task.perform OnWindowResizes Window.size
        )



-- update


noCmd model =
    ( model, Cmd.none )


updateAnimationFrame : Time -> Gamepad.Blob -> Model -> ( Model, Cmd Msg )
updateAnimationFrame dt blob model =
    if model.maybeModal /= Nothing then
        noCmd model
    else
        let
            oldGame =
                model.game

            players =
                Input.updatePlayersInput model.pressedKeys oldGame.players

            game =
                { oldGame | players = players }
        in
            noCmd { model | game = Game.think dt game }


updateModal : ( Modal.Outcome, Cmd Modal.Msg ) -> Model -> ( Model, Cmd Msg )
updateModal ( modalOutcome, modalCmd ) model =
    let
        newModel =
            case modalOutcome of
                Modal.StillOpen modalModel ->
                    { model | maybeModal = Just modalModel }

                -- TODO: Add Modal.UpdateGamepadDatabase
                Modal.Close ->
                    { model | maybeModal = Nothing }

        cmd =
            Cmd.map OnModalMsg modalCmd
    in
        ( model, cmd )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        OnAnimationFrame ( dt, blob ) ->
            updateAnimationFrame dt blob model

        OnKeyboardMsg keyboardMsg ->
            noCmd { model | pressedKeys = Keyboard.Extra.update keyboardMsg model.pressedKeys }

        OnModalMsg modalMsg ->
            case model.maybeModal of
                Nothing ->
                    noCmd model

                Just modalModel ->
                    updateModal (Modal.update modalMsg modalModel) model

        OnWindowResizes size ->
            noCmd { model | windowSize = size }



-- view


view : Model -> Html Msg
view model =
    let
        viewportsSize =
            { width = model.windowSize.width // 2 - 4
            , height = model.windowSize.height - 4
            }

        playerView player =
            WebGL.toHtml
                [ Html.Attributes.width viewportsSize.width
                , Html.Attributes.height viewportsSize.height
                , style [ ( "border", "2px solid #e7e7e7" ) ]
                ]
                (Scene.entities (Just player) viewportsSize model.game)
    in
        div
            [ style
                [ ( "position", "relative" ) ]
            ]
            [ model.game.players
                |> Dict.values
                |> List.sortBy .id
                |> List.map playerView
                |> div
                    [ style
                        [ ( "display", "flex" )
                        , ( "justify-content", "space-around" )
                        ]
                    ]
            , model.maybeModal
                |> Maybe.map Modal.view
                |> Debug.log "aaa"
                |> Maybe.withDefault (text "")
                |> Html.map OnModalMsg
            ]



-- subscriptions


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ GamepadPort.gamepad OnAnimationFrame
        , Window.resizes OnWindowResizes
        , Sub.map OnKeyboardMsg Keyboard.Extra.subscriptions
        , model.maybeModal
            |> Maybe.map Modal.subscriptions
            |> Maybe.withDefault Sub.none
            |> Sub.map OnModalMsg
        ]



-- program


programWithFlags =
    { init = init
    , update = update
    , view = view
    , subscriptions = subscriptions
    }
