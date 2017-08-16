port module MousePort exposing (lock, movement, button)


port lockMouse : String -> Cmd msg


lock =
    lockMouse ""


port mouseMovement : (( Int, Int ) -> msg) -> Sub msg


movement =
    mouseMovement


port mouseButton : (( Int, Bool ) -> msg) -> Sub msg


button =
    mouseButton
