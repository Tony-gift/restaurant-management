// pages/login/form/form.js
Page({
  data: {
    userType: '',
    typeText: '',
    username: '',
    password: '',
    showPassword: false
  },

  onLoad: function (options) {
    const userType = options.type
    const typeMap = {
      'employee': '员工',
      'franchise': '加盟',
      'recruit': '入职'
    }
    
    this.setData({
      userType: userType,
      typeText: typeMap[userType] || ''
    })
  },

  onUsernameInput: function(e) {
    this.setData({
      username: e.detail.value
    })
  },

  onPasswordInput: function(e) {
    this.setData({
      password: e.detail.value
    })
  },

  togglePassword: function() {
    this.setData({
      showPassword: !this.data.showPassword
    })
  },

  handleLogin: function() {
    const { username, password, userType } = this.data
    
    if (!username.trim()) {
      wx.showToast({
        title: '请输入用户名',
        icon: 'none'
      })
      return
    }
    
    if (!password.trim()) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none'
      })
      return
    }
    
    const api = require('../../../utils/api')

    wx.showLoading({
      title: '登录中...'
    })

    api.login(username, password, userType)
      .then(res => {
        wx.hideLoading()

        const app = getApp()
        app.globalData.isLoggedIn = true
        app.globalData.userType = res.userType
        app.globalData.userInfo = {
          username: username,
          userId: res.userId,
          userType: res.userType
        }
        wx.setStorageSync('token', res.token)

        wx.showToast({
          title: '登录成功',
          icon: 'success'
        })

        setTimeout(() => {
          this.navigateToHome()
        }, 1500)
      })
      .catch(() => {
        wx.hideLoading()
        wx.showToast({
          title: '登录失败',
          icon: 'none'
        })
      })
  },

  navigateToHome: function() {
    const userType = this.data.userType
    
    switch(userType) {
      case 'employee':
        wx.reLaunch({
          url: '/pages/employee/home/home'
        })
        break
      case 'franchise':
        wx.reLaunch({
          url: '/pages/franchise/home/home'
        })
        break
      case 'recruit':
        wx.reLaunch({
          url: '/pages/recruit/home/home'
        })
        break
    }
  },

  goToRegister: function() {
    wx.navigateTo({
      url: `/pages/register/register?type=${this.data.userType}`
    })
  }
})
