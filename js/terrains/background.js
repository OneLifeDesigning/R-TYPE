class Bg {
  constructor(ctx, img) {
    this._ctx = ctx

    this.x = 0
    this.y = 0

    this.vx = -2

    this.ax = 0

    this.w = this._ctx.canvas.width
    this.h = this._ctx.canvas.height

    this._img = img
  }

  draw() {
    ctx.drawImage(
      this._img,
      this.x,
      this.y,
      this.w,
      this.h
    );

    ctx.drawImage(
      this._img,
      this.x + this.w,
      this.y,
      this.w,
      this.h
    );

  }

  move() {
    this.vx += this.ax

    this.x += this.vx

    if (this.x + this.w <= 0) {
      this.x = 0
    }
  }
}