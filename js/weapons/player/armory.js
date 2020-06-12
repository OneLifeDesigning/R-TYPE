class Armory {
  constructor(ctx, img, x, y) {
    this._ctx = ctx
    this.x = x
    this.y = y

    this.w = ctx.canvas.width / 16
    this.h = (this.w / 4) * 3

    this.img = img

    this.vx = GLOBAL_SPEED_X * -1
    this.vy = 0

    this.params = ['collisable', 'armory']

    // NOTE: frame are number sprites
    this.img.frames = 1
    // NOTE: position actual "array"
    this.img.frameIndex = 0
  }

  draw() {
    this._ctx.drawImage(
      this.img,
      0,
      0,
      this.img.width / this.img.frames,
      this.img.height,
      this.x,
      this.y,
      this.w,
      this.h
    )
  }

  die() {
    this.params.push('die')
    this.x = 0 - this.w
  }

  move() {
    this.x += this.vx
  }

  isVisible() {
    return this.x + this.w >= 0
  }

  is(value) {
    return this.params.includes(value)
  }
}