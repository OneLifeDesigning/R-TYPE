class Game {
  constructor(ctx) {
    this._ctx = ctx

    this._intervalId = null
    this._timeLine = 0
    this._bg = new Bg(this._ctx, LEVEL_1_IMG_BG_1)
    this._player = new Player(this._ctx, IMG_PLAYER)


    this._terrainBottom = []
    this._terrainTop = []
    this._enemiesAll = []

    this._interface = new Interface()

    this.maxHeight = this._ctx.canvas.height - 60
  }

  start() {
    this._addTerrain()
    this._intervalId = setInterval(() => {
      this._clear()
      this._draw()
      this._move()
    }, 1000 / 70)
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
    this._terrainTop.forEach(terrainTop => {
      terrainTop.draw(this._ctx)
      terrainTop.move()
      if (this._checkCollisions(this._player, terrainTop, 60)) {
        this._player.die()
      }
    })
    this._terrainBottom.forEach(terrainBottom => {
      terrainBottom.draw(this._ctx)
      terrainBottom.move()
      if (this._checkCollisions(this._player, terrainBottom, 60)) {
        this._player.die()
      }
    })
  }
  _updateTerrain() {
    this._terrainTop = this._terrainTop.filter(oT =>
      oT.isVisible()
    )
    this._terrainBottom = this._terrainBottom.filter(oB =>
      oB.isVisible()
    )
  }

  // ENEMIES 
  _addEnemies() {
    // if (this._timeLine++ >= 100 && this._enemiesAll.length <= 6) {
    //   this._enemiesAll.push(
    //     new EnemyButterfly(
    //       this._ctx,
    //       this._randomNumber(
    //         this.maxHeight - (this.maxHeight / 4)
    //       ),
    //       IMG_ENEMY_BUTTERFLY
    //     )
    //   )
    //   this._timeLine = 0
    // }
  }

  _drawAndMoveEnemies() {
    this._enemiesAll.forEach(enemy => {
      enemy.draw()
      enemy.move()
      if (this._checkCollisions(this._player, enemy)) {
        this._player.die()
        enemy.die()
      }
    });
    this._removeEnemy()
  }
  _removeEnemy() {
    this._enemiesAll = this._enemiesAll.filter(toErrase => toErrase.isVisible())
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
    this._addEnemies()
    this._drawAndMoveEnemies()
    this._interface.draw()
  }

  _move() {
    this._bg.move()
    this._player.move()
    this._checkShoots()
    this._updateTerrain()
  }

  _checkCollisions(objectOne, objectTwo, fineTuning) {
    const colisionX = objectOne.x + objectOne.w >= objectTwo.x && objectOne.x <= objectTwo.x + (objectTwo.w - (fineTuning ? fineTuning : 25))
    const colisionY = objectOne.y + objectOne.h >= objectTwo.y && objectOne.y <= objectTwo.y + (objectTwo.h - (fineTuning ? fineTuning : 25))
    if (colisionX && colisionY) {
      return true
    }
  }
  _checkShoots() {
    this._player.weapon.shoots.map(thisShoot => {
      this._enemiesAll.forEach(enemyShooted => {
        if (this._checkCollisions(thisShoot, enemyShooted, 10)) {
          enemyShooted.die()
          thisShoot.x = this._ctx.canvas.width + thisShoot.w
        }
      })
      this._terrainTop.forEach(tT => {
        if (this._checkCollisions(thisShoot, tT, 0)) {
          thisShoot.x = this._ctx.canvas.width + thisShoot.w
        }
      })
      this._terrainBottom.forEach(tB => {
        if (this._checkCollisions(thisShoot, tB, 500)) {
          thisShoot.x = this._ctx.canvas.width + thisShoot.w
        }
      })
    })
  }
}