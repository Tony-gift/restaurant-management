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

function punchAttendance(userId, timestamp, type) {
  return request('POST', `/employees/${userId}/attendance`, { timestamp, type })
}

function applyFranchise(data) {
  return request('POST', '/franchise/applications', data)
}

function applyRecruit(data) {
  return request('POST', '/recruit/applications', data)
}

module.exports = {
  request,
  login,
  register,
  punchAttendance,
  applyFranchise,
  applyRecruit
}
