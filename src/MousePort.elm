port module MousePort exposing (lock, unlocked, movement, button)


port lockMouse : String -> Cmd msg


lock =
    lockMouse ""


port mousePointerUnlocked : ({} -> msg) -> Sub msg


unlocked : msg -> Sub msg
unlocked msg =
    mousePointerUnlocked (always msg)


port mouseMovement : (( Int, Int ) -> msg) -> Sub msg


movement =
    mouseMovement


port mouseButton : (( Int, Bool ) -> msg) -> Sub msg


button =
    mouseButton
