module Input exposing (..)

import Dict exposing (Dict)
import Gamepad exposing (Gamepad)
import Math.Vector2 as Vec2 exposing (Vec2, vec2)
import MousePort
import Keyboard.Extra exposing (Key)
import Player exposing (Player, InputState)


-- types


type Config
    = AllPlayersUseGamepads
    | Player1UsesKeyboardAndMouse


type Msg
    = OnKeyboardMsg Keyboard.Extra.Msg
    | OnMouseButton ( Int, Bool )
    | OnMouseMove ( Int, Int )


type alias Model =
    { mouseDelta : Vec2
    , mouseButtonLeft : Bool
    , mouseButtonMiddle : Bool
    , mouseButtonRight : Bool
    , pressedKeys : List Key
    }



-- init


v0 : Vec2
v0 =
    vec2 0 0


init : Model
init =
    { mouseDelta = vec2 0 0
    , mouseButtonLeft = False
    , mouseButtonMiddle = False
    , mouseButtonRight = False
    , pressedKeys = []
    }



-- input to player input state


keyboardAndMouseToInputState : Model -> Player.InputState
keyboardAndMouseToInputState model =
    let
        mouseNormalisation =
            0.01

        dAim =
            Vec2.scale mouseNormalisation model.mouseDelta

        { x, y } =
            Keyboard.Extra.wasd model.pressedKeys

        move =
            vec2 (toFloat x) (toFloat y)
    in
        { dAim = dAim
        , fire = model.mouseButtonLeft
        , move = move
        }


gamepadToInputState : Gamepad -> Player.InputState
gamepadToInputState gamepad =
    { dAim =
        vec2 (Gamepad.rightY gamepad) (Gamepad.rightX gamepad)
    , fire =
        Gamepad.aIsPressed gamepad
    , move =
        vec2 (Gamepad.leftX gamepad) (Gamepad.leftY gamepad)
    }



-- input assignment


applyInputState : InputState -> Player -> Player
applyInputState inputState player =
    { player
        | inputState = inputState
        , aim = Vec2.add player.aim inputState.dAim
    }


updatePlayersInput :
    { gamepads : List Gamepad
    , maybeConfig : Maybe Config
    }
    -> Model
    -> Dict Int Player
    -> ( Int, Model, Dict Int Player )
updatePlayersInput { maybeConfig, gamepads } model players =
    let
        config =
            case maybeConfig of
                Just config ->
                    config

                Nothing ->
                    if List.length gamepads > 0 then
                        AllPlayersUseGamepads
                    else
                        Player1UsesKeyboardAndMouse

        sortedPlayers =
            players
                |> Dict.values
                |> List.sortBy .id

        keyboardInputs =
            case config of
                AllPlayersUseGamepads ->
                    []

                Player1UsesKeyboardAndMouse ->
                    [ keyboardAndMouseToInputState model ]

        gamepadInputs =
            gamepads
                |> List.sortBy Gamepad.getIndex
                |> List.map gamepadToInputState

        inputs =
            keyboardInputs ++ gamepadInputs

        playersMinusInputs =
            List.length sortedPlayers - List.length inputs

        fillers =
            List.repeat playersMinusInputs
                { dAim = vec2 0 0
                , move = vec2 0 0
                , fire = False
                }

        tupleToTuple : ( Player, InputState ) -> ( Int, Player )
        tupleToTuple ( player, inputState ) =
            ( player.id, applyInputState inputState player )
    in
        List.map2 (,) sortedPlayers (inputs ++ fillers)
            |> List.map tupleToTuple
            |> Dict.fromList
            |> (,,) playersMinusInputs { model | mouseDelta = v0 }



-- update


update : Msg -> Model -> Model
update msg model =
    case msg of
        OnKeyboardMsg keyboardMsg ->
            { model | pressedKeys = Keyboard.Extra.update keyboardMsg model.pressedKeys }

        OnMouseButton ( button, toggle ) ->
            case button of
                0 ->
                    { model | mouseButtonLeft = toggle }

                1 ->
                    { model | mouseButtonMiddle = toggle }

                _ ->
                    { model | mouseButtonRight = toggle }

        OnMouseMove ( dx, dy ) ->
            { model | mouseDelta = Vec2.add model.mouseDelta (vec2 (toFloat dx) (toFloat dy)) }



-- subscriptions


subscriptions model =
    -- TODO disable the subscriptions if key&mouse are not used
    Sub.batch
        [ Sub.map OnKeyboardMsg Keyboard.Extra.subscriptions
        , MousePort.movement OnMouseMove
        , MousePort.button OnMouseButton
        ]
