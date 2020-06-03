class Player {
  constructor(ctx) {
    this.ctx = ctx
    this.tick = 0

    this.x = ctx.canvas.width / 4
    this.y = ctx.canvas.height / 2

    this.w = ctx.canvas.width / 15
    this.h = (this.w / 16) * 9

    this.vx = 0
    this.vy = 0

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
  // TODO: Check if out
  // isOut() {
  //   return this.y + this.h >= this.ctx.canvas.height
  // }

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

  }
  _animate(typeAnimation) {
    if (typeAnimation === 'up' && this.img.frameIndex < 4) {
      ++this.img.frameIndex
    }
    if (typeAnimation === 'down' && this.img.frameIndex > 0) {
      --this.img.frameIndex
    }
    if (typeAnimation === 'default' && this.img.frameIndex >= 0 && this.img.frameIndex < 3) {
      ++this.img.frameIndex
    }
    if (typeAnimation === 'default' && this.img.frameIndex <= 4 && this.img.frameIndex > 2) {
      --this.img.frameIndex
    }
  }

  _setListeners() {
    document.addEventListener('keydown', e => {
      if (e.keyCode === KEY_UP) {
        this.vy = -1.6
      } else if (e.keyCode === KEY_DOWN) {
        this.vy = +1.6
      } else if (e.keyCode === KEY_RIGHT) {
        this.vx = 1.6
      } else if (e.keyCode === KEY_LEFT) {
        this.vx = -1.6
      }
    })

    document.addEventListener('keyup', e => {
      if (e.keyCode === KEY_UP || e.keyCode === KEY_DOWN) {
        this.vy = 0
      } else if (e.keyCode === KEY_RIGHT && this.vx > 0) {
        this.vx = 0
      } else if (e.keyCode === KEY_LEFT && this.vx < 0) {
        this.vx = 0
      }
    })
  }
}