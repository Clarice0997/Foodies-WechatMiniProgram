// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{}
  },
  clickHandle(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  outLogin(){
    this.setData({
      userInfo:''
    })
    wx.setStorageSync('userInfo', null)
    wx.switchTab({
      url: '/pages/index/index',
    })
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
     //验证用户登录信息的状态是否处于有效期：增加一个接口，然后测试有效期
     if(wx.getStorageSync('userInfo')){
      this.setData({
        userInfo:wx.getStorageSync('userInfo')
      })
    }
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