class EnemyCyborg {
  constructor(ctx, x, y, img) {
    this._ctx = ctx

    this.type = 'cyborg'

    this.x = this._ctx.canvas.width + x
    this.y = 60 + y

    this.w = this._ctx.canvas.width / 15
    this.h = (this.w / 3) * 3

    this.vx = GLOBAL_SPEED_X * -1
    this.vy = GLOBAL_SPEED_X * -1

    this.tickAnimLeft = 0
    this.tickAnimRight = 0
    this.tickMove = 0
    this.tickChangeDirection = 0
    this.img = img

    this.audioShot = new Audio('./sounds/shot-enemy.wav')
    this.audioShot.volume = 0.1

    this.healt = 10 * DIFICULTY
    this.damage = 10 * DIFICULTY

    this.points = 100 * DIFICULTY

    this.params = ['flyer', 'killable', 'collisable', 'shooter', 'cyborg']

    // NOTE: frame are number sprites
    this.img.frames = 6
    // NOTE: position actual "array"
    this.img.frameIndex = 1
  }

  draw() {
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

  clear() {
    this._ctx.clearRect(this.x, this.y, this.w, this.h)
  }

  move(x) {
    this.x += this.vx

    if (x >= this.x) {
      if (this.tickAnimRight++ >= 30) {
        this._animateRight()
        this.tickAnimRight = 0
      }
      if (this.tickChangeDirection === 0) {
        this.tickChangeDirection = 1
      }
    } else {
      if (this.tickChangeDirection === 1) {
        this.vx *= -1
        this.tickChangeDirection = 0
        if (this.x + this.w >= this._ctx.canvas.width) {
          this.die()
        }
      }
      if (this.tickAnimLeft++ >= 30) {
        this._animateLeft()
        this.tickAnimLeft = 0
      }
    }

    this.y += this.vy

    if (this.tickMove++ === 120 || this.y <= 80) {
      this.vy *= -1
      this.tickMove = 0
    }
  }

  _animateLeft() {
    if (this.img.frameIndex++ >= 2) {
      this.img.frameIndex = 0
    }
  }

  _animateRight() {
    if (this.img.frameIndex++ >= 5) {
      this.img.frameIndex = 3
    }
  }

  isVisible() {
    return this.x + this.w >= 0 && this.y >= 0 && this.y <= this._ctx.canvas.height
  }

  is(value) {
    return this.params.includes(value)
  }

  shotEnemy(enemy, player) {
    if (game.musicPlay) {
      this.audioShot.play()
    }
    return new EnemiesShot(
      this._ctx,
      enemy,
      player
    )
  }

  die() {
    this.params = this.params.filter(param => param !== 'killable')
    this.params = this.params.filter(param => param !== 'collisable')
    if (this.params.indexOf('die') === -1) {
      this.params.push('die')
    }
  }
}