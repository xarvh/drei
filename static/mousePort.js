function addMousePort(elmApp) {

  elmApp.ports.lockMouse.subscribe(function (arg) {
    // https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API
    document.body.requestPointerLock();
  });

  document.addEventListener("mousemove", function(event) {
    elmApp.ports.mouseMovement.send([event.movementX, event.movementY]);
  }, false);

  document.addEventListener("mousedown", function(event) {
    elmApp.ports.mouseButton.send([event.button, true]);
  }, false);

  document.addEventListener("mouseup", function(event) {
    elmApp.ports.mouseButton.send([event.button, false]);
  }, false);
}
