module Hero exposing (..)

import Math.Matrix4 as Mat4 exposing (Mat4)
import Math.Vector2 as Vec2 exposing (Vec2, vec2)
import Math.Vector3 as Vec3 exposing (Vec3, vec3)
import Math.Vector4 as Vec4 exposing (Vec4, vec4)
import Meshes
import WebGL exposing (Mesh, Shader)
import WebGL.Texture exposing (Texture)
import WebglMesh


type alias Hero =
    { id : Int
    , heading : Float
    , playerId : Int
    , position : Vec3
    }



-- types


type alias Uniforms =
    { transform : Mat4
    , t : Texture
    }


type alias Varyings =
    { surface_j : Vec3
    , surface_i : Vec3
    , localPosition : Vec3
    }



-- shaders


vertexShader : Shader WebglMesh.VertexAttributes Uniforms Varyings
vertexShader =
    [glsl|
        precision mediump float;

        attribute vec3 v;
        attribute vec3 s;
        attribute vec3 i;
        attribute vec3 j;

        uniform mat4 transform;
        uniform sampler2D t;

        varying vec3 surface_i;
        varying vec3 surface_j;
        varying vec3 localPosition;

        void main () {
            localPosition = v;
            surface_i = i;
            surface_j = j;
            gl_Position = transform * vec4(v, 1.0);
            vfog = length(gl_Position.xyz) / 10.0;
            vnormal = normalize((transform * vec4(n, 1.0)).xyz);
        }
    |]


fragmentShader : Shader {} Uniforms Varyings
fragmentShader =
    [glsl|
        precision mediump float;

        uniform mat4 transform;
        uniform sampler2D t;

        varying vec3 localPosition;
        varying vec3 surface_i;
        varying vec3 surface_j;

        void main() {
          vec2 texturePosition = vec2( dot(localPosition, surface_i), dot(localPosition, surface_j));

            gl_FragColor = texture2D(t, texturePosition);
        }
    |]



-- entity


entity : Texture -> Mat4 -> Hero -> WebGL.Entity
entity texture perspectiveAndCamera hero =
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
            , t = texture
            }
    in
    WebGL.entity vertexShader fragmentShader WebglMesh.mesh uniforms
