module Player exposing (..)

import Math.Vector2 as Vec2 exposing (Vec2, vec2)


type alias InputState =
    { dAim : Vec2
    , fire : Bool
    , move : Vec2
    }


type alias Player =
    { aim : Vec2
    , id : Int
    , inputState : InputState
    }


init : Int -> Player
init id =
    { aim = vec2 0 0
    , id = id
    , inputState =
        { dAim = vec2 0 0
        , fire = False
        , move = vec2 0 0
        }
    }
