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
    { vfog : Float
    , vnormal : Vec3
    , localPosition : Vec3
    }



-- shaders


vertexShader : Shader WebglMesh.VertexAttributes Uniforms Varyings
vertexShader =
    [glsl|
        precision mediump float;

        attribute vec3 v;
        attribute vec3 n;

        uniform mat4 transform;
        uniform sampler2D t;

        varying float vfog;
        varying vec3 vnormal;
        varying vec3 localPosition;

        void main () {
            localPosition = v;
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

        varying float vfog;
        varying vec3 vnormal;
        varying vec3 localPosition;



        void main() {
          // Make a base e1,e2 for the surface plane
          float x = vnormal.x;
          float y = vnormal.y;
          float z = vnormal.z;
          vec3 e1 = normalize(vec3(y - z, z - x, x - y));
          vec3 e2 = cross(vnormal, e1);

          vec2 texturePosition = vec2( dot(localPosition, e1), dot(localPosition, e2));

            vec4 heroColor = vec4(0.0, 0.0, 1.0, 1.0);
            vec3 lightDirection = vec3(1.0, -1.0, -1.0);

            vec4 white = vec4(1.0);
            vec4 black = vec4(0.0, 0.0, 0.0, 1.0);
            vec4 fogColor = white;

            float lightIntensity = 0.5 + 0.5 * dot(vnormal, -1.0 * lightDirection);

            vec4 colorWithLight = mix(black, heroColor, lightIntensity);

            gl_FragColor = texture2D(t, texturePosition); //mix(colorWithLight, fogColor, vfog);
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
