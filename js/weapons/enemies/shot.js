class EnemiesShot {
  constructor(ctx, shooter, player) {
    this._ctx = ctx

    this.shooter = shooter
    this.player = player

    this.x = Number(this.shooter.x)
    this.y = Number(this.shooter.y)

    this.w = this._ctx.canvas.width / 43
    this.h = (this.w / 4) * 3

    this.img = new Image()
    this.img.src = './img/sprites/enemy-shot.png'

    this.tick = 0

    // NOTE: frame are number sprites
    this.img.framesX = 5
    this.img.framesY = 2
    // NOTE: position actual "array"
    this.img.frameIndexX = 1
    this.img.frameIndexY = 0

    // this.vx = Number(this.calctarget(this.shooter, this.player)[0])
    // this.vy = Number(this.calctarget(this.shooter, this.player)[1])
    this.vx = 1
    this.vy = 1

    this.damage = 100

    this.supply = false
    this.collisable = true
  }

  die() {
    this.x = this._ctx.canvas.width + this.w
  }

  // getCenter(ele) {
  //   return {
  //     x: ele.x + ele.w / 2,
  //     y: ele.y + ele.h / 2
  //   }
  // }

  // calctarget(pl, ene) {
  //   const playerCenter = this.getCenter(pl)
  //   const enemyCenter = this.getCenter(ene)
  //   const dx = playerCenter.x - enemyCenter.x
  //   const dy = playerCenter.y - enemyCenter.y

  //   const fangle = Math.sqrt(dx * dx + dy * dy)
  //   const velx = (Math.cos(fangle) * 1).toFixed(4)
  //   const vely = (Math.sin(fangle) * 1).toFixed(4)
  //   return [velx, vely]
  // }

  draw() {
    this._ctx.drawImage(
      this.img,
      this.img.frameIndexX * this.img.width / this.img.framesX,
      0,
      this.img.width / this.img.framesX,
      this.img.height / this.img.framesY,
      this.x,
      this.y,
      this.w,
      this.h
    )
  }

  _animate() {
    if (this.img.frameIndexX++ >= 4) {
      this.img.frameIndexX = 1
    }
  }

  move() {
    this.x += this.vx
    this.y += this.vy

    if (this.tick++ === 20) {
      this._animate()
      this.tick = 0
    }
  }

  isVisible() {
    return this.x <= this._ctx.canvas.width
  }

  isCollisble() {
    return this.collisable
  }

  isSupply() {
    return this.supply
  }
}