const BASE_URL = 'https://example.com/api/v1'

function request(method, url, data = {}) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + url,
      method,
      data,
      header: {
        'Content-Type': 'application/json',
        'Authorization': wx.getStorageSync('token') ? `Bearer ${wx.getStorageSync('token')}` : ''
      },
      success(res) {
        if (res.statusCode === 200 && res.data.code === 0) {
          resolve(res.data.data)
        } else {
          reject(res.data)
        }
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

function login(username, password, userType) {
  return request('POST', '/auth/login', { username, password, userType })
}

function register(username, password, userType) {
  return request('POST', '/auth/register', { username, password, userType })
}

module.exports = {
  request,
  login,
  register
}
