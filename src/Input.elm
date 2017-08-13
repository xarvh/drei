module Input exposing (..)

import Dict exposing (Dict)
import Gamepad exposing (Gamepad)
import Math.Vector2 as Vec2 exposing (Vec2, vec2)
import Keyboard.Extra exposing (Key)
import Player exposing (Player, InputState)


-- types


type Config
    = AllPlayersUseGamepads
    | Player1UsesKeyboardAndMouse



-- input to player input state


keyboardToInputState : List Key -> Player.InputState
keyboardToInputState pressedKeys =
    let
        { x, y } =
            Keyboard.Extra.wasd pressedKeys

        move =
            vec2 (toFloat x) (toFloat y)
    in
        { move = move
        , head = 0
        , fire = False
        }


gamepadToInputState : Gamepad -> Player.InputState
gamepadToInputState gamepad =
    { move =
        vec2 (Gamepad.leftX gamepad) (Gamepad.leftY gamepad)
    , fire =
        Gamepad.aIsPressed gamepad
    , head =
        atan2 (Gamepad.rightY gamepad) (Gamepad.rightX gamepad)
    }



-- input assignment


updatePlayersInput :
    { gamepads : List Gamepad
    , maybeConfig : Maybe Config
    , pressedKeys : List Key
    }
    -> Dict Int Player
    -> Dict Int Player
updatePlayersInput { maybeConfig, gamepads, pressedKeys } players =
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
                    [ keyboardToInputState pressedKeys ]

        gamepadInputs =
            gamepads
                |> List.sortBy Gamepad.getIndex
                |> List.map gamepadToInputState

        allInputs =
            keyboardInputs ++ gamepadInputs

        fillers =
            List.repeat (List.length sortedPlayers - List.length allInputs) Nothing

        filledInputs =
            List.map Just allInputs ++ fillers

        tupleToTuple : ( Player, Maybe InputState ) -> ( Int, Player )
        tupleToTuple ( player, maybeInputState ) =
            maybeInputState
                |> Maybe.map (\inputState -> { player | inputState = inputState })
                |> Maybe.withDefault player
                |> (\player -> ( player.id, player ))
    in
        List.map2 (,) sortedPlayers filledInputs
            |> List.map tupleToTuple
            |> Dict.fromList
