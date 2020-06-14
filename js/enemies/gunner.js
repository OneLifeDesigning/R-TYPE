class EnemyGunner {
  constructor(ctx, img, imgM, imgT) {
    this._ctx = ctx

    this.type = 'gunner'

    this.w = this._ctx.canvas.width / 6
    this.h = (this.w / 4) * 3

    this.x = this._ctx.canvas.width + (this.w * 2)
    this.y = this.h


    this.vx = -GLOBAL_SPEED_X
    this.vy = GLOBAL_SPEED_Y

    this.tick = 0
    this.tickShot = 0

    this.params = ['gunner', 'collisable', 'killable', 'shooter', 'walker']

    this.healt = 300 * DIFICULTY
    this.damage = 1000 * DIFICULTY

    this.points = 1000 * DIFICULTY

    this.audioLoad = new Audio('./sounds/beam-enemy-load.wav')
    this.audioLoad.volume = 0.1

    this.tickAnimate = 0
    this.tickWalk = 0

    this.preparedShot = false

    this.img = img
    this.imgM = imgM
    this.imgT = imgT

    // NOTE: frame are number sprites
    this.img.frames = 3
    this.imgM.frames = 3
    this.imgT.frames = 3
    // NOTE: position actual "array"
    this.img.frameIndex = 1
    this.imgM.frameIndex = 0
    this.imgT.frameIndex = 0
  }

  draw() {
    if (this.tickWalk === 1) {
      this._ctx.globalAlpha = 0.5
      this._ctx.drawImage(
        this.imgM,
        this.imgM.frameIndex * this.imgM.width / this.imgM.frames,
        0,
        this.imgM.width / this.imgM.frames,
        this.imgM.height,
        this.x,
        this.y,
        this.w,
        this.h
      )
      this._ctx.globalAlpha = 1
      this._ctx.drawImage(
        this.imgT,
        this.imgT.frameIndex * this.imgT.width / this.imgT.frames,
        0,
        this.imgT.width / this.imgT.frames,
        this.imgT.height,
        this.x,
        this.y,
        this.w,
        this.h
      )
    } else {
      this._ctx.drawImage(
        this.imgM,
        this.imgM.frameIndex * this.imgM.width / this.imgM.frames,
        0,
        this.imgM.width / this.imgM.frames,
        this.imgM.height,
        this.x,
        this.y,
        this.w,
        this.h
      )
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
  }

  move(playerPosX, playerPosY) {
    if (playerPosY - 20 > this.y && playerPosY !== this.y) {
      if (playerPosY - this.y < 10) {
        this.y += this.vy * 2
        this.img.frameIndex = 1
        if (this.tickAnimate++ >= 10) {
          this._animateMotorPush()
          this.tickAnimate = 0
        }
      } else {
        this.y += this.vy
        this.img.frameIndex = 1
        if (this.tickAnimate++ >= 30) {
          this._animateMotorPush()
          this.tickAnimate = 0
        }
      }
    } else if (playerPosY + 20 < this.y && playerPosY !== this.y) {
      if (this.y - playerPosY + 4 < 10) {
        this.y -= this.vy * 2
        this.img.frameIndex = 2
        if (this.tickAnimate++ >= 10) {
          this._animateMotorPush()
          this.tickAnimate = 0
        }
      } else {
        this.y -= this.vy
        this.img.frameIndex = 2
        if (this.tickAnimate++ >= 30) {
          this._animateMotorPush()
          this.tickAnimate = 0
        }
      }
    } else if ((playerPosY >= this.y - 30 || playerPosY <= this.y + 30) && this.x <= this._ctx.canvas.width) {
      this.img.frameIndex = 0
      if (this.tickShot++ >= 150) {
        this.preparedShot = true
        this.tickShot = 1
        this._animateMotorStatic()
      }
    }
    if (playerPosX - 10 < this.x - this._ctx.canvas.width / 3 && this.x >= this._ctx.canvas.width / 2) {
      this.x += this.vx
      this.img.frameIndex = 1
      if (this.tickAnimate++ >= 20) {
        this._animateMotorPull()
        this.tickAnimate = 0
      }
    } else if (playerPosX - 10 > this.x - this._ctx.canvas.width / 4 && this.x <= this._ctx.canvas.width - this.w / 2) {
      this.x -= this.vx * 2
      this.img.frameIndex = 2
      if (this.tickAnimate++ >= 20) {
        this._animateMotorPush()
        this.tickAnimate = 0
      }
    }
  }

  isVisible() {
    return this.x + this.w >= 0
  }

  is(value) {
    return this.params.includes(value)
  }

  _animateMotorPush() {
    if (this.imgM.frameIndex++ >= 2) {
      this.imgM.frameIndex = 1
    }
  }

  _animateMotorStatic() {
    if (this.imgM.frameIndex++ >= 3) {
      this.imgM.frameIndex = 2
    }
  }

  _animateMotorPull() {
    if (this.imgM.frameIndex++ >= 1) {
      this.imgM.frameIndex = 0
    }
  }

  _animateMotorGhostt(val) {
    this.imgT.frameIndex = val
  }

  undoTerrain() {
    this.tickWalk = 0
    if (this.params.indexOf('killable') === -1) {
      this.params.push('killable')
    }
    if (this.params.indexOf('shooter') === -1) {
      this.params.push('shooter')
    }
  }

  doTerreain() {
    this.tickWalk = 1
    this.params = this.params.filter(param => param !== 'killable')
    this.params = this.params.filter(param => param !== 'shooter')
    if (this.tickAnimate++ >= 10) {
      this._animateMotorGhostt(this.img.frameIndex)
      this.tickAnimate = 0
    }
  }

  die() {
    this.params = this.params.filter(param => param !== 'killable')
    this.params = this.params.filter(param => param !== 'collisable')
    this.vy = 0.4
    this.xy = 0.04
    if (this.params.indexOf('die') === -1) {
      this.params.push('die')
    }
  }

  readyToShot() {
    return this.preparedShot
  }

  shotEnemy() {

    if (game.soundsPlay) {
      this.audioLoad.play()
    }
    this.tickShot = 0
    this.preparedShot = false
    return new EnemiesBeam(
      this._ctx,
      this
    )
  }
}