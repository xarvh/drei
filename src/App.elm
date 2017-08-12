module App exposing (program)

import AnimationFrame
import Game exposing (Game)
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
    , pressedKeys : List Key
    , windowSize : Window.Size
    }


type Msg
    = OnAnimationFrame Time
    | OnKeyboardMsg Keyboard.Extra.Msg
    | OnWindowResizes Window.Size


init =
    let
        game =
            Game.init
                |> Game.addPlayer Player.KeyboardAndMouse
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


update : Msg -> Model -> Model
update msg model =
    case msg of
        OnAnimationFrame dt ->
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
            (Scene.entities model.windowSize model.game)
        ]


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ AnimationFrame.diffs OnAnimationFrame
        , Window.resizes OnWindowResizes
        , Sub.map OnKeyboardMsg Keyboard.Extra.subscriptions
        ]


program =
    { init = init
    , update = \msg model -> ( update msg model, Cmd.none )
    , view = view
    , subscriptions = subscriptions
    }
