class EnemyKamikaze {
  constructor(ctx, x, y, img) {
    this._ctx = ctx

    this.type = 'kamikaze'

    this.x = ctx.canvas.width + x
    this.y = y

    this.w = ctx.canvas.width / 14
    this.h = (this.w / 4) * 3

    this.vx = GLOBAL_SPEED_X * -1.5
    this.vy = 0.9

    this.tickAnimateKamikaze = 0
    this.tickFlyKamikaze = 0
    this.tickWalk = 0

    this.healt = 10
    this.damage = 10

    this.img = img

    this.params = ['killable', 'collisable', 'walker', 'kamikaze']

    this.points = 0

    // NOTE: frame are number sprites
    this.img.frames = 6
    // NOTE: position actual "array"
    this.img.frameIndex = 0
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
    this.y += this.vy
    this.x += this.vx

    if (this.tickWalk === 1) {
      if (this.tickAnimateKamikaze++ >= 30) {
        this._animateWalk()
        this.tickAnimateKamikaze = 0
      }
    }

    if (this.tickWalk === 1 && this.x <= this._ctx.canvas.width - this._ctx.canvas.width / 3) {
      this.img.frameIndex = 3
    }
    if (this.x <= this._ctx.canvas.width - this._ctx.canvas.width / 2.5) {
      this.tickWalk = 0
      if (this.tickFlyKamikaze++ >= 20) {
        this._animateFlying()
        this.tickFlyKamikaze = 0
      }
      if (x + 50 <= this.x) {
        this.vx = GLOBAL_SPEED_X * -2.5
        this.vy = GLOBAL_SPEED_Y * -4.9
      }
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

  doTerreain() {
    this.vx = -GLOBAL_SPEED_X * 2
    this.y += -1
    this.vy = 0
    this.tickWalk = 1
  }
  undoTerrain() {

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

  _animateFlying() {
    if (this.img.frameIndex++ >= 5) {
      this.img.frameIndex = 4
    }
  }

  _animateWalk() {
    if (this.img.frameIndex++ >= 3) {
      this.img.frameIndex = 0
    }
  }
}