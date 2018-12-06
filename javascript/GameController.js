class GameController {
  
  constructor(ThreeScene, ThreeCamera, ThreeControls) {
    this.ThreeScene = ThreeScene; // The scene object from Three.js
    this.ThreeCamera = ThreeCamera; // The camara object from Three.js
    this.ThreeControls = ThreeControls; // The controls object from Three.js
    this.player = new Player(this, new Vector3D(0, 0, 1), new Vector3D(4, 4, 8), "", this.ThreeControls);
    this.player.speed = 1;
    this.scenes = [
      {
        "title": "Introduction",
        "objects": [
          new Block(this, new Vector3D(0, 0, -1), new Vector3D(1, 1, 1)),
          new Block(this, new Vector3D(0, 0, 1), new Vector3D(1, 2, 2))
        ],
        "npcs": [
          new NPC(this, new Vector3D(4, 0, 1), new Vector3D(1, 1, 2), ""),
          new NPC(this, new Vector3D(-3, 2, 1.2), new Vector3D(1, 1, 2.4), ""),
          new NPC(this, new Vector3D(0, 2, 0.7), new Vector3D(1, 1, 1.4), ""),
        ]
      },
      {
        "title": "Nihilism",
        "objects": [
          new Block(this, new Vector3D(0, 0, 10), new Vector3D(10, 10, 1)),
          new Block(this, new Vector3D(-1, 2, -4), new Vector3D(1, 2, 2))
        ],
        "npcs": [
          new NPC(this, new Vector3D(-1, 2, -2), new Vector3D(1, 1, 2), "")
        ]
      }
    ];
    this.sceneNum = 0;
    
    // Store a clock for physics calculations.
    this.clock = new THREE.Clock();
    this.delta;
  }
  
  get scene() {
    return this.scenes[this.sceneNum];
  }

  checkCollision(object) {
    var npc;
    for (var i in this.scene.npcs) {
      npc = this.scene.npcs[i];
      if (npc !== object) { // Ensure we don't collide the object with itself.
        object.collisionBox.collideWith(npc);
      }
    }
    var obj;
    for (var i in this.scene.objects) {
      obj = this.scene.objects[i];
      if (obj !== object) { // Ensure we don't collide the object with itself.
        object.collisionBox.collideWith(npc);
      }
    }
  }
  
  init() {
    var npc;
    for (var i in this.scene.npcs) {
      npc = this.scene.npcs[i];
      npc.collisionBox.initRender();
    }
    var obj;
    for (var i in this.scene.objects) {
      obj = this.scene.objects[i];
      obj.collisionBox.initRender();
    }
  }

  update() {
    this.delta = this.clock.getDelta();
    this.player.update();
    var npc;
    for (var i in this.scene.npcs) {
      npc = this.scene.npcs[i];
      npc.update();
    }
    var obj;
    for (var i in this.scene.objects) {
      obj = this.scene.objects[i];
      obj.update();
    }
  }
  
}
