// 导入登录接口
import { login } from '../../api/index'

// 定义微信实例
let app = getApp()

// pages/loginBoot/loginBoot.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },
  // 跳转注册页面函数
  toRegister() {
    wx.navigateTo({
      url: '/pages/register/register'
    })
  },
  // 跳转手机登录页面函数
  toPhone() {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },
  // 游客登录点击事件
  loginGuest() {
    // 构建游客账户
    let guest = {
      username: 'visitor',
      password: '123456'
    }
    // 登录接口
    login(guest)
      .then(res => {
        console.log(res)
        if (res.data.code == 200) {
          // 游客登录成功提示
          wx.showToast({
            title: '游客登录成功',
            icon: 'success',
            duration: 2000
          })
          // 缓存token
          wx.setStorageSync('MyToken', res.data.token)
          // 赋值全局变量 是否是游客
          app.globalData.isGuest = true
          // 跳转主页
          wx.switchTab({
            url: '/pages/index/index'
          })
        } else {
          // 游客登录失败提示
          wx.showToast({
            title: '游客登录失败',
            icon: 'error',
            duration: 2000
          })
          // 赋值全局变量 是否是游客
          app.globalData.isGuest = false
          // 删除缓存token
          wx.removeStorage({
            key: 'MyToken'
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {})
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
  onShow() {},

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
