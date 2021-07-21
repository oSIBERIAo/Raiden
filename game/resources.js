let imagesSrc = {
    ball: 'img/ball.png',
    paddle: 'img/paddle.png',
    block: 'img/block.png',
    bg: 'img/bg.png',
    particle: 'img/particle.png',
}

const importImagesBySrc = function (name, src, number) {
    let result = {}
    for (let index = 0; index <= number; index++) {
        let k = name + index
        let v = src + index + '.png'
        result[k] = v
    }
    return result
}

let bullet = importImagesBySrc('bullet', 'img/bullet', 2)
let player = importImagesBySrc('player', 'img/player/player', 4)
let enemy = importImagesBySrc('enemy', 'img/enemy/enemy', 9)
let idle = importImagesBySrc('idle', 'img/animation/Idle', 15)
let run = importImagesBySrc('run', 'img/animation/Run', 10)

imagesSrc = Object.assign(imagesSrc, bullet, player, enemy, idle, run)

export {imagesSrc}
