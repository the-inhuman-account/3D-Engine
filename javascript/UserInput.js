var Mouse = {
    "px": 0,
    "py": 0,
    "x": 0,
    "y": 0,
    "click": false
};
var Keys = {
    "87": false, // w
    "65": false, // a
    "83": false, // s
    "68": false, // d
    "32": false, // space bar
    get w() { return Keys["87"]; },
    get a() { return Keys["65"]; },
    get s() { return Keys["83"]; },
    get d() { return Keys["68"]; },
    get space() { return Keys["32"]; },
};

window.onkeydown = function(e) {
    if (Keys[e.keyCode] !== undefined) {
        Keys[e.keyCode] = true;
    }
};
window.onkeyup = function(e) {
    if (Keys[e.keyCode] !== undefined) {
        Keys[e.keyCode] = false;
    }
};
document.onmouseup = function(e) {
    Mouse["click"] = true;
};
function mousemove(e) {
    Mouse.x += e.movementX;
    Mouse.y += e.movementY;
}

function input() {
    Mouse.px = Mouse.x;
    Mouse.py = Mouse.y;
    Mouse.click = false;
    Keys["32"] = false;
}

// Lock the user's mouse so that it doesn't hit the edge of the screen.
var body = document.body;
var havePointerLock = "pointerLockElement" in document || "mozPointerLockElement" in document || "webkitPointerLockElement" in document;
if (havePointerLock) {
    body.requestPointerLock = body.requestPointerLock || body.mozRequestPointerLock || body.webkitRequestPointerLock;
    body.exitPointerLock = body.exitPointerLock || body.mozExitPointerLock || body.webkitExitPointerLock;
    body.addEventListener("click", function() {
        if (!(body === document.pointerLockElement || body === document.mozPointerLockElement || body === document.webkitPointerLockElement)) {
            body.requestPointerLock();
            document.getElementById("instructions-box").style.display = "none";
            document.addEventListener("mousemove", mousemove, false);
        } else {
            // document.exitPointerLock();
        }
    }, false);
    document.addEventListener("pointerlockchange", function() {
        if (!(body === document.pointerLockElement || body === document.mozPointerLockElement || body === document.webkitPointerLockElement)) {
            document.getElementById("instructions-box").style.display = "-webkit-box";
            document.getElementById("instructions-box").style.display = "-moz-box";
            document.getElementById("instructions-box").style.display = "box";
            document.removeEventListener("mousemove", mousemove, false);
        }
    }, false);
}
