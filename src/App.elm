module App exposing (..)

import Dict
import Game exposing (Game)
import Gamepad
import GamepadPort
import Html exposing (..)
import Html.Attributes exposing (class)
import Html.Events
import Keyboard.Extra exposing (Key)
import Input
import List.Extra
import LocalStoragePort
import MousePort
import Player exposing (Player)
import Task
import Time exposing (Time)
import Scene
import WebGL
import Window


-- types


type alias Config =
    { maybeInputConfig : Maybe Input.Config
    , gamepadDatabase : Gamepad.Database
    }


type alias Model =
    { game : Game
    , input : Input.Model
    , windowSize : Window.Size
    }


type Msg
    = OnAnimationFrame ( Time, Gamepad.Blob ) -- This one is called directly by Config
    | OnClick
    | OnInputMsg Input.Msg
    | OnWindowResizes Window.Size



-- init


init : ( Model, Cmd Msg )
init =
    let
        game =
            Game.init
                |> (Game.addPlayer >> Tuple.second)
    in
        ( { game = game
          , input = Input.init
          , windowSize =
                { width = 100
                , height = 100
                }
          }
        , Task.perform OnWindowResizes Window.size
        )



-- update


noCmd model =
    ( model, Cmd.none )


updateAnimationFrame : Config -> Time -> Gamepad.Blob -> Model -> ( Model, Cmd Msg )
updateAnimationFrame config dt blob model =
    let
        oldGame =
            model.game

        ( playersMinusInputs, inputModel, players ) =
            Input.updatePlayersInput
                { gamepads = Gamepad.getGamepads config.gamepadDatabase blob
                , maybeConfig = config.maybeInputConfig
                }
                dt
                model.input
                oldGame.players

        addNewPlayer =
            -- if there are more inputs than players
            if playersMinusInputs < 0 then
                Game.addPlayer >> Tuple.second
            else
                identity

        game =
            { oldGame | players = players } |> addNewPlayer
    in
        noCmd
            { model
                | game = Game.think dt game
                , input = inputModel
            }


update : Config -> Msg -> Model -> ( Model, Cmd Msg )
update config msg model =
    case msg of
        OnAnimationFrame ( dt, blob ) ->
            updateAnimationFrame config dt blob model

        OnClick ->
            ( model, MousePort.lock )

        OnInputMsg msg ->
            { model | input = Input.update msg model.input } |> noCmd

        OnWindowResizes size ->
            noCmd { model | windowSize = size }



-- view


shrinkViewport : Int -> Window.Size -> Window.Size
shrinkViewport shrink viewport =
    { width = viewport.width - shrink
    , height = viewport.height - shrink
    }


splitScreen : Window.Size -> Int -> ( Int, Window.Size )
splitScreen windowSize playersNumber =
    -- TODO drop the assumption that the screen is landscape
    case playersNumber of
        0 ->
            ( 1, windowSize )

        1 ->
            ( 1, windowSize )

        2 ->
            ( 2, { windowSize | width = windowSize.width // 2 } )

        3 ->
            ( 3, { windowSize | width = windowSize.width // 3 } )

        _ ->
            ( 2, { width = windowSize.width // 2, height = windowSize.height // 2 } )


view : Model -> Html Msg
view model =
    let
        sortedPlayers =
            model.game.players
                |> Dict.values
                |> List.sortBy .id

        ( columns, viewportsSize ) =
            splitScreen model.windowSize (List.length sortedPlayers)
                |> Tuple.mapSecond (shrinkViewport 4)

        viewPlayer player =
            WebGL.toHtml
                [ Html.Attributes.width viewportsSize.width
                , Html.Attributes.height viewportsSize.height
                , class "playerViewport"
                ]
                (Scene.entities (Just player) viewportsSize model.game)
    in
        sortedPlayers
            |> List.map viewPlayer
            |> List.Extra.groupsOf columns
            |> List.map (div [ class "playerViewport-Row" ])
            |> div
                [ class "playerViewport-Rows"
                , Html.Events.onClick OnClick
                ]



-- subscriptions


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ Window.resizes OnWindowResizes
        , Input.subscriptions model.input |> Sub.map OnInputMsg
        ]
