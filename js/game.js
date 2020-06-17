class Game {
  constructor(ctx) {
    this._ctx = ctx

    this._timeLine = 0
    this._timeButterfy = 0
    this._timeCyborg = 0
    this._timeGunner = 0
    this._timeKamikaze = 0
    this._timeSupply = 0
    this._timeTerrain = 0
    this._tickShot = 0
    this._timerBeam = 0

    this.music = new Audio('./sounds/theme.m4a')
    this.music.volume = 0.2

    this.musicGameOver = new Audio('./sounds/game-over.wav')
    this.musicGameOver.volume = 0.4

    this.musicPlay = true

    this._bg = new Bg(this._ctx, LEVEL_1_IMG_BG_1)
    this._bgPlanet = new BgPlanet(this._ctx, LEVEL_1_IMG_BG_2)
    this._player = new Player(this._ctx, IMG_PLAYER, IMG_PLAYER_FIRE_MOTOR)
    this._weapon = new Weapon(this._ctx, this._player, IMG_SHOT_BEAM_LOAD)

    this._bullet = null

    this._terrainBottom = []
    this._terrainTop = []
    this._enemiesAll = []
    this._enemiesShots = []
    this._playerShots = []
    this._explosionsDies = []

    this.damage = 0

    this.tickLives = 1

    this._interface = new Interface(this.damage, theBest.score)
    this._interface.lives = this._player.lives

    this.maxHeight = this._ctx.canvas.height - 60

    this._setListeners()
  }

  start() {
    if (this.musicPlay) {
      this.music.play()
    }
    if (this._timeTerrain === 0) {
      this._addTerrain()
      this._timeTerrain = 1
    }
    this._timeLine = setInterval(() => {
      this._clear()
      this._draw()
      this._move()
      this._interface.update(this._player.lives)
      if (this._player.is('die')) {
        this.gameOver()
      } else {
        if (this.tickLives >= 1 && this._interface.score >= 5000 * this.tickLives) {
          this.tickLives = ++this.tickLives * this.tickLives
          this._player.lives += 1
          if (this.musicPlay) {
            this.liveSound = new Audio('./sounds/armory.wav')
            this.liveSound.play()
            this.musicGameOver.volume = 0.7
          }
        }
      }
    }, 1000 / 60)
  }

  restart() {
    if (this.musicPlay) {
      this.music.pause()
      this.music.currentTime = 0
    }
    this._timeLine = clearInterval(this._timeLine)
    this._bullet = null
    this._bg = new Bg(this._ctx, LEVEL_1_IMG_BG_1)
    this._bgPlanet = new BgPlanet(this._ctx, LEVEL_1_IMG_BG_2)
    this._player = new Player(this._ctx, IMG_PLAYER, IMG_PLAYER_FIRE_MOTOR)
    this._weapon = new Weapon(this._ctx, this._player, IMG_SHOT_BEAM_LOAD)

    this._terrainBottom = []
    this._terrainTop = []
    this._enemiesAll = []
    this._enemiesShots = []
    this._playerShots = []
    this._explosionsDies = []

    this._interface = new Interface(this.damage)
    this._interface.lives = this._player.lives

    this._clear();
    this.start();
  }

  pause() {
    if (this.musicPlay) {
      this.music.pause()
    }
    this._timeLine = clearInterval(this._timeLine)
    this._timeLine = 0
  }

  gameOver() {
    this.scoreMarker = document.getElementById("scoreInput").value = this._interface.score;
    this.pause()
    if (this.musicPlay) {
      this.music.pause()
      this.music.currentTime = 0
      this.musicGameOver.play()
    }
    this.musicPlay = false
    this.musicPlay = false


    btnCredits.classList.add('d-none')
    btnPause.classList.add('d-none')
    btnPlay.classList.add('d-none')
    btnMute.classList.add('d-none')
    btnUnMute.classList.add('d-none')
    btnRestar.classList.remove('d-none')

    if (this._interface.maxScore <= this._interface.score) {
      formScore.classList.remove('d-none')
    }
    gameOver.classList.remove('d-none')
    canvas.classList.add('d-none')
    credits.classList.remove('d-none')

    this._timeLine = clearInterval(this._timeLine)
  }

  _clear() {
    this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height)
  }

  _draw() {
    if (this.musicPlay) {
      this.music.play()
    } else {
      this.music.pause()
    }
    this._checkRutePlayer()
    this._checkRuteEnemies()
    this._removeIfNotVisible()
    this._clear()
    this._bg.draw()
    this._bgPlanet.draw()
    this._weapon.draw()
    this._player.draw()
    this._drawAndMoveTerrain()
    this._drawAndMoveShots()
    this._drawAndMoveEnemies()
    this._addShotEnemies()
    this._addEnemies()
    if (this._bullet) {
      this._checkRuteBullet()
    }
    if (this._bullet) {
      this._bullet.draw()
    }
    this._drawAndMoveExplosions()
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
    this._weapon.move(this._player.x + this._player.w * 0.8, this._player.y + this._player.h * 0.2)
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
    if (this._terrainBottom.length === 0 && this._terrainTop.length === 0) {
      this._addTerrain()
    }
  }

  _removeIfNotVisible() {
    this._enemiesAll = this._enemiesAll.filter(enemy => {
      if (!enemy.is('die')) {
        if (!enemy.isVisible() && enemy.is('butterfly')) {
          enemy.die()
        }
        return enemy
      } else {
        if (enemy.isVisible()) {
          this._addExplosion(enemy)
        } else {
          enemy.die()
        }
      }
    })
    this._enemiesShots = this._enemiesShots.filter(eShots => {
      if (!eShots.is('die')) {
        return eShots
      } else {
        if (eShots.isVisible()) {
          this._addExplosion(eShots)
        }
      }
    })
    this._playerShots = this._playerShots.filter(pShots => {
      if (!pShots.is('die')) {
        return pShots
      } else {
        if (pShots.isVisible()) {
          this._addExplosion(pShots)
        }
      }
    })
    this._terrainTop = this._terrainTop.filter(oT => {
      return oT.isVisible()
    })
    this._terrainBottom = this._terrainBottom.filter(tB => {
      return tB.isVisible()
    })
    this._explosionsDies = this._explosionsDies.filter(explosion => {
      if (!explosion.is('end')) {
        return explosion
      }
    })
  }

  // ENEMIES 
  _addEnemies() {
    if (!this._bullet && this._timeSupply++ >= 1000 && !this._enemiesAll.some(enemy => enemy.is('supply'))) {
      this._enemiesAll.push(
        new EnemySupply(
          this._ctx,
          this.maxHeight - (this.maxHeight / 3),
          IMG_ENEMY_SUPPLY
        )
      )
      this._timeSupply = 0
    }

    if (this._timeButterfy++ >= 200 && this._enemiesAll.length <= 4 * DIFICULTY) {
      for (let i = 0; i < 2 * DIFICULTY; i++) {
        this._enemiesAll.push(
          new EnemyButterfly(
            this._ctx,
            this._randomNumber(
              this._ctx.canvas.width / 2
            ),
            this._randomNumber(
              this.maxHeight - (this.maxHeight / 3)
            ),
            IMG_ENEMY_BUTTERFLY
          )
        )
      }
      this._timeButterfy = 0
    }
    if (this._timeKamikaze++ >= 200 && this._enemiesAll.length <= 4 * DIFICULTY) {
      for (let i = 0; i < DIFICULTY; i++) {
        this._enemiesAll.push(
          new EnemyKamikaze(
            this._ctx,
            this._randomNumber(
              this._ctx.canvas.width
            ),
            this._ctx.canvas.height - 120,
            IMG_ENEMY_KAMIKAZE
          )
        )
      }
      this._timeKamikaze = 0
    }

    if (this._timeCyborg++ >= 200 && (this._enemiesAll.length <= 10 * DIFICULTY)) {
      for (let i = 0; i < 2 * DIFICULTY; i++) {
        this._enemiesAll.push(
          new EnemyCyborg(
            this._ctx,
            this._randomNumber(
              this._ctx.canvas.width / 2
            ),
            this._randomNumber(
              this.maxHeight - (this.maxHeight / 2)
            ),
            IMG_ENEMY_CYBORG
          )
        )
      }
      this._timeCyborg = 0
    }
    if (this._timeGunner++ >= 1500 && !this._enemiesAll.some(enemy => enemy.is('gunner'))) {
      this._enemiesAll.push(
        new EnemyGunner(
          this._ctx,
          IMG_ENEMY_GUNNER,
          IMG_ENEMY_GUNNER_MOTOR,
          IMG_ENEMY_GUNNER_GHOST
        )
      )
      this._timeGunner = 0
    }
  }

  _drawAndMoveEnemies() {
    this._enemiesAll.forEach(enemy => {
      enemy.draw()
      if (enemy.is('gunner') || enemy.is('cyborg') || enemy.is('kamikaze')) {
        enemy.move(this._player.x, this._player.y)
      } else {
        enemy.move()
      }
    })
  }


  // CHECK ROUTES ALL ELEMENTS WITH TERRAIN AND PLAYER WITH BULLET
  _checkRutePlayer() {
    if (this._player.is('collisable')) {
      this._checkCollisionsObjectWithTerrainArr(this._terrainTop, this._player)
      this._checkCollisionsObjectWithTerrainArr(this._terrainBottom, this._player)
    }
    if (this._player.is('reload')) {
      this._addExplosion(this._player)
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
    if (this._bullet && this._bullet.is('die')) {
      this._addExplosion(this._bullet)
      this._bullet = null
      this._timeSupply = 0
    }
  }

  _checkRuteEnemies() {
    this._enemiesAll.forEach(enemy => {
      if (!enemy.is('walker')) {
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
      } else {
        if (enemy.is('supply') && this._checkCollisionsObjToObject(this._player, enemy)) {
          this._resolveCollisionPltoEnemy(this._player, enemy)
        }
        if (enemy.is('kamikaze') && this._checkCollisionsObjToObject(this._player, enemy)) {
          this._resolveCollisionPltoEnemy(this._player, enemy)
        }
        if (enemy.is('gunner') && this._checkCollisionsObjToObject(this._player, enemy)) {
          this._player.die()
        }
        this._checkCollisionsWalkerWithTerrain(enemy)
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
  _checkCollisionsWalkerWithTerrain(object) {
    if (this._terrainBottom.some(terrainEl => this._checkCollisionsObjToObject(object, terrainEl)) ||
      this._terrainTop.some(terrainEl => this._checkCollisionsObjToObject(object, terrainEl))) {
      object.doTerreain()
    } else {
      object.undoTerrain()
    }
  }

  // RESOLVE COLLISIONS
  _resolveCollisionsObjectWithTerrain(object, terrainTop) {
    if (object.is('walker') || object.is('kamikaze')) {
      if (!terrainTop) {
        object.walk()
      } else {
        object.die()
      }
    } else if (object.is('player')) {
      object.die()
    } else if (object.is('bullet')) {
      object.toFixed()
    } else {
      object.die()
    }
  }


  _resolveCollisionPltoEnemy(object, enemy) {
    if (!enemy.is('armory')) {
      if (object.is('player')) {
        object.die()
      }
      if (enemy.is('supply')) {
        this._enemiesAll.push(new Armory(this._ctx, IMG_ARMORY_PACKAGE_01, enemy.x, enemy.y))
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
      if (Math.floor(Math.random() * Math.floor(100)) >= (98 - DIFICULTY) && enemy.is('shooter') && enemy.is('flyer') && enemy.isVisible() && this._tickShot++ >= 10) {
        this._enemiesShots.push(enemy.shotEnemy(enemy, this._player))
        this._tickShot = 0
      } else if (enemy.is('gunner') && enemy.is('shooter') && enemy.readyToShot()) {
        this._enemiesShots.push(enemy.shotEnemy(enemy.x, enemy.y))
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
        eS.move(eS.shooter)
      }
    })
  }

  _checkShots() {
    this._playerShots.forEach(shotFromPlayer => {
      this._enemiesAll.forEach(enemy => {
        if (enemy.is('killable') && !enemy.is('armory') && this._checkCollisionsObjToObject(shotFromPlayer, enemy, 10)) {
          this._resolveHits(shotFromPlayer, enemy)
        }
      })
      this._checkCollisionsObjectWithTerrainArr(this._terrainTop, shotFromPlayer)
      this._checkCollisionsObjectWithTerrainArr(this._terrainBottom, shotFromPlayer)
    })
    this._enemiesShots.forEach(shotFromEnemy => {
      if (this._player.is('killable') && this._checkCollisionsObjToObject(this._player, shotFromEnemy, 10)) {
        this._resolveHits(shotFromEnemy, this._player)
      }
      if (this._bullet && this._checkCollisionsObjToObject(this._bullet, shotFromEnemy)) {
        this._resolveHits(shotFromEnemy, this._bullet)
      }
      this._checkCollisionsObjectWithTerrainArr(this._terrainTop, shotFromEnemy)
      this._checkCollisionsObjectWithTerrainArr(this._terrainBottom, shotFromEnemy)
    })
  }

  _resolveHits(shot, shooted) {
    if (shooted.is('player')) {
      shot.die()
      shooted.die()
      if (shooted.points) {
        this._interface.score += shooted.points
      }
    } else {
      if (shot.damage < shooted.healt) {
        shooted.healt -= shot.damage
        if (shooted.healt <= 0) {
          shooted.die()
          if (shooted.points) {
            this._interface.score += shooted.points
          }
        }
        shot.die()
      } else {
        if (shot.damage === shooted.healt) {
          shot.die()
        }
        if (shooted.points) {
          this._interface.score += shooted.points
        }
        shooted.die()
      }
      if (shooted.is('supply')) {
        this._enemiesAll.push(new Armory(this._ctx, IMG_ARMORY_PACKAGE_01, shooted.x, shooted.y))
      }
    }
  }

  // EXPLOSIONS
  _addExplosion(object) {
    this._explosionsDies.push(new Explosions(this._ctx, object, OBJECT_EXPLOSIONS))
  }

  _drawAndMoveExplosions() {
    this._explosionsDies.forEach(explosion => {
      explosion.draw()
      explosion.move()
    })
  }

  _setListeners() {
    document.addEventListener('keydown', e => {
      if (this._timeLine !== 0) {
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
          clearInterval(this._timerBeam)
          this._weapon.beamLoadHide()
          this._timerBeam = setInterval(() => {
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
          this._player.vy = -GLOBAL_SPEED_Y * 2
        } else if (e.keyCode === KEY_DOWN) {
          this._player.vy = +GLOBAL_SPEED_Y * 2
        } else if (e.keyCode === KEY_RIGHT && !this._player.is('respawn')) {
          this._player.vx = +GLOBAL_SPEED_X * 2
        } else if (e.keyCode === KEY_LEFT && !this._player.is('respawn')) {
          this._player.vx = -GLOBAL_SPEED_X * 2
        }
      }
    })

    document.addEventListener('keyup', e => {
      if (game._timeLine !== 0) {
        if (e.keyCode === KEY_ALT) {
          if (this.damage >= 10) {
            this._playerShots.push(this._weapon.beam(this.damage))
          }
          clearInterval(this._timerBeam)
          this._timerBeam = 0

          this.damage = 0
          this._interface.beam = this.damage
          this._weapon.beamLoadHide()

        }
        if (e.keyCode === KEY_UP || e.keyCode === KEY_DOWN) {
          this._player.vy = 0
        } else if ((e.keyCode === KEY_RIGHT || e.keyCode === KEY_LEFT) && !this._player.is('respawn')) {
          this._player.vx = 0
        }
      }
    })
  }
}