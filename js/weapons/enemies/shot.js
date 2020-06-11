class EnemiesShot {
  constructor(ctx, shooter, player) {
    this._ctx = ctx

    this.shooter = shooter
    this.x = this.shooter.x
    this.y = this.shooter.y

    this.player = player
    this.shotTargetX = this.player.x
    this.shotTargetY = this.player.y

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

    this.vx = GLOBAL_SPEED_X * 6
    this.vy = GLOBAL_SPEED_Y * 6

    this.collisable = true
    this.dx = this.shooter.x - this.shotTargetX
    this.dy = this.shooter.y - this.shotTargetY
    this.angle = Math.atan2(this.dy, this.dx)
  }

  die() {
    this.x = this._ctx.canvas.width + this.w
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
    if (this.dx <= 0) {
      this.x -= this.angle
    } else {
      this.x += this.angle
    }
    if (this.dy <= 0) {
      this.y -= this.angle
    } else {
      this.y += this.angle
    }
    if (this.tick++ === 20) {
      console.log(this.shooter.x);
      console.log(this.shooter.y);
      console.log(this.shotTargetX);
      console.log(this.shotTargetY);
      console.log(this.dx);
      console.log(this.dy);
      console.log(this.angle);
      debugger
      this._animate()
      this.tick = 0
    }
  }

  isVisible() {
    return this.x <= this._ctx.canvas.width
  }

  isCollisable() {
    return this.collisable
  }
}