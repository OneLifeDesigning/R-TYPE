class BgPlanet {
  constructor(ctx, img) {
    this._ctx = ctx

    this.x = this._ctx.canvas.width
    this.y = 0

    this.vx = GLOBAL_SPEED_X / -8


    this.w = this._ctx.canvas.width
    this.h = this._ctx.canvas.height

    this._img = img

    this.collisable = false
  }

  draw() {
    ctx.drawImage(
      this._img,
      this.x,
      this.y,
      this.w,
      this.h
    )

  }

  move() {
    this.x += this.vx
  }

  isVisible() {
    return this.x + this.w >= 0
  }
}