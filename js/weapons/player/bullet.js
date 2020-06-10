class Bullet {
  constructor(ctx, player, img) {
    this._ctx = ctx;

    this._player = player;
    this.x = this._player.x + this._player.w * 0.95
    this.y = this._player.y + this._player.h * 0.2

    this.w = ctx.canvas.width / 22
    this.h = (this.w / 4) * 3

    this.vx = 0
    this.vy = 0

    this.img = img

    this.shoots = []

    this.tickAnimation = 0
    this.tickFixed = 0
    this.damage = 10

    // NOTE: frame are number sprites
    this.img.frames = 6
    // NOTE: position actual "array"
    this.img.frameIndex = 0

    this.collisable = true
  }

  shoot() {
    return this.shoots.push(
      new Shoot(
        this._ctx,
        this.x + this.w * 0.8,
        this.y + this.h * 0.3
      )
    )
  }

  isCollisable() {
    return this.collisable
  }

  draw() {
    if (this.tickFixed === 0) {
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
    } else {
      this._ctx.drawImage(
        this.imgDie,
        this.imgDie.frameIndex * this.imgDie.width / this.imgDie.frames,
        0,
        this.imgDie.width / this.imgDie.frames,
        this.imgDie.height,
        this.x,
        this.y,
        this.w,
        this.h
      )
    }
    this.shoots.forEach(s => s.draw())
  }

  removeShoots() {
    this.shoots = this.shoots.filter(s => s.isVisible())
  }

  move(x, y) {
    if (this.tickFixed === 0) {
      this.x += this.vx
      this.y += this.vy
    } else {
      this.x = x
      this.y = y
    }

    if (this.tickAnimation++ === 15) {
      this._animate()
      this.tickAnimation = 0
    }
    this.shoots.forEach(s => s.move())
  }

  _animate() {
    if (this.img.frameIndex++ >= 5) {
      this.img.frameIndex = 0
    }
  }
}