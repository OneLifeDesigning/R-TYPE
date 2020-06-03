class Game {
  constructor(ctx) {
    this._ctx = ctx

    this._intervalId = null
    this._frames = 0

    this._bg = new Bg(ctx)
    this._player = new Player(ctx)
  }

  start() {
    this._intervalId = setInterval(() => {
      this._clear()
      this._draw()
      this._move()
    }, 1000 / 70);
  }

  getListeners() {
    document.addEventListener('keydown', () => {
      if (event.keyCode === KEY_LEFT) {
        // TODO
      } else if (event.keyCode === KEY_RIGHT) {
        // TODO
      }
    })
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
  }

  _move() {
    this._bg.move()
    this._player.move()
  }
}