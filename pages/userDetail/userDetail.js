// pages/userDetail/userDetail.js
const app = getApp()
import { initLottieCanvas } from '../../utils/lottie'

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
    sexIndex: 0
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
    console.log(this.data.userInfo)
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
