import{ basrURL,timeout } from './config.js'

function request(options) {
  wx.showLoading({
    title: '数据加载中ing',
  })

  return new Promise((resolve, reject) => {
    wx.request({
      url: basrURL + options.url,
      method: options.method || 'get',
      timeout: timeout,
      data: options.data,
      success: resolve,
      fail: reject,
      complete: res => {
        wx.hideLoading()
      }
    })
  })
}

export default request;