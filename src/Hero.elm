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
    { localPosition : Vec3
    , texturePosition : Vec2
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

        varying vec3 localPosition;
        varying vec2 texturePosition;

        void main () {
            localPosition = v;
            texturePosition = vec2(dot(v, i), dot(v, j));

            gl_Position = transform * vec4(v, 1.0);
        }
    |]


fragmentShader : Shader {} Uniforms Varyings
fragmentShader =
    [glsl|
        precision mediump float;

        uniform mat4 transform;
        uniform sampler2D t;

        varying vec3 localPosition;
        varying vec2 texturePosition;

        void main() {
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
