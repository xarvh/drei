module Game exposing (..)

import Math.Vector2 as Vec2 exposing (Vec2, vec2)
import Math.Vector3 as Vec3 exposing (Vec3, vec3)
import Dict exposing (Dict)
import Hero exposing (Hero)
import Player exposing (Player)
import Time exposing (Time)




vec2Rotate : Float -> Vec2 -> Vec2
vec2Rotate a v =
    let
        ( ox, oy ) =
            Vec2.toTuple v

        -- positive angles are *clockwise*
        nx =
            ox * cos a + oy * sin a

        ny =
            ox * sin a - oy * cos a
    in
        vec2 nx ny



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


addPlayer : Game -> ( Player, Game )
addPlayer oldGame =
    let
        ( id, game ) =
            nextId oldGame

        player =
            Player.init id

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
            , heading = turns 0.1
            , playerId = player.id
            , position = vec3 0 0.1 0
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
                (vx, vz) =
                    player.inputState.move
                        |> vec2Rotate (Vec2.getX player.aim)
                        |> Vec2.scale maxHeroSpeed
                        |> Vec2.toTuple

                dp =
                    Vec3.scale dt (vec3 vx 0 vz)

                position =
                    Vec3.add hero.position dp
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
