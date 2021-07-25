import {GameScene} from './game_scene.js'

class Game extends GameScene {
     constructor(images) {
        super(images)
        this.scene = null
        this.actions = {}
        this.keydowns = {}
        this.images = images
        this.paused = false

        this.canvas = document.querySelector('#id-canvas')
        this.context = this.canvas.getContext('2d')

        window.addEventListener('keydown',  (e) => {
            this.keydowns[e.key] = 'down'
        })
        window.addEventListener('keyup',  (e) => {
            this.keydowns[e.key] = 'up'
        })
    }
    textureByName(name) {
        return this.images[name]
    }
    drawImage(guaImage) {
        this.context.drawImage(guaImage.texture, guaImage.x, guaImage.y)
    }
    registerAction(key, callback) {
        this.actions[key] = callback
    }

    runloop = ()=> {
        let actions = Object.keys(this.actions)
        for (let i = 0; i < actions.length; i++) {
            let key = actions[i]
            let status = this.keydowns[key]
            if (status == 'down') {
                this.actions[key]('down')
            } else if (status == 'up') {
                // this.actions[key](status) 错误
                this.actions[key]('up')
                this.keydowns[key] = null
            }
        }
        this.update()
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.draw()

        // setTimeout(() => {
        //     this.runloop()
        // }, 1000 / window.fps)
        requestAnimationFrame(this.runloop)
    }
    replceScene(scene) {
        this.scene = scene
    }
    update() {
        this.scene.update()
    }
    draw() {
        this.scene.draw()
    }

    runWithScene(scene) {
        this.scene = scene
    }
    __start() {
        // setTimeout(() =>{
        //     this.runloop()
        // }, 1000 / window.fps)
        requestAnimationFrame(this.runloop)
    }
    run() {
        this.__start()
    }
}

export {Game}
