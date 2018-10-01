module Game exposing (..)

import Math.Vector2 as Vec2 exposing (Vec2, vec2)
import Math.Vector3 as Vec3 exposing (Vec3, vec3)
import Dict exposing (Dict)
import Hero exposing (Hero)
import Player exposing (Player)




vec2Rotate : Float -> Vec2 -> Vec2
vec2Rotate a v =
    let
        o =
            Vec2.toRecord v

        -- positive angles are *clockwise*
        nx =
            o.x * cos a + o.y * sin a

        ny =
            o.x * sin a - o.y * cos a
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


thinkHero : Game -> Float -> Int -> Hero -> Hero
thinkHero game dt id hero =
    case heroToPlayer game hero of
        Nothing ->
            hero

        Just player ->
            let
                -- meters per second
                v =
                    player.inputState.move
                        |> vec2Rotate (Vec2.getX player.aim)
                        |> Vec2.scale maxHeroSpeed
                        |> Vec2.toRecord

                dp =
                    Vec3.scale dt (vec3 v.x 0 v.x)

                position =
                    Vec3.add hero.position dp
            in
                { hero | position = position }


think : Float -> Game -> Game
think dtAsTime game =
    let
        dt =
            --TODO
            dtAsTime

        heroes =
            game.heroes |> Dict.map (thinkHero game dt)
    in
        { game | heroes = heroes }
