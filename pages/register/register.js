// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked:false, 
    username:'',
    password:'',
  },
  formInputChange(e){
    console.log(e)
    this.setData({
      username:e.detail.value,
    })
    },
    formPasswordChange(e){
      console.log(e)
      this.setData({
        password:e.detail.value
      })
      },
      loginFun(){
        if(!this.data.username || !this.data.password || this.data.checked===false){
          wx.showToast({
            title: '信息不完整',
            icon:'error',
            duration: 2000
          })
        }else {
          let data={
            username:this.data.username,
            password:this.data.password,
          }
          console.log(data);
          wx.request({
            url: 'http://42.193.173.23:8080/login', //请求地址
            data: data,//请求数据
            method: 'POST',//请求方法
            header: {
              'content-type': 'application/json;charset=UTF-8', // 请求头
              // 'content-type': 'x-www-form-urlencoded'
            },
            success (res) {
              console.log(res);
               wx.setStorageSync('MyToken', res.data.token)
               console.log("打印token:",res.data.token)
                  //登录成功
                  wx.showModal({
                  title: '提示',
                  content: '确认登录！',
                  showCancel: true,
                  success (res) {
                    if (res.confirm) {
                      wx.switchTab({
                        url: '/pages/index/index',
                      })
                    } else if (res.cancel) {
                      wx.setStorageSync('MyToken', '')
                    }
                  }
                })
              }
          })
        }
      },
      onChange(event) {
        this.setData({
          checked: event.detail,
        });
      },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})