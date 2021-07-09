class Player extends GameImage{
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
            this.cooldown --
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
        if (o.x <= -o.w / 2) { return }
        o.x -= o.speed
    }
    moveRight(canvasWidth) {
        var o = this
        if (o.x > canvasWidth - o.w + o.w / 2) { return }
        o.x += o.speed
    }
    moveUp(canvasHeight) {
        var o = this
        if (o.y > canvasHeight - o.h + o.h/2 ) {
            return o.y = canvasHeight - o.h + o.h / 2
        }
        if (o.y < - o.h / 2) { return }
        o.y -= o.speed
    }
    moveDown(canvasHeight) {
        var o = this
        if (o.y > canvasHeight - o.h + o.h/2 ) { return }
        o.y += o.speed
    }
}
