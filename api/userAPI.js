// 导入
const { request } = require('../utils/request.js')
const { baseUrl } = require('./base')

// 登录接口
function login(data) {
  return request(baseUrl + '/login', 'POST', data)
}

// 注册接口
function register(data) {
  return request(baseUrl + '/register', 'POST', data)
}

// 获得用户信息接口
function getInfo() {
  return request(baseUrl + '/getInfo', 'GET')
}

// 获取个人信息接口
function getProfile() {
  return request(baseUrl + '/system/user/profile', 'GET')
}

// 设置个人信息接口
function setProfile(data) {
  return request(baseUrl + '/system/user/profile', 'PUT', data)
}

// 导出
module.exports = { login, register, getInfo, getProfile, setProfile }
