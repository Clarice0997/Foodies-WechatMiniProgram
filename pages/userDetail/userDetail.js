// pages/userDetail/userDetail.js
const app = getApp()
import { initLottieCanvas } from '../../utils/lottie'
import { getProfile, setProfile } from '../../api/userAPI'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 用户信息对象
    userInfo: {
      nickname: '',
      phone: '',
      sex: '男',
      email: ''
    },
    showPop: false,
    sexColumns: ['男', '女'],
    sexIndex: 0,
    rawUserInfo: {}
  },
  // 输入框改变事件
  formNicknameChange(e) {
    this.setData({
      ['userInfo.' + e.currentTarget.id]: e.detail.value
    })
  },
  // 点击展示弹出层事件
  showPopup() {
    this.setData({
      showPop: true
    })
  },
  // 关闭弹出层事件
  closePopup() {
    this.setData({
      showPop: false
    })
  },
  // 选择性别确定事件
  onConfirmSex(event) {
    const { value, index } = event.detail
    // 赋值
    this.setData({
      sexIndex: index,
      'userInfo.sex': this.data.sexColumns[index]
    })
  },
  // 确认修改按钮点击事件
  clickHandler() {
    let data = this.data.rawUserInfo
    // 判断是否存在数据 修改数据对象
    if (data) {
      data.nickName = this.data.userInfo.nickname
      data.phonenumber = this.data.userInfo.phone
      data.sex = this.data.userInfo.sex == '男' ? '0' : '1'
      data.email = this.data.userInfo.email
      // 发起修改用户信息请求
      setProfile(data)
        .then(async res => {
          if (res.data.code == 200) {
            // 修改后 再次请求数据
            await this.getProfileHandler()
            wx.showToast({
              title: '修改数据成功',
              icon: 'success',
              duration: 2000
            })
          } else {
            wx.showToast({
              title: '修改数据失败',
              icon: 'error',
              duration: 2000
            })
          }
        })
        .catch(err => {
          console.log(err)
          wx.showToast({
            title: '修改数据失败',
            icon: 'error',
            duration: 2000
          })
        })
    } else {
      wx.showToast({
        title: '源数据不存在',
        icon: 'error',
        duration: 2000
      })
    }
  },
  // 获取用户信息函数
  getProfileHandler() {
    getProfile()
      .then(res => {
        if (res.data.code == 200) {
          // 保存请求数据
          let data = res.data.data
          this.setData({
            rawUserInfo: data
          })
          // 更改数据源
          this.setData({
            ['userInfo.nickname']: data.nickName,
            ['userInfo.phone']: data.phonenumber,
            ['userInfo.sex']: data.sex == '0' ? '男' : '女',
            ['userInfo.email']: data.email
          })
        } else {
          wx.showToast({
            title: '获取信息失败',
            icon: 'error',
            duration: 2000
          })
        }
      })
      .catch(err => {
        console.log(err)
        wx.showToast({
          title: '获取信息失败',
          icon: 'error',
          duration: 2000
        })
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getProfileHandler()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    initLottieCanvas('#canvas', 'https://assets5.lottiefiles.com/private_files/lf30_4bVja9.json')
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
