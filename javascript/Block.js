class Block {

  constructor(GC, pos, size, color = "0x00f000", texturePath = "") {
    this.GC = GC;
    this.pos = pos;
    this.size = size;
    this.color = color;
    this.collisionBox = new CollisionBox(this);
    this.texturePath = texturePath; // a file path leading to a texture
  }
  
  update() {
  }

}
