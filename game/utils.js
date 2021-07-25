const aInb = function (x, x1, x2) {
    return x > x1 && x < x2
}
const rectIntersects = function (a, b) {
    // catch 接住计算不过来导致崩溃的bug
    try {
        if (aInb(b.x, a.x, a.x + a.w) || aInb(a.x, b.x, b.x + b.w)) {
            if (aInb(b.y, a.y, a.y + a.h) || aInb(a.y, b.y, b.y + b.h)) {
                // log('碰撞💥')
                return true
            }
        }
    } catch (err) {
        log('捕捉到错误', err)
        return false
    }
    return false
}

const randomBetween = function (start, end) {
    let s = Math.random() * (end - start + 1)
    s = start + Math.floor(s)
    return s
}

const loadAllImages = async (images) => {
    return new Promise((resolve, reject) => {
        var names = Object.keys(images)
        let result = {}
        for (let i = 0; i < names.length; i++) {
            let name = names[i]
            let path = images[name]
            let img = new Image()
            img.src = path
            img.onload = () => {
                result[name] = img
                if (
                    i == names.length - 1 &&
                    Object.keys(result).length == names.length
                ) {
                    // console.log(`成功加载图片资源 ${Object.keys(result).length} 张`)
                    return resolve(result)
                } else if (
                    i == names.length - 1 &&
                    Object.keys(result).length != names.length
                ) {
                    console.log(
                        '接住浏览器图片加载过快导致漏加载',
                        loadAllImages
                    )
                    // 接住浏览器图片加载过快导致漏加载
                    window.location.reload()
                }
            }
            img.onerror = function () {
                console.log('Error occurred while loading image, reloading')
                // window.location.reload()
            }
        }
    })
}

export {aInb, rectIntersects, randomBetween, loadAllImages}
