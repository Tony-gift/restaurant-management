// pages/register/register.js
Page({
  data: {
    userType: 'franchise', // 默认加盟类型
    typeText: '加盟',
    username: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false
  },

  onLoad: function (options) {
    const userType = options.type || 'franchise'
    const typeMap = {
      'franchise': '加盟',
      'recruit': '入职'
    }
    
    this.setData({
      userType: userType,
      typeText: typeMap[userType] || '加盟'
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

  onConfirmPasswordInput: function(e) {
    this.setData({
      confirmPassword: e.detail.value
    })
  },

  togglePassword: function() {
    this.setData({
      showPassword: !this.data.showPassword
    })
  },

  toggleConfirmPassword: function() {
    this.setData({
      showConfirmPassword: !this.data.showConfirmPassword
    })
  },

  handleRegister: function() {
    const { username, password, confirmPassword, userType } = this.data
    
    // 验证用户名
    if (!username.trim()) {
      wx.showToast({
        title: '请输入用户名',
        icon: 'none'
      })
      return
    }
    
    if (username.length < 3) {
      wx.showToast({
        title: '用户名至少3个字符',
        icon: 'none'
      })
      return
    }
    
    // 验证密码
    if (!password.trim()) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none'
      })
      return
    }
    
    if (password.length < 6) {
      wx.showToast({
        title: '密码至少6个字符',
        icon: 'none'
      })
      return
    }
    
    // 验证确认密码
    if (password !== confirmPassword) {
      wx.showToast({
        title: '两次密码不一致',
        icon: 'none'
      })
      return
    }
    
    const api = require('../../utils/api')

    wx.showLoading({
      title: '注册中...'
    })

    api.register(username, password, userType)
      .then(() => {
        wx.hideLoading()

        wx.showToast({
          title: '注册成功',
          icon: 'success'
        })

        setTimeout(() => {
          wx.navigateTo({
            url: `/pages/login/form/form?type=${userType}`
          })
        }, 1500)
      })
      .catch(() => {
        wx.hideLoading()
        wx.showToast({
          title: '注册失败',
          icon: 'none'
        })
      })
  },

  goToLogin: function() {
    wx.navigateTo({
      url: `/pages/login/form/form?type=${this.data.userType}`
    })
  }
})
