module Main exposing (..)

-- Without this dumb workaround, elm-reactor will try to open files in src/assets/ rather than assets/

import Html
import Config


main =
    Html.programWithFlags Config.programWithFlags
