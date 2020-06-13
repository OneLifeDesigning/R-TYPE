class Game {
  constructor(ctx) {
    this._ctx = ctx

    this._timeLine = null
    this._timeEnemies = null
    this._timeSupply = null
    this.tickShot = 0

    this._bg = new Bg(this._ctx, LEVEL_1_IMG_BG_1)
    this._bgPlanet = new BgPlanet(this._ctx, LEVEL_1_IMG_BG_2)
    this._player = new Player(this._ctx, IMG_PLAYER, IMG_PLAYER_FIRE_MOTOR, IMG_ENEMY_BUTTERFLY_EXPLOSION)
    this._weapon = new Weapon(this._ctx, this._player)
    this._bullet = null

    this._terrainBottom = []
    this._terrainTop = []
    this._enemiesAll = []
    this._enemiesShots = []
    this._playerShots = []

    this.damage = 0


    this.maxScore = MAX_SCORE[0][1]

    this._interface = new Interface(this.maxScore, this.damage)

    this.maxHeight = this._ctx.canvas.height - 60

    this._setListeners()
  }

  start() {
    this._addTerrain()
    this._timeLine = setInterval(() => {
      this._clear()
      this._draw()
      this._move()
    }, 1000 / 70)
  }
  stop() {
    setTimeout(() => {
      this._timeLine = clearInterval(this._timeLine)
    }, 500);
  }

  _clear() {
    this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height)
  }

  _draw() {
    this._checkRutePlayer()
    this._checkRuteEnemies()
    this._removeIfNotVisible()
    this._clear()
    this._bg.draw()
    this._bgPlanet.draw()
    this._player.draw()
    this._weapon.draw()
    this._drawAndMoveTerrain()
    this._drawAndMoveEnemies()
    this._drawAndMoveShots()
    this._addEnemies()
    this._addShotEnemies()
    if (this._bullet) {
      this._checkRuteBullet()
      this._bullet.draw()
    }
    this._interface.draw()
  }

  _move() {
    this._checkShots()
    this._checkRutePlayer()
    this._bg.move()
    this._bgPlanet.move()
    if (this._bullet) {
      this._bullet.move(this._player.x + this._player.w, this._player.y)
    }
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
          true
        )
      )
    }
    for (let i = 0; i < LEVEL_1_IMG_TERRAIN_BOTTOM.length; i++) {
      this._terrainBottom.push(
        new Terrain(
          this._ctx,
          LEVEL_1_IMG_TERRAIN_BOTTOM[i],
          i,
          false
        )
      )
    }
  }

  _drawAndMoveTerrain() {
    this._terrainTop.forEach(terrainTop => {
      terrainTop.draw()
      terrainTop.move()
    })

    this._terrainBottom.forEach(terrainBottom => {
      terrainBottom.draw()
      terrainBottom.move()
    })
  }

  _removeIfNotVisible() {
    this._terrainTop = this._terrainTop.filter(oT => {
      return oT.isVisible()
    })
    this._terrainBottom = this._terrainBottom.filter(tB => {
      return tB.isVisible()
    })
    this._enemiesAll = this._enemiesAll.filter(enemy => {
      if (!enemy.is('die')) {
        return enemy.isVisible()
      }
    })
    this._enemiesShots = this._enemiesShots.filter(eShots => {
      if (!eShots.is('die')) {
        return eShots
      }
    })
    this._playerShots = this._playerShots.filter(pShots => {
      if (!pShots.is('die')) {
        return pShots
      }
    })
    if (this._bullet && this._bullet.is('die')) {
      this._bullet = null
      this._timeSupply = 0
    }
  }

  // ENEMIES 
  _addEnemies() {
    // if (!this._bullet && (this._timeSupply++ === 700)) {
    //   this._enemiesAll.push(
    //     new EnemySupply(
    //       this._ctx,
    //       this.maxHeight - (this.maxHeight / 3),
    //       IMG_ENEMY_SUPPLY,
    //       IMG_ENEMY_SUPPLY_EXPLOSION
    //     )
    //   )
    //   if (MAX_TIME_LINE <= this._timeSupply) {
    //     this._timeSupply = 0
    //   }
    // }

    if (this._timeEnemies++ >= 100 && this._enemiesAll.length <= 4) {
      this._enemiesAll.push(
        new EnemyButterfly(
          this._ctx,
          this._randomNumber(
            this.maxHeight - (this.maxHeight / 3)
          ),
          IMG_ENEMY_BUTTERFLY,
          IMG_ENEMY_BUTTERFLY_EXPLOSION,
          this._player,
          Math.random() >= 0.5
        )
      )
      this._timeEnemies = 0
    }
  }

  _drawAndMoveEnemies() {
    this._enemiesAll.forEach(enemy => {
      enemy.draw()
      enemy.move()
    })
  }


  // CHECK ROUTES ALL ELEMENTS WITH TERRAIN AND PLAYER WITH BULLET
  _checkRutePlayer() {
    if (this._player.is('collisable')) {
      this._checkCollisionsObjectWithTerrainArr(this._terrainTop, this._player)
      this._checkCollisionsObjectWithTerrainArr(this._terrainBottom, this._player)
    }
  }

  _checkRuteBullet() {
    if (this._bullet) {
      this._checkCollisionsObjectWithTerrainArr(this._terrainBottom, this._bullet)
      this._checkCollisionsObjectWithTerrainArr(this._terrainTop, this._bullet)
      if (this._checkCollisionsObjToObject(this._bullet, this._player)) {
        this._bullet.toFixed()
      }
    }
  }

  _checkRuteEnemies() {
    this._enemiesAll.forEach(enemy => {
      if (enemy.is('collisable')) {
        this._checkCollisionsObjectWithTerrainArr(this._terrainTop, enemy)
        this._checkCollisionsObjectWithTerrainArr(this._terrainBottom, enemy)
        if (this._player.is('collisable') && this._checkCollisionsObjToObject(this._player, enemy)) {
          this._resolveCollisionPltoEnemy(this._player, enemy)
        }
        if (this._bullet) {
          if (this._checkCollisionsObjToObject(this._bullet, enemy)) {
            this._resolveCollisionPltoEnemy(this._bullet, enemy)
          }
        }
      }
    })
  }

  // CHECK COLLISIONS 
  _checkCollisionsObjToObject(objectOne, objectTwo, fineTuning) {
    const colisionX = objectOne.x + objectOne.w - (fineTuning ? fineTuning : 10) >= objectTwo.x && objectOne.x <= objectTwo.x + (objectTwo.w - (fineTuning ? fineTuning : 10))
    const colisionY = objectOne.y + objectOne.h - (fineTuning ? fineTuning : 10) >= objectTwo.y && objectOne.y <= objectTwo.y + (objectTwo.h - (fineTuning ? fineTuning : 15))
    if (colisionX && colisionY) {
      return true
    }
  }

  _checkCollisionsObjectWithTerrainArr(terrain, object) {
    terrain.forEach(terrainEl => {
      if (this._checkCollisionsObjToObject(object, terrainEl)) {
        this._resolveCollisionsObjectWithTerrain(object, terrainEl.isTop)
      }
    })
  }

  // RESOLVE COLLISIONS
  _resolveCollisionsObjectWithTerrain(object, terrainTop) {
    if (object.is('walker')) {
      if (!terrainTop) {
        object.walk()
      } else {
        object.die()
      }
    } else if (object.is('player')) {
      this._interface.lives--
      object.die()
    } else if (object.is('bullet')) {
      object.toFixed()
      //  TODO: The boss arent collisable moveOtherPosition
      // } else if (object.is('boss')) {
      //   object.moveOtherPosition()
    } else {
      object.die()
    }
  }


  _resolveCollisionPltoEnemy(object, enemy) {
    if (!enemy.is('armory')) {
      if (object.is('player')) {
        this._interface.lives--
        object.die()
      }
      if (object.damage >= enemy.healt) {
        enemy.die()
        if (object.is('bullet')) {
          this._interface.score += enemy.points * 5
          if (object.healt <= 1) {
            object.die()
          }
          object.healt -= enemy.damage
        } else {
          this._interface.score += enemy.points
        }
      } else {
        enemy.healt -= object.damage
        object.healt -= enemy.damage
      }
    } else {
      this._bullet = new Bullet(this._ctx, this._player, IMG_WEAPON_BULLET)
      enemy.die()
    }
  }

  // SHOOTS
  _addShotEnemies() {
    this._enemiesAll.forEach(enemy => {
      if (Math.floor(Math.random() * Math.floor(100)) >= 99 && enemy.is('shooter') && enemy.isVisible() && this.tickShot++ >= 10) {
        this._enemiesShots.push(enemy.shotEnemy(enemy, this._player))
        this.tickShot = 0
      }
    })
  }

  _drawAndMoveShots() {
    this._playerShots.forEach(pS => {
      if (pS) {
        pS.draw()
        pS.move()
      }
    })
    this._enemiesShots.forEach(eS => {
      if (eS) {
        eS.draw()
        eS.move()
      }
    })
  }

  _checkShots() {
    // this._playerShots.forEach(shotFromPlayer => {
    //   this._enemiesAll.forEach(enemy => {
    //     if (enemy.is('killable') && !enemy.is('armory') && this._checkCollisionsObjToObject(shotFromPlayer, enemy, 10)) {
    //       this._resolveHits(shotFromPlayer, enemy)
    //     }
    //   })
    //   this._checkCollisionsObjectWithTerrainArr(this._terrainTop, shotFromPlayer)
    //   this._checkCollisionsObjectWithTerrainArr(this._terrainBottom, shotFromPlayer)
    // })
    this._enemiesShots.forEach(shotFromEnemy => {
      if (this._player.is('killable') && this._checkCollisionsObjToObject(this._player, shotFromEnemy, 10)) {
        this._resolveHits(shotFromEnemy, this._player)
      }
      if (this._bullet && this._checkCollisionsObjToObject(this._bullet, shotFromEnemy)) {
        this._resolveHits(this._bullet, shotFromEnemy)
      }
      this._checkCollisionsObjectWithTerrainArr(this._terrainTop, shotFromEnemy)
      this._checkCollisionsObjectWithTerrainArr(this._terrainBottom, shotFromEnemy)
    })
  }

  _resolveHits(shot, shooted) {
    if (shooted.is('player')) {
      shooted.die()
      shot.die()
    } else {
      if (shot.damage <= shooted.healt) {
        shooted.healt -= shot.damage
        if (shooted.healt <= 0) {
          shooted.die()
          if (shooted.points) {
            this._interface.score += shooted.points
          }
        }
        shot.die()
      } else {
        shooted.die()
      }

      if (shooted.is('supply')) {
        // shot.die()
        this._enemiesAll.push(new Armory(this._ctx, IMG_ARMORY_PACKAGE_01, shooted.x, shooted.y))
      }
    }
  }



  _setListeners() {
    document.addEventListener('keydown', e => {
      if (e.keyCode === KEY_SPACE && this._bullet) {
        if (this._bullet.isFixed()) {
          this._bullet.toUnfixed()
        } else {
          this._bullet.toFixed()
        }
      }
      if (e.keyCode === KEY_ALT) {
        if (this._bullet) {
          this._playerShots.push(this._bullet.shot())
        }
        this._playerShots.push(this._weapon.shot())
        this.timer = setInterval(() => {
          if (this._bullet) {
            this._playerShots.push(this._bullet.shot())
          }
          this._weapon.beamLoadShow()
          if (this.damage < 100) {
            this.damage += 10
          }
          this._interface.beam = this.damage
        }, 150)
      }
      if (e.keyCode === KEY_UP) {
        this._player.vy = -2
      } else if (e.keyCode === KEY_DOWN) {
        this._player.vy = +2
      } else if (e.keyCode === KEY_RIGHT && !this._player.is('respawn')) {
        this._player.vx = +2
      } else if (e.keyCode === KEY_LEFT && !this._player.is('respawn')) {
        this._player.vx = -2
      }
    })

    document.addEventListener('keyup', e => {
      if (e.keyCode === KEY_ALT) {
        clearInterval(this.timer)
        this._weapon.beamLoadStop()
        if (this.damage >= 10) {
          this._playerShots.push(this._weapon.beam(this.damage))
        }
        this.damage = 0
        this._interface.beam = this.damage
        this.timer = clearInterval()
      }
      if (e.keyCode === KEY_UP || e.keyCode === KEY_DOWN) {
        this._player.vy = 0
      } else if ((e.keyCode === KEY_RIGHT || e.keyCode === KEY_LEFT) && !this._player.is('respawn')) {
        this._player.vx = 0
      }
    })
  }
}