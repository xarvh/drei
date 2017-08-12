module Hero exposing (..)

import Color exposing (Color)
import Math.Matrix4 as Mat4 exposing (Mat4)
import Math.Vector2 as Vec2 exposing (Vec2, vec2)
import Math.Vector3 as Vec3 exposing (Vec3, vec3)
import WebGL exposing (Mesh, Shader)


type alias Hero =
    { id : Int
    , position : Vec2
    , playerId : Int
    }



-- types


type alias MeshVertex =
    { color : Vec3
    , position : Vec3
    }


type alias Uniforms =
    { translation : Mat4
    , perspectiveAndCamera : Mat4
    , duskDawn : Float
    }



-- mesh


mesh =
    let
        a =
            vec3 -0.4 -0.4 0

        b =
            vec3 -0.4 0.4 0

        c =
            vec3 0.4 0.4 0

        d =
            vec3 0.4 -0.4 0

        white =
            vec3 1 1 1

        vertex position =
            MeshVertex white position
    in
        [ ( vertex a, vertex b, vertex c )
        , ( vertex c, vertex d, vertex a )
        ]
            |> WebGL.triangles



-- shaders


vertexShader : Shader MeshVertex Uniforms { vcolor : Vec3, vcoord : Vec2 }
vertexShader =
    [glsl|

        attribute vec3 position;
        attribute vec3 color;

        uniform mat4 perspectiveAndCamera;
        uniform mat4 translation;

        varying vec3 vcolor;
        varying vec2 vcoord;


        void main () {
            gl_Position = perspectiveAndCamera * translation * vec4(position, 1.0);
            vcolor = color;
            vcoord = (position.xy + vec2(1.0, 1.0)) * 0.5;
        }

    |]


fragmentShader : Shader {} Uniforms { vcolor : Vec3, vcoord : Vec2 }
fragmentShader =
    [glsl|

        precision mediump float;

        uniform float duskDawn;

        varying vec3 vcolor;
        varying vec2 vcoord;

        void main() {
            gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
        }
    |]



-- entity


entity : Mat4 -> Hero -> WebGL.Entity
entity perspectiveAndCamera hero =
    let
        ( x, y ) =
            Vec2.toTuple hero.position

        z =
            0.1

        uniforms =
            { translation = Mat4.makeTranslate (vec3 x y z)
            , perspectiveAndCamera = perspectiveAndCamera
            , duskDawn = 0
            }
    in
        WebGL.entity vertexShader fragmentShader mesh uniforms
