class Beamshoot {
  constructor(ctx, x, y, damage) {
    this._ctx = ctx
    this.x = x
    this.y = y

    this.w = 16
    this.h = 16

    this.vx = 15
    this.r = 16

    this.damage = damage
  }

  draw() {
    this._ctx.beginPath();
    // TODO: draw circle
    this._ctx.fillStyle = "#f2f"
    this._ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
    this._ctx.fill()
    this._ctx.closePath()
  }

  move() {
    this.x += this.vx
  }

  isVisible() {
    return this._ctx.canvas.width > this.x
  }
}