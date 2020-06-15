const KEY_LEFT = 37
const KEY_UP = 38
const KEY_RIGHT = 39
const KEY_DOWN = 40
const KEY_ALT = 18
const KEY_SPACE = 32
const KEY_P = 80

const MOD_SPEED_SIZE = 1080 / (document.getElementById("canvas").parentElement.clientWidth)

let AUDIO = []

const GLOBAL_SPEED_X = (MOD_SPEED_SIZE >= 2 ? MOD_SPEED_SIZE / 4 : MOD_SPEED_SIZE)
const GLOBAL_SPEED_Y = (MOD_SPEED_SIZE >= 2 ? MOD_SPEED_SIZE / 4 : MOD_SPEED_SIZE)

const LEVEL_1_IMG_BG_1 = new Image()
LEVEL_1_IMG_BG_1.src = './img/backgrounds/bg1.png'

const LEVEL_1_IMG_BG_2 = new Image()
LEVEL_1_IMG_BG_2.src = './img/backgrounds/bg-planet.png'

const IMG_PLAYER = new Image()
IMG_PLAYER.src = './img/sprites/player.png'

const IMG_PLAYER_FIRE_MOTOR = new Image()
IMG_PLAYER_FIRE_MOTOR.src = './img/sprites/fire-motor.png'

const IMG_WEAPON_BULLET = new Image()
IMG_WEAPON_BULLET.src = './img/sprites/weapon-bullet.png'

const IMG_SHOT_BEAM = new Image()
IMG_SHOT_BEAM.src = './img/sprites/weapon-beam.png'

const IMG_SHOT_BEAM_LOAD = new Image()
IMG_SHOT_BEAM_LOAD.src = './img/sprites/weapon-beam-load.png'

const IMG_ENEMY_BUTTERFLY = new Image()
IMG_ENEMY_BUTTERFLY.src = './img/sprites/enemy-butterfly.png'

const IMG_ENEMY_GUNNER = new Image()
IMG_ENEMY_GUNNER.src = './img/sprites/enemy-gunner.png'

const IMG_ENEMY_GUNNER_MOTOR = new Image()
IMG_ENEMY_GUNNER_MOTOR.src = './img/sprites/enemy-gunner-motor.png'

const IMG_ENEMY_GUNNER_GHOST = new Image()
IMG_ENEMY_GUNNER_GHOST.src = './img/sprites/enemy-gunner-ghost.png'

const IMG_ENEMY_SUPPLY = new Image()
IMG_ENEMY_SUPPLY.src = './img/sprites/enemy-supply.png'

const IMG_ARMORY_PACKAGE_01 = new Image()
IMG_ARMORY_PACKAGE_01.src = './img/sprites/weapon-armory-01.png'

const IMG_TERRAIN_MOD_HIG = new Image()
IMG_TERRAIN_MOD_HIG.src = './img/terrain/level-1/mod-hig.png'
const IMG_TERRAIN_MOD_MID = new Image()
IMG_TERRAIN_MOD_MID.src = './img/terrain/level-1/mod-mid.png'
const IMG_TERRAIN_MOD_LOW_1 = new Image()
IMG_TERRAIN_MOD_LOW_1.src = './img/terrain/level-1/mod-low-0.png'
const IMG_TERRAIN_MOD_LOW_2 = new Image()
IMG_TERRAIN_MOD_LOW_2.src = './img/terrain/level-1/mod-low-1.png'
const IMG_TERRAIN_MOD_LOW_3 = new Image()
IMG_TERRAIN_MOD_LOW_3.src = './img/terrain/level-1/mod-low-2.png'
const IMG_TERRAIN_MOD_LOW_4 = new Image()
IMG_TERRAIN_MOD_LOW_4.src = './img/terrain/level-1/mod-low-3.png'
const IMG_TERRAIN_MOD_LOW_5 = new Image()
IMG_TERRAIN_MOD_LOW_5.src = './img/terrain/level-1/mod-low-4.png'
const IMG_TERRAIN_ENTRANCE_BAY_1 = new Image()
IMG_TERRAIN_ENTRANCE_BAY_1.src = './img/terrain/level-1/mod-entrance-bay-1.png'
const IMG_TERRAIN_ENTRANCE_BAY_2 = new Image()
IMG_TERRAIN_ENTRANCE_BAY_2.src = './img/terrain/level-1/mod-entrance-bay-2.png'

