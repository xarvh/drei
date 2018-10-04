module Config exposing (..)

import App
import Browser.Events
import Gamepad
import GamepadPort
import Html exposing (..)
import Html.Attributes exposing (class, disabled, selected, value)
import Html.Events
import Input
import Json.Decode exposing (Decoder)
import Keyboard
import MousePort
import Task
import WebGL.Texture exposing (Texture)


-- types


type alias Flags =
    { gamepadDatabaseAsString : String
    , gamepadDatabaseKey : String
    }


type ConfigModal
    = Main


type alias Model =
    { maybeApp : Maybe App.Model
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
    | OnKey String
    | OnInputConfig String
    | OnTexture (Result WebGL.Texture.Error Texture)



-- init


init : Flags -> ( Model, Cmd Msg )
init flags =
    let
        gamepadDatabase =
            flags.gamepadDatabaseAsString
                |> Gamepad.userMappingsFromString
                |> Result.withDefault Gamepad.emptyUserMappings

        model =
            { maybeApp = Nothing
            , gamepadDatabase = gamepadDatabase
            , gamepadDatabaseKey = flags.gamepadDatabaseKey
            , hasGamepads = False
            , hasKnownGamepads = False
            , maybeInputConfig = Nothing
            , maybeModal = Just Main
            }

        cmd =
            Cmd.batch
                [ WebGL.Texture.load "meh.png" |> Task.attempt OnTexture
                ]
    in
    ( model, cmd )



-- update


noCmd model =
    ( model, Cmd.none )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        OnTexture result ->
            case result of
                Err err ->
                    Debug.todo (Debug.toString err)

                Ok texture ->
                    let
                        ( app, appCmd ) =
                            App.init texture
                    in
                    ( { model | maybeApp = Just app }
                    , Cmd.map OnAppMsg appCmd
                    )

        OnAppMsg appMsg ->
            case model.maybeApp of
                Nothing ->
                    noCmd model

                Just app ->
                    let
                        ( appModel, appCmd ) =
                            App.update
                                { maybeInputConfig = model.maybeInputConfig
                                , gamepadDatabase = model.gamepadDatabase
                                }
                                appMsg
                                app
                    in
                    ( { model | maybeApp = Just appModel }, Cmd.map OnAppMsg appCmd )

        OnGamepad blob ->
            let
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

        OnKey keyName ->
            case keyName of
                "Escape" ->
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
            [ case model.maybeApp of
                Just app ->
                    App.view app |> Html.map OnAppMsg

                Nothing ->
                    text ""
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
        [ Browser.Events.onKeyUp (keyboardDecoder OnKey)
        , MousePort.unlocked OnMouseUnlock
        , GamepadPort.gamepad OnGamepad
        , case model.maybeApp of
            Just app ->
                App.subscriptions app |> Sub.map OnAppMsg

            Nothing ->
                Sub.none
        ]


keyboardDecoder : (String -> msg) -> Decoder msg
keyboardDecoder msg =
    Json.Decode.string
        |> Json.Decode.field "key"
        |> Json.Decode.map (singleToUpper >> msg)


singleToUpper : String -> String
singleToUpper s =
    if String.length s /= 1 then
        s
    else
        String.toUpper s



-- program


programWithFlags =
    { init = init
    , update = update
    , view = view
    , subscriptions = subscriptions
    }
