/**
 * @description 根据拖拽节点类型缩放组件
 * @param {String} point 拖拽节点类型
 * @param {String} clientX 新的鼠标横坐标
 * @param {String} clientY 新的鼠标纵坐标
 * @param {String} oClientX 旧的鼠标横坐标
 * @param {String} oClientY 旧的鼠标纵坐标
 * @param {Object} style 组件样式
 * @param {Number} scale 所在画布的缩放比例
 */
export function scaleByPoint(
  point,
  { clientX, clientY },
  { oClientX, oClientY },
  style,
  scale = 1
) {
  let { width, height, top, left } = style
  width = parseInt(width)
  height = parseInt(height)
  top = parseInt(top)
  left = parseInt(left)

  // 纵坐标移动距离
  const resultY = formatMoveDistance(clientY - oClientY, scale)
  // 横坐标移动距离
  const resultX = formatMoveDistance(clientX - oClientX, scale)

  switch (point) {
    // 左上拉
    case 'lt':
      scaleToLeftTop(resultY, resultX, style, scale)
      break
    // 上拉
    case 't':
      style.height = `${height - resultY}px`
      style.top = `${top + resultY}px`
      break
    // 右上拉
    case 'rt':
      scaleToRightTop(resultY, resultX, style)
      break
    // 右拉
    case 'r':
      style.width = `${resultX + width}px`
      break
      // 右下拉
    case 'rb':
      scaleToRightBottom(resultY, resultX, style)
      break
    // 下拉
    case 'b':
      style.height = `${resultY + height}px`
      break
      // 左下拉
    case 'lb':
      scaleToLeftBottom(resultY, resultX, style)
      break
    // 左拉
    case 'l':
      style.width = `${width - resultX}px`
      style.left = `${left + resultX}px`
      break
  }
}

/**
 * @description 左上方向缩放
 * @param {Number} resultY 纵坐标移动距离
 * @param {Number} resultX 横坐标移动距离
 * @param {Object} style 组件样式
 */
export function scaleToLeftTop(resultY, resultX, style) {
  const { width, height, top, left } = style
  style.height = `${parseInt(height) - resultY}px`
  style.width = `${parseInt(width) - resultX}px`
  style.top = `${parseInt(top) + resultY}px`
  style.left = `${parseInt(left) + resultX}px`
}

/**
 * @description 右上方向缩放
 * @param {Number} toTopY 纵坐标移动距离
 * @param {Number} toLeftX 横坐标移动距离
 * @param {Object} style 组件样式
 */
export function scaleToRightTop(resultY, resultX, style) {
  const { width, height, top } = style
  style.top = `${parseInt(top) + resultY}px`
  style.height = `${parseInt(height) - resultY}px`
  style.width = `${resultX + parseInt(width)}px`
}

/**
 * @description 右下方向缩放
 * @param {Number} toTopY 纵坐标移动距离
 * @param {Number} toLeftX 横坐标移动距离
 * @param {Object} style 组件样式
 */
export function scaleToRightBottom(resultY, resultX, style) {
  const { width, height } = style
  style.height = `${resultY + parseInt(height)}px`
  style.width = `${resultX + parseInt(width)}px`
}

/**
 * @description 左下方向缩放
 * @param {Number} resultY 纵坐标移动距离
 * @param {Number} resultX 横坐标移动距离
 * @param {Object} style 组件样式
 */
export function scaleToLeftBottom(resultY, resultX, style) {
  const { width, height, left } = style
  style.height = `${resultY + parseInt(height)}px`
  style.width = `${parseInt(width) - resultX}px`
  style.left = `${parseInt(left) + resultX}px`
}

/**
 * @description 根据画布缩放计算移动距离
 * @param {Number} distance 移动的距离
 * @param {Number} scale 缩放的比例
 * @returns
 */
export function formatMoveDistance(distance, scale) {
  return Math.round(distance / scale)
}
