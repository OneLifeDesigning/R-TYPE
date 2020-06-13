class EnemySupply {
  constructor(ctx, y, img, imgDie, isAShooter) {
    this._ctx = ctx

    this.x = ctx.canvas.width
    this.y = y

    this.w = ctx.canvas.width / 10
    this.h = (this.w / 4) * 3

    this.vx = GLOBAL_SPEED_X * -1.5
    this.vy = 0.9

    this.tickFly = 1
    this.tickWalk = 0
    this.tickMove = 0
    this.tickDie = 0

    this.healt = 10
    this.damage = 10

    this.img = img
    this.imgDie = imgDie

    this.params = ['killable', 'collisable', 'walker', 'supply']

    this.points = 0

    // NOTE: frame are number sprites
    this.img.frames = 8
    this.imgDie.frames = 7
    // NOTE: position actual "array"
    this.img.frameIndex = 0
    this.imgDie.frameIndex = 0
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

    if (this.y >= this._ctx.canvas.height) {
      this.y *= -1
    }
    if (this.tickDie !== 0 && this.tickDie++ >= 8) {
      this._animateDie()
      this.tickDie = 1
    } else if (this.tickWalk !== 0 && this.tickWalk++ >= 20) {
      this._animateWalk()
      this.tickWalk = 1
    } else if (this.tickFly !== 0 && this.tickFly++ >= 30) {
      this._animateFlying()
      this.tickFly = 1
    }

    if (this.x <= this._ctx.canvas.width - this._ctx.canvas.width / 3) {
      this._animateToFly()
      this.vx = GLOBAL_SPEED_X / -2
      this.vy = GLOBAL_SPEED_Y * -0.9
      if (this.y <= this._ctx.canvas.height - 90 && this.tickFly++ >= 90) {
        this._animateFlying()
        this.vx = GLOBAL_SPEED_X / -3
        this.vy = GLOBAL_SPEED_Y * -1.4
      }
    }
  }

  isVisible() {
    return this.x + this.w >= 0
  }

  is(value) {
    return this.params.includes(value)
  }

  stop() {
    this.vx = 0
    this.vy = 0
    this.imgDie.frameIndex = 0
  }

  doTerreain() {
    this.vx = GLOBAL_SPEED_X / -2
    this.y += -5
    this.vy = 0
    this.img.frameIndex = 3
    this.tickFly = 0
    this.tickWalk = 1
  }
  undoTerrain() {
    this.tickFly = 1
    this.tickWalk = 0
  }

  die() {
    this.vy = 0.4
    this.xy = 0.04
    this.tickDie = 1
    this.params = this.params.filter(param => param !== 'killable')
    this.params = this.params.filter(param => param !== 'collisable')

    setTimeout(() => {
      if (this.params.indexOf('die') === -1) {
        this.params.push('die')
      }
      this.x = 0 - this.w
      this.vx = 0
    }, 350)
  }

  _animateFlying() {
    if (this.img.frameIndex++ >= 1) {
      this.img.frameIndex = 0
    }
  }
  _animateToWalk() {
    if (this.img.frameIndex++ >= 3) {
      this.img.frameIndex = 2
    }
  }

  _animateToFly() {
    if (this.img.frameIndex > 0) {
      this.img.frameIndex--
    }
  }

  _animateWalk() {
    if (this.img.frameIndex++ >= 7) {
      this.img.frameIndex = 4
    }
  }

  _animateDie() {
    if (this.imgDie.frameIndex++ >= 6) {
      this.imgDie.frameIndex = 0
    }
  }
}