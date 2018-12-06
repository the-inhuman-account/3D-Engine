var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
var controls = new THREE.FirstPersonControls( camera );
controls.movementSpeed = 1;
controls.lookSpeed = 0.4;
controls.lookVertical = true;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var GC = new GameController(scene, camera, controls);

var animate = function () {
    requestAnimationFrame( animate );

    GC.update();
    
    renderer.render( scene, camera );
};

animate();
