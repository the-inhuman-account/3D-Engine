class NPC {

  constructor(GC, pos, size, color = "0xb0b000", texturePath = "") {
    this.GC = GC; // the GameController
    this.pos = pos;
    this.vel = new Vector3D(0, 0, 0);
    this.speed = 1;
    this.size = size; // Vector3D corresponding to the width, height, and length of the NPC. This doesn't rotate with the player, so it needs to be extra bulky.
    this.color = color;
    this.collisionBox = new CollisionBox(this);
    this.texturePath = texturePath; // file path for the texture image
    this.prevTime = performance.now();
  }

  display() {
      this.collisionBox.display();
  }

  physics() {
    this.vel.y += PHYSICS.GRAVITY * GC.delta;
    this.vel.x *= PHYSICS.FRICTION;
    this.vel.z *= PHYSICS.FRICTION;
    this.vel.y *= PHYSICS.AIR_RESISTANCE;
    this.pos.shift(this.vel.getScaled(GC.delta));
    this.GC.checkCollision(this);
  }
  
  update() {
    this.physics();
    this.display();
  }

}
