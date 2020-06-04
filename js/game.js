class Game {
  constructor(ctx) {
    this._ctx = ctx

    this._intervalId = null
    this._frames = 0

    this._bg = new Bg(ctx, LEVEL_1_IMG_BG_1)
    this._player = new Player(ctx)
    this._outboard = this._ctx.canvas.height - 90

    this._terrainBot = []
    this._enemies = []
  }

  start() {
    this._buildTerrain()
    this._intervalId = setInterval(() => {
      this._addEnemies()
      this._clear()
      this._draw()
      this._move()
    }, 1000 / 70);
  }

  _buildTerrain() {
    for (let i = 0; i < LEVEL_1_IMG_TERRAIN_BOTTOM.length; i++) {
      this._terrainBot.push(new TerrainBottom(this._ctx, LEVEL_1_IMG_TERRAIN_BOTTOM[i], i + 1))
    }
  }

  _drawTerrain() {
    for (let i = 0; i < this._terrainBot.length; i++) {
      this._terrainBot[i].draw()
      this._terrainBot[i].move()
    }
  }

  _randomPosition(h) {
    return Math.floor(Math.random() * h)
  }

  _addEnemies() {
    if (this._frames++ >= 200) {
      this._enemies.push(new EnemyButterFly(this._ctx, this._randomPosition(this._outboard) + 50))
      this._frames = 0
      this._updateEnemies()
    }
  }

  _drawAndMoveEnemies() {
    for (let i = 0; i < this._enemies.length; i++) {
      this._enemies[i].draw()
      this._enemies[i].move()
    }
  }

  _updateEnemies() {
    for (let i = 0; i < this._enemies.length; i++) {
      if (this._enemies[i].x <= 0) {
        this._enemies.splice(1, i)
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
    // this._gunner.draw()
    this._drawTerrain()
  }

  _move() {
    this._bg.move()
    this._player.move()
    // this._gunner.move(this._player.x, this._player.y)
    this._drawAndMoveEnemies()
  }
}