module Input exposing (..)

import Dict exposing (Dict)
import Math.Vector2 as Vec2 exposing (Vec2, vec2)
import Keyboard.Extra as Key exposing (Key)
import Player exposing (Player)


input : List Key -> Int -> Player -> Player
input pressedKeys id player =
    case player.inputSource of
        Player.Gamepad index ->
            -- TODO
            player

        Player.KeyboardAndMouse ->
            let
                x =
                    if List.member Key.CharA pressedKeys then
                        -1
                    else if List.member Key.CharD pressedKeys then
                        1
                    else
                        0

                y =
                    if List.member Key.CharS pressedKeys then
                        -1
                    else if List.member Key.CharW pressedKeys then
                        1
                    else
                        0

                move =
                    vec2 x y

                is =
                    player.inputState

                inputState =
                    { is | move = move }
            in
                { player | inputState = inputState }


updatePlayersInput : List Key -> Dict Int Player -> Dict Int Player
updatePlayersInput pressedKeys players =
    Dict.map (input pressedKeys) players
