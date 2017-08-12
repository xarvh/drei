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


perspectiveAndcamera : Int -> Int -> Mat4
perspectiveAndcamera viewportWidth viewportHeight =
    let
        ratio =
            toFloat viewportWidth / toFloat viewportHeight

        perspective =
            Mat4.makePerspective 45 ratio 0.01 100

        camera =
            Mat4.makeLookAt (vec3 0 -3 3) (vec3 0 0 0) (vec3 0 1 0)
    in
        Mat4.mul perspective camera


{-| TODO Add viewer player as argument -}
entities : { width : Int, height : Int } -> Game -> List WebGL.Entity
entities viewport game =
    let
        pnc =
            perspectiveAndcamera viewport.width viewport.height

        heroes =
            game.heroes
              |> Dict.values
              |> List.map (Hero.entity pnc)

        planeTiles =
            Plane.entities pnc
    in
        List.concat
            [ planeTiles
            , heroes
            ]
