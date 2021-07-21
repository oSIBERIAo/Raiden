import {randomBetween} from './utils.js'
import {config} from './config.js'

class GameImage {
    constructor(game, name) {
        this.game = game
        this.texture = this.game.textureByName(name)
        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.h = this.texture.height
        this.status = true
    }
    static new(game, name) {
        var i = new this(game, name)
        return i
    }
    update() {}
    draw() {
        this.game.drawImage(this)
    }
}

class Player extends GameImage {
    constructor(game) {
        let name = `player${randomBetween(0, 4)}`
        super(game, name)
        this.setup()
    }

    static new(game, name) {
        var i = new this(game, name)
        return i
    }

    setup() {
        this.x = this.game.canvas.width / 2 - this.w / 2
        this.y = this.game.canvas.height - this.h - 30

        this.speed = config.player_speed
        this.cooldown = config.player_cooldown
    }

    update() {
        if (this.cooldown > 0) {
            this.cooldown--
        }
    }

    debug() {
        this.speed = config.player_speed
    }

    fire() {
        if (this.cooldown == 0) {
            this.cooldown = config.player_cooldown
            let bullet = Bullet.new(this.game)
            bullet.x = this.x + this.w / 2 - bullet.w / 2
            bullet.y = this.y - 35
            this.game.scene.addElement(bullet)
        }
    }

    moveLeft() {
        var o = this
        if (o.x <= -o.w / 2) {
            return
        }
        o.x -= o.speed
    }

    moveRight(canvasWidth) {
        var o = this
        if (o.x > canvasWidth - o.w + o.w / 2) {
            return
        }
        o.x += o.speed
    }

    moveUp(canvasHeight) {
        var o = this
        if (o.y > canvasHeight - o.h + o.h / 2) {
            return (o.y = canvasHeight - o.h + o.h / 2)
        }
        if (o.y < -o.h / 2) {
            return
        }
        o.y -= o.speed
    }

    moveDown(canvasHeight) {
        var o = this
        if (o.y > canvasHeight - o.h + o.h / 2) {
            return
        }
        o.y += o.speed
    }
}

class Enemy extends GameImage {
    constructor(game) {
        let name = `enemy${randomBetween(0, 9)}`
        super(game, name)
        this.cooldown = config.enemy_cooldown
        this.setup()
    }
    setup() {
        this.x = randomBetween(0, this.game.canvas.width - this.w / 2)
        this.y = -randomBetween(0, 100) * 28

        this.enemy_speed = config.enemy_speed + Math.random()

        this.speed = this.enemy_speed
        // this.enemy_speed = config.enemy_speed * 0.1
    }
    fire() {
        if (this.cooldown == 0 && this.y > 0) {
            this.cooldown = config.enemy_cooldown
            let bullet = new EnemyBullet(this.game, 'down', this.enemy_speed)
            bullet.x = this.x + this.w / 2 - bullet.w / 2
            bullet.y = this.y + 25
            bullet.speed += this.speed
            bullet.enemy_speed += this.enemy_speed
            this.game.scene.addElement(bullet)
        }
    }
    update() {
        this.y += this.enemy_speed
        this.fire()
        if (this.cooldown > 0) {
            this.cooldown--
        }
        //越界检测
        if (this.y > this.game.canvas.height) {
            this.status = false
            this.game.scene.numberEnemy--
        }
    }
}

class BackGround extends GameImage {
    constructor(game) {
        var name = 'bg'
        super(game, name)
        this.setup()
    }
    static new(game) {
        var i = new this(game)
        return i
    }
    setup() {
        this.bgspeed = config.backGround_bgspeed
    }
    update() {
        this.y += this.bgspeed
        if (this.y > this.game.canvas.clientHeight) {
            return (this.y = -this.game.canvas.clientHeight + this.bgspeed)
        }
    }
    debug() {
        this.bgspeed = config.backGround_bgspeed
    }
}

class Bullet extends GameImage {
    constructor(game) {
        let name = 'bullet0'
        super(game, name)

        this.setup()
    }
    setup() {
        this.speed = config.bullet_speed
    }
    update() {
        this.y -= this.speed
        if (this.y < 0 - this.h) {
            this.status = false
        }
    }
    debug() {
        this.speed = config.bullet_speed
    }
}

class EnemyBullet extends GameImage {
    constructor(game, direction, enemy_speed) {
        let name = 'bullet1'
        super(game, name)
        this.enemy_speed = enemy_speed
        this.setup()
    }
    setup() {
        this.speed = config.enemybullet_speed * 0.1
    }
    update() {
        this.y += this.enemy_speed
    }
    debug() {
        this.speed = config.enemybullet_speed / 10
    }
}

export {GameImage, Player, Enemy, BackGround, Bullet, EnemyBullet}
