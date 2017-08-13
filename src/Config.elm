module Config exposing (..)

import App
import Gamepad
import GamepadPort
import Html exposing (..)
import Html.Attributes exposing (style)
import Keyboard
import Input
import Time exposing (Time)


-- types


type alias Flags =
    { gamepadDatabaseAsString : String
    , gamepadDatabaseKey : String
    }


type ConfigModal
    = Main


type alias Model =
    { app : App.Model
    , gamepadDatabase : Gamepad.Database
    , gamepadDatabaseKey : String -- This is the key we use for the database in the browser's local storage
    , hasGamepads : Bool
    , hasKnownGamepads : Bool
    , maybeInputConfig : Maybe Input.Config
    , maybeModal : Maybe ConfigModal
    }


type Msg
    = OnAppMsg App.Msg
    | OnGamepad ( Time, Gamepad.Blob )
    | OnKey Int



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
            , hasKnownGamepads = False
            , maybeInputConfig = Nothing
            , maybeModal = Just Main
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

        OnGamepad ( dt, blob ) ->
            let
                knownGamepads =
                    blob
                        |> Gamepad.getGamepads model.gamepadDatabase
                        |> List.length

                allGamepads =
                    blob
                        |> Gamepad.getAllGamepadsAsUnknown
                        |> List.length
            in
                { model
                    | hasGamepads = allGamepads > 0
                    , hasKnownGamepads = knownGamepads > 0
                }
                    |> noCmd

        OnKey code ->
            case code of
                27 ->
                    noCmd
                        { model
                            | maybeModal =
                                if model.maybeModal == Nothing then
                                    Just Main
                                else
                                    Nothing
                        }

                _ ->
                    noCmd model



-- view


viewInputConfig : Html Msg
viewInputConfig =
    div
        []
        [ text "Use keyboard?"
        , select
            []
            [ option [] [ text "Guess" ]
            , option [] [ text "Player 1 uses the keyboard" ]
            , option [] [ text "Everyone uses only gamepads" ]
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
            , if model.hasKnownGamepads then
                div
                    []
                    [ viewInputConfig ]
              else
                text ""
            , if model.hasGamepads then
                div
                    []
                    [ button
                        []
                        [ text "remap pads" ]
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
        , case model.maybeModal of
            Nothing ->
                text ""

            Just Main ->
                viewConfig model
        ]



-- subscriptions


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ Keyboard.ups OnKey
        , case model.maybeModal of
            Nothing ->
                App.subscriptions model.app |> Sub.map OnAppMsg

            Just Main ->
                GamepadPort.gamepad OnGamepad
        ]



-- program


programWithFlags =
    { init = init
    , update = update
    , view = view
    , subscriptions = subscriptions
    }
