class Terrain {
  constructor(ctx, img, positionX, isTop) {
    this._ctx = ctx
    this._img = img

    this.w = this._ctx.canvas.width / 6
    this.h = this.w / this._img.width * this._img.height

    this.x = this._ctx.canvas.width + (this.w * positionX)

    this.y = this._ctx.canvas.height - this.h

    this.isTop = isTop

    this.vx = GLOBAL_SPEED_X * -2

    this.params = ['collisable', 'terrain']

    this.collisable = false
  }


  draw() {
    if (this._img.src) {
      if (!this.isTop) {
        this._ctx.drawImage(this._img, this.x, this.y, this.w, this.h)
      } else {
        this._ctx.save()
        this._ctx.scale(1, -1)
        this._ctx.drawImage(this._img, this.x, 0, this.w, -this.h)
        this._ctx.restore()
      }
    }
  }

  move() {
    if (this.isTop) {
      this.y = 0
    }
    this.x += this.vx
  }

  isVisible() {
    return this.x + this.w >= 0
  }

  is(value) {
    return this.params.includes(value)
  }

}