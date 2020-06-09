class Game {
  constructor(ctx) {
    this._ctx = ctx

    this._intervalId = null
    this._timeLine = null
    this._timeSupply = null

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
    this._erraseTerrain()
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
      terrainTop.draw()
      terrainTop.move()
      if (this._checkCollisions(this._player, terrainTop, 10)) {
        this._player.die()
      }
    })
    this._terrainBottom.forEach(terrainBottom => {
      terrainBottom.draw()
      terrainBottom.move()
      if (this._checkCollisions(this._player, terrainBottom, 10)) {
        this._player.die()
      }
    })
  }

  _erraseTerrain() {
    this._terrainTop = this._terrainTop.filter(oT =>
      oT.isVisible()
    )
    this._terrainBottom = this._terrainBottom.filter(oB =>
      oB.isVisible()
    )
  }

  // ENEMIES 
  _addEnemies() {
    if (this._timeSupply++ >= 100 && this._timeSupply <= 101) {
      this._enemiesAll.push(
        new EnemySupply(
          this._ctx,
          this.maxHeight - (this.maxHeight / 3),
          IMG_ENEMY_SUPPLY,
          IMG_ENEMY_SUPPLY_EXPLOSION
        )
      )
      this._timeSupply = 102
    }
    // if (this._timeLine++ >= 100 && this._enemiesAll.length <= 4) {
    //   this._enemiesAll.push(
    //     new EnemyButterfly(
    //       this._ctx,
    //       this._randomNumber(
    //         this.maxHeight - (this.maxHeight / 3)
    //       ),
    //       IMG_ENEMY_BUTTERFLY,
    //       IMG_ENEMY_BUTTERFLY_EXPLOSION
    //     )
    //   )
    //   this._timeLine = 0
    // }
  }

  _drawAndMoveEnemies() {
    this._enemiesAll.forEach(enemy => {
      enemy.draw()
      enemy.move()
      if (enemy.isCollisable()) {
        if (this._checkCollisions(this._player, enemy)) {
          if (enemy.isSupply()) {
            enemy.die()
          } else {
            this._player.die()
            enemy.die()
          }
        }
      }
    })
  }

  _checkRuteEnemies() {
    this._terrainTop.forEach(tT => {
      this._terrainBottom.forEach(tB => {
        this._enemiesAll.forEach(enemy => {
          if (enemy.isCollisable()) {
            if (this._checkCollisions(tT, enemy, 0) || this._checkCollisions(tB, enemy, 0)) {
              if (enemy.isWallker()) {
                enemy.walk()
              } else {
                enemy.die()
              }
            } else {
              return enemy
            }
          }
        })
      })
    })
  }

  _removeEnemy() {
    this._enemiesAll = this._enemiesAll.filter(enemy => {
      if (enemy.isVisible()) {
        return enemy
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
      this._enemiesAll.forEach(enemy => {
        if (enemy.isCollisable() && enemy.isShooteable()) {
          if (this._checkCollisions(thisShoot, enemy, 10)) {
            if (thisShoot.damage === enemy.healt) {
              enemy.die()
              if (enemy.isSupply()) {
                this._enemiesAll.push(new Armory(this._ctx, IMG_ARMORY_PACKAGE_01, enemy.x, enemy.y))
              }
              thisShoot.x = this._ctx.canvas.width + thisShoot.w
            } else if (thisShoot.damage < enemy.healt) {
              enemy.healt -= thisShoot.damage
            } else {
              enemy.die()
            }
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
      if (e.keyCode === KEY_ALT) {
        this._weapon.shoot()
        this.timer = setInterval(() => {
          this._weapon.beamLoadShow()
          if (this.damage < 100) {
            this.damage += 10
          }
        }, 150);
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
      if (e.keyCode === KEY_ALT) {
        clearInterval(this.timer)
        this._weapon.beamLoadStop()
        if (this.damage >= 10) {
          this._weapon.beam(this.damage)
        }
        this.damage = 0
        this.timer = clearInterval()
      }
      if (e.keyCode === KEY_UP || e.keyCode === KEY_DOWN) {
        this._player.vy = 0
      } else if (e.keyCode === KEY_RIGHT || e.keyCode === KEY_LEFT) {
        this._player.vx = 0
      }
    })
  }
}