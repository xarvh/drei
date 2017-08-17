module Scene exposing (..)

import Dict
import Color exposing (Color)
import Math.Matrix4 as Mat4 exposing (Mat4)
import Math.Vector2 as Vec2 exposing (Vec2, vec2)
import Math.Vector3 as Vec3 exposing (Vec3, vec3)
import WebGL exposing (Mesh, Shader)
import Game exposing (Game)
import Hero
import Plane
import Player exposing (Player)


perspective : Int -> Int -> Mat4
perspective viewportWidth viewportHeight =
    let
        ratio =
            toFloat viewportWidth / toFloat viewportHeight
    in
        Mat4.makePerspective 45 ratio 0.01 100



camera : Vec2 -> Vec2 -> Mat4
camera aimDirection playerPosition =
    let
        ( playerX, playerY ) =
            Vec2.toTuple playerPosition

        ( yaw, pitch ) =
            Vec2.toTuple aimDirection

    in
          -- We need the inverse of all transformations, in inverse order
          Mat4.identity
            |> Mat4.translate3 -0.5 0 -3
            |> Mat4.rotate (pitch - turns 0.25) (vec3 1 0 0)
            |> Mat4.rotate yaw (vec3 0 0 1)
            |> Mat4.translate3 -playerX -playerY 0


entities : Maybe Player -> { width : Int, height : Int } -> Game -> List WebGL.Entity
entities maybeViewer viewport game =
    let
        aimDirection =
            maybeViewer
                |> Maybe.map .aim
                |> Maybe.withDefault (vec2 0 0)

        playerPosition =
            maybeViewer
                |> Maybe.andThen (Game.playerToHero game)
                |> Maybe.map .position
                |> Maybe.withDefault (vec2 0 0)

        p =
            perspective viewport.width viewport.height

        c =
            camera aimDirection playerPosition

        perspectiveAndcamera =
            Mat4.mul p c

        heroes =
            game.heroes
                |> Dict.values
                |> List.map (Hero.entity perspectiveAndcamera)

        planeTiles =
            Plane.entities perspectiveAndcamera
    in
        List.concat
            [ planeTiles
            , heroes
            ]
