class EnemiesBeam {
  constructor(ctx, shooter) {

    this._ctx = ctx
    this.shooter = shooter

    this.x = this.shooter.x - this.shooter.w * 0.12
    this.y = this.shooter.y + this.shooter.h * 0.18


    this.w = this._ctx.canvas.width / 8
    this.h = (this.w / 18) * 8

    this.damage = 100

    this.img = new Image()
    this.img.src = './img/sprites/enemy-gunner-beam.png'

    this.params = ['collisable', 'beam']


    // NOTE: frame are number sprites
    this.img.frames = 4
    // NOTE: position actual "array"
    this.img.frameIndex = 2

    this.tickChange = 1
    this.tickCharge = 0
    this.tickMove = 0

    this.vx = GLOBAL_SPEED_X * 2
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

  move(shooter) {
    if (this.tickChange !== 0 && this.tickChange++ <= 100) {
      this.vx = 0
      this.x = shooter.x - shooter.w * 0.12
      this.y = shooter.y + shooter.h * 0.2
      if (this.tickCharge++ >= 30) {
        this._animateChargin()
        this.tickCharge = 0
      }
    } else {
      this.x -= this.vx
      if (this.tickMove++ >= 20) {
        this._animate()
        this.tickMove = 0
      }
      this.vx = GLOBAL_SPEED_X * 2
    }
  }

  _animate() {
    if (this.img.frameIndex++ >= 1) {
      this.img.frameIndex = 0
    }
  }

  _animateChargin() {
    if (this.img.frameIndex++ >= 3) {
      this.img.frameIndex = 2
    }
  }

  die() {
    if (this.params.indexOf('die') === -1) {
      this.params.push('die')
    }
    this.x = -(this._ctx.canvas.width + this.w + 10)
    this.vx = 0
  }

  is(value) {
    return this.params.includes(value)
  }

  isVisible() {
    return this.x + this.w >= 0 && this.x < this._ctx.canvas.width - this.w
  }
}