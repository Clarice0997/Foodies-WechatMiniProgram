// pages/user/user.js
let app = getApp()

import { baseUrl } from '../../api/base'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    userAccess: false,
    baseUrl: baseUrl
  },
  clickHandle() {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },
  outLogin() {
    app.globalData.userInfo = {}
    wx.removeStorage({
      key: 'MyToken'
    })
    this.setData({
      userAccess: false
    })
    wx.switchTab({
      url: '/pages/index/index'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    console.log(app.globalData)
    // 页面显示获取用户信息
    if (app.globalData.userInfo.userId) {
      console.log('获取用户数据成功')
      this.setData({
        userInfo: app.globalData.userInfo,
        userAccess: true
      })
    } else {
      console.log('获取用户数据失败')
      this.setData({
        userAccess: false
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {}
})
