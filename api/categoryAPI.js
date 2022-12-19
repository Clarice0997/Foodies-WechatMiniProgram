// 导入
const { request } = require('../utils/request.js')
const { baseUrl } = require('./base')

// 获取盲盒详细信息
function getCategoryDetails(data) {
  return request(baseUrl + '/wechat/categorydetails/' + data, 'GET')
}

// 导出
module.exports = { getCategoryDetails }
