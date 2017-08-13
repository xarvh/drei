module Modal exposing (..)

import Html exposing (..)
import Html.Attributes exposing (style)


-- types


type alias Model =
    {}


type Msg
    = Noop


type Outcome
    = StillOpen Model
    | Close



-- init


initSplash : Model
initSplash =
    {}



-- update


noCmd model =
    ( model, Cmd.none )


update : Msg -> Model -> ( Outcome, Cmd Msg )
update msg model =
    StillOpen {} |> noCmd



-- view


view : Model -> Html Msg
view model =
    div
        [ style
            [ ( "position", "absolute" )
            , ( "top", "0" )
            , ( "width", "100%" )
            , ( "height", "100%" )
            , ( "display", "flex" )
            , ( "align-items", "center" )
            , ( "justify-content", "center" )
            ]
        ]
        [ div
            [ style
                [ ( "background-color", "white" )
                , ( "border", "1px solid grey" )
                ]
            ]
            [ text "modal!" ]
        ]



-- subscriptions


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none
