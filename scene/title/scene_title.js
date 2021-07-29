import {config} from '../../game/config.js'
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

        this.gameLable = GameLabel.new(this.game, '开始，按 K 开始游戏。        W A S D 控制上下左右。F 开火。')
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

class GameLabel {
    constructor(game, text) {
        this.game = game
        this.text = text
        this.x = 10
        this.y = 20
        // (canvas.clientWidth / context.font) 根据字体大小换行
        this.space = this.game.context.canvas.clientWidth / 20
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
        this.game.context.fillStyle = '#ffffff'
        this.game.context.font = '20px Helvetica'
        if (this.game.scene.score >= 0) {
            this.text = this.game.scene.score
            this.game.context.fillText(this.text, this.x , this.y)
        } else {
            let s = this.space
            for (let i = 0; i < this.text.length; i+=s) {
                this.game.context.fillText(this.text.substr(i, i+s), this.x , this.y + i/s*30)
            }
        }

    }
}

export {SceneTitle, GameLabel}
