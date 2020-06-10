class Interface {
  constructor(maxScore, beam) {
    this.lives = 3
    this.beam = beam ? beam : 0
    this.score = 0
    this.maxScore = maxScore ? maxScore : 0
  }

  draw() {
    const interfaceDOM = document.getElementById('interface')
    interfaceDOM.children[0].querySelector('span').innerText = this.lives
    interfaceDOM.children[1].querySelector('span').innerText = this.beam
    interfaceDOM.children[2].querySelector('span').innerText = this.score
    interfaceDOM.children[3].querySelector('span').innerText = this.maxScore
  }
}