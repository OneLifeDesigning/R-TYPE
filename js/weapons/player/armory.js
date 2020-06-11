class Armory {
  constructor(ctx, img, x, y, isAShooter) {
    this._ctx = ctx
    this.x = x
    this.y = y

    this.w = ctx.canvas.width / 16
    this.h = (this.w / 4) * 3

    this.img = img

    this.vx = GLOBAL_SPEED_X * -1
    this.vy = 0

    this.soteable = false
    this.collisable = true
    this.walker = false
    this.supply = false
    this.armory = true

    this.isAShooter = isAShooter


    // NOTE: frame are number sprites
    this.img.frames = 1
    // NOTE: position actual "array"
    this.img.frameIndex = 0
  }

  draw() {
    this._ctx.drawImage(
      this.img,
      0,
      0,
      this.img.width / this.img.frames,
      this.img.height,
      this.x,
      this.y,
      this.w,
      this.h
    )
  }

  die() {
    this.collisable = false
    this.x = -this.w * 2
  }

  move() {
    this.x += this.vx
  }

  isShooter() {
    return this.isAShooter
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
}