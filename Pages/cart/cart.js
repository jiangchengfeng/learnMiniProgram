// Pages/cart/cart.js
const app = getApp()

Page({

  data: {
    cartList: [],
    isSelectAll: true,
    totalPrice: 0,
    totalcCount: 0
  },

  onLoad: function (options) {
    // 1.第一次加载数据
    this.setData({
      cartList: app.globalData.cartList
    })

    // 2.设置回调
    app.addCartCallback = () => {
      this.setData({
        cartList: app.globalData.cartList
      })
      this.changeData()
    }

    // 3.设置修改某个商品的回调
    app.changeGoodsState = (goods, index) => {
      // 1.修改某一项的选中状态
      this.setData({
        [`cartList[${index}]`]: goods
      })
      // 2.修改全部选中的状态
      const selectAll = !this.data.cartList.find(item =>
        !item.checked)
      this.setData({
        isSelectAll: selectAll
      })
      this.changeData()
    }
  },

  // 全选点击
  onSelelctAll() {
    // 目前全部选中
    if (this.data.isSelectAll) {
      this.data.cartList.forEach(item => {
        item.checked = false
      })
      this.setData({
        cartList: this.data.cartList,
        isSelectAll: !this.data.isSelectAll
      })
    } else { // 某些没选中
      this.data.cartList.forEach(item => {
        item.checked = true
      })
      this.setData({
        cartList: this.data.cartList,
        isSelectAll: !this.data.isSelectAll
      })
    }
    this.changeData()
  },

  onShow() {
    wx.setNavigationBarTitle({
      title: `购物车(${this.data.cartList.length})`,
    })
    this.changeData()
  },

  changeData() {
    let totalPrice = 0
    let count = 0
    for (let item of this.data.cartList) {
      if (item.checked) {
        count += item.count
        totalPrice += parseFloat((item.price * item.count).toFixed(2))
      }
    }
    console.log(count, totalPrice)

    this.setData({
      totalPrice: totalPrice,
      totalCount: count
    })
  }

})