class EnemyGunner {
  constructor(ctx, y) {
    this._ctx = ctx

    this.x = ctx.canvas.width
    this.y = y

    this.w = ctx.canvas.width / 10
    this.h = (this.w / 4) * 3

    this.vx = -0.8
    this.vy = 2
    this.tick = 0
    this.tickMove = 0

    this.soteable = true
    this.collisable = true
    this.walker = true
    this.supply = false
    this.armory = false


    this.healt = 100

    this.img = new Image()
    this.img.src = '../img/sprites/enemy-gunner.png'
    // NOTE: frame are number sprites
    this.img.frames = 3
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

  move(playerPosX, playerPosY) {
    if (playerPosY - 2 > this.y && playerPosY !== this.y) {
      if (playerPosY - this.y <= 50) {
        this.y += this.vy / 5
      } else {
        this.y += this.vy
      }
    } else if (playerPosY + 2 < this.y && playerPosY !== this.y) {
      if (this.y - playerPosY + 4 <= 50) {
        this.y -= this.vy / 5
      } else {
        this.y -= this.vy
      }
    } else if (playerPosY >= this.y - 80 || playerPosY <= this.y + 80) {
      if (this.tickMove++ === 25) {
        this._shot()
        this.tickMove = 0
      }
    } else if (playerPosY == this.y) {
      this.vy = 0
    }
    if (playerPosX + 2 < this.x - ctx.canvas.width / 4 && this.x <= ctx.canvas.width) {
      this.x += this.vx
    } else if (playerPosX >= this.x - ctx.canvas.width / 4) {
      this.x -= this.vx * 5
    }
  }
  isVisible() {
    return this.x + this.w >= 0
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
  _animate() {
    // TODO: when Shot and is floor animate
    if (this.tick++ === 15) {
      this.tick = 0
    }
  }
  _shot() {
    console.log('Hello im gunner and killYUONoooow')
  }
}