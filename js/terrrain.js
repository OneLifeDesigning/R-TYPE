class TerrainBottom {
  constructor(ctx, src, position) {
    this._ctx = ctx
    this.x = this._ctx.canvas.width
    this.y = this._ctx.canvas.height - 33

    this._img = new Image()
    this._img.src = src

    this.w = this._img.width / 6 * position
    this.h = 33

    this.vx = -2
  }

  draw() {
    this._ctx.drawImage(
      this._img,
      this.x,
      this.y,
      this.w,
      this.h
    );
  }

  move() {
    this.x += this.vx
  }
}