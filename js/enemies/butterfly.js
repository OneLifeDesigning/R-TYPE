class EnemyButterfly {
  constructor(ctx, y, img, imgDie, player, isAShooter) {
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
    this.tickShoot = 0

    this.img = img
    this.imgDie = imgDie

    this.healt = 10
    this.points = 100

    this.soteable = true
    this.collisable = true
    this.walker = false
    this.supply = false
    this.armory = false

    this.player = player

    this.isAShooter = isAShooter

    this.shots = []

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
    this.shots.forEach(s => s.draw())
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
      if (this.tickDie++ >= 8) {
        this._animateDie()
        this.tickDie = 1
      }
    }
    this.shots.forEach(s => s.move())
  }

  isVisible() {
    return this.x + this.w >= 0
  }

  isShooter() {
    return this.isAShooter
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

  isShoteable() {
    return this.soteable
  }

  shot() {
    if (this.tickShoot++ >= 40) {
      console.log('shot');

      this.shots.push(new EnemiesShot(
        this._ctx,
        this,
        this.player
      ))
      this.tickShoot = 0
    }
  }
  removeShots() {
    this.shots = this.shots.filter(s => s.isVisible())
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