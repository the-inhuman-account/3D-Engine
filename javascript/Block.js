class Block {

  constructor(GC, pos, size, texture) {
    this.GC = GC;
    this.pos = pos;
    this.size = size;
    this.collisionBox = new CollisionBox(this);
    this.texture = texture; // a file path leading to a texture
  }
  
  display() {
  }
  
  update() {
    this.display();
  }

}
