/*
  @param {string} url
  @param {GET|POST} method
  @param {string/object/ArrayBuffer} data
 */
function request(url,method,data){
  //之前讲过网络请求的封装,了解ES6,Promise对象
  //等待网络请求
  wx.showLoading({
    title: '加载数据。。。',
    mask:true
  })
  const promise=new Promise((resolve,reject)=>{
    wx.request({
      url: url,
      method:method,
      data:data,
      header:{
        'content-type':"application/x-www-form-urlencoded",
        'cookie':wx.getStorageSync("MyToken"),
        'Authorization':wx.getStorageSync("MyToken")
      },
      timeout:10000,
      success(res){
        resolve(res)
      },
      fail(err){
        reject(err)
      },
      complete(){
        wx.hideLoading()
      }
    })
  })
  return promise
}
module.exports={
  request
}