const OBJECT_EXPLOSIONS = [{
  type: 'supply',
  src: './img/sprites/explosion-enemy-small.png',
  audio: './sounds/explosion-enemy-small.wav',
  frames: 6
}, {
  type: 'butterfly',
  src: './img/sprites/explosion-enemy-medium.png',
  audio: './sounds/explosion-enemy-medium.wav',
  frames: 6
}, {
  type: 'gunner',
  src: './img/sprites/explosion-enemy-big.png',
  audio: './sounds/explosion-enemy-big.wav',
  frames: 8
}, {
  type: 'player',
  src: './img/sprites/explosion-player.png',
  audio: './sounds/explosion-player.wav',
  frames: 6
}, {
  type: 'shotEnemy',
  src: './img/sprites/explosion-shot-enemy.png',
  audio: './sounds/explosion-shot-enemy.wav',
  frames: 5
}, {
  type: 'beamEnemy',
  src: './img/sprites/explosion-beam-enemy.png',
  audio: './sounds/explosion-beam-enemy.wav',
  frames: 6
}, {
  type: 'shotPlayer',
  src: './img/sprites/explosion-shot-player.png',
  audio: './sounds/explosion-shot-player.wav',
  frames: 2
}, {
  type: 'beamPlayer',
  src: './img/sprites/explosion-beam-player.png',
  audio: './sounds/explosion-beam-player.wav',
  frames: 5
}, {
  type: 'bullet',
  src: './img/sprites/explosion-bullet.png',
  audio: './sounds/explosion-bullet.wav',
  frames: 6
}]

// TERRRAIN ARR GODD
const LEVEL_1_IMG_TERRAIN_TOP = [
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  IMG_TERRAIN_MOD_LOW_5,
  IMG_TERRAIN_MOD_LOW_4,
  IMG_TERRAIN_MOD_MID,
  IMG_TERRAIN_MOD_HIG,
  IMG_TERRAIN_MOD_LOW_3,
  IMG_TERRAIN_MOD_LOW_2,
  IMG_TERRAIN_MOD_MID,
  IMG_TERRAIN_MOD_LOW_1,
  IMG_TERRAIN_MOD_LOW_3,
  IMG_TERRAIN_MOD_LOW_2,
  IMG_TERRAIN_MOD_LOW_5,
  IMG_TERRAIN_ENTRANCE_BAY_1,
  IMG_TERRAIN_ENTRANCE_BAY_2,
  IMG_TERRAIN_MOD_LOW_1,
  IMG_TERRAIN_MOD_LOW_3,
  IMG_TERRAIN_MOD_LOW_2,
  IMG_TERRAIN_MOD_LOW_5,
]

const LEVEL_1_IMG_TERRAIN_BOTTOM = [
  IMG_TERRAIN_MOD_LOW_5,
  IMG_TERRAIN_MOD_LOW_2,
  IMG_TERRAIN_MOD_LOW_3,
  IMG_TERRAIN_MOD_LOW_4,
  IMG_TERRAIN_MOD_LOW_3,
  IMG_TERRAIN_MOD_HIG,
  IMG_TERRAIN_MOD_MID,
  IMG_TERRAIN_MOD_LOW_1,
  IMG_TERRAIN_MOD_LOW_3,
  IMG_TERRAIN_MOD_LOW_2,
  IMG_TERRAIN_MOD_LOW_5,
  IMG_TERRAIN_MOD_LOW_4,
  IMG_TERRAIN_MOD_MID,
  IMG_TERRAIN_MOD_HIG,
  IMG_TERRAIN_MOD_LOW_3,
  IMG_TERRAIN_MOD_LOW_2,
  IMG_TERRAIN_MOD_MID,
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  IMG_TERRAIN_MOD_LOW_5,
  IMG_TERRAIN_MOD_LOW_3,
  IMG_TERRAIN_MOD_MID,
  IMG_TERRAIN_MOD_LOW_4,
  IMG_TERRAIN_MOD_HIG,
  IMG_TERRAIN_MOD_LOW_2,
  IMG_TERRAIN_MOD_MID,
  IMG_TERRAIN_MOD_LOW_1,
  IMG_TERRAIN_MOD_LOW_3,
  IMG_TERRAIN_MOD_LOW_2,
  IMG_TERRAIN_MOD_LOW_5,
  IMG_TERRAIN_ENTRANCE_BAY_1,
  IMG_TERRAIN_ENTRANCE_BAY_2,
  IMG_TERRAIN_MOD_LOW_1,
  IMG_TERRAIN_MOD_LOW_3,
  IMG_TERRAIN_MOD_LOW_2,
  IMG_TERRAIN_MOD_LOW_5,
]

