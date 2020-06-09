class Armory {
  constructor(ctx, img, x, y) {
    this._ctx = ctx
    this.x = x
    this.y = y

    this.w = ctx.canvas.width / 16
    this.h = (this.w / 4) * 3

    this.img = img

    this.vx = GLOBAL_SPEED_X
    this.vy = 0

    this.soteable = false
    this.collisable = true
    this.walker = false
    this.supply = true


    // NOTE: frame are number sprites
    this.img.frames = 1
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
  die() {
    this.collisable = false
    this.x = -this.w * 2
  }

  move() {
    this.x += this.vx;
  }


  _animate() {

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

  isWallker() {
    return this.walker
  }

  isShooteable() {
    return this.soteable
  }
}