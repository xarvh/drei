module Config exposing (..)

import App
import Gamepad
import GamepadPort
import Html exposing (..)
import Html.Attributes exposing (class, disabled, selected, value)
import Html.Events
import Input
import Json.Decode
import Keyboard
import MousePort


-- types


type alias Flags =
    { gamepadDatabaseAsString : String
    , gamepadDatabaseKey : String
    }


type ConfigModal
    = Main


type alias Model =
    { app : App.Model
    , gamepadDatabase : Gamepad.UserMappings
    , gamepadDatabaseKey : String -- This is the key we use for the database in the browser's local storage
    , hasGamepads : Bool
    , hasKnownGamepads : Bool
    , maybeInputConfig : Maybe Input.Config
    , maybeModal : Maybe ConfigModal
    }


type Msg
    = OnAppMsg App.Msg
    | OnGamepad Gamepad.Blob
    | OnMouseUnlock
    | OnKey Int
    | OnInputConfig String



-- init


init : Flags -> ( Model, Cmd Msg )
init flags =
    let
        ( app, appCmd ) =
            App.init

        gamepadDatabase =
            flags.gamepadDatabaseAsString
                |> Gamepad.userMappingsFromString
                |> Result.withDefault Gamepad.emptyUserMappings

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
        OnAppMsg appMsg ->
            let
                ( appModel, appCmd ) =
                    App.update
                        { maybeInputConfig = model.maybeInputConfig
                        , gamepadDatabase = model.gamepadDatabase
                        }
                        appMsg
                        model.app
            in
            ( { model | app = appModel }, Cmd.map OnAppMsg appCmd )

        OnGamepad blob ->
            let
                dt =
                    Gamepad.animationFrameDelta blob

                knownGamepads =
                    blob
                        |> Gamepad.getGamepads model.gamepadDatabase
                        |> List.length

                -- Stop app time updates when the modal is open
                appUpdate =
                    if model.maybeModal == Nothing then
                        blob |> App.OnAnimationFrame |> OnAppMsg |> update
                    else
                        noCmd
            in
            appUpdate
                { model
                    | hasGamepads = True
                    , hasKnownGamepads = knownGamepads > 0
                }

        OnMouseUnlock ->
            noCmd { model | maybeModal = Just Main }

        OnKey code ->
            case code of
                -- Esc button
                27 ->
                    -- When mouse pointer is locked, pressing Esc will NOT
                    -- trigger the keypress, but will instead trigger mouse
                    -- unlock.
                    ( { model | maybeModal = Nothing }, MousePort.lock )

                _ ->
                    noCmd model

        OnInputConfig value ->
            noCmd
                { model
                    | maybeInputConfig =
                        case value of
                            "key" ->
                                Just Input.Player1UsesKeyboardAndMouse

                            "pad" ->
                                Just Input.AllPlayersUseGamepads

                            _ ->
                                Nothing
                }



-- view


viewInputConfig : Bool -> Maybe Input.Config -> Html Msg
viewInputConfig hasKnownGamepads maybeInputConfig =
    div
        []
        [ div [] [ text "Use keyboard?" ]
        , select
            [ Html.Events.on "change" (Json.Decode.map OnInputConfig Html.Events.targetValue)
            , disabled <| not hasKnownGamepads
            ]
            [ option
                [ value ""
                , selected <| maybeInputConfig == Nothing
                ]
                [ text "Guess" ]
            , option
                [ value "key"
                , selected <| maybeInputConfig == Just Input.Player1UsesKeyboardAndMouse
                ]
                [ text "Player 1 uses the keyboard" ]
            , option
                [ value "pad"
                , selected <| maybeInputConfig == Just Input.AllPlayersUseGamepads
                ]
                [ text "Everyone uses only gamepads" ]
            ]
        ]


viewConfig : Model -> Html Msg
viewConfig model =
    div
        [ class "configModal-Container" ]
        [ div
            [ class "configModal-Content" ]
            [ div
                [ class "configModal-Item" ]
                [ text "Press Esc to to toggle Menu" ]
            , div
                [ class "configModal-Item" ]
                [ viewInputConfig model.hasKnownGamepads model.maybeInputConfig ]
            , div
                [ class "configModal-Item" ]
                [ button
                    [ disabled <| not model.hasGamepads ]
                    [ text "Remap gamepads (not implemented yet)" ]
                ]
            ]
        ]


view model =
    { title = ""
    , body =
        [ div
            [ class "root" ]
            [ App.view model.app |> Html.map OnAppMsg
            , case model.maybeModal of
                Nothing ->
                    text ""

                Just Main ->
                    viewConfig model
            ]
        ]
    }



-- subscriptions


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        -- TODO [ Keyboard.ups OnKey
        [ MousePort.unlocked OnMouseUnlock
        , GamepadPort.gamepad OnGamepad
        , App.subscriptions model.app |> Sub.map OnAppMsg
        ]



-- program


programWithFlags =
    { init = init
    , update = update
    , view = view
    , subscriptions = subscriptions
    }