// TERRRAIN ARR TEST
// const LEVEL_1_IMG_TERRAIN_TOP = [
//   IMG_TERRAIN_ENTRANCE_BAY_1,
//   IMG_TERRAIN_ENTRANCE_BAY_2,
//   IMG_TERRAIN_ENTRANCE_BAY_1,
//   IMG_TERRAIN_ENTRANCE_BAY_2,
//   IMG_TERRAIN_ENTRANCE_BAY_1,
//   IMG_TERRAIN_ENTRANCE_BAY_2,
//   IMG_TERRAIN_ENTRANCE_BAY_1,
//   IMG_TERRAIN_ENTRANCE_BAY_2,
//   IMG_TERRAIN_ENTRANCE_BAY_1,
//   IMG_TERRAIN_ENTRANCE_BAY_2,
//   IMG_TERRAIN_ENTRANCE_BAY_1,
//   IMG_TERRAIN_ENTRANCE_BAY_2,
//   IMG_TERRAIN_ENTRANCE_BAY_1,
//   IMG_TERRAIN_ENTRANCE_BAY_2,
//   IMG_TERRAIN_ENTRANCE_BAY_1,
//   IMG_TERRAIN_ENTRANCE_BAY_2,
//   IMG_TERRAIN_ENTRANCE_BAY_1,
//   IMG_TERRAIN_ENTRANCE_BAY_2,
//   IMG_TERRAIN_ENTRANCE_BAY_1,
//   IMG_TERRAIN_ENTRANCE_BAY_2,
//   IMG_TERRAIN_ENTRANCE_BAY_1,
//   IMG_TERRAIN_ENTRANCE_BAY_2,
//   IMG_TERRAIN_ENTRANCE_BAY_1,
//   IMG_TERRAIN_ENTRANCE_BAY_2,
//   IMG_TERRAIN_MOD_LOW_5,
//   IMG_TERRAIN_MOD_LOW_4,
//   IMG_TERRAIN_MOD_MID,
//   IMG_TERRAIN_MOD_HIG,
//   IMG_TERRAIN_MOD_LOW_3,
//   IMG_TERRAIN_MOD_LOW_2,
//   IMG_TERRAIN_MOD_MID,
//   IMG_TERRAIN_MOD_LOW_1,
//   IMG_TERRAIN_MOD_LOW_3,
//   IMG_TERRAIN_MOD_LOW_2,
//   IMG_TERRAIN_MOD_LOW_5,
//   IMG_TERRAIN_ENTRANCE_BAY_1,
//   IMG_TERRAIN_ENTRANCE_BAY_2,
//   IMG_TERRAIN_MOD_LOW_1,
//   IMG_TERRAIN_MOD_LOW_3,
//   IMG_TERRAIN_MOD_LOW_2,
//   IMG_TERRAIN_MOD_LOW_5,
// ]

// const LEVEL_1_IMG_TERRAIN_BOTTOM = [
//   IMG_TERRAIN_ENTRANCE_BAY_1,
//   IMG_TERRAIN_ENTRANCE_BAY_2,
//   IMG_TERRAIN_ENTRANCE_BAY_1,
//   IMG_TERRAIN_ENTRANCE_BAY_2,
//   IMG_TERRAIN_ENTRANCE_BAY_1,
//   IMG_TERRAIN_ENTRANCE_BAY_2,
//   IMG_TERRAIN_ENTRANCE_BAY_1,
//   IMG_TERRAIN_ENTRANCE_BAY_2,
//   IMG_TERRAIN_ENTRANCE_BAY_1,
//   IMG_TERRAIN_ENTRANCE_BAY_2,
//   IMG_TERRAIN_ENTRANCE_BAY_1,
//   IMG_TERRAIN_ENTRANCE_BAY_2,
//   IMG_TERRAIN_ENTRANCE_BAY_1,
//   IMG_TERRAIN_ENTRANCE_BAY_2,
//   IMG_TERRAIN_ENTRANCE_BAY_1,
//   IMG_TERRAIN_ENTRANCE_BAY_2,
//   IMG_TERRAIN_ENTRANCE_BAY_1,
//   IMG_TERRAIN_ENTRANCE_BAY_2,
//   IMG_TERRAIN_ENTRANCE_BAY_1,
//   IMG_TERRAIN_ENTRANCE_BAY_2,
//   IMG_TERRAIN_ENTRANCE_BAY_1,
//   IMG_TERRAIN_ENTRANCE_BAY_2,
//   IMG_TERRAIN_ENTRANCE_BAY_1,
//   IMG_TERRAIN_ENTRANCE_BAY_2,
//   IMG_TERRAIN_MOD_LOW_3,
//   IMG_TERRAIN_MOD_MID,
//   IMG_TERRAIN_MOD_LOW_4,
//   IMG_TERRAIN_MOD_HIG,
//   IMG_TERRAIN_MOD_LOW_2,
//   IMG_TERRAIN_MOD_MID,
//   IMG_TERRAIN_MOD_LOW_1,
//   IMG_TERRAIN_MOD_LOW_3,
//   IMG_TERRAIN_MOD_LOW_2,
//   IMG_TERRAIN_MOD_LOW_5,
//   IMG_TERRAIN_ENTRANCE_BAY_1,
//   IMG_TERRAIN_ENTRANCE_BAY_2,
//   IMG_TERRAIN_MOD_LOW_1,
//   IMG_TERRAIN_MOD_LOW_3,
//   IMG_TERRAIN_MOD_LOW_2,
//   IMG_TERRAIN_MOD_LOW_5,
// ]