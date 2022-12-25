const animationClassData = [
  {
    label: '进入',
    children: [
      { label: '渐显', value: 'animate__fadeIn' },
      { label: '向右进入', value: 'animate__fadeInLeft' },
      { label: '向左进入', value: 'animate__fadeInRight' },
      { label: '向上进入', value: 'animate__fadeInUp' },
      { label: '向下进入', value: 'animate__fadeInDown' },
      { label: '向右长距进入', value: 'animate__fadeInLeftBig' },
      { label: '向左长距进入', value: 'animate__fadeInRightBig' },
      { label: '向上长距进入', value: 'animate__fadeInUpBig' },
      { label: '向下长距进入', value: 'animate__fadeInDownBig' },
      { label: '旋转进入', value: 'animate__rotateIn' },
      { label: '左顺时针旋转', value: 'animate__rotateInDownLeft' },
      { label: '右逆时针旋转', value: 'animate__rotateInDownRight' },
      { label: '左逆时针旋转', value: 'animate__rotateInUpLeft' },
      { label: '右逆时针旋转', value: 'animate__rotateInUpRight' },
      { label: '弹入', value: 'animate__bounceIn' },
      { label: '向右弹入', value: 'animate__bounceInLeft' },
      { label: '向左弹入', value: 'animate__bounceInRight' },
      { label: '向上弹入', value: 'animate__bounceInUp' },
      { label: '向下弹入', value: 'animate__bounceInDown' },
      { label: '光速从右进入', value: 'animate__lightSpeedInRight' },
      //   { label: '光速从右退出', value: 'animate__lightSpeedOutRight' },
      { label: '中心X轴旋转', value: 'animate__flipInX' },
      { label: '中心Y轴旋转', value: 'animate__flipInY' },
      { label: '左长半径旋转', value: 'animate__rollIn' },
      { label: '由小变大进入', value: 'animate__zoomIn' },
      { label: '左变大进入', value: 'animate__zoomInLeft' },
      { label: '右变大进入', value: 'animate__zoomInRight' },
      { label: '向上变大进入', value: 'animate__zoomInUp' },
      { label: '向下变大进入', value: 'animate__zoomInDown' },
      { label: '向右滑动展开', value: 'animate__slideInLeft' },
      { label: '向左滑动展开', value: 'animate__slideInRight' },
      { label: '向上滑动展开', value: 'animate__slideInUp' },
      { label: '向下滑动展开', value: 'animate__slideInDown' }
    ]
  },
  {
    label: '强调',
    children: [
      { label: '弹跳', value: 'animate__bounce' },
      { label: '闪烁', value: 'animate__flash' },
      { label: '放大缩小', value: 'animate__pulse' },
      { label: '放大缩小弹簧', value: 'animate__rubberBand' },
      { label: '左右晃动', value: 'animate__headShake' },
      { label: '左右扇形摇摆', value: 'animate__swing' },
      { label: '放大晃动缩小', value: 'animate__tada' },
      { label: '扇形摇摆', value: 'animate__wobble' },
      { label: '左右上下晃动', value: 'animate__jello' },
      { label: 'Y轴旋转', value: 'animate__flip' }
    ]
  }
//   {
//     label: '退出',
//     children: [
//       { label: '渐隐', value: 'animate__fadeOut' },
//       { label: '向左退出', value: 'animate__fadeOutLeft' },
//       { label: '向右退出', value: 'animate__fadeOutRight' },
//       { label: '向上退出', value: 'animate__fadeOutUp' },
//       { label: '向下退出', value: 'animate__fadeOutDown' },
//       { label: '向左长距退出', value: 'animate__fadeOutLeftBig' },
//       { label: '向右长距退出', value: 'animate__fadeOutRightBig' },
//       { label: '向上长距退出', value: 'animate__fadeOutUpBig' },
//       { label: '向下长距退出', value: 'animate__fadeOutDownBig' },
//       { label: '旋转退出', value: 'animate__rotateOut' },
//       { label: '左顺时针旋转', value: 'animate__rotateOutDownLeft' },
//       { label: '右逆时针旋转', value: 'animate__rotateOutDownRight' },
//       { label: '左逆时针旋转', value: 'animate__rotateOutUpLeft' },
//       { label: '右逆时针旋转', value: 'animate__rotateOutUpRight' },
//       { label: '弹出', value: 'animate__bounceOut' },
//       { label: '向左弹出', value: 'animate__bounceOutLeft' },
//       { label: '向右弹出', value: 'animate__bounceOutRight' },
//       { label: '向上弹出', value: 'animate__bounceOutUp' },
//       { label: '向下弹出', value: 'animate__bounceOutDown' },
//       { label: '中心X轴旋转', value: 'animate__flipOutX' },
//       { label: '中心Y轴旋转', value: 'animate__flipOutY' },
//       { label: '左长半径旋转', value: 'animate__rollOut' },
//       { label: '由小变大退出', value: 'animate__zoomOut' },
//       { label: '左变大退出', value: 'animate__zoomOutLeft' },
//       { label: '右变大退出', value: 'animate__zoomOutRight' },
//       { label: '向上变大退出', value: 'animate__zoomOutUp' },
//       { label: '向下变大退出', value: 'animate__zoomOutDown' },
//       { label: '向左滑动收起', value: 'animate__slideOutLeft' },
//       { label: '向右滑动收起', value: 'animate__slideOutRight' },
//       { label: '向上滑动收起', value: 'animate__slideOutUp' },
//       { label: '向下滑动收起', value: 'animate__slideOutDown' }
//     ]
//   }
]

animationClassData.forEach(item => {
  item.children.forEach(e => {
    // 是否在运行动画
    e.pending = false

    // 动画默认运行时间
    e.animationTime = 1
  })
})

export default animationClassData
