class Vector3D {
  
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  
  static FromSpherical(theta, phi, radius) {
    return new Vector3D(Math.cos(phi)*Math.sin(theta), Math.cos(theta), Math.sin(phi)*Math.sin(theta)).getScaled(radius).getRotated(PI, new Vector3D(0, 1, 0));
  }
  
  clone() {
    return new Vector3D(this.x, this.y, this.z);
  }

  toThreeVector() {
      return new THREE.Vector3(this.x, this.y, this.z);
  }
  
  getMagnitude() {
    return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
  }
  getMagnitudeSquared() {
    return this.x*this.x + this.y*this.y + this.z*this.z;
  }
  
  getNormalized() {
    return this.clone().getScaled(1 / this.getMagnitude());
  }
  normalize() {
    this.scale(1 / this.getMagnitude());
  }
  
  set(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
  }

  getShifted(other) {
    return new Vector3D(this.x + other.x, this.y + other.y, this.z + other.z);
  }
  shift(other) {
    this.x += other.x;
    this.y += other.y;
    this.z += other.z;
  }
  
  getScaled(scalar) {
    return new Vector3D(scalar * this.x, scalar * this.y, scalar * this.z);
  }
  scale(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
  }
  
  getRotated(angle, axis) {
    // Quaternion rotation of an angle around an axis.
    var u = this.clone();
    var w = new Vector3D(0, 0, 0);
    var q0 = Math.cos(angle/2), q1 = Math.sin(angle/2) * axis.x, q2 = Math.sin(angle/2) * axis.y, q3 = Math.sin(angle/2) * axis.z;
    w.x = u.x*(q0*q0 + q1*q1 - q2*q2 - q3*q3) + u.y*(2*(q1*q2 - q0*q3)) + u.z*(2*(q1*q3 + q0*q2));
    w.y = u.x*(2*(q2*q1 + q0*q3)) + u.y*((q0*q0 - q1*q1 + q2*q2 - q3*q3)) + u.z*(2*(q2*q3 - q0*q1));
    w.z = u.x*(2*(q3*q1 - q0*q2)) + u.y*(2*(q3*q2 + q0*q1)) + u.z*(q0*q0 - q1*q1 - q2*q2 + q3*q3);
    
    return w;
  }
  rotate(angle, axis) {
    // Quaternion rotation of an angle around an axis.
    var u = this.clone();
    var cosine = Math.cos(angle/2), sine = Math.sin(angle/2);
    var q0 = cosine, q1 = sine * axis.x, q2 = sine * axis.y, q3 = sine * axis.z;
    this.x = u.x*(q0*q0 + q1*q1 - q2*q2 - q3*q3) + u.y*(2*(q1*q2 - q0*q3)) + u.z*(2*(q1*q3 + q0*q2));
    this.y = u.x*(2*(q2*q1 + q0*q3)) + u.y*((q0*q0 - q1*q1 + q2*q2 - q3*q3)) + u.z*(2*(q2*q3 - q0*q1));
    this.z = u.x*(2*(q3*q1 - q0*q2)) + u.y*(2*(q3*q2 + q0*q1)) + u.z*(q0*q0 - q1*q1 - q2*q2 + q3*q3);
  }
  
}

var UP = new Vector3D(0, 1, 0);
