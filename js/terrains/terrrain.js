class Terrain {
  constructor(ctx, img, positionX, isTop) {
    this._ctx = ctx
    this._img = img

    this.w = this._ctx.canvas.width / 6
    this.h = this.w / this._img.width * this._img.height

    this.x = this._ctx.canvas.width + (this.w * positionX)

    this.y = this._ctx.canvas.height - this.h
    this.isTop = isTop
    this.vx = -2
  }


  draw(ctx) {
    if (this._img.src) {
      if (this.isTop === 0) {
        ctx.drawImage(this._img, this.x, this.y, this.w, this.h);
      } else {
        ctx.save()
        ctx.scale(1, -1);
        ctx.drawImage(this._img, this.x, 0, this.w, -this.h);
        ctx.restore();
      }
    }
  }

  move() {
    this.x += this.vx
  }

  isVisible() {
    return this.x + this.w >= 0
  }
}