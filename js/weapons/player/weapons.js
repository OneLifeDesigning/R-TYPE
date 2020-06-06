class Weapons {
  constructor(ctx, shooter) {
    this._ctx = ctx;
    this.shooter = shooter;
    this.shoots = []
    this.timeInt = 0
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

  beamLoad(status, damage) {
    this.beamChargin = new BeamLoad(
      this._ctx,
      this.shooter.x + this.shooter.w * 0.6,
      this.shooter.y
    )
    if (status === 0) {
      this.timeInt = clearInterval()
      this.beamChargin.clear()
      this.beam(damage)
    } else {
      this.timeInt = setInterval(() => {
        this.beamChargin.draw()
        this.beamChargin.move(
          this.shooter.x + this.shooter.w * 0.8,
          this.shooter.y - this.shooter.h * 0.1
        )
      }, 1000 / 60);
    }
  }

  beam(damage) {
    return this.shoots.push(
      new Beamshoot(
        this._ctx,
        this.shooter.x + this.shooter.w * 0.8,
        this.shooter.y - this.shooter.h * 0.1,
        damage
      )
    )
  }

  removeShoots() {
    this.shoots = this.shoots.filter(b => b.isVisible())
  }

  draw() {
    this.shoots.forEach(b => b.draw())
  }

  move() {
    this.shoots.forEach(b => b.move())
  }
}