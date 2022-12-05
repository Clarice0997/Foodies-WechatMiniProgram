const { request } = require('../utils/request.js')
const { baseUrl, banner } = require('./base')
/*
  网络请求方法
*/

/*
  get banner data
*/
function getBanner(data) {
  return request(baseUrl + banner, 'GET', data)
}

function getInfo() {
  return request(baseUrl + '/getInfo', 'GET')
}

function login(data) {
  return request(baseUrl + '/login', 'POST', data)
}

function register(data) {
  return request(baseUrl + '/register', 'POST', data)
}

module.exports = {
  getBanner,
  getInfo,
  login,
  register
}
