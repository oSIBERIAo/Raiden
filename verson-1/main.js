var log = console.log.bind(console)

var loadlevel = function (game, n) {
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



var _main = function (params) {

    var images = {
        ball: "img/ball.png",
        paddle: "img/paddle.png",
        block: "img/block.png",
        bg: "img/bg.png",
        particle: "img/particle.png",
        bullet0: "img/bullet0.png",
        bullet1: "img/bullet1.png",
        player0: "img/player/player0.png",
        player1: "img/player/player1.png",
        player2: "img/player/player2.png",
        player3: "img/player/player3.png",
        player4: "img/player/player4.png",
        enemy0: "img/enemy/enemy0.png",
        enemy1: "img/enemy/enemy1.png",
        enemy2: "img/enemy/enemy2.png",
        enemy3: "img/enemy/enemy3.png",
        enemy4: "img/enemy/enemy4.png",
        enemy5: "img/enemy/enemy5.png",
        enemy6: "img/enemy/enemy6.png",
        enemy7: "img/enemy/enemy7.png",
        enemy8: "img/enemy/enemy8.png",
        enemy9: "img/enemy/enemy9.png",
    }
    
    // var callback = 
    var game = new Game(images, function (game) {
        var scene = new SceneTitle(game)

        //异步
        game.runWithScene(scene)
    } )
}
_main()