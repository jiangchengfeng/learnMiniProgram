// Pages/home/home.js
import {
  getMultiData,
  getGoodsData
} from '../../network/home'

const types = ['pop', 'new', 'sell']

Page({
  data: {
    banners: [],
    recommends: [],
    titles: ['流行', '新款', '精选'],
    goods: {
      'pop': {
        page: 1,
        list: []
      },
      'new': {
        page: 1,
        list: []
      },
      'sell': {
        page: 1,
        list: []
      }
    },
    currentType: 'pop',
    showBackTop: false,
    isTabFixed: false,
    tabScrollTop: 0
  },

  onLoad: function (options) {
    // 1.请求轮播图以及推荐数据
    this._getMultiData()

    this._getGoodsData('pop')
    this._getGoodsData('new')
    this._getGoodsData('sell')
  },

  _getMultiData() {
    getMultiData().then(res => {
      // console.log(res)
      // 2.取出轮播图和推荐的数据
      const banners = res.data.data.banner.list
      const recommends = res.data.data.recommend.list
      this.setData({
        banners,
        recommends
      })
    })
  },
  _getGoodsData(type) {
    // 1.获取页面
    let page = this.data.goods[type].page
    // 2.发送网络请求
    getGoodsData(type, page).then(res => {
      // console.log(res)
      // 2.1取出数据
      const list = res.data.data.list

      // 2.2.将数据临时获取
      const goods = this.data.goods;
      goods[type].list.push(...list)
      goods[type].page += 1;

      // 2.3.最新的goods设置到goods中
      this.setData({
        goods: goods
      })
    })
  },
  // 页面滚动到底部
  onReachBottom() {
    // 上拉加载更多
    this._getGoodsData(this.data.currentType)
  },
  // 监听滚动
  onPageScroll(opt) {
    // console.log(opt)
    const flag = opt.scrollTop >= 1000
    if (flag != this.data.showBackTop) {
      this.setData({
        showBackTop: flag
      })
    }
    const flag2 = opt.scrollTop >= this.data.tabScrollTop
    if (flag2 != this.data.isTabFixed) {
      this.setData({
        isTabFixed: flag2
      })
    }
  },

  // onShow：页面显示踹的时候回调的函数
  // 页面显示是否意味着所有的图片都加载完成
  // onShow() {
  //   // 获取组件offsettop
  //   wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect => {
  //     console.log(rect)
  //   }).exec()
  // },

  // 监听tab-bar点击
  handleTabClick(e) {
    // 取出index
    const index = e.detail.index
    // console.log(index)
    this.setData({
      // 设置currentType
      currentType: types[index]
    })
  },

  // 监听推荐图片加载完成
  handleImageLoad() {
    wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect => {
      // console.log(rect)
      this.setData({
        tabScrollTop: rect.top
      })
    }).exec()
  }
})