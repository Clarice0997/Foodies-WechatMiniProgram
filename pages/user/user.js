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
  // 登录按钮点击事件
  clickHandle() {
    // 跳转登录引导页
    wx.navigateTo({
      url: '/pages/loginBoot/loginBoot'
    })
  },
  // 退出登录事件
  outLogin() {
    // 清空用户信息
    app.globalData.userInfo = {}
    // 清空Token
    wx.removeStorage({
      key: 'MyToken'
    })
    // 重置数据对象
    this.setData({
      userAccess: false,
      userInfo: {}
    })
    app.globalData.isGuest = false
    // 跳转首页
    wx.navigateTo({
      url: '/pages/loginBoot/loginBoot'
    })
  },
  // 跳转用户详细页面
  navigateUserDetail() {
    wx.navigateTo({
      url: '/pages/userDetail/userDetail'
    })
  },
  // 跳转收藏盲盒页面
  navigateCollection() {
    wx.navigateTo({
      url: '/pages/collection/collection'
    })
  },
  // 跳转系统消息页面
  navigateMessage() {
    wx.navigateTo({
      url: '/pages/message/message'
    })
  },
  // 跳转系统消息页面
  navigateHelp() {
    wx.navigateTo({
      url: '/pages/help/help'
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
    // 判断当前是否为游客登录
    console.log(app.globalData)
    if (app.globalData.isGuest == false) {
      this.setData({
        userInfo: app.globalData.userInfo,
        userAccess: true
      })
    } else {
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
