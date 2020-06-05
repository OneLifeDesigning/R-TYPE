class Player {
  constructor(ctx) {
    this.ctx = ctx
    this.tick = 0

    this.x = this.ctx.canvas.width / 4

    this._img = new Image()
    this._img.src = IMG_PLAYER

    this.w = this.ctx.canvas.width / 15
    this.h = (this.w / 16) * 9

    this.y = (this.ctx.canvas.height / 2) - (this.h / 2)

    this.vx = 0
    this.vy = 0

    // NOTE: frame are number sprites
    this._img.frames = 5
    // NOTE: position actual "array"
    this._img.frameIndex = 2

    this._setListeners()

  }

  draw() {
    this.ctx.drawImage(
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
  _shoot() {

  }
  _beam() {}
  _setListeners() {
    document.addEventListener('keydown', e => {
      if (e.keyCode === KEY_CTRL || e.keyCode === KEY_CMD) {
        this.timer = setInterval(function () {
          console.log('Down key held');
        }, 300);
      }
      if (e.keyCode === KEY_UP) {
        this.vy = -2
      } else if (e.keyCode === KEY_DOWN) {
        this.vy = +2
      } else if (e.keyCode === KEY_RIGHT) {
        this.vx = 2
      } else if (e.keyCode === KEY_LEFT) {
        this.vx = -2
      }
    })

    document.addEventListener('keyup', e => {
      if (e.keyCode === KEY_CTRL || e.keyCode === KEY_CMD) {
        clearInterval(this.timer);
        console.log('Down key pressed');
      }
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