class GameController {
  
  constructor() {
    this.player = new NPC(this, new Vector3D(0, 0, 1), new Vector3D(1, 1, 2), "");
    this.scenes = [
      {
        "title": "Introduction",
        "objects": [
          new Block(this, new Vector3D(0, 0, -1), new Vector3D(10, 10, 1)),
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
  }
  
  get scene() {
    return this.scenes[this.sceneNum];
  }
  
  checkCollision(object) {
    for (npc in this.scene.npcs) {
      if (npc !== object) { // Ensure we don't collide the object with itself.
        object.collisionBox.collideWith(npc);
      }
    }
    for (obj in this.scene.objects) {
      if (obj !== object) { // Ensure we don't collide the object with itself.
        object.collisionBox.collideWith(npc);
      }
    }
  }
  
  update() {
    this.player.update();
    for (npc in this.scene.npcs) {
      npc.update();
    }
    for (obj in this.scene.objects) {
      obj.update();
    }
  }
  
}
