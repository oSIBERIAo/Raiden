import {GameImage} from './image/game_image.js'
import {config} from './config.js'

class GameAnimation {
    constructor(game) {
        this.game = game

        this.setup()
    }
    static new(game) {
        var i = new this(game)
        return i
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
                let name = key + `${i}`
                let t = GameImage.new(this.game, name)
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
            // console.log('this.framesCurrent', this.framesCurrent)
            this.game.drawImage(this.framesCurrent)
        }
    }
    update() {
        this.framesCooldown--
        if (this.framesCooldown < 0) {
            this.framesCooldown = 10

            this.frameIndex =
                (this.frameIndex + 1) % this.numberOfFrames[this.animationName]
            this.framesCurrent = this.frames()[this.frameIndex]
            this.framesCurrent.x = this.x
            this.framesCurrent.y = this.y
        }
    }
    changeAnimation(status) {
        var animationNames = {
            down: 'run',
            up: 'idle',
        }
        var name = animationNames[status]
        this.animationName = name
    }
    moveLeft(status) {
        this.changeAnimation(status)
        var o = this.framesCurrent
        if (o.x <= -o.w / 2) {
            return
        }
        this.x -= this.speed
        this.flip = true
    }
    moveRight(status) {
        this.changeAnimation(status)
        var o = this.framesCurrent
        var canvasWidth = this.game.canvas.width
        if (o.x > canvasWidth - o.w + o.w / 2) {
            return
        }
        this.x += this.speed
        this.flip = false
    }
}

export {GameAnimation}
