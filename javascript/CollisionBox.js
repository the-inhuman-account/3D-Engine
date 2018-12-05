class CollisionBox {

  constructor(parent) {
    // The collision box is from the center of the parent NPC and extends outward to make a box with dimension according to the size of the parent (x, y, z lengths).
    this.parent = parent; // The NPC for which the collision box is designed.
    this.uncollideAccuracy = 0.8; // Number between 0 and 1 for the factor by which the velocity is decreased until a measure is found that "unstucks" the objects.
    this.uncollideSteps = Math.ceil( Math.log(0.01) / Math.log(this.uncollideAccuracy) ); // 0.01 is chosen arbitrarily; it forces the program to check down to one one-hundredth of the velocity when unstucking.
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
  
  setUncollideAccuracy(value) {
    if (value > 1 || value < 0) {
      return;
    }
    this.uncollideAcurracy = value;
    this.uncollideSteps = Math.ceil( Math.log(0.01) / Math.log(this.uncollideAccuracy) );
  }
  
  isInside(other) {
    return CollisionBox.isInside(this.pos, this.size, other.pos, other.size);
  }
  
  collideWith(other) {
    if (!this.isInside(other)) {
      return false;
    }
    // Reposition the NPC such that it is no longer inside the other object.
    // Add parts of the negative of the NPC's velocity until the NPC are outside of each other.
    for (var i = 0, factor = 1, oldPos = this.pos, newPos; i < this.uncollideSteps; i++) {
      factor *= this.uncollideAccuracy;
      newPos = this.pos.getShifted(this.parent.vel.getScaled(factor));
      if (CollisionBox.isInside(newPos, this.size, other.pos, other.size)) {
        // If the new position is inside the object, then use the old position, which is the closest we'll get to correct.
        this.pos = oldPos;
        return;
      }
    }
    // If the velocity is so great that we cannot find a slow enough multiple, return false.
    return false;
  }

}
