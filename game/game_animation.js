import {GameImage} from './game_image.js'
import {config} from './config.js'

class GameAnimation {
    constructor(game) {
        this.game = game

        this.setup()
    }
    static new(game) {
        return new this(game)
    }
    setup() {
        this.x = 150
        this.y = 200
        this.speed = 1
        this.flip = false
        this.animationName = 'idle'
        this.animations = {
            idle: [],
            run: [],
        }

        this.numberOfFrames = {
            idle: 16,
            run: 11,
        }
        this.init(this.numberOfFrames)
        // 当前帧 当前帧下标 动画冷却
        this.framesCurrent = this.frames()[0]
        this.frameIndex = 0
        this.framesCooldown = config.frames_cooldown
    }
    init(numberOfFrames) {
        var loadFrames = (key) => {
            for (let i = 0; i < numberOfFrames[key]; i++) {
                // idle0
                let name = key + `${i}`
                let t
                t = GameImage.new(this.game, name)
                t.x = this.x
                this.animations[key].push(t)
            }
        }
        let keys = Object.keys(numberOfFrames)
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i]
            loadFrames(key)
        }
    }
    frames() {
        return this.animations[this.animationName]
    }
    draw() {
        var context = this.game.context
        let o = this.framesCurrent
        if (this.flip) {
            context.save()
            context.translate(o.x + o.w, o.y)
            context.scale(-1, 1)
            context.drawImage(o.texture, 0, 0)
            context.restore()
        } else {
            this.game.drawImage(this.framesCurrent)
        }
    }
    update() {
        this.framesCooldown--
        // 动画精灵图张数
        let imgs = this.numberOfFrames[this.animationName]
        if (this.framesCooldown < 0) {
            this.framesCooldown = config.frames_cooldown
            this.frameIndex = (this.frameIndex + 1) % imgs
            this.framesCurrent = this.frames()[this.frameIndex]
            this.framesCurrent.x = this.x
            this.framesCurrent.y = this.y
        }
    }
    changeAnimation(status) {
        let animationNames = {
            down: 'run',
            up: 'idle',
        }
        let name = animationNames[status]
        this.animationName = name
    }
    moveLeft(status) {
        this.changeAnimation(status)
        let o = this.framesCurrent
        if (o.x <= -o.w / 2) {
            return
        }
        this.x -= this.speed
        this.flip = true
    }
    moveRight(status) {
        this.changeAnimation(status)
        let o = this.framesCurrent
        let canvasWidth = this.game.canvas.width
        if (o.x > canvasWidth - o.w + o.w / 2) {
            return
        }
        this.x += this.speed
        this.flip = false
    }
}

export {GameAnimation}
