// components/card/card.js
const { imageUrl } = require('../../api/base.js')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemData: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    page: 1,
    list: [],
    imageUrl: imageUrl
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toGoodDetail() {
      wx.navigateTo({
        url: '/pages/goodDetail/goodDetail?categoryId=' + this.data.itemData.categoryId
      })
    }
  }
})
