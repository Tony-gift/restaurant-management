// pages/employee/profile/profile.js
Page({
  data: {
    userProfile: {
      name: '张三',
      position: '软件工程师',
      employeeId: 'EMP001',
      avatar: '',
      gender: '男',
      birthday: '1990-05-15',
      idCard: '110101199005150123',
      phone: '13800138000',
      email: 'zhangsan@company.com',
      address: '北京市朝阳区某某街道123号',
      department: '技术部',
      hireDate: '2022-03-01',
      workYears: 2,
      supervisor: '李经理',
      status: 'active',
      statusText: '在职',
      education: [
        {
          school: '北京理工大学',
          major: '计算机科学与技术',
          degree: '本科',
          period: '2008-2012'
        },
        {
          school: '清华大学',
          major: '软件工程',
          degree: '硕士',
          period: '2012-2015'
        }
      ],
      emergencyContacts: [
        {
          name: '张小明',
          relationship: '父亲',
          phone: '13700137000'
        },
        {
          name: '王小红',
          relationship: '配偶',
          phone: '13600136000'
        }
      ]
    },
    expandedSections: {
      basic: true,
      work: false,
      education: false,
      emergency: false
    }
  },

  onLoad: function (options) {
    // 可以从全局数据或服务器加载用户档案信息
    this.loadUserProfile()
  },

  loadUserProfile: function() {
    // 模拟从服务器或本地存储加载用户档案
    // 实际项目中这里会调用API获取数据
  },

  toggleSection: function(e) {
    const section = e.currentTarget.dataset.section
    const expandedSections = { ...this.data.expandedSections }
    expandedSections[section] = !expandedSections[section]
    
    this.setData({
      expandedSections: expandedSections
    })
  },

  changeAvatar: function() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePaths = res.tempFilePaths
        
        // 这里可以上传头像到服务器
        // 现在只是更新本地显示
        this.setData({
          'userProfile.avatar': tempFilePaths[0]
        })
        
        wx.showToast({
          title: '头像更新成功',
          icon: 'success'
        })
      },
      fail: (err) => {
        console.error('选择图片失败', err)
      }
    })
  },

  editProfile: function() {
    wx.showModal({
      title: '编辑资料',
      content: '编辑个人资料功能开发中...',
      showCancel: false
    })
  },

  changePassword: function() {
    wx.showModal({
      title: '修改密码',
      content: '修改密码功能开发中...',
      showCancel: false
    })
  }
})
