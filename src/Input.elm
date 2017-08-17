module Input exposing (..)

import Dict exposing (Dict)
import Gamepad exposing (Gamepad)
import Math.Vector2 as Vec2 exposing (Vec2, vec2)
import MousePort
import Keyboard.Extra exposing (Key)
import Player exposing (Player, InputState)
import Time exposing (Time)


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
        pixelsForAFullTurn =
            2000

        turningRatio =
            turns 1 / pixelsForAFullTurn

        dAim =
            Vec2.scale turningRatio model.mouseDelta

        { x, y } =
            Keyboard.Extra.wasd model.pressedKeys

        move =
            vec2 (toFloat x) (toFloat y)
    in
        { dAim = dAim
        , fire = model.mouseButtonLeft
        , move = move
        }


gamepadToInputState : Time -> Gamepad -> Player.InputState
gamepadToInputState dt gamepad =
    let
        -- Mouse movement directly represents a delta movement.
        -- Unlike mouse movement, the gamepad's stick represents a *speed*
        -- so it must be multiplied by the frame refresh interval.
        timeForAFullTurn =
            1000 * Time.millisecond

        maxTurningSpeed =
            turns 1 / timeForAFullTurn

        maxDeltaAim =
            dt * maxTurningSpeed

        dAim =
            vec2 (Gamepad.rightY gamepad) (Gamepad.rightX gamepad) |> Vec2.scale maxTurningSpeed

        fire =
            Gamepad.aIsPressed gamepad

        move =
            vec2 (Gamepad.leftX gamepad) (Gamepad.leftY gamepad)
    in
        { dAim = dAim
        , fire = fire
        , move = move
        }



-- input assignment


applyInputState : InputState -> Player -> Player
applyInputState inputState player =
    let
        -- Unlike movement and fire, aiming is not constrained by game refresh
        -- ticks, but only by frame display time.
        -- Because of this, aiming direction should be updated as part of the input,
        -- not as part of the game.
        (unclampedTraverse, unclampedElevation) =
           Vec2.add player.aim inputState.dAim |> Vec2.toTuple

        -- rotation in the vertical plane
        elevation =
          clamp -(turns 0.25) (turns 0.25) unclampedElevation


        -- rotation in the horizontal plane
        traverse =
          unclampedTraverse


        -- mouse represents a *movement* <--- this doesn't care about dt
    in
        { player
            | inputState = inputState
            , aim = vec2 traverse elevation
        }


updatePlayersInput :
    { gamepads : List Gamepad
    , maybeConfig : Maybe Config
    }
    -> Time
    -> Model
    -> Dict Int Player
    -> ( Int, Model, Dict Int Player )
updatePlayersInput { maybeConfig, gamepads } dt model players =
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
                |> List.map (gamepadToInputState dt)

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
