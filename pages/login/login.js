import { baseUrl } from '../../api/base'
import { getInfo } from '../../api/index'

let app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    checked: false,
    username: '',
    password: '',
    showSheet: false
  },
  // 表单改变设置用户名
  formInputChange(e) {
    this.setData({
      username: e.detail.value
    })
  },
  // 表单改变设置密码
  formPasswordChange(e) {
    this.setData({
      password: e.detail.value
    })
  },
  // 登录功能
  loginFun() {
    // 伪this
    let _this = this
    // 判断账号密码用户协议是否都填写完整
    if (!this.data.username || !this.data.password || this.data.checked === false) {
      wx.showToast({
        title: '信息不完整',
        icon: 'error',
        duration: 2000
      })
    } else {
      // 构建对象
      let data = {
        username: this.data.username,
        password: this.data.password
      }
      // 发起网络请求
      wx.request({
        url: baseUrl + '/login', // 请求地址
        data: data, // 请求数据
        method: 'POST', // 请求方法
        header: {
          'content-type': 'application/json;charset=UTF-8' // 请求头
        },
        success(res) {
          console.log(res)
          if (res.data.code == 200) {
            //登录成功
            wx.showModal({
              title: '提示',
              content: '确认登录！',
              showCancel: true,
              success(result) {
                // 是否确认登录
                if (result.confirm) {
                  wx.setStorageSync('MyToken', res.data.token)
                  console.log('打印token:', res.data.token)
                  getInfo().then(resInfo => {
                    console.log(resInfo)
                    if (res.data.code == 200) {
                      // 为全局变量赋值
                      app.globalData.userInfo = resInfo.data.user
                      console.log(app.globalData)
                      wx.switchTab({
                        url: '/pages/index/index'
                      })
                    } else {
                      console.log('获取用户信息失败，请重新登录')
                      wx.setStorageSync('MyToken', '')
                    }
                  })
                  // 获取微信授权 获得用户名和头像地址
                  // wx.getUserProfile({
                  //   desc: '展示用户信息',
                  //   success: res1 => {
                  //     _this.setData({
                  //       userInfo: res1.userInfo
                  //     })
                  //     wx.setStorageSync('userInfo', res1.userInfo)
                  //     wx.switchTab({
                  //       url: '/pages/index/index'
                  //     })
                  //   },
                  //   fail: err => {
                  //     console.log(err)
                  //   },
                  //   complete() {
                  //     console.log('获取完成')
                  //   }
                  // })
                  // 取消登录 删除校验码
                } else if (result.cancel) {
                  wx.setStorageSync('MyToken', '')
                }
              }
            })
          } else if (res.data.code == 500 && res.data.msg == '用户不存在/密码错误') {
            wx.showToast({
              title: '账号密码错误',
              icon: 'error',
              duration: 2000
            })
            _this.setData({
              username: '',
              password: '',
              checked: false
            })
          } else if (res.data.code == 500 && res.data.msg.indexOf('登录用户') != -1) {
            wx.showToast({
              title: '账号不存在',
              icon: 'error',
              duration: 2000
            })
            _this.setData({
              username: '',
              password: '',
              checked: false
            })
          }
        }
      })
    }
  },
  // 显示用户协议
  onChange(event) {
    this.setData({
      checked: event.detail,
      showSheet: true
    })
  },
  // 关闭面板函数
  closeSheet() {
    console.log(11)
    this.setData({
      showSheet: false
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
