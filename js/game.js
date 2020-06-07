class Game {
  constructor(ctx) {
    this._ctx = ctx

    this._intervalId = null
    this._timeLine = 0
    this._bg = new Bg(this._ctx, LEVEL_1_IMG_BG_1)
    this._player = new Player(this._ctx, IMG_PLAYER)
    this._weapon = new Weapons(this._ctx, this._player)


    this._terrainBottom = []
    this._terrainTop = []
    this._enemiesAll = []

    this._interface = new Interface()

    this.maxHeight = this._ctx.canvas.height - 60

    this._setListeners()
  }

  start() {
    this._addTerrain()
    this._intervalId = setInterval(() => {
      this._clear()
      this._draw()
      this._move()
    }, 1000 / 70)
  }
  stop() {
    this._intervalId = clearInterval()
  }

  _clear() {
    this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height)
  }

  _draw() {
    this._clear()
    this._weapon.removeShoots()
    this._removeEnemy()
    this._bg.draw()
    this._player.draw()
    this._weapon.draw()
    this._drawTerrain()
    this._addEnemies()
    this._drawAndMoveEnemies()
    this._interface.draw()
  }

  _move() {
    this._checkShoots()
    this._checkRuteEnemies()
    this._updateTerrain()
    this._bg.move()
    this._player.move()
    this._weapon.move()
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
          1
        )
      )
    }
    for (let i = 0; i < LEVEL_1_IMG_TERRAIN_BOTTOM.length; i++) {
      this._terrainBottom.push(
        new Terrain(
          this._ctx,
          LEVEL_1_IMG_TERRAIN_BOTTOM[i],
          i,
          0
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
    if (this._timeLine++ >= 100 && this._enemiesAll.length <= 6) {
      this._enemiesAll.push(
        new EnemyButterfly(
          this._ctx,
          this._randomNumber(
            this.maxHeight - (this.maxHeight / 4)
          ),
          IMG_ENEMY_BUTTERFLY
        )
      )
      this._timeLine = 0
    }
  }

  _drawAndMoveEnemies() {
    this._enemiesAll.forEach(enemy => {
      enemy.draw()
      enemy.move()
      if (this._checkCollisions(this._player, enemy)) {
        this._player.die()
        enemy.die()
      }
    })
  }
  _checkRuteEnemies() {
    this._terrainTop.forEach(tT => {
      this._terrainBottom.forEach(tB => {
        this._enemiesAll = this._enemiesAll.filter(enemy => {
          if (!this._checkCollisions(tT, enemy, 0) && !this._checkCollisions(tB, enemy, 0)) {
            return enemy
          }
        })
      })
    })
  }
  _removeEnemy() {
    this._enemiesAll = this._enemiesAll.filter(toErrase => {
      if (toErrase.isVisible()) {
        return toErrase
      }
    })
  }

  _checkCollisions(objectOne, objectTwo, fineTuning) {
    const colisionX = objectOne.x + objectOne.w >= objectTwo.x && objectOne.x <= objectTwo.x + (objectTwo.w - (fineTuning ? fineTuning : 25))
    const colisionY = objectOne.y + objectOne.h >= objectTwo.y && objectOne.y <= objectTwo.y + (objectTwo.h - (fineTuning ? fineTuning : 25))
    if (colisionX && colisionY) {
      return true
    }
  }
  _checkShoots() {
    this._weapon.shoots.map(thisShoot => {
      this._enemiesAll.forEach(enemyShooted => {
        if (this._checkCollisions(thisShoot, enemyShooted, 10)) {
          if (thisShoot.damage === enemyShooted.healt) {
            enemyShooted.die()
            thisShoot.x = this._ctx.canvas.width + thisShoot.w
          } else if (thisShoot.damage < enemyShooted.healt) {
            enemyShooted.healt -= thisShoot.damage
          } else {
            enemyShooted.die()
          }
        }
      })
      this._terrainTop.forEach(tT => {
        if (this._checkCollisions(thisShoot, tT, 0)) {
          thisShoot.x = this._ctx.canvas.width + thisShoot.w
        }
      })
      this._terrainBottom.forEach(tB => {
        if (this._checkCollisions(thisShoot, tB, 0)) {
          thisShoot.x = this._ctx.canvas.width + thisShoot.w
        }
      })
    })
  }
  _setListeners() {
    document.addEventListener('keydown', e => {
      if (e.keyCode === KEY_CTRL || e.keyCode === KEY_CMD) {
        this._weapon.shoot()
        this.timer = setInterval(() => {
          this._weapon.beamLoadShow()
          if (this.damage < 100) {
            this.damage += 10
          }
        }, 200);
      }
      if (e.keyCode === KEY_UP) {
        this._player.vy = -2
      } else if (e.keyCode === KEY_DOWN) {
        this._player.vy = +2
      } else if (e.keyCode === KEY_RIGHT) {
        this._player.vx = 2
      } else if (e.keyCode === KEY_LEFT) {
        this._player.vx = -2
      }
    })

    document.addEventListener('keyup', e => {
      if (e.keyCode === KEY_CTRL || e.keyCode === KEY_CMD) {

        clearInterval(this.timer)
        this._weapon.beamLoadStop()
        if (this.damage >= 10) {
          this._weapon.beam(this.damage)
        }
        this.damage = 0
      }
      if (e.keyCode === KEY_UP || e.keyCode === KEY_DOWN) {
        this._player.vy = 0
      } else if (e.keyCode === KEY_RIGHT && this._player.vx > 0) {
        this._player.vx = 0
      } else if (e.keyCode === KEY_LEFT && this._player.vx < 0) {
        this._player.vx = 0
      }
    })
  }
}