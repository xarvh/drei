module App exposing (..)

import Dict
import Game exposing (Game)
import Gamepad
import GamepadPort
import Html exposing (..)
import Html.Attributes exposing (style)
import Input
import Keyboard.Extra exposing (Key)
import LocalStoragePort
import Player
import Task
import Time exposing (Time)
import Scene
import WebGL
import Window


-- types


type alias Config =
    { maybeInputConfig : Maybe Input.Config
    , gamepadDatabase : Gamepad.Database
    }


type alias Model =
    { game : Game
    , pressedKeys : List Key
    , windowSize : Window.Size
    }


type Msg
    = OnAnimationFrame ( Time, Gamepad.Blob )
    | OnKeyboardMsg Keyboard.Extra.Msg
    | OnWindowResizes Window.Size



-- init


init : ( Model, Cmd Msg )
init =
    let
        game =
            Game.init
                |> Game.addPlayer
                |> Tuple.second
                |> Game.addPlayer
                |> Tuple.second
    in
        ( { game = game
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


updateAnimationFrame : Config -> Time -> Gamepad.Blob -> Model -> ( Model, Cmd Msg )
updateAnimationFrame config dt blob model =
    let
        oldGame =
            model.game

        players =
            Input.updatePlayersInput
                { gamepads = Gamepad.getGamepads config.gamepadDatabase blob
                , maybeConfig = config.maybeInputConfig
                , pressedKeys = model.pressedKeys
                }
                oldGame.players

        game =
            { oldGame | players = players }
    in
        noCmd { model | game = Game.think dt game }


update : Config -> Msg -> Model -> ( Model, Cmd Msg )
update config msg model =
    case msg of
        OnAnimationFrame ( dt, blob ) ->
            updateAnimationFrame config dt blob model

        OnKeyboardMsg keyboardMsg ->
            noCmd { model | pressedKeys = Keyboard.Extra.update keyboardMsg model.pressedKeys }

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
        model.game.players
            |> Dict.values
            |> List.sortBy .id
            |> List.map playerView
            |> div
                [ style
                    [ ( "display", "flex" )
                    , ( "justify-content", "space-around" )
                    ]
                ]



-- subscriptions


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ GamepadPort.gamepad OnAnimationFrame
        , Window.resizes OnWindowResizes
        , Sub.map OnKeyboardMsg Keyboard.Extra.subscriptions
        ]
