class EnemyGunner {
  constructor(ctx, y) {
    this.ctx = ctx

    this.x = ctx.canvas.width
    this.y = y

    this.w = ctx.canvas.width / 10
    this.h = (this.w / 4) * 3

    this.vx = -0.8
    this.vy = 2
    this.tick = 0

    this.img = new Image()
    this.img.src = '../img/sprites/enemy-gunner.png'
    // NOTE: frame are number sprites
    this.img.frames = 3
    // NOTE: position actual "array"
    this.img.frameIndex = 1
  }

  draw() {
    this.ctx.drawImage(
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
    } else if (playerPosY >= this.y - 40 || playerPosY <= this.y + 40) {
      this._shoot()
    } else if (playerPosY == this.y) {
      this.vy = 0
    }
    if (playerPosX < this.x - ctx.canvas.width / 4 && this.x <= ctx.canvas.width) {
      this.x += this.vx
    } else if (playerPosX >= this.x - ctx.canvas.width / 4) {
      this.x -= this.vx * 4
    }
  }
  _animate() {
    if (this.tick++ === 15) {
      this.tick = 0
    }
  }
  _shoot() {
    console.log('Hello im gunner and killYUONoooow')
  }
}