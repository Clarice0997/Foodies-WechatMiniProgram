const { getBanner } = require('../../api/index.js')
const { getAllCategory } = require('../../api/categoryAPI')
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
    baseUrl: baseUrl,
    categoryList: []
  },
  clickSearch() {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },

  onLoad() {
    // 调用获取轮播图函数
    getBanner()
      .then(res => {
        this.setData({
          swiperData: res.data.rows
        })
      })
      .catch(err => {
        console.log(err)
      })
    // 调用获取盲盒列表函数
    getAllCategory()
      .then(res => {
        this.setData({
          categoryList: res.data.rows
        })
        console.log(this.data.categoryList)
      })
      .catch(err => {
        console.log(err)
      })
  },
  onReachBottom() {
    wx.showToast({
      title: '暂无数据',
      icon: 'error'
    })
  }
})
