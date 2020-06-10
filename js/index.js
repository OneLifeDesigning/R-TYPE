const video = document.getElementById("video")
const intro = document.getElementById("intro")
const dificulty = document.getElementById("dificulty")
const interface = document.getElementById("interface")
const play = document.getElementById("play")
const selectors = dificulty.querySelectorAll('.dificulty-selector')
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

setTimeout(() => {
  play.classList.remove('animate__animated', 'animate__fadeIn');
  play.classList.add('animate__animated', 'animate__pulse');
}, 6000);

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

play.addEventListener("click", () => {
  intro.classList.add('d-none')
  dificulty.classList.remove('d-none')

})
selectors.forEach(select => {
  select.addEventListener("click", () => {
    video.play()
    dificulty.classList.add('d-none')
    video.classList.remove('d-none')
    setTimeout(() => {
      canvas.classList.remove('d-none')
      interface.classList.remove('d-none')
      video.classList.add('d-none')
      game.start(select.getAttribute('dificulty'))
      setTimeout(() => {
        video.pause()
      }, 1400);
    }, 21000);
  })
});


window.onload = () => {
  intro.classList.add('d-none')
  game.start()
  // canvas.classList.add('d-none')
  interface.classList.add('d-none')
  dificulty.classList.add('d-none')
  video.classList.add('d-none')
}