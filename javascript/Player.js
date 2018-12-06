class Player extends NPC {

    constructor(GC, pos, size, texturePath, controls) {
        super(GC, pos, size, texturePath);
        this.controls = controls;
    }

    updateControls() {
        // Update position.
        if (this.controls.moveUp) this.vel.z += this.speed * GC.delta;
        if (this.controls.moveDown) this.vel.z -= this.speed * GC.delta;
        if (this.controls.moveForward) this.vel.y += this.speed * GC.delta;
        if (this.controls.moveBackward) this.vel.y -= this.speed * GC.delta;
        if (this.controls.moveLeft) this.vel.x -= this.speed * GC.delta;
        if (this.controls.moveRight) this.vel.x += this.speed * GC.delta;
        // Update orientation.
        this.controls.lat += this.controls.mouseX * this.controls.lookSpeed * GC.delta;
        this.controls.lon -= this.controls.mouseY * this.controls.lookSpeed * GC.delta;
        this.controls.phi = (90 - this.lat) * PI/180;
        this.controls.theta = this.lon * PI/180;
    }
    
    physics() {
        // this.updateControls();
        this.controls.update(this.GC.delta);
        // this.vel.z += PHYSICS.GRAVITY * GC.delta;
        this.vel.scale(PHYSICS.FRICTION);
        this.pos.shift(this.vel.getScaled(GC.delta));
        this.GC.checkCollision(this);

        // this.controls.object.translateX(this.vel.x * GC.delta);
        // this.controls.object.translateY(this.vel.y * GC.delta);
        // this.controls.object.translateZ(this.vel.z * GC.delta);
        // this.controls.object.lookAt(this.pos.getShifted(Vector3D.FromSpherical(
        //     this.controls.phi, this.controls.theta, 100
        // )).toThreeVector());
    }

    update() {
        this.physics();
    }

}
