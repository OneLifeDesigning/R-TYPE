class Player {
  constructor(ctx, img, imgMotor) {
    this._ctx = ctx
    this.tick = 0

    this.x = this._ctx.canvas.width / 4

    this._img = img
    this._imgM = imgMotor

    this.w = this._ctx.canvas.width / 14
    this.h = (this.w / 16) * 9

    this.y = (this._ctx.canvas.height / 2) - (this.h / 2)

    this.vx = 0
    this.vy = 0


    // NOTE: frame are number sprites
    this._img.frames = 5
    this._imgM.frames = 8
    // NOTE: position actual "array"
    this._img.frameIndex = 2
    this._imgM.frameIndex = 0

    this.supply = false
    this.lives = 3
    this.damage = 0
    this.healt = 0
    this.points = -100
    this.tick = 0
    this.tickRight = 0

  }

  draw() {
    this._ctx.drawImage(
      this._imgM,
      this._imgM.frameIndex * this._imgM.width / this._imgM.frames,
      0,
      this._imgM.width / this._imgM.frames,
      this._imgM.height,
      this.x - this.w + 16,
      this.y,
      this.w,
      this.h
    )
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
    this.y += this.vy
    this.x += this.vx

    if (this.vy >= 0 && this.vy !== 0) {
      this._animate('down')
      this._animateMotor('down')
    } else if (this.vy < 0 && this.vy !== 0) {
      this._animate('up')
      this._animateMotor('up')
    } else if (this.vx < 0 && this.vx !== 0) {
      this._animateMotor('left')
    } else if (this.vx > 0 && this.vx !== 0) {
      this._animateMotor('right')
    } else if (this.vy === 0 && this.vx === 0) {
      this._animate('default')
      this._animateMotor('default')
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
  respawn() {
    console.log('Im respawn now')
  }
  die() {
    if (this.lives-- < 1) {
      console.log('Game over')
      return true
    } else {
      this.respawn()
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
  _animateMotor(typeAnimation) {
    if (this.tick++ >= 10) {
      if ((typeAnimation === 'up' || typeAnimation === 'default' || typeAnimation === 'left') && this._imgM.frameIndex++ >= 5) {
        this._imgM.frameIndex = 4
      }
      if (typeAnimation === 'down' && this._imgM.frameIndex++ >= 7) {
        this._imgM.frameIndex = 6
      }
      if (typeAnimation === 'right' && this._imgM.frameIndex-- <= 0) {
        this._imgM.frameIndex = 4
      }
      this.tick = 0
    }
  }
  isSupply() {
    return this.supply
  }
}