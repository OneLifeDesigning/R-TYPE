class Terrain {
  constructor(ctx, img, positionX, positionY) {
    this._ctx = ctx
    this._img = img

    this.w = this._ctx.canvas.width / 6
    this.h = this.w / this._img.width * this._img.height

    this.x = this._ctx.canvas.width + (this.w * positionX)

    this.y = positionY

    this.vx = -2
  }


  draw(ctx) {
    if (this._img.src) {
      if (this.y !== 0) {
        ctx.drawImage(this._img, this.x, this.y - this.h, this.w, this.h);
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