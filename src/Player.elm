module Player exposing (..)

import Math.Vector2 as Vec2 exposing (Vec2, vec2)


type InputSource
    = KeyboardAndMouse
    | TestKeyboard
    | Gamepad Int


type alias InputState =
    { fire : Bool
    , head : Float
    , move : Vec2
    }


type alias Player =
    { id : Int
    , inputSource : InputSource
    , inputState : InputState
    }


init : Int -> InputSource -> Player
init id inputSource =
    { id = id
    , inputSource = inputSource
    , inputState =
        { fire = False
        , head = 0
        , move = vec2 0 0
        }
    }
