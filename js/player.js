class Player {
  constructor(ctx) {
    this.ctx = ctx
    this.tick = 0

    this.x = ctx.canvas.width / 4
    this.y = ctx.canvas.height / 2

    this.w = 80
    this.h = 40

    this.vx = 0
    this.vy = 0
    this.ay = 0
    this.ax = 0

    this.img = new Image()
    this.img.src = IMG_PLAYER
    // NOTE: frame are number sprites
    this.img.frames = 5
    // NOTE: position actual "array"
    this.img.frameIndex = 2

    this._setListeners()

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

  isOut() {
    return this.y + this.h >= this.ctx.canvas.height
  }

  move() {
    this.vy += this.ay;
    this.vx += this.ax;

    this.y += this.vy;
    this.x += this.vx;
  }
  _animate(typeAnimation) {
    if (typeAnimation === 'up' && this.img.frameIndex < 4) {
      ++this.img.frameIndex
    }
    if (typeAnimation === 'down' && this.img.frameIndex > 0) {
      --this.img.frameIndex
    }
  }

  _setListeners() {
    document.addEventListener('keydown', e => {
      if (e.keyCode === KEY_UP) {
        this.ay = -0.2
        this._animate('down')
      } else if (e.keyCode === KEY_DOWN) {
        this.ay = +0.2
        this._animate('up')
      } else if (e.keyCode === KEY_RIGHT) {
        this.ax = 0.2
      } else if (e.keyCode === KEY_LEFT) {
        this.ax = -0.2
      }
    })

    document.addEventListener('keyup', e => {
      if (e.keyCode === KEY_UP || e.keyCode === KEY_DOWN) {
        this.vy = 0
        this.ay = 0
      } else if (e.keyCode === KEY_RIGHT || e.keyCode === KEY_LEFT) {
        this.vx = 0
        this.ax = 0
      }
    })
  }
}