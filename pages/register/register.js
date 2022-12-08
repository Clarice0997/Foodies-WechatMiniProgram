import { register } from '../../api/userAPI'
import { initLottieCanvas } from '../../utils/lottie'

// pages/register/register.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    checked: false,
    username: '',
    password: '',
    checkPassword: '',
    checkPasswordError: ''
  },
  // 账号输入框更改事件
  formInputChange(e) {
    this.setData({
      username: e.detail.value
    })
  },
  // 密码输入框更改事件
  formPasswordChange(e) {
    this.setData({
      password: e.detail.value
    })
    // 比对密码和确认密码是否相同
    if (this.data.checkPassword != this.data.password) {
      // 设置错误提示
      this.setData({
        checkPasswordError: '确认密码错误'
      })
    } else {
      // 消除错误提示
      this.setData({
        checkPasswordError: ''
      })
    }
  },
  // 确认密码输入框更改事件
  formCheckPasswordChange(e) {
    this.setData({
      checkPassword: e.detail.value
    })
    // 比对密码和确认密码是否相同
    if (this.data.checkPassword != this.data.password) {
      // 设置错误提示
      this.setData({
        checkPasswordError: '确认密码错误'
      })
    } else {
      // 消除错误提示
      this.setData({
        checkPasswordError: ''
      })
    }
  },
  // 是否同意用户协议复选框改变事件
  onChange(e) {
    this.setData({
      checked: e.detail
    })
  },
  // 注册功能
  registerFunction() {
    if (this.data.username != '' && this.data.password != '' && this.data.checkPassword != '' && this.data.checkPasswordError == '' && this.data.checked) {
      // 构建提交数据对象
      let data = {
        username: this.data.username,
        password: this.data.password
      }
      register(data)
        .then(res => {
          if (res.data.code == 200) {
            console.log('注册成功')
            wx.showToast({
              title: '注册成功',
              icon: 'success',
              duration: 2000
            })
            // 跳转登录页 navigateTo not switchTab
            wx.navigateTo({
              url: '/pages/login/login'
            })
          } else {
            console.log('注册失败')
            wx.showToast({
              title: '注册失败',
              icon: 'error',
              duration: 2000
            })
            console.log(res)
          }
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          // 重置数据对象
          this.setData({
            checked: false,
            username: '',
            password: '',
            checkPassword: '',
            checkPasswordError: ''
          })
        })
    }
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
    initLottieCanvas('#canvas', 'https://assets7.lottiefiles.com/packages/lf20_tpa51dr0.json')
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
