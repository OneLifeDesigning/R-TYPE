class Weapon {
  constructor(ctx, shooter) {
    this._ctx = ctx

    this.shooter = shooter

    this.timer = ''

    this.beamLoad = new BeamLoad(
      this._ctx,
      IMG_SHOT_BEAM_LOAD,
      this.shooter.x + this.shooter.w * 0.8,
      this.shooter.y + this.shooter.h * 0.2
    )
  }

  shot() {
    return new Shot(
      this._ctx,
      this.shooter.x + this.shooter.w * 0.8,
      this.shooter.y + this.shooter.h * 0.3
    )
  }

  beamLoadShow() {
    this.beamLoad.play()
  }

  beamLoadStop() {
    this.beamLoad.stop()
  }

  beam(damage) {
    return new BeamShot(
      this._ctx,
      IMG_SHOT_BEAM,
      this.shooter.x + this.shooter.w * 0.3,
      this.shooter.y + this.shooter.h * 0.05,
      damage
    )
  }

  draw() {
    this.beamLoad.draw()
  }

  move() {
    this.beamLoad.move(
      this.shooter.x + this.shooter.w * 0.8,
      this.shooter.y + this.shooter.h * 0.2
    )
  }
}