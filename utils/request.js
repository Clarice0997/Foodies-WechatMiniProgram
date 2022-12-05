/*
  通用网络请求封装
  @param {string} url
  @param {GET|POST} method
  @param {string/object/ArrayBuffer} data
 */
function request(url, method, data) {
  // 等待网络请求
  wx.showLoading({
    title: '加载数据。。。',
    mask: true
  })
  // 将网络请求封装如Promise对象中 实现异步回调
  const promise = new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: method,
      data: data,
      header: {
        // 'content-type': 'application/x-www-form-urlencoded',
        'content-type': 'application/json;charset=UTF-8',
        cookie: wx.getStorageSync('MyToken'),
        Authorization: wx.getStorageSync('MyToken')
      },
      timeout: 10000,
      // 成功回调
      success(res) {
        // 原封返回实例
        resolve(res)
      },
      // 失败回调
      fail(err) {
        // 返回错误原因
        reject(err)
      },
      // 完成回调
      complete() {
        // 网络请求结束结束隐藏
        wx.hideLoading()
      }
    })
  })
  return promise
}
module.exports = {
  request
}
