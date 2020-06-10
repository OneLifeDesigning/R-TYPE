const canvas = document.getElementById("canvas")

canvas.width = window.innerWidth >= 1040 ? canvas.width = 1040 : window.innerWidth
canvas.height = Math.round((canvas.width / 16) * 9)

const intro = document.getElementById("intro")
intro.style.width = canvas.width + 'px'
intro.style.height = canvas.height + 'px'

const play = document.getElementById("play")
const video = document.getElementById("video")
video.width = canvas.width
video.height = canvas.height

const interface = document.getElementById("interface")

const ctx = canvas.getContext("2d")

const game = new Game(ctx)

play.addEventListener("click", () => {
  video.play()
  intro.classList.add('d-none')
  video.classList.remove('d-none')
  setTimeout(() => {
    canvas.classList.remove('d-none')
    interface.classList.remove('d-none')
    video.classList.add('d-none')
    game.start()
    setTimeout(() => {
      video.stop()
    }, 1400);
  }, 21000);
})

window.onload = () => {
  canvas.classList.add('d-none')
  video.classList.add('d-none')
  interface.classList.add('d-none')
}