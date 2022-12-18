// components/Swiper/Swiper.js
const { imageUrl } = require('../../api/base.js')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    autoplay: {
      type: Boolean,
      value: false
    },
    interval: {
      type: Number,
      value: 5000
    },
    duration: {
      type: Number,
      value: 500
    },
    swiperData: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imageUrl
  },

  /**
   * 组件的方法列表
   */
  methods: {}
})
