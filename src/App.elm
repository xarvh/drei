module App exposing (program)

import AnimationFrame
import Html exposing (..)
import Html.Attributes as HA
import Task
import Time exposing (Time)
import Scene
import WebGL
import Window


type alias Model =
    { time : Time
    , windowSize : Window.Size
    }


type Msg
    = OnAnimationFrame Time
    | OnWindowResizes Window.Size


init =
    ( { time = 0
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
            { model | time = model.time + dt }

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
            (Scene.entities model.windowSize model.time)
        ]


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ AnimationFrame.diffs OnAnimationFrame
        , Window.resizes OnWindowResizes
        ]


program =
    { init = init
    , update = \msg model -> ( update msg model, Cmd.none )
    , view = view
    , subscriptions = subscriptions
    }
