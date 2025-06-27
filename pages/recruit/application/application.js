// pages/recruit/application/application.js
Page({
  data: {
    formData: {
      name: '',
      gender: '',
      birthday: '',
      idCard: '',
      phone: '',
      email: '',
      address: '',
      position: '',
      expectedSalary: '',
      availableDate: '',
      education: '',
      school: '',
      major: '',
      graduationDate: '',
      workExperience: '',
      workHistory: '',
      skills: '',
      selfIntroduction: ''
    },
    positions: ['前端开发工程师', '后端开发工程师', '产品经理', 'UI设计师', '测试工程师', '运维工程师'],
    salaryRanges: ['5K-8K', '8K-12K', '12K-18K', '18K-25K', '25K-35K', '35K以上'],
    educationLevels: ['高中', '大专', '本科', '硕士', '博士'],
    experienceYears: ['应届毕业生', '1年以下', '1-3年', '3-5年', '5-10年', '10年以上'],
    positionIndex: 0,
    salaryIndex: 0,
    educationIndex: 0,
    experienceIndex: 0,
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

  onRadioChange: function(e) {
    const field = e.currentTarget.dataset.field
    const value = e.detail.value
    
    this.setData({
      [`formData.${field}`]: value
    })
    
    this.checkCanSubmit()
  },

  onPickerChange: function(e) {
    const field = e.currentTarget.dataset.field
    const index = parseInt(e.detail.value)
    
    if (field === 'position') {
      this.setData({
        positionIndex: index,
        'formData.position': this.data.positions[index]
      })
    } else if (field === 'expectedSalary') {
      this.setData({
        salaryIndex: index,
        'formData.expectedSalary': this.data.salaryRanges[index]
      })
    } else if (field === 'education') {
      this.setData({
        educationIndex: index,
        'formData.education': this.data.educationLevels[index]
      })
    } else if (field === 'workExperience') {
      this.setData({
        experienceIndex: index,
        'formData.workExperience': this.data.experienceYears[index]
      })
    }
    
    this.checkCanSubmit()
  },

  checkCanSubmit: function() {
    const { formData } = this.data
    const requiredFields = [
      'name', 'gender', 'birthday', 'idCard', 'phone', 'email', 'address',
      'position', 'expectedSalary', 'availableDate', 'education', 'school', 
      'major', 'graduationDate'
    ]
    
    const isValid = requiredFields.every(field => 
      formData[field] && formData[field].trim()
    )
    
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
    
    // 模拟提交申请
    setTimeout(() => {
      wx.hideLoading()
      
      // 保存申请状态
      const applicationData = {
        ...formData,
        submitTime: new Date().toLocaleString('zh-CN'),
        status: 'pending'
      }
      
      wx.setStorageSync('recruitApplication', applicationData)
      wx.setStorageSync('recruitStatus', {
        status: 'pending',
        text: '待审核',
        description: '您的入职申请已提交，正在等待HR审核'
      })
      
      wx.showModal({
        title: '申请提交成功',
        content: '您的入职申请已提交，我们将在5个工作日内完成审核，请关注申请状态。',
        showCancel: false,
        success: () => {
          wx.navigateBack()
        }
      })
    }, 2000)
  },

  validateForm: function(formData) {
    // 验证必填字段
    const requiredFields = {
      name: '姓名',
      gender: '性别',
      birthday: '出生日期',
      idCard: '身份证号',
      phone: '联系电话',
      email: '电子邮箱',
      address: '现居地址',
      position: '应聘职位',
      expectedSalary: '期望薪资',
      availableDate: '可入职时间',
      education: '最高学历',
      school: '毕业院校',
      major: '专业',
      graduationDate: '毕业时间'
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
    
    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      wx.showToast({
        title: '邮箱格式不正确',
        icon: 'none'
      })
      return false
    }
    
    return true
  }
})
