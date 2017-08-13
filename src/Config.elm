module Config exposing (..)

import App
import Gamepad
import Html exposing (..)
import Html.Attributes exposing (style)
import Input


-- types


type alias Flags =
    { gamepadDatabaseAsString : String
    , gamepadDatabaseKey : String
    }


type alias Model =
    { app : App.Model
    , gamepadDatabase : Gamepad.Database
    , gamepadDatabaseKey : String -- This is the key we use for the database in the browser's local storage
    , hasGamepads : Bool
    , maybeInputConfig : Maybe Input.Config
    }


type Msg
    = OnAppMsg App.Msg



-- init


init : Flags -> ( Model, Cmd Msg )
init flags =
    let
        ( app, appCmd ) =
            App.init

        gamepadDatabase =
            flags.gamepadDatabaseAsString
                |> Gamepad.databaseFromString
                |> Result.withDefault Gamepad.emptyDatabase

        model =
            { app = app
            , gamepadDatabase = gamepadDatabase
            , gamepadDatabaseKey = flags.gamepadDatabaseKey
            , hasGamepads = False
            , maybeInputConfig = Nothing
            }

        cmd =
            Cmd.map OnAppMsg appCmd
    in
        ( model, cmd )



-- update


noCmd model =
    ( model, Cmd.none )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        OnAppMsg msg ->
            let
                ( appModel, appCmd ) =
                    App.update
                        { maybeInputConfig = model.maybeInputConfig
                        , gamepadDatabase = model.gamepadDatabase
                        }
                        msg
                        model.app
            in
                ( { model | app = appModel }, Cmd.map OnAppMsg appCmd )



-- view


viewInputConfig : Html Msg
viewInputConfig =
    div
        []
        [ select
            []
            [ option [] [ text "auto" ]
            , option [] [ text "meh" ]
            , option [] [ text "lol" ]
            ]
        ]


viewConfig : Model -> Html Msg
viewConfig model =
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
            [ div
                []
                [ text "press Esc to to toggle Menu" ]
            , if model.hasGamepads then
                div
                    []
                    [ div
                        []
                        [ viewInputConfig ]
                    , div
                        []
                        [ text "--> remap pads" ]
                    ]
              else
                text ""
            ]
        ]


view : Model -> Html Msg
view model =
    div
        [ style [ ( "position", "relative" ) ]
        ]
        [ App.view model.app |> Html.map OnAppMsg
        ]



-- subscriptions


subscriptions : Model -> Sub Msg
subscriptions model =
    App.subscriptions model.app |> Sub.map OnAppMsg



-- program


programWithFlags =
    { init = init
    , update = update
    , view = view
    , subscriptions = subscriptions
    }
