class Weapon {
  constructor(ctx, shooter) {
    this._ctx = ctx

    this.shooter = shooter

    this.audioBeam = new Audio('./sounds/beam-load-player.wav')
    this.audioBeam.volume = 0.1

    this.audioShot = new Audio('./sounds/shot-player.wav')
    this.audioShot.volume = 0.1

    this.beamLoad = new BeamLoad(
      this._ctx,
      IMG_SHOT_BEAM_LOAD,
      this.shooter.x + this.shooter.w * 0.8,
      this.shooter.y + this.shooter.h * 0.2
    )
  }

  shot() {
    if (this.audioShot && game.soundsPlay) {
      this.audioShot.play()
    }

    return new Shot(
      this._ctx,
      this.shooter.x + this.shooter.w * 0.8,
      this.shooter.y + this.shooter.h * 0.3
    )
  }

  beamLoadShow() {
    if (this.audioBeam && game.soundsPlay) {
      this.audioBeam.play()
    }
    this.beamLoad.play()
  }

  beamLoadStop() {
    if (this.audioBeam && game.soundsPlay) {
      this.audioBeam.pause()
      this.audioBeam.currentTime = 0
    }
    this.beamLoad.stop()
  }

  beam(damage) {
    return new BeamShot(
      this._ctx,
      IMG_SHOT_BEAM,
      this.shooter.x + this.shooter.w * 0.3,
      this.shooter.y + this.shooter.h * 0.05,
      damage
    )
  }

  draw() {
    this.beamLoad.draw()
  }

  move() {
    this.beamLoad.move(
      this.shooter.x + this.shooter.w * 0.8,
      this.shooter.y + this.shooter.h * 0.2
    )
  }
}