class EnemyButterfly {
  constructor(ctx, y, img) {
    this._ctx = ctx

    this.x = ctx.canvas.width
    this.y = 60 + y

    this.w = ctx.canvas.width / 15
    this.h = (this.w / 4) * 3

    this.vx = -3
    this.vy = -2

    this.tick = 0
    this.tickMove = 0

    this.img = img

    // NOTE: frame are number sprites
    this.img.frames = 8
    // NOTE: position actual "array"
    this.img.frameIndex = 1
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

  move() {
    this.y += this.vy;
    this.x += this.vx;

    if (this.tickMove++ === 60 || this.y <= 60) {

      this.vy *= -1;
      this.tickMove = 0
    }
    if (this.tick++ === 15 && this.vx !== 0) {
      this._animate()
      this.tick = 0
    }
  }
  _animate() {
    if (this.img.frameIndex++ >= 7) {
      this.img.frameIndex = 0
    }
  }
}