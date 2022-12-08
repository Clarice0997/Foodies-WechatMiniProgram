// 导入
import lottie from 'lottie-miniprogram'

/*
  lottie动画对象封装函数
  @param {string} element 画布标签
  @param {string} path 动画url
 */
function initLottieCanvas(element, path) {
  // 创建节点
  wx.createSelectorQuery()
    .select(element)
    .node(res => {
      // 构建画布
      const canvas = res.node
      // 指定绘画环境
      const context = canvas.getContext('2d')
      // 挂载lottie
      lottie.setup(canvas)
      // 配置lottie参数
      lottie.loadAnimation({
        // 循环
        loop: true,
        // 自动播放
        autoplay: true,
        path,
        rendererSettings: {
          context
        }
      })
    })
    .exec()
}

module.exports = { initLottieCanvas }
