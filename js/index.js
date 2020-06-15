const video = document.getElementById("video")
const intro = document.getElementById("intro")
const dificulty = document.getElementById("dificulty")
const interface = document.getElementById("interface")
const credits = document.getElementById("credits")
const screen = document.getElementById("screen")
const play = document.getElementById("play")
const selectors = dificulty.querySelectorAll('.dificulty-selector')
const canvas = document.getElementById("canvas")
const gameOver = document.getElementById("gameOver")
const formScore = document.getElementById("formScore")
const loader = document.getElementById("loader")

const ctx = canvas.getContext("2d")

const saverBtn = document.getElementById("saverBtn")
const bestPlayer = document.getElementById("bestPlayer")
let theBest = JSON.parse(localStorage.getItem('score')) ? JSON.parse(localStorage.getItem('score')) : JSON.parse(JSON.stringify({
  name: 'A',
  score: 0
}))

const btnMute = document.getElementById('interface-mute')
const btnUnMute = document.getElementById('interface-unmute')
const btnPause = document.getElementById('interface-pause')
const btnPlay = document.getElementById('interface-play')
const btnCredits = document.getElementById('interface-credits')
const btnClose = document.getElementById('interface-close')
const btnRestar = document.getElementById('interface-restart')

setTimeout(() => {
  play.classList.toggle('animate__animated', 'animate__fadeIn')
  play.classList.toggle('animate__animated', 'animate__pulse')
}, 6000)

canvas.width = canvas.parentElement.clientWidth - 60
canvas.height = Math.round((canvas.width / 16) * 9)
intro.style.width = canvas.width + 'px'
intro.style.height = canvas.height + 'px'
dificulty.style.width = canvas.width + 'px'
dificulty.style.height = canvas.height + 'px'
credits.style.width = canvas.width + 'px'
credits.style.height = canvas.height + 'px'

video.width = canvas.width
video.height = canvas.height
video.removeAttribute("controls")

const game = new Game(ctx)
let DIFICULTY = 1

const hideIsShow = (parent) => {
  for (let i = 0; i < parent.childNodes.length; i++) {
    if (screen.childNodes[i].nodeType == 1 && !screen.childNodes[i].classList.contains('d-none')) {
      screen.childNodes[i].classList.add('d-none')
      return screen.childNodes[i]
    }

  }
}

selectors.forEach(select => {
  select.addEventListener("click", () => {

    video.play()
    dificulty.classList.toggle('d-none')
    video.classList.toggle('d-none')
    btnMute.classList.add('d-none')
    btnPlay.classList.add('d-none')
    setTimeout(() => {
      btnMute.classList.remove('d-none')
      btnPause.classList.remove('d-none')
      canvas.classList.toggle('d-none')
      video.classList.toggle('d-none')
      DIFICULTY = select.getAttribute('dificulty')
      game.start()
      setTimeout(() => {
        video.pause()
      }, 1400)
    }, 21000)
  })
})

play.addEventListener("click", () => {
  intro.classList.toggle('d-none')
  dificulty.classList.toggle('d-none')
})

btnPause.addEventListener("click", () => {
  game.pause()
  if (game.musicPlay) {
    game.music.pause()
  }
  btnPlay.classList.toggle('d-none')
  btnPause.classList.toggle('d-none')
})

btnPlay.addEventListener("click", () => {
  if (game._timeLine === 0) {
    oldWindow = hideIsShow(screen)
    video.pause()
    canvas.classList.remove('d-none')
  }
  if (game.musicPlay) {
    game.music.play()
  }
  game.start()
  btnPause.classList.toggle('d-none')
  btnPlay.classList.toggle('d-none')
})

btnMute.addEventListener("click", () => {
  game.musicPlay = false
  game.musicPlay = false
  btnMute.classList.toggle('d-none')
  btnUnMute.classList.toggle('d-none')
})

btnUnMute.addEventListener("click", () => {
  game.musicPlay = true
  game.musicPlay = true
  btnMute.classList.toggle('d-none')
  btnUnMute.classList.toggle('d-none')
})

let oldWindow = null
btnCredits.addEventListener("click", () => {
  if (game._timeLine !== 0) {
    game.pause()
    btnRestar.classList.toggle('d-none')
  }
  btnMute.classList.add('d-none')
  btnUnMute.classList.add('d-none')
  oldWindow = hideIsShow(screen)
  btnPause.classList.add('d-none')
  btnPlay.classList.add('d-none')
  credits.classList.toggle('d-none')
  btnCredits.classList.toggle('d-none')
  btnClose.classList.toggle('d-none')
})

btnClose.addEventListener("click", () => {
  if (game._timeLine !== 0) {
    game.start()
    btnRestar.classList.toggle('d-none')
    btnPause.classList.remove('d-none')
  } else {
    btnPlay.classList.remove('d-none')
  }
  if (game.musicPlay) {
    btnMute.classList.remove('d-none')
  } else {
    btnUnMute.classList.remove('d-none')
  }
  oldWindow.classList.toggle('d-none')
  credits.classList.toggle('d-none')
  btnCredits.classList.toggle('d-none')
  btnClose.classList.toggle('d-none')
})

btnRestar.addEventListener("click", () => {
  game.restart()
  btnPause.classList.remove('d-none')
  if (game.musicPlay) {
    btnMute.classList.remove('d-none')
  } else {
    btnUnMute.classList.remove('d-none')
  }
  btnClose.classList.toggle('d-none')
  gameOver.classList.toggle('d-none')
  formScore.classList.toggle('d-none')
  credits.classList.toggle('d-none')
  canvas.classList.toggle('d-none')
  btnRestar.classList.toggle('d-none')
  btnCredits.classList.toggle('d-none')
})


saverBtn.addEventListener('click', () => {
  const name = document.getElementById("nameInput").value;
  const score = document.getElementById("scoreInput").value;
  const level = DIFICULTY

  if (theBest.score <= score) {
    saverBtn.classList.add('disabled')
    saverBtn.innerText = 'SCORE SAVED'
    saverBtn.classList.remove('d-none')

    let playerScore = {
      name: name,
      score: score,
      level: level
    }
    localStorage.setItem('score', JSON.stringify(playerScore));

    setTimeout(() => {
      saverBtn.classList.remove('disabled')
      saverBtn.innerText = 'SAVE'
      theBest = JSON.parse(localStorage.getItem('score'))
      bestPlayer.innerHTML = `${theBest.name} - ${theBest.score} - LEVEL: ${theBest.level}`
    }, 500);
  } else {
    saverBtn.classList.add('d-none')
  }
})


window.onload = () => {
  setTimeout(() => {
    loader.classList.add('d-none')
  }, 1000);
  credits.classList.add('d-none')
  canvas.classList.add('d-none')
  dificulty.classList.add('d-none')
  video.classList.add('d-none')
  btnPause.classList.add('d-none')
  btnClose.classList.add('d-none')
  btnRestar.classList.add('d-none')
  btnUnMute.classList.add('d-none')

  if (theBest) {
    bestPlayer.innerHTML = `${theBest.name} - ${theBest.score} - LEVEL: ${theBest.level}`
    interface.children[3].querySelector('span').innerText = theBest.score
  }
}