class Player {
  constructor(ctx, img) {
    this._ctx = ctx
    this.tick = 0

    this.x = this._ctx.canvas.width / 4

    this._img = img

    this.w = this._ctx.canvas.width / 12
    this.h = (this.w / 16) * 9

    this.y = (this._ctx.canvas.height / 2) - (this.h / 2)

    this.vx = 0
    this.vy = 0

    // NOTE: frame are number sprites
    this._img.frames = 5
    // NOTE: position actual "array"
    this._img.frameIndex = 2

    this.lives = 3

    this.damage = 0

    this.timer = null

  }

  draw() {
    this._ctx.drawImage(
      this._img,
      this._img.frameIndex * this._img.width / this._img.frames,
      0,
      this._img.width / this._img.frames,
      this._img.height,
      this.x,
      this.y,
      this.w,
      this.h
    )
  }

  move() {
    this.y += this.vy;
    this.x += this.vx;

    if (this.vy >= 0 && this.vy !== 0) {
      this._animate('down')
    } else if (this.vy <= 0 && this.vy !== 0) {
      this._animate('up')
    } else if (this.vy === 0) {
      this._animate('default')
    }
    if (this.y + this.h >= this._ctx.canvas.height) {
      this.y = this._ctx.canvas.height - this.h
    }
    if (this.y <= 0) {
      this.y = 0
    }
    if (this.x <= 0) {
      this.vx = 0
      this.x = 0
    }
    if (this.x >= this._ctx.canvas.width - this.w) {
      this.vx = 0
      this.x = this._ctx.canvas.width - this.w
    }

  }

  die() {
    // TODO
    console.log('Una vida menos');
    this.lives -= 1
  }

  _animate(typeAnimation) {
    if (typeAnimation === 'up' && this._img.frameIndex < 4) {
      ++this._img.frameIndex
    }
    if (typeAnimation === 'down' && this._img.frameIndex > 0) {
      --this._img.frameIndex
    }
    if (typeAnimation === 'default' && this._img.frameIndex >= 0 && this._img.frameIndex < 3) {
      ++this._img.frameIndex
    }
    if (typeAnimation === 'default' && this._img.frameIndex <= 4 && this._img.frameIndex > 2) {
      --this._img.frameIndex
    }
  }
}