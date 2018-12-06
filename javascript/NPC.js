class NPC {

  constructor(GC, pos, size, texturePath) {
    this.GC = GC; // the GameController
    this.pos = pos;
    this.vel = new Vector3D(0, 0, 0);
    this.speed = 1;
    this.size = size; // Vector3D corresponding to the width, height, and length of the NPC. This doesn't rotate with the player, so it needs to be extra bulky.
    this.collisionBox = new CollisionBox(this);
    this.texturePath = texturePath; // file path for the texture image
    this.prevTime = performance.now();
  }

  display() {
      this.GC.box(this.pos, this.size, this.texturePath);
  }
  
  physics() {
    this.vel.z += PHYSICS.GRAVITY * GC.delta;
    this.vel.scale(PHYSICS.FRICTION);
    this.pos.shift(this.vel.getScaled(GC.delta));
    this.GC.checkCollision(this);
  }
  
  update() {
    this.physics();
    this.display();
  }

}
