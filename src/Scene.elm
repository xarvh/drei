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
camera direction target =
    let
        ( x, y ) =
            Vec2.toTuple target

        targetPosition =
            vec3 x y 0

        cameraOffset =
            vec3 0 0 3
                |> Mat4.transform (Mat4.makeRotate (Vec2.getY direction) (vec3 1 0 0))

        cameraPosition =
            Vec3.add targetPosition cameraOffset

        upDirection =
            vec3 0 1 0
    in
        Mat4.makeLookAt cameraPosition targetPosition upDirection


entities : Maybe Player -> { width : Int, height : Int } -> Game -> List WebGL.Entity
entities maybeViewer viewport game =
    let
        cameraDirection =
            maybeViewer
                |> Maybe.map .aim
                |> Maybe.withDefault (vec2 0 0)

        cameraTarget =
            maybeViewer
                |> Maybe.andThen (Game.playerToHero game)
                |> Maybe.map .position
                |> Maybe.withDefault (vec2 0 0)

        p =
            perspective viewport.width viewport.height

        c =
            camera cameraDirection cameraTarget

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
