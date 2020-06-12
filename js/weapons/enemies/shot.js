class EnemiesShot {
  constructor(ctx, shooter, player) {
    this._ctx = ctx

    this.shooter = shooter
    this.player = player

    this.playerCenter = this.getCenter(this.shooter)
    this.enemyCenter = this.getCenter(this.player)

    this.x = Number(this.shooter.x)
    this.y = Number(this.shooter.y)

    this.w = this._ctx.canvas.width / 43
    this.h = (this.w / 4) * 3

    this.img = new Image()
    this.img.src = './img/sprites/enemy-shot.png'

    this.tick = 0

    // NOTE: frame are number sprites
    this.img.framesX = 5
    this.img.framesY = 2
    // NOTE: position actual "array"
    this.img.frameIndexX = 1
    this.img.frameIndexY = 0

    this.angle = this.calcAngle(this.playerCenter, this.enemyCenter)
    this.angle = this.angle <= 1 ? 1 : this.angle
    this.vx = this.angle
    this.vy = this.angle

    this.damage = 100
    this.healt = 0

    this.params = ['collisable', 'shot']

  }



  getCenter(ele) {
    return {
      x: ele.x + ele.w / 2,
      y: ele.y + ele.h / 2
    }
  }

  calcAngle(pl, ene) {
    const dx = ene.x > pl.x ? ene.x - pl.x : pl.x - ene.x
    const dy = ene.y > pl.y ? ene.y - pl.y : pl.y - ene.y
    return Math.atan2(dx, dy)
  }

  draw() {
    this._ctx.drawImage(
      this.img,
      this.img.frameIndexX * this.img.width / this.img.framesX,
      0,
      this.img.width / this.img.framesX,
      this.img.height / this.img.framesY,
      this.x,
      this.y,
      this.w,
      this.h
    )
  }

  _animate() {
    if (this.img.frameIndexX++ >= 4) {
      this.img.frameIndexX = 1
    }
  }

  move() {
    if (this.enemyCenter.x > this.playerCenter.x) {
      this.x += this.vx
    } else {
      this.x -= this.vx
    }
    if (this.enemyCenter.y > this.playerCenter.y) {
      this.y += this.vy
    } else {
      this.y -= this.vy
    }

    if (this.tick++ === 20) {
      this._animate()
      this.tick = 0
    }

    if (this.x >= this._ctx.canvas.width + this.w || this.x <= 0 - this.w || this.y >= this._ctx.canvas.height + this.h || this.Y <= 0 - this.h) {
      this.die()
    }
  }
  die() {
    this.params = this.params.filter(param => param !== 'collisable')
    this.params.push('die')
    this.x = 0 - this.w
    this.y = 0 - this.h
    this.vx = 0
    this.vy = 0
  }

  isVisible() {
    return this.x <= 0
  }

  is(value) {
    return this.params.includes(value)
  }

}