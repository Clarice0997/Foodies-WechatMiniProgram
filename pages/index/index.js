const { getBanner } = require('../../api/index.js')
import { baseUrl } from '../../api/base'

Page({
  data: {
    value: '',
    swiperOptions: {
      autoplay: true,
      interval: 3000,
      duration: 1000,
      swiperData: []
    },
    baseUrl: baseUrl
  },
  clickSearch() {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },

  onLoad() {
    getBanner().then(res => {
      console.log(res)
      this.setData({
        swiperData: res.data.rows
      })
      console.log(this.data.swiperData)
    })
  },
  onReachBottom() {
    wx.showToast({
      title: '暂无数据',
      icon: 'error'
    })
  }
})
