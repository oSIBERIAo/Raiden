import {config} from './config.js'
// 游戏参数调节
// debug 为 true : 开启参数调节
let debug = false

if(debug){
    let template = `
<section>
            <div>
                <label>
                    <input
                        class="game-auto-slider"
                        id="id_fps"
                        type="range"
                        data-value="config.fps"
                        name="points"
                        value="60"
                        min="1"
                        max="1000"
                    />
                    fps：<span class="game-span"></span>
                </label>
            </div>
            <div>
                <label>
                    <input
                        class="game-auto-slider"
                        id="player_speed"
                        type="range"
                        data-value="config.player_speed"
                        value="60"
                        min="1"
                        max="10"
                    />
                    玩家飞机速度：<span class="game-span"></span>
                </label>
            </div>
            <div>
                <label>
                    <input
                        class="game-auto-slider"
                        id="player_speed"
                        type="range"
                        data-value="config.bullet_speed"
                        value="1"
                        min="1"
                        max="10"
                    />
                    玩家子弹速度：<span class="game-span"></span>
                </label>
            </div>
            <div>
                <label>
                    <input
                        class="game-auto-slider"
                        id="player_speed"
                        type="range"
                        data-value="config.player_cooldown"
                        value="9"
                        min="9"
                        max="120"
                    />
                    玩家冷却速度：<span class="game-span"></span>
                </label>
            </div>
            <div>
                <label>
                    <input
                        class="game-auto-slider"
                        id="player_speed"
                        type="range"
                        data-value="config.enemybullet_speed"
                        value="12"
                        min="1"
                        max="20"
                    />
                    敌机子弹速度：<span class="game-span"></span>
                </label>
            </div>
            <div>
                <label>
                    <input
                        class="game-auto-slider"
                        id="player_speed"
                        type="range"
                        data-value="config.enemy_cooldown"
                        value="240"
                        min="0"
                        max="480"
                    />
                    敌机子弹冷却速度：<span class="game-span"></span>
                </label>
            </div>
            <div>
                <label>
                    <input
                        class="game-auto-slider"
                        id="player_speed"
                        type="range"
                        data-value="config.backGround_bgspeed"
                        value="1"
                        min="0"
                        max="10"
                    />
                    背景速度：<span class="game-span"></span>
                </label>
            </div>
            <div>
                <label>
                    <input
                        class="game-auto-slider"
                        id="player_speed"
                        type="range"
                        data-value="config.enemy_speed"
                        value="1"
                        min="1"
                        max="30"
                    />
                    敌机速度：<span class="game-span"></span>
                </label>
            </div>
            <div>
                <label>
                    <input
                        class="game-auto-slider"
                        id="player_speed"
                        type="range"
                        data-value="config.enemy_number"
                        value="12"
                        min="1"
                        max="14"
                    />
                    敌机数量：<span class="game-span"></span>
                </label>
            </div>
            <div>
                <label>
                    <input
                        class="game-auto-slider"
                        id="player_speed"
                        type="range"
                        data-value="config.frames_cooldown"
                        value="10"
                        min="1"
                        max="100"
                    />
                    frames_cooldown：<span class="game-span"></span>
                </label>
            </div>
        </section>`

    let controlPanel = document.querySelector('#control-panel')
    controlPanel.insertAdjacentHTML('beforeend', template);

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
}


