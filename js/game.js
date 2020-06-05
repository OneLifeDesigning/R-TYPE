class Game {
  constructor(ctx) {
    this._ctx = ctx

    this._intervalId = null
    this._frames = 0
    this._bg = new Bg(ctx, LEVEL_1_IMG_BG_1)
    this._player = new Player(ctx)

    this._terrainBottom = []
    this._terrainTop = []
    this._enemiesButterfly = []
    this._interface = new Interface()
    this.maxHeight = this._ctx.canvas.height - 60
  }

  start() {
    this._addTerrain()
    this._intervalId = setInterval(() => {
      this._clear()
      this._draw()
      this._move()
    }, 1000 / 70);
  }

  _randomNumber(number) {
    return Math.floor(Math.random() * number)
  }

  // TERRAIN 
  _addTerrain() {
    for (let i = 0; i < LEVEL_1_IMG_TERRAIN_TOP.length; i++) {
      this._terrainTop.push(
        new Terrain(
          this._ctx,
          LEVEL_1_IMG_TERRAIN_TOP[i],
          i,
          0
        )
      )
    }
    for (let i = 0; i < LEVEL_1_IMG_TERRAIN_BOTTOM.length; i++) {
      this._terrainBottom.push(
        new Terrain(
          this._ctx,
          LEVEL_1_IMG_TERRAIN_BOTTOM[i],
          i,
          this._ctx.canvas.height
        )
      )
    }
  }

  _drawTerrain() {
    for (let i = 0; i < this._terrainTop.length; i++) {
      this._terrainTop[i].draw(this._ctx)
      this._terrainTop[i].move()
    }
    for (let i = 0; i < this._terrainBottom.length; i++) {
      this._terrainBottom[i].draw(this._ctx)
      this._terrainBottom[i].move()
    }
  }
  _updateTerrain() {
    for (let i = 0; i < this._terrainTop.length; i++) {
      if (this._terrainTop[i].x + this._terrainTop[i].w <= 0) {
        this._terrainTop.splice(1, i)
      }
    }
    for (let i = 0; i < this._terrainBottom.length; i++) {
      if (this._terrainBottom[i].x + this._terrainBottom[i].w <= 0) {
        this._terrainBottom.splice(1, i)
      }
    }
  }

  // ENEMIES 
  _addEnemiesButterfly() {
    if (this._frames++ >= 50 && this._enemiesButterfly.length <= 6) {
      this._enemiesButterfly.push(
        new EnemyButterfly(this._ctx, this._randomNumber(this.maxHeight - (this.maxHeight / 3))))
      this._frames = 0
      this._updateEnemiesButterfly()
    }
  }

  _drawAndMoveEnemiesButterfly() {
    for (let i = 0; i < this._enemiesButterfly.length; i++) {
      this._enemiesButterfly[i].draw()
      this._enemiesButterfly[i].move()
    }
  }

  _updateEnemiesButterfly() {
    for (let i = 0; i < this._enemiesButterfly.length; i++) {
      if (this._enemiesButterfly[i].x <= 0) {
        this._enemiesButterfly.splice(1, i)
      }
    }
  }

  stop() {
    this._intervalId = clearInterval()
  }

  _clear() {
    this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height)
  }

  _draw() {
    this._bg.draw()
    this._player.draw()
    this._drawTerrain()
    this._addEnemiesButterfly()
    this._interface.draw()
  }

  _move() {
    this._bg.move()
    this._player.move()
    this._drawAndMoveEnemiesButterfly()
    this._updateTerrain()
  }

  _checkCollisions(objectOne, objectTwo) {

  }
}