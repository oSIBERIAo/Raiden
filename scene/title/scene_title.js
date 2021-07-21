import {config} from '../../game/config.js'
import {randomBetween} from '../../game/utils.js'
import {GameScene} from '../../game/game_scene.js'
import {GameImage} from '../../game/game_image.js'
import {GameAnimation} from '../../game/game_animation.js'

import {Scene} from '../main/scene.js'

class SceneTitle extends GameScene {
    constructor(game) {
        super(game)
        this.game = game

        this.game.registerAction('k', () => {
            this.replceScene()
        })
        this.replceScene = function () {
            var start = new Scene(this.game)
            this.game.replceScene(start)
        }

        this.gameLable = GameLable.new(this.game, '开始，按K开始游戏')
        this.addElement(this.gameLable)

        // debugger
        this.gameAnimation = GameAnimation.new(this.game)
        this.addElement(this.gameAnimation)

        this.setupInputs()
    }
    draw() {
        super.draw()
    }
    setupInputs() {
        this.game.registerAction('a', (keyStatus) => {
            this.gameAnimation.moveLeft(keyStatus)
        })
        this.game.registerAction('d', (keyStatus) => {
            this.gameAnimation.moveRight(keyStatus)
        })
    }
}
class GameLable {
    constructor(game, text) {
        this.game = game
        this.text = text
        this.x = 10
        this.y = 20
    }
    static new(game, text) {
        var i = new this(game, text)
        return i
    }
    update() {
        if (this.game.scene.score > 0) {
            this.text = this.game.scene.score
        }
    }
    draw() {
        this.game.context.fillStyle = '#FF3300'
        this.game.context.font = '20px Helvetica'
        this.game.context.fillText(this.text, this.x, this.y)
    }
}
class GameParticleSystem {
    constructor(game, point) {
        this.game = game
        this.numberOfParticle = 40
        this.particles = []
        this.x = point.x
        this.y = point.y
        this.live = 100

        this.init()
    }
    static new(game, point) {
        var i = new this(game, point)
        return i
    }
    init() {}
    update() {
        if (this.particles.length < this.numberOfParticle) {
            let p = Particle.new(this.game, this)
            p.x = this.x
            p.y = this.y
            this.particles.push(p)
        }
        this.live--
        if (this.live < 0) {
            this.status = false
        }
        for (let p of this.particles) {
            p.update()
        }
        let statusCheck = function (elements) {
            return elements.status != false
        }
        this.particles = this.particles.filter(statusCheck)
    }
    draw() {
        for (let i = 0; i < this.particles.length; i++) {
            let p = this.particles[i]
            p.draw()
        }
    }
}
class Particle extends GameImage {
    constructor(game) {
        let name = 'particle'
        super(game, name)
        this.game = game
        this.lives = 80
        this.status = true

        this.setup()
    }
    setup() {
        this.speedX = randomBetween(-100, 100)
        this.speedY = randomBetween(-100, 100)
    }
    update() {
        this.lives--
        this.x += this.speedX / 100
        this.y += this.speedY / 100
        if (this.lives < 0) {
            this.status = false
        }
    }
    debug() {
        this.speed = randomBetween(-100, 100)
    }
}

export {SceneTitle, GameLable, GameParticleSystem, Particle}
