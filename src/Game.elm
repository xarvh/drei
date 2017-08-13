module Game exposing (..)

import Math.Vector2 as Vec2 exposing (Vec2, vec2)
import Dict exposing (Dict)
import Hero exposing (Hero)
import Player exposing (Player, InputSource)
import Time exposing (Time)


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



-- Think


heroToPlayer : Game -> Hero -> Maybe Player
heroToPlayer game hero =
    Dict.get hero.playerId game.players


playerToHero : Game -> Player -> Maybe Hero
playerToHero game player =
    game.heroes
        |> Dict.values
        |> List.filter (\h -> h.playerId == player.id)
        |> List.head


{-| meters per second
-}
maxHeroSpeed =
    0.5


thinkHero : Game -> Time -> Int -> Hero -> Hero
thinkHero game dt id hero =
    case heroToPlayer game hero of
        Nothing ->
            hero

        Just player ->
            let
                -- meters per second
                velocity =
                    Vec2.scale maxHeroSpeed player.inputState.move

                dp =
                    Vec2.scale dt velocity

                position =
                    Vec2.add hero.position dp
            in
                { hero | position = position }


think : Time -> Game -> Game
think dtAsTime game =
    let
        dt =
            Time.inSeconds dtAsTime

        heroes =
            game.heroes |> Dict.map (thinkHero game dt)
    in
        { game | heroes = heroes }
