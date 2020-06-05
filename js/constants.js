const KEY_LEFT = 37
const KEY_UP = 38
const KEY_RIGHT = 39
const KEY_DOWN = 40
const KEY_SPACE = 32
const KEY_CTRL = 17
const KEY_CMD = 91

const KEY_P = 80

const LEVEL_1_IMG_BG_1 = new Image()
LEVEL_1_IMG_BG_1.src = './img/backgrounds/bg1.png'

const IMG_PLAYER = new Image()
IMG_PLAYER.src = './img/sprites/player.png'
const IMG_WEAPON_SHOOT = new Image()
IMG_WEAPON_SHOOT.src = './img/sprites/weapon-shoot.png'

const IMG_ENEMY_BUTTERFLY = new Image()
IMG_ENEMY_BUTTERFLY.src = './img/sprites/enemy-butterfly-2.png'


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