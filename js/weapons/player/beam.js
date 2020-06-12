class BeamShot extends Shot {
  constructor(ctx, img, x, y, damage) {
    super(ctx, x, y)

    this.w = this._ctx.canvas.width / 9
    this.h = (this.w / 24) * 8

    this.damage = damage

    this.img = new Image()
    this.img.src = './img/sprites/weapon-beam.png'

    // NOTE: frame are number sprites
    this.img.framesX = 2
    this.img.framesY = 5

    this.ranges = [20, 40, 60, 80, 100]

    this.params = ['collisable']


    // NOTE: position actual "array"
    this.img.frameIndexX = 0
    this.img.frameIndexY = this.findClosest(this.ranges, this.damage)

    this.vx = 10

  }

  findClosest(arr, num) {
    let closest = arr[0]
    for (let item of arr) {
      if (Math.abs(item - num) < Math.abs(closest - num)) {
        closest = item
      }
    }
    return arr.indexOf(closest)
  }

  draw() {
    this._ctx.drawImage(
      this.img,
      this.img.frameIndexX * this.img.width / this.img.framesX,
      this.img.frameIndexY * this.img.height / this.img.framesY,
      this.img.width / this.img.framesX,
      this.img.height / this.img.framesY,
      this.x,
      this.y,
      this.w,
      this.h
    )

  }

  _animate() {
    if (this.img.frameIndexX++ === 1) {
      this.img.frameIndexX = 0
    }
  }

  move() {
    this.x += this.vx
    if (this.tick++ >= 12) {
      this._animate()
      this.tick = 0
    }
    if (this.x >= this._ctx.canvas.width + this.w || this.x <= 0 - this.w || this.y >= this._ctx.canvas.height + this.h || this.Y <= 0 - this.h) {
      this.die()
    }
  }



  die() {
    this.params.push('die')
    this.x = this._ctx.canvas.width + this.w + 10
    this.vx = 0
  }

  isVisible() {
    return this.x <= 0
  }

}