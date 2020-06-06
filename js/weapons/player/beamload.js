class BeamLoad extends Shoot {
  constructor(ctx, x, y) {
    super(ctx, x, y)

    this.w = this._ctx.canvas.width / 16
    this.h = (this.w / 4) * 3

    this.img = new Image()
    this.img.src = './img/sprites/weapon-beam-load.png'

    this.tick = 0

    // NOTE: frame are number sprites
    this.img.frames = 8
    // NOTE: position actual "array"
    this.img.frameIndex = 0
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
    if (this.tick++ >= 15) {
      this._animate()
      this.tick = 0
    }
  }
  _animate() {
    if (this.img.frameIndex++ >= 7 && this.img.frameIndex <= 10) {
      this.img.frameIndex = 0
    }
  }
  clear() {
    this.img.frameIndex = 10
  }

}