class Bullet {
  constructor(ctx, player, img) {
    this._ctx = ctx

    this.type = 'bullet'

    this._player = player

    this.w = ctx.canvas.width / 20
    this.h = (this.w / 4) * 3

    this.x = 0 - this.w
    this.y = this._player.y

    this.img = img

    this.tickAnimation = 0
    this.tickStart = 0

    this.params = ['collisable', 'bullet', 'killable']

    this.damage = 100
    this.healt = 1000

    this.fixed = false

    // NOTE: frame are number sprites
    this.img.frames = 6
    // NOTE: position actual "array"
    this.img.frameIndex = 0

    this.collisable = true
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

  move(x, y) {
    if (!this.isFixed()) {
      this._animateJump()
    } else {
      this._animateReturn(x, y)
    }

    if (this.tickAnimation++ === 15) {
      this._animate()
      this.tickAnimation = 0
    }
  }


  shot() {
    return new Shot(
      this._ctx,
      this.x + this.w * 0.8,
      this.y + this.h * 0.3
    )
  }

  die() {
    this.params = this.params.filter(param => param !== 'killable')
    this.params = this.params.filter(param => param !== 'collisable')
    this.vy = 0.4
    this.xy = 0.04
    if (this.params.indexOf('die') === -1) {
      this.params.push('die')
    }
    this.healt = 100
  }


  is(value) {
    return this.params.includes(value)
  }

  isFixed() {
    return this.fixed
  }

  toFixed() {
    this.vx = GLOBAL_SPEED_Y * 3
    this.vy = GLOBAL_SPEED_X * 3
    this.tickStart = 1
    this.fixed = true
  }

  toUnfixed() {
    this.fixed = false
  }

  _animate() {
    if (this.img.frameIndex++ >= 5) {
      this.img.frameIndex = 0
    }
  }

  _animateJump() {
    if (this.x <= this._ctx.canvas.width - (this._ctx.canvas.width / 4)) {
      this.x += (GLOBAL_SPEED_X * 5)
    } else {
      if (this.tickStart === 0) {
        this.toFixed()
        this.tickStart = 1
      }
    }
  }

  _animateReturn(playerX, playerY) {
    if (playerY - 2 > this.y && playerY !== this.y) {
      this.y += GLOBAL_SPEED_X * 3
    } else if (playerY + 2 < this.y && playerY !== this.y) {
      this.y -= GLOBAL_SPEED_X * 3
    }
    if (playerX - 2 > this.x && playerX !== this.x) {
      this.x += GLOBAL_SPEED_X * 3
    } else if (playerX + 2 < this.x && playerX !== this.x) {
      this.x -= GLOBAL_SPEED_X * 3
    }
  }
}