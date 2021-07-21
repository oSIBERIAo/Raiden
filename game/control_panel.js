import {config} from './config.js'
// 游戏参数调节
let es = (sel) => document.querySelectorAll(sel)
let bindAll = function (sel, eventName, callback) {
    let selAll = es(sel)
    for (let i = 0; i < selAll.length; i++) {
        let input = selAll[i]
        input.addEventListener(eventName, function (event) {
            callback(event)
        })
    }
}
bindAll('.game-auto-slider', 'input', function (event) {
    let target = event.target
    let v = target.value
    let bindValue = target.dataset.value
    // config[bindValue] = Number(v) //player_speed
    eval(bindValue + '=' + v)

    let span = target.closest('label').querySelector('.game-span')
    span.innerText = String(v)
})
