import {Game} from './game/game_game.js'
import {SceneTitle} from './scene/title/scene_title.js'

import {config} from  './game/config.js'
import {imagesSrc} from  './game/resources.js'
import {loadAllImages} from  './game/utils.js'

import './game/control_panel.js'

let log = console.log.bind(console)

let loadlevel = function (game, n) {
    let blocks = []
    n = n - 1
    var level = levels[n]
    for (let i = 0; i < level.length; i++) {
        let p = level[i]
        let b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}

let _main = async function (params) {
    var images = await loadAllImages(imagesSrc)
    var game = new Game(images)
    var scene = new SceneTitle(game)
    game.runWithScene(scene)
    game.__start()
}
_main()
