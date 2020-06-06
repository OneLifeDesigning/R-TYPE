class Weapons {
  constructor(ctx, shooter) {
    this._ctx = ctx;

    this.shooter = shooter;
    this.shoots = []
    this.beams = []
    this.timer = ''
    this.beamLoad = new BeamLoad(
      this._ctx,
      this.shooter.x + this.shooter.w * 0.8,
      this.shooter.y + this.shooter.h * 0.2,
      IMG_SHOOT_BEAM_LOAD
    )
  }

  shoot() {
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
    return this.beams.push(
      new Beamshoot(
        this._ctx,
        this.shooter.x + this.shooter.w * 0.3,
        this.shooter.y + this.shooter.h * 0.05,
        damage
      )
    )
  }

  removeShoots() {
    this.shoots = this.shoots.filter(s => s.isVisible())
    this.beams = this.beams.filter(b => b.isVisible())
  }

  draw() {
    this.beamLoad.draw()
    this.shoots.forEach(s => s.draw())
    this.beams.forEach(b => b.draw())
  }

  move() {
    this.beamLoad.move(
      this.shooter.x + this.shooter.w * 0.8,
      this.shooter.y + this.shooter.h * 0.2
    )
    this.shoots.forEach(s => s.move())
    this.beams.forEach(b => b.move())
  }
}