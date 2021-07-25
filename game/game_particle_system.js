import {randomBetween} from './utils.js'
import {GameImage} from './game_image.js'

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

export {GameParticleSystem, Particle}
