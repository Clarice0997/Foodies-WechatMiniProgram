// 导入
const { request } = require('../utils/request.js')
const { baseUrl } = require('./base')

// 获取轮播图
function getBanner(data) {
  return request(baseUrl + '/category/wechathot', 'GET')
}

module.exports = {
  getBanner
}
