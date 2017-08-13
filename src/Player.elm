module Player exposing (..)

import Math.Vector2 as Vec2 exposing (Vec2, vec2)


type alias InputState =
    { fire : Bool
    , head : Float
    , move : Vec2
    }


type alias Player =
    { id : Int
    , inputState : InputState
    }


init : Int -> Player
init id =
    { id = id
    , inputState =
        { fire = False
        , head = 0
        , move = vec2 0 0
        }
    }
