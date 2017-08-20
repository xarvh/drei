module Plane exposing (..)

import Color exposing (Color)
import Math.Matrix4 as Mat4 exposing (Mat4)
import Math.Vector2 as Vec2 exposing (Vec2, vec2)
import Math.Vector3 as Vec3 exposing (Vec3, vec3)
import WebGL exposing (Mesh, Shader)


planeSize =
    3



--


type alias Uniforms =
    { translation : Mat4
    , perspectiveAndCamera : Mat4
    , duskDawn : Float
    }


type alias MeshVertex =
    { color : Vec3
    , position : Vec3
    }



-- mesh


squareMesh =
    let
        size =
            0.8

        half =
            size / 2

        left =
            -half

        right =
            half

        front =
            half

        back =
            -half

        a =
            vec3 left 0 back

        b =
            vec3 left 0 front

        c =
            vec3 right 0 front

        d =
            vec3 right 0 back

        white =
            vec3 1 1 1

        vertex position =
            MeshVertex white position
    in
        [ ( vertex a, vertex b, vertex c )
        , ( vertex c, vertex d, vertex a )
        ]
            |> WebGL.triangles



-- Shaders


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

        float css(float apex, float width, float value) {
          return smoothstep(apex - width, apex, value) - smoothstep(apex, apex + width, value);
        }

        float f(vec2 position) {
          return position.x;
        }

        void main() {

            float value = f(vcoord);

            vec3 dusk
              = vec3(0.4, 0.4, 0.6) * css(0.00, 0.33, value)
              + vec3(0.9, 0.8, 0.6) * css(0.33, 0.33, value)
              + vec3(0.9, 0.6, 0.3) * css(0.66, 0.33, value)
              + vec3(0.9, 0.3, 0.1) * css(1.00, 0.33, value)
              ;

            vec3 night
              = vec3(0.0, 0.0, 0.2) * css(0.00, 0.33, value)
              + vec3(0.5, 0.4, 0.2) * css(0.33, 0.33, value)
              + vec3(0.5, 0.2, 0.0) * css(0.66, 0.33, value)
              + vec3(0.5, 0.0, 0.0) * css(1.00, 0.33, value)
              ;

            vec3 dawn
              = vec3(0.4, 0.4, 0.6) * css(1.00, 0.33, value)
              + vec3(0.9, 0.8, 0.6) * css(0.66, 0.33, value)
              + vec3(0.9, 0.6, 0.3) * css(0.33, 0.33, value)
              + vec3(0.9, 0.3, 0.1) * css(0.00, 0.33, value)
              ;

            vec3 day
              = vec3(0.4, 0.4, 0.9) * css(0.00, 0.33, value)
              + vec3(0.9, 0.8, 0.9) * css(0.33, 0.33, value)
              + vec3(0.9, 0.6, 0.7) * css(0.66, 0.33, value)
              + vec3(0.9, 0.3, 0.5) * css(1.00, 0.33, value)
              ;

            vec3 c
              = dusk  * css(0.00, 0.33, duskDawn)
              + night * css(0.33, 0.33, duskDawn)
              + dawn  * css(0.66, 0.33, duskDawn)
              + day   * css(1.00, 0.33, duskDawn)
              ;

            gl_FragColor = vec4(c, 1.0);
        }
    |]



-- entities


tile : Mat4 -> ( Int, Int ) -> WebGL.Entity
tile perspectiveAndCamera ( tileI, tileJ ) =
    let
        x =
            toFloat tileI - planeSize / 2 + 0.5

        z =
            toFloat tileJ - planeSize / 2 + 0.5

        uniforms =
            { translation = Mat4.makeTranslate (vec3 x 0 z)
            , perspectiveAndCamera = perspectiveAndCamera
            , duskDawn = 0
            }
    in
        WebGL.entity vertexShader fragmentShader squareMesh uniforms


entities : Mat4 -> List WebGL.Entity
entities perspectiveAndCamera =
    let
        xs =
            List.range 0 (planeSize - 1)

        zs =
            List.range 0 (planeSize - 1)

        xzs =
            xs |> List.map (\x -> zs |> List.map (\z -> ( x, z ))) |> List.concat
    in
        List.map (tile perspectiveAndCamera) xzs
