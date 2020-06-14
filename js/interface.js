class Interface {
  constructor(maxScore, beam) {
    this.lives = 0
    this.oldLives = 0
    this.beam = beam ? beam : 0
    this.score = 0
    this.maxScore = maxScore ? maxScore : 0
    this.tick = 0
    this.interfaceDOM = document.getElementById('interface')
    this.spanLives = this.interfaceDOM.children[0].querySelector('span')
  }

  appendLives() {
    this.spanLives.innerHTML = ''
    for (let index = 1; index <= this.lives; index++) {
      this.iconLives = new Image()
      this.iconLives.src = './img/interface/lives.png'
      this.iconLives.classList.add('img-fluid')
      this.spanLives.appendChild(this.iconLives)
    }
  }

  update() {
    if (this.oldLives !== this.lives) {
      this.appendLives()
      this.oldLives = this.lives
    }

    this.interfaceDOM.children[1].querySelector('span').innerHTML = `<div class="progress"><div class="progress-bar${this.beam === 100 ? ' full' : ''}" role="progressbar" style="width: ${this.beam}%" aria-valuenow="${this.beam}" aria-valuemin="0" aria-valuemax="100"></div></div>`

    this.interfaceDOM.children[2].querySelector('span').innerText = this.score

    if (this.maxScore >= this.score) {
      this.interfaceDOM.children[3].querySelector('span').innerText = this.maxScore
    } else {
      this.interfaceDOM.children[3].querySelector('span').innerText = this.secore
    }

  }
}