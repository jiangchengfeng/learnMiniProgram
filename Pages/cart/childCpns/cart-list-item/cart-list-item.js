// Pages/cart/childCpns/cart-list-item/cart-list-item.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cartGoods: {
      type: Object,
      value: {}
    },
    index: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

    onCheckClick(e) {
      // 1.查找到对应的商品
      const goods = app.globalData.cartList.find(item => item.iid === this.properties.cartGoods.iid)
      goods.checked = !goods.checked

      // 2.获取当前商品的index
      const index = e.currentTarget.dataset.index
      console.log(index)

      // 3.回调
      app.changeGoodsState(goods,index)
    }
  }
})