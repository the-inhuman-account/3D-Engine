var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

/////////////////////////// Temporary Lighting ///////////////////////////////
var light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

var light = new THREE.PointLight( 0xffffff, 10, 100 );
light.position.set( 5, 5, 5 );
scene.add( light );

var light = new THREE.PointLight( 0xffffff, 10, 100 );
light.position.set( -5, 5, -5 );
scene.add( light );

var light = new THREE.PointLight( 0xffffff, 50, 500 );
light.position.set(0, 50, 0);
scene.add( light );
/////////////////////////// /Temporary Lighting //////////////////////////////

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var GC = new GameController(scene, camera);
GC.init();

var animate = function () {
    requestAnimationFrame( animate );

    GC.update();
    input();
    
    renderer.render( scene, camera );
};

animate();
