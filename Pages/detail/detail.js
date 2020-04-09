// Pages/detail/detail.js
import {
  getDetail,
  getRecommends,
  GoodsBaseInfo,
  ShopInfo,
  ParamInfo
} from '../../network/detail'

const app = getApp()

Page({
  data: {
    iid: '',
    topImages: [],
    baseInfo: {},
    shopInfo: {},
    detailInfo: {},
    paramInfo: {},
    commentInfo: {},
    recommends: [],
    showBackTop:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.iid)
    // 1.获取传入的iid
    this.setData({
      iid: options.iid
    })
    // 2.获取商品详情数据
    this._getDetail()

    // 3.请求推荐的数据
    this._getRecommends()
  },

  _getDetail() {
    getDetail(this.data.iid).then(res => {
      const data = res.data.result
      // console.log(data)
      // 1.取出顶部的图片
      const topImages = data.itemInfo.topImages
      // 2.创建BaseInfo对象
      const baseInfo = new GoodsBaseInfo(data.itemInfo, data.columns, data.shopInfo.services)
      // 3.创建ShopInfo对象
      const shopInfo = new ShopInfo(data.shopInfo)
      // 4.获取detailInfo信息
      const detailInfo = data.detailInfo;

      // 5.创建ParamInfo对象
      const paramInfo = new ParamInfo(data.itemParams.info, data.itemParams.rule)

      // 6.获取评论信息
      let commentInfo = {}
      if (data.rate && data.rate.cRate > 0) {
        commentInfo = data.rate.list[0]
      }

      this.setData({
        topImages: topImages,
        baseInfo: baseInfo,
        shopInfo: shopInfo,
        detailInfo: detailInfo,
        paramInfo: paramInfo,
        commentInfo: commentInfo
      })
    })
  },

  _getRecommends() {
    getRecommends().then(res => {
      this.setData({
        recommends : res.data.data.list
      })
    })
  },

  // 监听滚动
  onPageScroll(opt){
    const flag = opt.scrollTop >= 1000
    if (flag != this.data.showBackTop) {
      this.setData({
        showBackTop: flag
      })
    }
  },

  onAddCart(){
    const obj = {}
    obj.iid = this.data.iid
    obj.imageURL = this.data.topImages[0]
    obj.title = this.data.baseInfo.title
    obj.desc = this.data.baseInfo.desc
    obj.price = this.data.baseInfo.realPrice

    app.addToCart(obj)
    if(app.globalData.cartList[app.globalData.cartList.length-1].count <= 1){
      wx.showToast({
        title: '加入购物车成功',
      })
    }else{
      wx.showToast({
        title: '商品数量+1',
      })
    }
  }
})