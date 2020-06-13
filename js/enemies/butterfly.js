class EnemyButterfly {
  constructor(ctx, y, img, imgDie) {
    this._ctx = ctx

    this.x = ctx.canvas.width
    this.y = 60 + y

    this.w = ctx.canvas.width / 15
    this.h = (this.w / 4) * 3

    this.vx = GLOBAL_SPEED_X * -3
    this.vy = GLOBAL_SPEED_X * -2

    this.tick = 0
    this.tickMove = 0
    this.tickDie = 0

    this.img = img
    this.imgDie = imgDie

    this.healt = 10
    this.damage = 10

    this.points = 100

    this.params = ['flyer', 'killable', 'collisable', 'shooter']

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
    this.y += this.vy
    this.x += this.vx

    if (this.tickDie === 0) {
      if (this.tickMove++ === 60 || this.y <= 60) {
        this.vy *= -1
        this.tickMove = 0
      }
      if (this.tick++ === 15 && this.vx !== 0) {
        this._animate()
        this.tick = 0
      }
    } else {
      if (this.tickDie++ >= 6) {
        this._animateDie()
        this.tickDie = 1
      }
    }
  }

  isVisible() {
    return this.x + this.w >= 0
  }

  is(value) {
    return this.params.includes(value)
  }

  shotEnemy(enemy, player) {
    return new EnemiesShot(
      this._ctx,
      enemy,
      player
    )
  }

  die() {
    this.tickDie = 1
    this.params = this.params.filter(param => param !== 'killable')
    this.params = this.params.filter(param => param !== 'collisable')
    this.vy = 0.4
    this.xy = 0.04
    setTimeout(() => {
      if (this.params.indexOf('die') === -1) {
        this.params.push('die')
      }
      this.x = 0 - this.w * 100
      this.vx = 0
    }, 320)
  }

  _animate() {
    if (this.img.frameIndex++ >= 7) {
      this.img.frameIndex = 0
    }
  }

  _animateDie() {
    if (this.imgDie.frameIndex++ >= 6) {
      this.imgDie.frameIndex = 7
    }
  }

}