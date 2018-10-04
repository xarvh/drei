module Scene exposing (..)

import Dict
import Game exposing (Game)
import Hero
import Math.Matrix4 as Mat4 exposing (Mat4)
import Math.Vector2 as Vec2 exposing (Vec2, vec2)
import Math.Vector3 as Vec3 exposing (Vec3, vec3)
import Plane
import Player exposing (Player)
import WebGL exposing (Mesh, Shader)
import WebGL.Texture exposing (Texture)


perspective : Int -> Int -> Mat4
perspective viewportWidth viewportHeight =
    let
        ratio =
            toFloat viewportWidth / toFloat viewportHeight
    in
    Mat4.makePerspective 45 ratio 0.01 100


camera : Vec2 -> Vec3 -> Mat4
camera aimDirection playerPosition =
    let
        aim =
            Vec2.toRecord aimDirection

        ( yaw, pitch ) =
            ( aim.x, aim.y )
    in
    -- We need the inverse of all transformations, in inverse order
    Mat4.identity
        |> Mat4.translate3 -0.5 -0.5 -3
        |> Mat4.rotate pitch (vec3 1 0 0)
        |> Mat4.rotate yaw (vec3 0 1 0)
        |> Mat4.translate (Vec3.scale -1 playerPosition)


entities : Maybe Player -> { width : Int, height : Int } -> Texture -> Game -> List WebGL.Entity
entities maybeViewer viewport texture game =
    let
        aimDirection =
            maybeViewer
                |> Maybe.map .aim
                |> Maybe.withDefault (vec2 0 0)

        playerPosition =
            maybeViewer
                |> Maybe.andThen (Game.playerToHero game)
                |> Maybe.map .position
                |> Maybe.withDefault (vec3 0 0 0)

        p =
            perspective viewport.width viewport.height

        c =
            camera aimDirection playerPosition

        perspectiveAndcamera =
            Mat4.mul p c

        heroes =
            game.heroes
                |> Dict.values
                |> List.map (Hero.entity texture perspectiveAndcamera)

        planeTiles =
            Plane.entities perspectiveAndcamera
    in
    List.concat
        [ planeTiles
        , heroes
        ]
