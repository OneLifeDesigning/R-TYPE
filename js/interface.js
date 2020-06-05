class Interface {
  constructor(maxScore, beam) {
    this.lives = 3
    this.beam = beam ? beam : 0
    this.score = 0
    this.maxScore = maxScore ? maxScore : 0
  }

  draw() {
    const interfaceDOM = document.getElementById('interface')
    interfaceDOM.children[0].innerText = this.lives
    interfaceDOM.children[1].innerText = this.beam
    interfaceDOM.children[2].innerText = this.score
    interfaceDOM.children[3].innerText = this.maxScore
  }
}