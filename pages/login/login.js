// pages/login/login.js
Page({
  data: {
    selectedUserType: '',
    typeText: '',
    username: '',
    password: '',
    showPassword: false
  },

  onLoad: function (options) {
    // 检查是否已登录
    const app = getApp()
    if (app.globalData.isLoggedIn) {
      this.navigateToHome()
    }
  },

  selectUserType: function(e) {
    const userType = e.currentTarget.dataset.type
    const typeMap = {
      'employee': '员工',
      'franchise': '加盟商',
      'recruit': '求职者'
    }
    
    this.setData({
      selectedUserType: userType,
      typeText: typeMap[userType]
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
    const { username, password, selectedUserType } = this.data
    
    if (!selectedUserType) {
      wx.showToast({
        title: '请先选择身份',
        icon: 'none'
      })
      return
    }
    
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
      app.globalData.userType = selectedUserType
      app.globalData.userInfo = {
        username: username,
        userType: selectedUserType
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

  goToRegister: function() {
    if (this.data.selectedUserType) {
      wx.navigateTo({
        url: `/pages/register/register?type=${this.data.selectedUserType}`
      })
    } else {
      wx.navigateTo({
        url: '/pages/register/register'
      })
    }
  },

  navigateToHome: function() {
    const app = getApp()
    const userType = app.globalData.userType
    
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
      default:
        console.error('Unknown user type')
    }
  }
})
