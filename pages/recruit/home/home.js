// pages/recruit/home/home.js
Page({
  data: {
    userInfo: {},
    recruitStatus: {
      status: 'none', // none, pending, reviewing, interview, approved, rejected
      text: '未申请',
      description: '您还没有提交入职申请'
    },
    jobList: [
      {
        id: 1,
        title: '前端开发工程师',
        salary: '12K-20K',
        department: '技术部',
        location: '北京',
        tags: ['Vue', 'React', '前端框架'],
        publishTime: '2024-06-25'
      },
      {
        id: 2,
        title: '后端开发工程师',
        salary: '15K-25K',
        department: '技术部',
        location: '北京',
        tags: ['Java', 'Spring', '微服务'],
        publishTime: '2024-06-24'
      },
      {
        id: 3,
        title: '产品经理',
        salary: '18K-30K',
        department: '产品部',
        location: '北京',
        tags: ['产品设计', '需求分析', '项目管理'],
        publishTime: '2024-06-23'
      },
      {
        id: 4,
        title: 'UI设计师',
        salary: '10K-18K',
        department: '设计部',
        location: '北京',
        tags: ['UI设计', 'Sketch', 'Figma'],
        publishTime: '2024-06-22'
      }
    ]
  },

  onLoad: function (options) {
    const app = getApp()
    this.setData({
      userInfo: app.globalData.userInfo || {}
    })
    this.loadRecruitStatus()
  },

  onShow: function () {
    // 检查登录状态
    const app = getApp()
    if (!app.globalData.isLoggedIn || app.globalData.userType !== 'recruit') {
      wx.reLaunch({
        url: '/pages/login/login'
      })
      return
    }
    this.loadRecruitStatus()
  },

  loadRecruitStatus: function() {
    // 模拟加载入职申请状态
    const savedStatus = wx.getStorageSync('recruitStatus')
    if (savedStatus) {
      this.setData({
        recruitStatus: savedStatus
      })
    }
  },

  navigateTo: function(e) {
    const page = e.currentTarget.dataset.page
    const urls = {
      'application': '/pages/recruit/application/application',
      'status': '/pages/recruit/status/status'
    }
    
    if (urls[page]) {
      wx.navigateTo({
        url: urls[page]
      })
    }
  },

  viewJobDetail: function(e) {
    const job = e.currentTarget.dataset.job
    wx.showModal({
      title: job.title,
      content: `薪资：${job.salary}\n部门：${job.department}\n地点：${job.location}\n\n职位详情功能开发中...`,
      showCancel: false
    })
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
