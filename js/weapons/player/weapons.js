class Weapons {
  constructor(ctx, shooter) {
    this._ctx = ctx;
    this.shooter = shooter;
    this.shoots = []
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

  // beamX(damage) {
  //   return this.shoots.push(
  //     new Beamshoot(
  //       this._ctx,
  //       this.shooter.x + this.shooter.w * 0.8,
  //       this.shooter.y + this.shooter.h * 0.9,
  //       IMG_WEAPON_SHOOT,
  //       this.damage = damage
  //     )
  //   )
  // }

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