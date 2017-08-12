module Game exposing (..)

import Math.Vector2 as Vec2 exposing (Vec2, vec2)
import Dict exposing (Dict)
import Hero exposing (Hero)
import Player exposing (Player, InputSource)


-- Game


type alias Game =
    { heroes : Dict Int Hero
    , lastId : Int
    , players : Dict Int Player
    }


init : Game
init =
    { heroes = Dict.empty
    , lastId = 0
    , players = Dict.empty
    }


nextId : Game -> ( Int, Game )
nextId game =
    let
        id =
            game.lastId + 1
    in
        ( id, { game | lastId = id } )



-- Players


addPlayer : InputSource -> Game -> ( Player, Game )
addPlayer inputSource oldGame =
    let
        ( id, game ) =
            nextId oldGame

        player =
            Player.init id inputSource

        players =
            Dict.insert id player game.players
    in
        ( player
        , { game | players = players }
            |> addHero player
            |> Tuple.second
        )



-- Heroes


addHero : Player -> Game -> ( Hero, Game )
addHero player oldGame =
    let
        ( id, game ) =
            nextId oldGame

        hero =
            { id = id
            , playerId = player.id
            , position = vec2 0 0
            }

        heroes =
            Dict.insert id hero game.heroes
    in
        ( hero, { game | heroes = heroes } )



{-
   addHero : Player -> Game -> ( Hero, Game )
   addHero player game =
       let
           maybeHero =
               game.heroes
                   |> Dict.values
                   |> List.filter (\h -> h.playerId == player.id)
                   |> List.head
       in
           case maybeHero of
               Just hero ->
                   ( hero, game )

               Nothing ->
                   addHeroWithoutChecking player game
-}
-- Think


think : Float -> Game -> Game
think dt game =
    game
