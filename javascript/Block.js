class Block {

  constructor(GC, pos, size, color = "0x00f000", texturePath = "", behavior = function(obj) { return; } ) {
    this.GC = GC;
    this.pos = pos;
    this.vel = new Vector3D(0, 0, 0);
    this.size = size;
    this.color = color;
    this.collisionBox = new CollisionBox(this);
    this.texturePath = texturePath; // a file path leading to a texture
    this.behavior = behavior;
  }
  
  display() {
      this.collisionBox.cube.position.x = this.pos.x;
      this.collisionBox.cube.position.y = this.pos.y;
      this.collisionBox.cube.position.z = this.pos.z;
  }
  
  update() {
      this.display();
      this.behavior(this);
  }

}
