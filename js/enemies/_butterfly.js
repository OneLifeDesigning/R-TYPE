class EnemyButterFly {
  constructor(ctx, y) {
    this.ctx = ctx

    this.x = ctx.canvas.width
    this.y = y

    this.w = ctx.canvas.width / 15
    this.h = (this.w / 16) * 9

    this.vx = -3
    this.vy = 0
    this.tick = 0

    this.img = new Image()
    this.img.src = '../img/sprites/enemy-butterfly.png'
    // NOTE: frame are number sprites
    this.img.frames = 6
    // NOTE: position actual "array"
    this.img.frameIndex = 1
  }

  draw() {
    this.ctx.drawImage(
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

    if (this.tick++ === 15 && this.vx !== 0) {
      this._animate()
      this.tick = 0
    }
  }
  _animate() {
    if (this.img.frameIndex++ >= 5) {
      this.img.frameIndex = 0
    }
  }
}