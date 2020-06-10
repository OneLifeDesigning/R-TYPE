class Shoot {
  constructor(ctx, x, y) {
    this._ctx = ctx
    this.x = x
    this.y = y

    this.w = this._ctx.canvas.width / 43
    this.h = (this.w / 4) * 3

    this.img = new Image()
    this.img.src = './img/sprites/weapon-shoot.png'

    this.tick = 0
    this.damage = 10

    // NOTE: frame are number sprites
    this.img.frames = 3
    // NOTE: position actual "array"
    this.img.frameIndex = 0

    this.vx = 10

    this.collisable = true

  }

  draw() {
    this._ctx.drawImage(
      this.img,
      this.img.frameIndex * this.img.width / this.img.frames,
      0,
      this.img.width / this.img.frames,
      this.img.height,
      this.x,
      this.y,
      this.w,
      this.h
    )
  }

  _animate() {
    if (this.img.frameIndex <= 1) {
      this.img.frameIndex++
    }
  }

  move() {
    this.x += this.vx
    if (this.tick++ === 1) {
      this._animate()
      this.tick = 0
    }
  }

  isVisible() {
    return this.x <= this._ctx.canvas.width
  }

  isCollisable() {
    return this.collisable

  }
}