class Explosions {
  constructor(ctx, object, explosions) {
    this._ctx = ctx


    this.type = object.type

    this.tickAimation = 0

    this.params = []

    this.x = object.x
    this.y = object.y

    this.w = (object.w * 0.9)
    this.h = (this.w / 4) * 3

    this.vx = (object.vx / 10)
    this.vy = (object.vy / 10)

    this.timeAnimation = 10

    this.img = new Image()

    explosions.forEach(explosion => {
      if (explosion.type === this.type) {
        this.img.src = explosion.src
        // NOTE: frame are number sprites
        this.img.frames = explosion.frames
        this.audio = new Audio(explosion.audio)
        this.audio.volume = 0.2
        // NOTE: position actual "array"
        if (explosion.type === 'shotPlayer') {
          this.vx = 0
          this.vy = 0
          this.audio.volume = 0.1
        }
        if (explosion.type === 'beamPlayer') {
          this.y -= 20
          this.timeAnimation = 5
        }
        if (explosion.type === 'beamEnemy') {
          this.timeAnimation = 5
        }
      }
    })

    this.img.frameIndex = 0
  }

  die() {
    this.img.frameIndex = 0
    if (this.params.indexOf('end') === -1) {
      this.params.push('end')
    }
    this.x = 0 - this.w + 10
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

  _animate() {
    if (this.img.frameIndex++ >= this.img.frames - 1) {
      this.die()
    }
  }

  move() {
    this.y += this.vy
    this.x += this.vx
    if (this.tickAimation++ >= this.timeAnimation) {
      this._animate()
      if (this.audio && game.soundsPlay) {
        this.audio.play()
      }

      this.tickAimation = 0
    }
  }

  isVisible() {
    return this.x >= 0 && this.x + this.w <= this._ctx.canvas.width
  }

  is(value) {
    return this.params.includes(value)
  }
}