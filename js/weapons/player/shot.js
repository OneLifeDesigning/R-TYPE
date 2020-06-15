class Shot {
  constructor(ctx, x, y) {
    this._ctx = ctx
    this.x = x
    this.y = y
    this.type = 'shotPlayer'
    this.w = this._ctx.canvas.width / 43
    this.h = (this.w / 4) * 3

    this.img = new Image()
    this.img.src = './img/sprites/weapon-shot.png'

    this.tick = 0

    this.healt = 0

    this.damage = 10

    // NOTE: frame are number sprites
    this.img.frames = 3
    // NOTE: position actual "array"
    this.img.frameIndex = 0

    this.vx = 10
    this.vy = 0

    this.params = ['collisable', 'shot', 'shotPlayer']

  }

  die() {
    if (this.params.indexOf('die') === -1) {
      this.params.push('die')
    }
    this.params = this.params.filter(param => param !== 'collisable')
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

  isVisible() {
    return this.x + this.w >= 0 && this.x + this.w <= this._ctx.canvas.width
  }

  _animate() {
    if (this.img.frameIndex <= 1) {
      this.img.frameIndex++
    }
  }

  move() {
    this.x += this.vx

    if (this.tick++ === 2) {
      this._animate()
      this.tick = 0
    }
    if (this.x >= this._ctx.canvas.width + this.w || this.x <= 0 - this.w || this.y >= this._ctx.canvas.height + this.h || this.Y <= 0 - this.h) {
      this.die()
    }
  }

  is(value) {
    return this.params.includes(value)
  }
}