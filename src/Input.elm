module Input exposing (..)

import Dict exposing (Dict)
import Math.Vector2 as Vec2 exposing (Vec2, vec2)
import Keyboard.Extra exposing (Key)
import Player exposing (Player)


input : List Key -> Int -> Player -> Player
input pressedKeys id player =
    case player.inputSource of
        Player.Gamepad index ->
            -- TODO
            player

        Player.TestKeyboard ->
            let
                { x, y } =
                    Keyboard.Extra.arrows pressedKeys

                move =
                    vec2 (toFloat x) (toFloat y)

                is =
                    player.inputState

                inputState =
                    { is | move = move }
            in
                { player | inputState = inputState }

        Player.KeyboardAndMouse ->
            let
                { x, y } =
                    Keyboard.Extra.wasd pressedKeys

                move =
                    vec2 (toFloat x) (toFloat y)

                is =
                    player.inputState

                inputState =
                    { is | move = move }
            in
                { player | inputState = inputState }


updatePlayersInput : List Key -> Dict Int Player -> Dict Int Player
updatePlayersInput pressedKeys players =
    Dict.map (input pressedKeys) players
