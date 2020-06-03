const canvas = document.getElementById("canvas")
canvas.width = (window.innerWidth - 20);
canvas.width >= 1200 ? canvas.width = 1200 : canvas.width
canvas.height = Math.round((canvas.width / 16) * 9);
const ctx = canvas.getContext("2d")
const game = new Game(ctx)
window.onload = () => {
  game.start()
};