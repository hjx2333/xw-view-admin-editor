export function deepCopy(target) {
  if (typeof target == 'object') {
    const result = Array.isArray(target) ? [] : {}
    for (const key in target) {
      if (typeof target[key] == 'object') {
        result[key] = deepCopy(target[key])
      } else {
        result[key] = target[key]
      }
    }

    return result
  }

  return target
}

/**
 * 函数防抖
 * @param {function} fn 高频函数
 * @param {number} wait 等待时间
 * @param {boolean} immediate 是否立即执行
 * @returns {function}
 */
export function debounce(fn, wait, immediate) {
  let timeout
  return function() {
    const context = this
    const args = arguments
    const later = function() {
      timeout = null
      if (!immediate) {
        fn.apply(context, args)
      }
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait || 250)
    if (callNow) fn.apply(context, args)
  }
}

/**
 * 函数节流（delayr时间内只执行一次）
 * @param {*} fn 节流函数的调用方法
 * @param {*} delayr 节流时间
 * @returns
 */
export function throttle(fn, delayr) {
  let lastTime
  let timer
  const delay = delayr || 200
  return function() {
    var args = arguments
    // 记录当前函数触发的时间
    var nowTime = Date.now()
    if (lastTime && nowTime - lastTime < delay) {
      clearTimeout(timer)
      timer = setTimeout(function() {
        // 记录上一次函数触发的时间
        lastTime = nowTime
        // 修正this指向问题
        fn.apply(this, args)
      }, delay)
    } else {
      lastTime = nowTime
      fn.apply(this, args)
    }
  }
}

/**
 * @description 根据标准，设置预览比例
 * @param {*} ele 容器元素
 * @param {Number} width 标准的宽度
 * @param {Number} height 标准的高度
 */
export function setpreviewScale(ele, { width, height }) {
  const baseProportion = parseFloat((width / height).toFixed(5))
  const scale = {
    width: 1,
    height: 1
  }

  const winWidth = window.innerWidth
  const winHeight = window.innerHeight
  const currentRate = parseFloat((winWidth / winHeight).toFixed(5))

  if (currentRate > baseProportion) {
    // 表示更宽
    scale.width = parseFloat(((winHeight * baseProportion) / width).toFixed(5))
    scale.height = parseFloat((winHeight / height).toFixed(5))
    ele.style.transform = `scale(${scale.width}, ${scale.height})`
  } else {
    // 表示更高
    scale.height = parseFloat((winWidth / baseProportion / height).toFixed(5))
    scale.width = parseFloat((winWidth / width).toFixed(5))
    ele.style.transform = `scale(${scale.width}, ${scale.height})`
  }
}
