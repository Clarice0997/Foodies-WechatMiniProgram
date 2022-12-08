// 导入
const { request } = require('../utils/request.js')
const { baseUrl, banner } = require('./base')

// 获取轮播图
function getBanner(data) {
  return request(baseUrl + banner, 'GET', data)
}

module.exports = {
  getBanner
}
