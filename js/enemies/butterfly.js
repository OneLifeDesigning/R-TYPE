class EnemyButterfly {
  constructor(ctx, y, img, imgDie) {
    this._ctx = ctx

    this.x = ctx.canvas.width
    this.y = 60 + y

    this.w = ctx.canvas.width / 15
    this.h = (this.w / 4) * 3

    this.vx = -3
    this.vy = -2

    this.tick = 0
    this.tickMove = 0
    this.tickDie = 0

    this.img = img
    this.imgDie = imgDie

    this.healt = 10

    this.soteable = true
    this.collisable = true
    this.walker = false
    this.supply = false
    this.armory = false

    // NOTE: frame are number sprites
    this.img.frames = 8
    this.imgDie.frames = 7
    // NOTE: position actual "array"
    this.img.frameIndex = 1
    this.imgDie.frameIndex = 1
  }

  draw() {
    if (this.tickDie === 0) {
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
    } else {
      this._ctx.drawImage(
        this.imgDie,
        this.imgDie.frameIndex * this.imgDie.width / this.imgDie.frames,
        0,
        this.imgDie.width / this.imgDie.frames,
        this.imgDie.height,
        this.x,
        this.y,
        this.w,
        this.h
      )
    }
  }

  clear() {
    this._ctx.clearRect(this.x, this.y, this.w, this.h)
  }

  move() {
    this.y += this.vy;
    this.x += this.vx;

    if (this.tickDie === 0) {
      if (this.tickMove++ === 60 || this.y <= 60) {
        this.vy *= -1;
        this.tickMove = 0
      }
      if (this.tick++ === 15 && this.vx !== 0) {
        this._animate()
        this.tick = 0
      }
    } else {
      if (this.tickDie++ >= 8) {
        this._animateDie()
        this.tickDie = 1
      }
    }
  }

  isVisible() {
    return this.x + this.w >= 0
  }

  isCollisable() {
    return this.collisable
  }

  isSupply() {
    return this.supply
  }

  isArmory() {
    return this.armory
  }

  isWallker() {
    return this.walker
  }

  isShooteable() {
    return this.soteable
  }

  stop() {
    this.vx = 0
    this.vy = 0
    this.imgDie.frameIndex = 0
  }

  die() {
    this.vy = 0.4
    this.xy = 0.04

    this.collisable = false
    this.tickDie = 1

    setTimeout(() => {
      this.x = -this.w * 2
    }, 350)
  }

  _animate() {
    if (this.img.frameIndex++ >= 7) {
      this.img.frameIndex = 0
    }
  }

  _animateDie() {
    if (this.imgDie.frameIndex++ >= 6) {
      this.imgDie.frameIndex = 0
    }
  }

}