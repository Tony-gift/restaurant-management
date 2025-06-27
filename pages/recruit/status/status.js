// pages/recruit/status/status.js
Page({
  data: {
    applicationInfo: {},
    statusSteps: [
      {
        step: 1,
        title: '提交申请',
        description: '填写并提交入职申请表',
        completed: false,
        current: false,
        completedTime: '',
        note: ''
      },
      {
        step: 2,
        title: 'HR初审',
        description: '人事部门审核申请材料',
        completed: false,
        current: false,
        completedTime: '',
        note: ''
      },
      {
        step: 3,
        title: '部门面试',
        description: '用人部门技术面试',
        completed: false,
        current: false,
        completedTime: '',
        note: ''
      },
      {
        step: 4,
        title: 'HR面试',
        description: '人事部门综合面试',
        completed: false,
        current: false,
        completedTime: '',
        note: ''
      },
      {
        step: 5,
        title: '录用确认',
        description: '发放录用通知书',
        completed: false,
        current: false,
        completedTime: '',
        note: ''
      }
    ]
  },

  onLoad: function (options) {
    this.loadApplicationInfo()
  },

  onShow: function () {
    this.loadApplicationInfo()
  },

  loadApplicationInfo: function() {
    // 从本地存储获取申请信息
    const applicationData = wx.getStorageSync('recruitApplication')
    
    if (applicationData) {
      // 生成申请编号
      const applicationId = 'RC' + Date.now().toString().slice(-8)
      
      this.setData({
        applicationInfo: {
          ...applicationData,
          id: applicationId
        }
      })
      
      this.updateStatusSteps(applicationData.status || 'pending')
    } else {
      this.setData({
        applicationInfo: {}
      })
    }
  },

  updateStatusSteps: function(status) {
    const steps = [...this.data.statusSteps]
    
    // 重置所有步骤状态
    steps.forEach(step => {
      step.completed = false
      step.current = false
      step.note = ''
    })
    
    switch(status) {
      case 'pending':
        steps[0].completed = true
        steps[0].completedTime = this.data.applicationInfo.submitTime
        steps[1].current = true
        break
      case 'reviewing':
        steps[0].completed = true
        steps[0].completedTime = this.data.applicationInfo.submitTime
        steps[1].completed = true
        steps[1].completedTime = '2024-06-27 10:30'
        steps[2].current = true
        break
      case 'interview':
        steps[0].completed = true
        steps[0].completedTime = this.data.applicationInfo.submitTime
        steps[1].completed = true
        steps[1].completedTime = '2024-06-27 10:30'
        steps[2].completed = true
        steps[2].completedTime = '2024-06-28 14:00'
        steps[3].current = true
        break
      case 'approved':
        steps.forEach((step, index) => {
          if (index < 4) {
            step.completed = true
            step.completedTime = `2024-06-${27 + index} ${10 + index}:30`
          }
        })
        steps[4].current = true
        break
      case 'rejected':
        steps[0].completed = true
        steps[0].completedTime = this.data.applicationInfo.submitTime
        steps[1].completed = true
        steps[1].completedTime = '2024-06-27 10:30'
        steps[1].note = '很抱歉，您的申请未通过初审'
        break
    }
    
    this.setData({
      statusSteps: steps
    })
  },

  getStatusIcon: function(status) {
    const icons = {
      'pending': '⏳',
      'reviewing': '📋',
      'interview': '👥',
      'approved': '✅',
      'rejected': '❌'
    }
    return icons[status] || '⏳'
  },

  getStatusText: function(status) {
    const texts = {
      'pending': '等待审核',
      'reviewing': 'HR审核中',
      'interview': '面试环节',
      'approved': '录用成功',
      'rejected': '申请被拒'
    }
    return texts[status] || '未知状态'
  },

  getStatusDesc: function(status) {
    const descs = {
      'pending': '您的申请已提交，正在等待HR审核',
      'reviewing': 'HR正在审核您的申请材料，请耐心等待',
      'interview': '恭喜！您已通过初审，请准备面试',
      'approved': '恭喜！您已被录用，请关注入职通知',
      'rejected': '很抱歉，您的申请未通过审核'
    }
    return descs[status] || '状态未知'
  },

  getNextStep: function(status) {
    const nextSteps = {
      'pending': '等待HR审核',
      'reviewing': '等待面试通知',
      'interview': '参加面试',
      'approved': '等待入职通知',
      'rejected': ''
    }
    return nextSteps[status] || ''
  },

  goToApplication: function() {
    wx.navigateTo({
      url: '/pages/recruit/application/application'
    })
  },

  withdrawApplication: function() {
    wx.showModal({
      title: '确认撤回',
      content: '确定要撤回入职申请吗？撤回后需要重新申请。',
      success: (res) => {
        if (res.confirm) {
          // 清除申请信息
          wx.removeStorageSync('recruitApplication')
          wx.setStorageSync('recruitStatus', {
            status: 'none',
            text: '未申请',
            description: '您还没有提交入职申请'
          })
          
          this.setData({
            applicationInfo: {}
          })
          
          wx.showToast({
            title: '申请已撤回',
            icon: 'success'
          })
        }
      }
    })
  },

  contactHR: function() {
    wx.showModal({
      title: '联系HR',
      content: 'HR联系方式：\n邮箱：hr@company.com\n电话：010-12345678\n工作时间：周一至周五 9:00-18:00',
      showCancel: false
    })
  }
})
