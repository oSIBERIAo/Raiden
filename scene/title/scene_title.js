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

        this.gameLable = GameLabel.new(this.game, '开始，按K开始游戏')
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

export {SceneTitle, GameLabel}
