// pages/franchise/progress/progress.js
Page({
  data: {
    applicationInfo: {},
    progressSteps: [
      {
        step: 1,
        title: '提交申请',
        description: '填写并提交加盟申请表',
        completed: false,
        current: false,
        completedTime: ''
      },
      {
        step: 2,
        title: '初步审核',
        description: '审核申请材料的完整性和真实性',
        completed: false,
        current: false,
        completedTime: ''
      },
      {
        step: 3,
        title: '实地考察',
        description: '实地考察店铺位置和市场环境',
        completed: false,
        current: false,
        completedTime: ''
      },
      {
        step: 4,
        title: '终审确认',
        description: '最终审核并确认加盟资格',
        completed: false,
        current: false,
        completedTime: ''
      },
      {
        step: 5,
        title: '签约完成',
        description: '签署加盟协议，正式成为加盟商',
        completed: false,
        current: false,
        completedTime: ''
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
    const applicationData = wx.getStorageSync('franchiseApplication')
    
    if (applicationData) {
      // 生成申请编号
      const applicationId = 'FR' + Date.now().toString().slice(-8)
      
      this.setData({
        applicationInfo: {
          ...applicationData,
          id: applicationId
        }
      })
      
      this.updateProgressSteps(applicationData.status || 'pending')
    } else {
      this.setData({
        applicationInfo: {}
      })
    }
  },

  updateProgressSteps: function(status) {
    const steps = [...this.data.progressSteps]
    
    // 重置所有步骤状态
    steps.forEach(step => {
      step.completed = false
      step.current = false
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
        steps[1].completedTime = '2024-06-26 10:30'
        steps[2].current = true
        break
      case 'approved':
        steps.forEach((step, index) => {
          if (index < 4) {
            step.completed = true
            step.completedTime = `2024-06-${26 + index} ${10 + index}:30`
          }
        })
        steps[4].current = true
        break
      case 'rejected':
        steps[0].completed = true
        steps[0].completedTime = this.data.applicationInfo.submitTime
        steps[1].completed = true
        steps[1].completedTime = '2024-06-26 10:30'
        break
    }
    
    this.setData({
      progressSteps: steps
    })
  },

  getStatusIcon: function(status) {
    const icons = {
      'pending': '⏳',
      'reviewing': '🔍',
      'approved': '✅',
      'rejected': '❌'
    }
    return icons[status] || '⏳'
  },

  getStatusText: function(status) {
    const texts = {
      'pending': '等待审核',
      'reviewing': '审核中',
      'approved': '审核通过',
      'rejected': '审核未通过'
    }
    return texts[status] || '未知状态'
  },

  getStatusDesc: function(status) {
    const descs = {
      'pending': '您的申请已提交，正在等待工作人员审核',
      'reviewing': '工作人员正在审核您的申请材料',
      'approved': '恭喜！您的加盟申请已通过审核',
      'rejected': '很抱歉，您的申请未通过审核，请联系客服了解详情'
    }
    return descs[status] || '状态未知'
  },

  goToApplication: function() {
    wx.navigateTo({
      url: '/pages/franchise/application/application'
    })
  },

  cancelApplication: function() {
    wx.showModal({
      title: '确认撤销',
      content: '确定要撤销加盟申请吗？撤销后需要重新申请。',
      success: (res) => {
        if (res.confirm) {
          // 清除申请信息
          wx.removeStorageSync('franchiseApplication')
          wx.setStorageSync('franchiseStatus', {
            status: 'none',
            text: '未申请',
            description: '您还没有提交加盟申请'
          })
          
          this.setData({
            applicationInfo: {}
          })
          
          wx.showToast({
            title: '申请已撤销',
            icon: 'success'
          })
        }
      }
    })
  },

  contactService: function() {
    wx.showModal({
      title: '联系客服',
      content: '客服热线：400-123-4567\n工作时间：周一至周五 9:00-18:00',
      showCancel: false
    })
  }
})
