class Weapons {
  constructor(ctx, shooter) {
    this._ctx = ctx;

    this.shooter = shooter;
    this.shoots = []
    this.beams = []

    this.bullet = null

    this.timer = ''
    this.beamLoad = new BeamLoad(
      this._ctx,
      IMG_SHOOT_BEAM_LOAD,
      this.shooter.x + this.shooter.w * 0.8,
      this.shooter.y + this.shooter.h * 0.2
    )
  }

  shoot() {
    if (this.bullet) {
      this.shoots.push(this.bullet.shoot())
    }
    return this.shoots.push(
      new Shoot(
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
    return this.shoots.push(
      new Beamshoot(
        this._ctx,
        IMG_SHOOT_BEAM,
        this.shooter.x + this.shooter.w * 0.3,
        this.shooter.y + this.shooter.h * 0.05,
        damage
      )
    )
  }

  removeShoots() {
    this.shoots = this.shoots.filter(s => s.isVisible())
  }

  draw() {
    if (this.bullet) {
      this.bullet.draw()
    }
    this.beamLoad.draw()
    this.shoots.forEach(s => s.draw())
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

    this.shoots.forEach(s => s.move())
  }
}