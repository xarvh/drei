module Scene exposing (..)

import Color exposing (Color)
import Math.Matrix4 as Mat4 exposing (Mat4)
import Math.Vector2 as Vec2 exposing (Vec2, vec2)
import Math.Vector3 as Vec3 exposing (Vec3, vec3)
import WebGL exposing (Mesh, Shader)


planeSize =
    3


viewportWidthHeightRatio =
    16.0 / 9.0


type alias Uniforms =
    { translation : Mat4
    , perspective : Mat4
    , camera : Mat4
    , duskDawn : Float
    }


uniforms : Float -> Float -> Uniforms
uniforms x y =
    { translation = Mat4.makeTranslate (vec3 x y 0)
    , perspective = Mat4.makePerspective 45 viewportWidthHeightRatio 0.01 100
    , camera = Mat4.makeLookAt (vec3 0 -3 3) (vec3 0 0 0) (vec3 0 1 0)
    , duskDawn = 0
    }



-- Mesh


type alias Vertex =
    { color : Vec3
    , position : Vec3
    }


squareMesh =
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
            Vertex white position
    in
        [ ( vertex a, vertex b, vertex c )
        , ( vertex c, vertex d, vertex a )
        ]
            |> WebGL.triangles



-- Shaders


vertexShader : Shader Vertex Uniforms { vcolor : Vec3, vcoord : Vec2 }
vertexShader =
    [glsl|

        attribute vec3 position;
        attribute vec3 color;

        uniform mat4 perspective;
        uniform mat4 camera;
        uniform mat4 translation;

        varying vec3 vcolor;
        varying vec2 vcoord;

        void main () {
            gl_Position = perspective * camera * translation * vec4(position, 1.0);
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


tile : ( Int, Int ) -> WebGL.Entity
tile ( x, y ) =
    WebGL.entity
        vertexShader
        fragmentShader
        squareMesh
        (uniforms (toFloat x - planeSize / 2 + 0.5) (toFloat y - planeSize / 2 + 0.5))


plane : List WebGL.Entity
plane =
    let
        xs =
            List.range 0 (planeSize - 1)

        ys =
            List.range 0 (planeSize - 1)

        xys =
            xs |> List.map (\x -> ys |> List.map (\y -> ( x, y ))) |> List.concat
    in
        List.map tile xys


entities : Float -> List WebGL.Entity
entities time =
    let
        ddSpeed =
            0.00007

        duskDawn =
            (ddSpeed * time)
                - (toFloat <| floor <| ddSpeed * time)
                |> Debug.log "d"

        theta =
            sin (0.001 * time) * pi / 32
    in
        plane
