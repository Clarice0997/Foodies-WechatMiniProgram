// pages/userDetail/userDetail.js
const app = getApp()
import { initLottieCanvas } from '../../utils/lottie'
import { getProfile, setProfile, updatePwd } from '../../api/userAPI'

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
    // 用户信息错误提示数据对象
    userInfoError: {
      nickname: '',
      phone: '',
      email: ''
    },
    // 修改密码数据对象
    passwordList: {
      oldPassword: '',
      newPassword: '',
      checkedPassword: ''
    },
    // 修改密码错误提示数据对象
    passwordListError: {
      oldPassword: '',
      newPassword: '',
      checkedPassword: ''
    },
    showPop: false,
    showPasswordPop: false,
    sexColumns: ['男', '女'],
    sexIndex: 0,
    rawUserInfo: {}
  },
  // 输入框改变事件
  formChangeHandler(e) {
    let value = e.detail.value
    let id = e.currentTarget.id
    // 判断输入框种类 对value进行校验
    if (id == 'nickname') {
      // 昵称校验：长度2-15中文字符
      if (!Boolean(value.length >= 2 && value.length < 15)) {
        this.setData({
          ['userInfoError.' + id]: '昵称长度2-15字符'
        })
        return
      } else {
        this.setData({
          ['userInfoError.' + id]: ''
        })
      }
    } else if (id == 'phone') {
      // 电话校验
      if (!Boolean(/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(value))) {
        this.setData({
          ['userInfoError.' + id]: '电话不合法'
        })
        return
      } else {
        this.setData({
          ['userInfoError.' + id]: ''
        })
      }
    } else if (id == 'email') {
      // 邮箱校验
      if (!Boolean(/(^[\w.\-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$)|(^1[3|4|5|8]\d{9}$)/.test(value))) {
        this.setData({
          ['userInfoError.' + id]: '邮箱不合法'
        })
        return
      } else {
        this.setData({
          ['userInfoError.' + id]: ''
        })
      }
    }
    this.setData({
      ['userInfo.' + id]: value
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
    const { index } = event.detail
    // 赋值
    this.setData({
      sexIndex: index,
      showPop: false,
      'userInfo.sex': this.data.sexColumns[index]
    })
  },
  // 确认修改按钮点击事件
  clickHandler() {
    // 校验是否存在错误信息
    for (let key in this.data.userInfoError) {
      if (this.data.userInfoError[key] != '') {
        wx.showToast({
          title: '数据不合法',
          icon: 'error',
          duration: 2000
        })
        return
      }
    }
    // 判断是否存在数据 修改数据对象
    let data = this.data.rawUserInfo
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
          console.log(data)
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
  // 重置按钮点击事件
  async resetHandler() {
    // 重新获取用户信息
    await this.getProfileHandler()
    // 重置错误信息
    this.setData({
      userInfoError: {
        nickname: '',
        phone: '',
        email: ''
      }
    })
  },
  // 修改密码点击事件
  changePasswordHandler() {
    this.setData({
      showPasswordPop: true
    })
  },
  // 关闭弹出层事件
  closePasswordPopup() {
    this.setData({
      showPasswordPop: false,
      passwordList: {
        oldPassword: '',
        newPassword: '',
        checkedPassword: ''
      }
    })
  },
  // 密码输入框更改事件
  passwordChangeHandler(e) {
    this.setData({
      ['passwordList.' + e.currentTarget.id]: e.detail.value
    })
  },
  // 确认更改密码事件
  confirmPasswordHandler() {
    let oldPassword = this.data.passwordList.oldPassword
    let newPassword = this.data.passwordList.newPassword
    let checkedPassword = this.data.passwordList.checkedPassword
    console.log(checkedPassword)
    console.log(oldPassword != newPassword && newPassword == checkedPassword && oldPassword != '' && newPassword != '' && checkedPassword != '')
    // 判断旧密码&新密码不能相同 || 新密码和确认密码相同 发起修改密码请求
    if (oldPassword != newPassword && newPassword == checkedPassword && oldPassword != '' && newPassword != '' && checkedPassword != '') {
      let query = `?oldPassword=${oldPassword}&newPassword=${newPassword}`
      updatePwd(query)
        .then(res => {
          if (res.data.code == 200) {
            wx.showToast({
              title: '修改密码成功',
              icon: 'success',
              duration: 2000
            })
          } else {
            wx.showToast({
              title: '修改密码错误',
              icon: 'error',
              duration: 2000
            })
          }
        })
        .catch(err => {
          console.log(err)
          wx.showToast({
            title: '修改密码错误',
            icon: 'error',
            duration: 2000
          })
        })
        .finally(() => {
          // 重置
          this.setData({
            showPasswordPop: false,
            passwordList: {
              oldPassword: '',
              newPassword: '',
              checkedPassword: ''
            }
          })
        })
    } else if (oldPassword == '') {
      wx.showToast({
        title: '旧密码不能为空',
        icon: 'error',
        duration: 2000
      })
    } else if (newPassword == '') {
      wx.showToast({
        title: '新密码不能为空',
        icon: 'error',
        duration: 2000
      })
    } else if (checkedPassword == '') {
      wx.showToast({
        title: '确认密码不能为空',
        icon: 'error',
        duration: 2000
      })
    } else if (oldPassword == newPassword) {
      wx.showToast({
        title: '密码不能相同',
        icon: 'error',
        duration: 2000
      })
    } else if (newPassword != checkedPassword) {
      wx.showToast({
        title: '确认密码不相同',
        icon: 'error',
        duration: 2000
      })
    }
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
