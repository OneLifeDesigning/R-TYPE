class Bullet {
  constructor(ctx, player, img) {
    this._ctx = ctx

    this._player = player

    this.w = ctx.canvas.width / 20
    this.h = (this.w / 4) * 3

    this.x = 0 - this.w
    this.y = this._player.y

    this.img = img

    this.tickAnimation = 0
    this.tickStart = 0
    this.damage = 10
    this.healt = 100

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
    this.healt -= 1
    if (this.healt <= 0) {
      this.healt = 100
    }
  }

  removeShots() {
    this.shots = this.shots.filter(s => s.isVisible())
  }

  isCollisable() {
    return this.collisable
  }

  isFixed() {
    return this.fixed
  }

  toFixed() {
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
    if (this.x <= this._ctx.canvas.width - (this._ctx.canvas.width / 5)) {
      this.x += (GLOBAL_SPEED_X * 5)
    } else {
      if (this.tickStart === 0) {
        this.toFixed()
        this.tickStart = 1
      }
    }
  }

  _animateReturn(playerX, playerY) {
    if (playerY - 4 > this.y && playerY !== this.y) {
      this.y += GLOBAL_SPEED_X * 3
    } else if (playerY + 4 < this.y && playerY !== this.y) {
      this.y -= GLOBAL_SPEED_X * 3
    }
    if (playerX - 4 > this.x && playerX !== this.x) {
      this.x += GLOBAL_SPEED_X * 3
    } else if (playerX + 4 < this.x && playerX !== this.x) {
      this.x -= GLOBAL_SPEED_X * 3
    }
  }
}