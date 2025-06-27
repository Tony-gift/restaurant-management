// pages/franchise/home/home.js
Page({
  data: {
    userInfo: {},
    franchiseStatus: {
      status: 'pending', // pending, approved, rejected
      text: '审核中',
      description: '您的加盟申请正在审核中，请耐心等待'
    }
  },

  onLoad: function (options) {
    const app = getApp()
    this.setData({
      userInfo: app.globalData.userInfo || {}
    })
    this.loadFranchiseStatus()
  },

  onShow: function () {
    // 检查登录状态
    const app = getApp()
    if (!app.globalData.isLoggedIn || app.globalData.userType !== 'franchise') {
      wx.reLaunch({
        url: '/pages/login/login'
      })
      return
    }
  },

  loadFranchiseStatus: function() {
    // 模拟加载加盟状态
    // 实际项目中这里会调用API获取状态
    const savedStatus = wx.getStorageSync('franchiseStatus')
    if (savedStatus) {
      this.setData({
        franchiseStatus: savedStatus
      })
    }
  },

  navigateTo: function(e) {
    const page = e.currentTarget.dataset.page
    const urls = {
      'application': '/pages/franchise/application/application',
      'progress': '/pages/franchise/progress/progress'
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
