class Weapons {
  constructor(ctx, Shooter) {
    this._ctx = ctx

    this.shooter = Shooter
    this.shots = []
    this.beams = []

    this.bullet = null

    this.timer = ''
    this.beamLoad = new BeamLoad(
      this._ctx,
      IMG_SHOT_BEAM_LOAD,
      this.shooter.x + this.shooter.w * 0.8,
      this.shooter.y + this.shooter.h * 0.2
    )
  }

  shot() {
    if (this.bullet) {
      this.shots.push(this.bullet.shot())
    }
    return this.shots.push(
      new Shot(
        this._ctx,
        this.shooter.x + this.shooter.w * 0.8,
        this.shooter.y + this.shooter.h * 0.3
      )
    )
  }

  beamLoadShow() {
    this.beamLoad.play()
  }

  beamLoadStop() {
    this.beamLoad.stop()
  }

  beam(damage) {
    return this.shots.push(
      new BeamShot(
        this._ctx,
        IMG_SHOT_BEAM,
        this.shooter.x + this.shooter.w * 0.3,
        this.shooter.y + this.shooter.h * 0.05,
        damage
      )
    )
  }

  removeShots() {
    this.shots = this.shots.filter(s => s.isVisible())
  }

  draw() {
    if (this.bullet) {
      this.bullet.draw()
    }
    this.beamLoad.draw()
    this.shots.forEach(s => s.draw())
  }

  move() {
    if (this.bullet) {
      this.bullet.move(
        this.shooter.x + (this.shooter.w * 0.95),
        this.shooter.y + (this.shooter.h * 0.2)
      )
    }

    this.beamLoad.move(
      this.shooter.x + this.shooter.w * 0.8,
      this.shooter.y + this.shooter.h * 0.2
    )

    this.shots.forEach(s => s.move())
  }
}