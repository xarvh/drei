module Hero exposing (..)

import Color exposing (Color)
import Math.Matrix4 as Mat4 exposing (Mat4)
import Math.Vector2 as Vec2 exposing (Vec2, vec2)
import Math.Vector3 as Vec3 exposing (Vec3, vec3)
import Math.Vector4 as Vec4 exposing (Vec4, vec4)
import Meshes
import WebGL exposing (Mesh, Shader)


type alias Hero =
    { id : Int
    , heading : Float
    , position : Vec2
    , playerId : Int
    }



-- types


type alias Uniforms =
    { transform : Mat4
    }



-- shaders


vertexShader : Shader Meshes.PlainVertex Uniforms { fog : Float }
vertexShader =
    [glsl|
        precision mediump float;

        attribute vec3 position;

        uniform mat4 transform;

        varying float fog;

        void main () {
            gl_Position = transform * vec4(position, 1.0);
            fog = length(gl_Position.xyz) / 10.0;
        }
    |]


fragmentShader : Shader {} Uniforms { fog : Float }
fragmentShader =
    [glsl|
        precision mediump float;

        varying float fog;

        vec4 heroColor = vec4(0.0, 0.0, 1.0, 1.0);
        vec4 fogColor = vec4(1.0, 1.0, 1.0, 1.0);

        void main() {
            gl_FragColor = mix(heroColor, fogColor, fog);
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

        translation =
            Mat4.makeTranslate (vec3 x y z)

        rotation =
            Mat4.makeRotate hero.heading (vec3 0 0 -1)

        transform =
            Mat4.identity
                |> Mat4.mul rotation
                |> Mat4.mul translation
                |> Mat4.mul perspectiveAndCamera

        uniforms =
            { transform = transform
            }
    in
        WebGL.entity vertexShader fragmentShader Meshes.cube uniforms
