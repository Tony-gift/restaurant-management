// pages/franchise/application/application.js
Page({
  data: {
    formData: {
      applicantName: '',
      idCard: '',
      phone: '',
      email: '',
      companyName: '',
      creditCode: '',
      registeredCapital: '',
      companyAddress: '',
      storeLocation: '',
      storeArea: '',
      expectedOpenDate: '',
      experience: '',
      reason: ''
    },
    agreed: false,
    canSubmit: false
  },

  onLoad: function (options) {
    this.checkCanSubmit()
  },

  onInput: function(e) {
    const field = e.currentTarget.dataset.field
    const value = e.detail.value
    
    this.setData({
      [`formData.${field}`]: value
    })
    
    this.checkCanSubmit()
  },

  onDateChange: function(e) {
    const field = e.currentTarget.dataset.field
    const value = e.detail.value
    
    this.setData({
      [`formData.${field}`]: value
    })
    
    this.checkCanSubmit()
  },

  onAgreementChange: function(e) {
    const agreed = e.detail.value.includes('agree')
    this.setData({
      agreed: agreed
    })
    
    this.checkCanSubmit()
  },

  checkCanSubmit: function() {
    const { formData, agreed } = this.data
    const requiredFields = [
      'applicantName', 'idCard', 'phone', 'companyName', 
      'creditCode', 'registeredCapital', 'companyAddress',
      'storeLocation', 'storeArea'
    ]
    
    const isValid = requiredFields.every(field => 
      formData[field] && formData[field].trim()
    ) && agreed
    
    this.setData({
      canSubmit: isValid
    })
  },

  submitApplication: function(e) {
    const formData = e.detail.value
    
    // 表单验证
    if (!this.validateForm(formData)) {
      return
    }
    
    wx.showLoading({
      title: '提交中...'
    })

    const api = require('../../../utils/api')
    api.applyFranchise(formData)
      .then(() => {
        wx.hideLoading()

        wx.showModal({
          title: '申请提交成功',
          content: '您的加盟申请已提交，我们将在3个工作日内完成审核，请关注申请进度。',
          showCancel: false,
          success: () => {
            wx.navigateBack()
          }
        })
      })
      .catch(() => {
        wx.hideLoading()
        wx.showToast({
          title: '提交失败',
          icon: 'none'
        })
      })
  },

  validateForm: function(formData) {
    // 验证必填字段
    const requiredFields = {
      applicantName: '申请人姓名',
      idCard: '身份证号',
      phone: '联系电话',
      companyName: '公司名称',
      creditCode: '统一社会信用代码',
      registeredCapital: '注册资金',
      companyAddress: '公司地址',
      storeLocation: '店铺位置',
      storeArea: '店铺面积'
    }
    
    for (let field in requiredFields) {
      if (!formData[field] || !formData[field].trim()) {
        wx.showToast({
          title: `请填写${requiredFields[field]}`,
          icon: 'none'
        })
        return false
      }
    }
    
    // 验证身份证号格式
    const idCardRegex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    if (!idCardRegex.test(formData.idCard)) {
      wx.showToast({
        title: '身份证号格式不正确',
        icon: 'none'
      })
      return false
    }
    
    // 验证手机号格式
    const phoneRegex = /^1[3-9]\d{9}$/
    if (!phoneRegex.test(formData.phone)) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none'
      })
      return false
    }
    
    // 验证邮箱格式（如果填写）
    if (formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        wx.showToast({
          title: '邮箱格式不正确',
          icon: 'none'
        })
        return false
      }
    }
    
    // 验证注册资金
    if (isNaN(formData.registeredCapital) || parseFloat(formData.registeredCapital) < 50) {
      wx.showToast({
        title: '注册资金不能少于50万',
        icon: 'none'
      })
      return false
    }
    
    // 验证店铺面积
    if (isNaN(formData.storeArea) || parseFloat(formData.storeArea) < 100) {
      wx.showToast({
        title: '店铺面积不能少于100平米',
        icon: 'none'
      })
      return false
    }
    
    return true
  },

  viewAgreement: function() {
    wx.showModal({
      title: '加盟协议',
      content: '这里是加盟协议的详细内容...',
      showCancel: false
    })
  }
})
