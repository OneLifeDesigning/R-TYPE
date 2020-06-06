class Player {
  constructor(ctx, img) {
    this._ctx = ctx
    this.tick = 0

    this.x = this._ctx.canvas.width / 4

    this._img = img

    this.w = this._ctx.canvas.width / 15
    this.h = (this.w / 16) * 9

    this.y = (this._ctx.canvas.height / 2) - (this.h / 2)

    this.vx = 0
    this.vy = 0

    // NOTE: frame are number sprites
    this._img.frames = 5
    // NOTE: position actual "array"
    this._img.frameIndex = 2

    this.weapon = new Weapons(this._ctx, this)

    this.lives = 3

    this.damage = 0

    this._setListeners()

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
    // this.weapon.removeShoots()
    this.weapon.draw()
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
    this.weapon.move()
  }

  die() {
    // TODO
    console.log('Una vida menos');
    this.x -= this.w
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

  _setListeners() {
    document.addEventListener('keydown', e => {
      if (e.keyCode === KEY_CTRL || e.keyCode === KEY_CMD) {
        this.weapon.shoot()
        this.timer = setInterval(() => {
          this.weapon.beamLoadShow()
          if (this.damage < 100) {
            this.damage += 10
          }
        }, 200);
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
        this.weapon.beamLoadStop()
        if (this.damage >= 10) {
          this.weapon.beam(this.damage)
        }
        this.damage = 0
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