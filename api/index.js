const {request}  = require('../utils/request.js')
const {baseUrl,banner} =require("./base")
/*
  网络请求方法
*/
/*
  get banner data
*/
function getBanner(data){
  return request(baseUrl+banner,"GET",data)
}
module.exports={
  getBanner
}
