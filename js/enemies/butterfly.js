class EnemyButterfly {
  constructor(ctx, x, y, img) {
    this._ctx = ctx

    this.type = 'butterfly'

    this.x = this._ctx.canvas.width + x
    this.y = 60 + y

    this.w = this._ctx.canvas.width / 15
    this.h = (this.w / 4) * 3

    this.vx = GLOBAL_SPEED_X * -3
    this.vy = GLOBAL_SPEED_X * -2

    this.tickAnimButter = 0
    this.tickMove = 0
    this.img = img

    this.audioShot = new Audio('./sounds/shot-enemy.wav')
    this.audioShot.volume = 0.1

    this.healt = 10 * DIFICULTY
    this.damage = 10 * DIFICULTY

    this.points = 100 * DIFICULTY

    this.params = ['flyer', 'killable', 'collisable', 'shooter']

    // NOTE: frame are number sprites
    this.img.frames = 8
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

  move() {
    this.y += this.vy
    this.x += this.vx

    if (this.tickMove++ === 60 || this.y <= 60) {
      this.vy *= -1
      this.tickMove = 0
    }
    if (this.tickAnimButter++ >= 30) {
      this._animate()
      this.tickAnimButter = 0
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

  _animate() {
    if (this.img.frameIndex++ >= 7) {
      this.img.frameIndex = 0
    }
  }
}