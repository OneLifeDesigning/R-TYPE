class BeamLoad {
  constructor(ctx, x, y, img) {
    this._ctx = ctx
    this.x = x
    this.y = y

    this.w = this._ctx.canvas.width / 24
    this.h = (this.w / 4) * 3

    this.img = img

    this.tick = 0

    this.timer = 0
    // NOTE: frame are number sprites
    this.img.frames = 8
    // NOTE: position actual "array"
    this.img.frameIndex = 10
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

  move(x, y) {
    this.x = x
    this.y = y
    this.timer = setInterval(() => {
      if (this.tick++ >= 10 && this.img.frameIndex !== 10) {
        this._animate()
        this.tick = 0
      }
    }, 200)
  }

  play() {
    this.img.frameIndex = 0
  }
  stop() {
    this.img.frameIndex = 10
    setTimeout(() => {
      clearInterval(this.timer);
      this.timer = 0;
    }, 1000);
  }
  _animate() {
    if (this.img.frameIndex++ >= 7) {
      this.img.frameIndex = 3
    }
  }

}