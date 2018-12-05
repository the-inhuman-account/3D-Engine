class CollisionBox {

  constructor(parent) {
    // The collision box is from the center of the parent NPC and extends outward to make a box with dimension according to the size of the parent (x, y, z lengths).
    this.parent = parent; // The NPC for which the collision box is designed.
  }
  
  get pos() {
    return this.parent.pos;
  }
  
  get size() {
    return this.parent.size;
  }
  
  isInside(other) {
    var pos = this.pos, size = this.size,
        otherPos = other.pos, otherSize = other.size;
    return pos.x + size.x/2 > otherPos.x - otherSize.x/2 && pos.x - size.x/2 < otherPos.x + otherSize.x/2 && // x-axis
           pos.y + size.y/2 > otherPos.y - otherSize.y/2 && pos.y - size.y/2 < otherPos.y + otherSize.y/2 && // y-axis
           pos.z + size.z/2 > otherPos.z - otherSize.z/2 && pos.z - size.z/2 < otherPos.z + otherSize.z/2;   // z-axis
  }

}
