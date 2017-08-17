module Meshes exposing (..)

import Math.Matrix4 as Mat4 exposing (Mat4)
import Math.Vector2 as Vec2 exposing (Vec2, vec2)
import Math.Vector3 as Vec3 exposing (Vec3, vec3)
import WebGL exposing (Mesh, Shader)


type alias PlainVertex =
    { position : Vec3 }


cube : Mesh PlainVertex
cube =
    let
        size =
            0.5

        vertex x y z =
            { position = vec3 x y z }

        -- X
        left =
            -size

        right =
            size

        -- Y
        top =
            size

        bottom =
            -size

        -- Z
        front =
            size

        back =
            -size

        -- vertexes
        ltf =
            vertex left top front

        ltb =
            vertex left top back

        lbf =
            vertex left bottom front

        lbb =
            vertex left bottom back

        rtf =
            vertex right top front

        rtb =
            vertex right top back

        rbf =
            vertex right bottom front

        rbb =
            vertex right bottom back
    in
        WebGL.triangles
            -- front
            [ ( ltf, lbf, rtf )
            , ( rtf, rbf, lbf )

            -- back
            , ( ltb, lbb, rtb )
            , ( rtb, rbb, lbb )

            -- left
            , ( ltf, ltb, lbf )
            , ( lbf, lbb, ltb )
            ]
