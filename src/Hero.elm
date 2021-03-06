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
    , playerId : Int
    , position : Vec3
    }



-- types


type alias Uniforms =
    { transform : Mat4
    }


type alias Varyings =
    { vfog : Float
    , vnormal : Vec3
    }



-- shaders


vertexShader : Shader Meshes.PlainVertex Uniforms Varyings
vertexShader =
    [glsl|
        precision mediump float;

        attribute vec3 normal;
        attribute vec3 position;

        uniform mat4 transform;

        varying float vfog;
        varying vec3 vnormal;

        void main () {
            gl_Position = transform * vec4(position, 1.0);
            vfog = length(gl_Position.xyz) / 10.0;
            vnormal = normalize((transform * vec4(normal, 1.0)).xyz);
        }
    |]


fragmentShader : Shader {} Uniforms Varyings
fragmentShader =
    [glsl|
        precision mediump float;

        varying float vfog;
        varying vec3 vnormal;

        vec4 heroColor = vec4(0.0, 0.0, 1.0, 1.0);
        vec3 lightDirection = vec3(1.0, -1.0, -1.0);

        vec4 white = vec4(1.0);
        vec4 black = vec4(0.0, 0.0, 0.0, 1.0);
        vec4 fogColor = white;

        void main() {
            float lightIntensity = 0.5 + 0.5 * dot(vnormal, -1.0 * lightDirection);

            vec4 colorWithLight = mix(black, heroColor, lightIntensity);

            gl_FragColor = mix(colorWithLight, fogColor, vfog);
        }
    |]



-- entity


entity : Mat4 -> Hero -> WebGL.Entity
entity perspectiveAndCamera hero =
    let
        translation =
            Mat4.makeTranslate hero.position

        rotation =
            Mat4.makeRotate hero.heading (vec3 0 -1 0)

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
