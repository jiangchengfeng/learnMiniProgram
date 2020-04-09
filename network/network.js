import {
  baseURL,
  timeout
} from './config.js'

export default function (opt) {
  wx.showLoading({
    title: '数据加载中ing',
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + opt.url,
      timeout: timeout,
      method: opt.method || 'get',
      data: opt.data || {},
      success: resolve,
      fail: reject,
      complete: res => {
        wx.hideLoading()
      }
    })

  })
}