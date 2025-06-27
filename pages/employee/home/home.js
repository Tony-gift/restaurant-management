// pages/employee/home/home.js
Page({
  data: {
    userInfo: {},
    notices: [
      {
        title: '公司年度体检通知',
        time: '2024-06-25'
      },
      {
        title: '端午节假期安排',
        time: '2024-06-20'
      },
      {
        title: '新员工培训计划',
        time: '2024-06-15'
      }
    ]
  },

  onLoad: function (options) {
    const app = getApp()
    this.setData({
      userInfo: app.globalData.userInfo || {}
    })
  },

  onShow: function () {
    // 检查登录状态
    const app = getApp()
    if (!app.globalData.isLoggedIn || app.globalData.userType !== 'employee') {
      wx.reLaunch({
        url: '/pages/login/login'
      })
      return
    }
  },

  navigateTo: function(e) {
    const page = e.currentTarget.dataset.page
    const urls = {
      'attendance': '/pages/employee/attendance/attendance',
      'leave': '/pages/employee/leave/leave',
      'salary': '/pages/employee/salary/salary',
      'profile': '/pages/employee/profile/profile'
    }
    
    if (urls[page]) {
      wx.navigateTo({
        url: urls[page]
      })
    }
  },

  logout: function() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          const app = getApp()
          app.globalData.isLoggedIn = false
          app.globalData.userType = null
          app.globalData.userInfo = null
          
          wx.reLaunch({
            url: '/pages/login/login'
          })
        }
      }
    })
  }
})
