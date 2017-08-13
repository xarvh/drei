module App exposing (programWithFlags)

import Dict
import Game exposing (Game)
import Gamepad
import GamepadPort
import LocalStoragePort
import Html exposing (..)
import Html.Attributes as HA
import Input
import Keyboard.Extra exposing (Key)
import Task
import Time exposing (Time)
import Scene
import WebGL
import Window
import Player


type alias Model =
    { game : Game
    , gamepadDatabase : Gamepad.Database
    , gamepadDatabaseKey : String -- This is the key we use for the database in the browser's local storage
    , pressedKeys : List Key
    , windowSize : Window.Size
    }


type Msg
    = OnGamepad ( Time, Gamepad.Blob )
    | OnKeyboardMsg Keyboard.Extra.Msg
    | OnWindowResizes Window.Size


type alias Flags =
    { gamepadDatabaseAsString : String
    , gamepadDatabaseKey : String
    }


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
          , pressedKeys = []
          , windowSize =
                { width = 100
                , height = 100
                }
          }
        , Task.perform OnWindowResizes Window.size
        )


update : Msg -> Model -> Model
update msg model =
    case msg of
        OnGamepad ( dt, blob ) ->
            let
                oldGame =
                    model.game

                players =
                    Input.updatePlayersInput model.pressedKeys oldGame.players

                game =
                    { oldGame | players = players }
            in
                { model | game = Game.think dt game }

        OnKeyboardMsg keyboardMsg ->
            { model | pressedKeys = Keyboard.Extra.update keyboardMsg model.pressedKeys }

        OnWindowResizes size ->
            { model | windowSize = size }


view : Model -> Html Msg
view model =
    let
        maybeViewer =
            model.game.players
                |> Dict.values
                |> List.head
    in
        div
            [ HA.style
                [ ( "display", "flex" )
                , ( "justify-content", "center" )
                ]
            ]
            [ WebGL.toHtml
                [ HA.width model.windowSize.width
                , HA.height model.windowSize.height
                ]
                (Scene.entities maybeViewer model.windowSize model.game)
            ]


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ GamepadPort.gamepad OnGamepad
        , Window.resizes OnWindowResizes
        , Sub.map OnKeyboardMsg Keyboard.Extra.subscriptions
        ]


programWithFlags =
    { init = init
    , update = \msg model -> ( update msg model, Cmd.none )
    , view = view
    , subscriptions = subscriptions
    }
