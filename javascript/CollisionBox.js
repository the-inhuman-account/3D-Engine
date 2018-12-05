class CollisionBox {

  constructor(parent) {
    // The collision box is from the center of the parent NPC and extends outward to make a box with dimension according to the size of the parent (x, y, z lengths).
    this.parent = parent; // The object for which the collision box is designed. Whatever it is, it needs two things: a pos vector and a size vector.
    this.uncollideSteps = 10; // The steps the CollisionBox will binary search to correctly "unstuck" the object.
  }
  
  static isInside(aPos, aSize, bPos, bSize) {
    var pos = aPos, size = aSize,
        otherPos = bPos, otherSize = bSize;
    return pos.x + size.x/2 > otherPos.x - otherSize.x/2 && pos.x - size.x/2 < otherPos.x + otherSize.x/2 && // x-axis
           pos.y + size.y/2 > otherPos.y - otherSize.y/2 && pos.y - size.y/2 < otherPos.y + otherSize.y/2 && // y-axis
           pos.z + size.z/2 > otherPos.z - otherSize.z/2 && pos.z - size.z/2 < otherPos.z + otherSize.z/2;   // z-axis
  }
  
  get pos() {
    return this.parent.pos;
  }
  
  get size() {
    return this.parent.size;
  }
  
  isInside(other) {
    return CollisionBox.isInside(this.pos, this.size, other.pos, other.size);
  }
  
  collideWith(other) {
    if (!this.isInside(other)) {
      return false;
    }
    // Reposition the NPC such that it is no longer inside the other object.
    // Binary search the optimal distance to extract it: more than nothing, less than the entire negative velocity.
    var high = 0, low = -1, mid, i;
    for (i = 0; i < this.uncollideSteps; i++) {
      mid = (high + low) / 2;
      if (CollisionBox.isInside(this.pos.getShifted( this.parent.vel.getScaled(mid) ), this.size, other.pos, other.size)) {
        high = mid; // If the middle box is still inside, then the box needs to go out farther.
      }
      else {
        low = mid; // If the middle box is still inside, then the box needs to go out less.
      }
    }
    this.pos.shift( this.parent.vel.getScaled( low ) );
  }

}
