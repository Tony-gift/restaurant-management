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
    
    // 模拟登录验证
    wx.showLoading({
      title: '登录中...'
    })
    
    setTimeout(() => {
      wx.hideLoading()
      
      // 保存登录状态
      const app = getApp()
      app.globalData.isLoggedIn = true
      app.globalData.userType = userType
      app.globalData.userInfo = {
        username: username,
        userType: userType
      }
      
      wx.showToast({
        title: '登录成功',
        icon: 'success'
      })
      
      // 跳转到对应的首页
      setTimeout(() => {
        this.navigateToHome()
      }, 1500)
    }, 1000)
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
