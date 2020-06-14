const video = document.getElementById("video")
const intro = document.getElementById("intro")
const dificulty = document.getElementById("dificulty")
const interface = document.getElementById("interface")
const play = document.getElementById("play")
const selectors = dificulty.querySelectorAll('.dificulty-selector')
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const btnMute = document.getElementById('interface-mute')
const btnUnMute = document.getElementById('interface-unmute')
const btnPause = document.getElementById('interface-pause')
const btnPlay = document.getElementById('interface-play')
const btnSettings = document.getElementById('interface-settings')

setTimeout(() => {
  play.classList.remove('animate__animated', 'animate__fadeIn')
  play.classList.add('animate__animated', 'animate__pulse')
}, 6000)

canvas.width = canvas.parentElement.clientWidth - 60
canvas.height = Math.round((canvas.width / 16) * 9)
intro.style.width = canvas.width + 'px'
intro.style.height = canvas.height + 'px'
dificulty.style.width = canvas.width + 'px'
dificulty.style.height = canvas.height + 'px'

video.width = canvas.width
video.height = canvas.height
video.removeAttribute("controls")

const game = new Game(ctx)
let DIFICULTY = 1

selectors.forEach(select => {
  select.addEventListener("click", () => {
    video.play()
    dificulty.classList.add('d-none')
    video.classList.remove('d-none')
    setTimeout(() => {
      canvas.classList.remove('d-none')
      interface.classList.remove('d-none')
      video.classList.add('d-none')
      DIFICULTY = select.getAttribute('dificulty')
      game.start()
      setTimeout(() => {
        video.pause()
      }, 1400)
    }, 21000)
  })
})

play.addEventListener("click", () => {
  intro.classList.add('d-none')
  dificulty.classList.remove('d-none')
})

btnPause.addEventListener("click", () => {
  game.pause()
  game.soundsPlay = false
  game.music.pause()
  btnPlay.classList.remove('d-none')
  btnPause.classList.add('d-none')
})

btnPlay.addEventListener("click", () => {
  game.start()
  game.soundsPlay = true
  game.music.pause()
  btnPause.classList.remove('d-none')
  btnPlay.classList.add('d-none')
})

btnMute.addEventListener("click", () => {
  game.soundsPlay = false
  game.music.pause()
  btnMute.classList.add('d-none')
  btnUnMute.classList.remove('d-none')
})

btnUnMute.addEventListener("click", () => {
  game.soundsPlay =
    game.music.play()
  btnUnMute.classList.add('d-none')
  btnMute.classList.remove('d-none')
})

window.onload = () => {
  intro.classList.add('d-none')
  game.start()
  // canvas.classList.add('d-none')
  // interface.classList.add('d-none')
  btnPlay.classList.add('d-none')
  btnUnMute.classList.add('d-none')
  dificulty.classList.add('d-none')
  video.classList.add('d-none')
}