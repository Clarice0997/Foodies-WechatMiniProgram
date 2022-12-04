const { getBanner } = require('../../api/index.js')
Page({
  data: {
    value: '',
    swiperOptions: {
      autoplay: true,
      interval: 3000,
      duration: 1000,
      swiperData: []
    }
  },
  clickSearch() {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },

  onLoad() {
    getBanner({ pageNum: 1, pageSize: 10 }).then(res => {
      console.log(res)
      this.setData({
        swiperData: res.data.rows
      })
    })
  },
  onReachBottom() {
    wx.showToast({
      title: '暂无数据',
      icon: 'error'
    })
  }
})
