class Weapon {
  constructor(ctx, shooter, imgLoadBeam) {
    this._ctx = ctx

    this.shooter = shooter

    this.x = this.shooter.x + this.shooter.w * 0.3
    this.y = this.shooter.y + 10

    this.audioBeam = new Audio('./sounds/beam-load-player.wav')
    this.audioBeam.volume = 0.1

    this.audioShot = new Audio('./sounds/shot-player.wav')
    this.audioShot.volume = 0.1


    this.tickAnimation = 0
    this.beamLoad = 0

    this.w = this._ctx.canvas.width / 18
    this.h = (this.w / 4) * 3

    this.img = imgLoadBeam

    // NOTE: frame are number sprites
    this.img.frames = 8
    // NOTE: position actual "array"
    this.img.frameIndex = 0
  }

  shot() {
    if (this.audioShot && game.musicPlay) {
      this.audioShot.play()
    }
    return new Shot(
      this._ctx,
      this.x,
      this.y
    )
  }

  beamLoadShow() {
    if (this.audioBeam && game.musicPlay) {
      this.audioBeam.play()
    }
    this.beamLoad = 1
  }

  beamLoadHide() {
    if (this.audioBeam && game.musicPlay) {
      this.audioBeam.pause()
      this.audioBeam.currentTime = 0
    }
    this.beamLoad = 0
    this.img.frameIndex = 0
  }

  beam(damage) {
    return new BeamShot(
      this._ctx,
      this.x,
      this.y,
      damage
    )
  }

  draw() {
    if (this.beamLoad === 1) {
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
  }

  move(x, y) {
    this.x = x
    this.y = y

    if (this.beamLoad !== 0 && this.tickAnimation++ >= 8) {
      this._animate()
      this.tickAnimation = 0
    }
  }


  _animate() {
    if (this.img.frameIndex <= 6) {
      this.img.frameIndex++
      if (this.img.frameIndex === 7) {
        this.img.frameIndex = 5
      }
    }
  }
}