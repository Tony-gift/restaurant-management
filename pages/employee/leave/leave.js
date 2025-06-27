// pages/employee/leave/leave.js
Page({
  data: {
    activeTab: 0,
    leaveTypes: ['事假', '病假', '年假', '婚假', '产假', '丧假'],
    leaveTypeIndex: 0,
    startDate: '',
    endDate: '',
    leaveDays: 0,
    leaveReason: '',
    leaveRecords: [
      {
        id: 1,
        type: '年假',
        startDate: '2024-06-20',
        endDate: '2024-06-22',
        days: 3,
        reason: '家庭旅游',
        status: 'approved',
        statusText: '已批准',
        applyTime: '2024-06-15 14:30'
      },
      {
        id: 2,
        type: '病假',
        startDate: '2024-06-10',
        endDate: '2024-06-10',
        days: 1,
        reason: '身体不适，需要休息',
        status: 'approved',
        statusText: '已批准',
        applyTime: '2024-06-09 18:20'
      },
      {
        id: 3,
        type: '事假',
        startDate: '2024-06-28',
        endDate: '2024-06-29',
        days: 2,
        reason: '处理个人事务',
        status: 'pending',
        statusText: '待审批',
        applyTime: '2024-06-25 10:15'
      }
    ]
  },

  onLoad: function (options) {
    this.calculateLeaveDays()
  },

  switchTab: function(e) {
    const tab = parseInt(e.currentTarget.dataset.tab)
    this.setData({
      activeTab: tab
    })
  },

  onLeaveTypeChange: function(e) {
    this.setData({
      leaveTypeIndex: parseInt(e.detail.value)
    })
  },

  onStartDateChange: function(e) {
    this.setData({
      startDate: e.detail.value
    })
    this.calculateLeaveDays()
  },

  onEndDateChange: function(e) {
    this.setData({
      endDate: e.detail.value
    })
    this.calculateLeaveDays()
  },

  calculateLeaveDays: function() {
    const { startDate, endDate } = this.data
    
    if (startDate && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)
      
      if (end >= start) {
        const timeDiff = end.getTime() - start.getTime()
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1
        this.setData({
          leaveDays: daysDiff
        })
      } else {
        this.setData({
          leaveDays: 0
        })
        wx.showToast({
          title: '结束日期不能早于开始日期',
          icon: 'none'
        })
      }
    } else {
      this.setData({
        leaveDays: 0
      })
    }
  },

  onReasonInput: function(e) {
    this.setData({
      leaveReason: e.detail.value
    })
  },

  submitLeave: function() {
    const { leaveTypeIndex, leaveTypes, startDate, endDate, leaveDays, leaveReason } = this.data
    
    // 验证表单
    if (leaveTypeIndex === undefined) {
      wx.showToast({
        title: '请选择请假类型',
        icon: 'none'
      })
      return
    }
    
    if (!startDate) {
      wx.showToast({
        title: '请选择开始日期',
        icon: 'none'
      })
      return
    }
    
    if (!endDate) {
      wx.showToast({
        title: '请选择结束日期',
        icon: 'none'
      })
      return
    }
    
    if (leaveDays <= 0) {
      wx.showToast({
        title: '请假天数必须大于0',
        icon: 'none'
      })
      return
    }
    
    if (!leaveReason.trim()) {
      wx.showToast({
        title: '请输入请假原因',
        icon: 'none'
      })
      return
    }
    
    // 模拟提交申请
    wx.showLoading({
      title: '提交中...'
    })
    
    setTimeout(() => {
      wx.hideLoading()
      
      // 添加到记录列表
      const newRecord = {
        id: Date.now(),
        type: leaveTypes[leaveTypeIndex],
        startDate: startDate,
        endDate: endDate,
        days: leaveDays,
        reason: leaveReason,
        status: 'pending',
        statusText: '待审批',
        applyTime: new Date().toLocaleString('zh-CN')
      }
      
      const records = [newRecord, ...this.data.leaveRecords]
      this.setData({
        leaveRecords: records,
        // 重置表单
        leaveTypeIndex: 0,
        startDate: '',
        endDate: '',
        leaveDays: 0,
        leaveReason: '',
        activeTab: 1
      })
      
      wx.showToast({
        title: '申请提交成功',
        icon: 'success'
      })
    }, 1000)
  },

  cancelLeave: function(e) {
    const id = e.currentTarget.dataset.id
    
    wx.showModal({
      title: '确认撤销',
      content: '确定要撤销这条请假申请吗？',
      success: (res) => {
        if (res.confirm) {
          const records = this.data.leaveRecords.filter(item => item.id !== id)
          this.setData({
            leaveRecords: records
          })
          
          wx.showToast({
            title: '申请已撤销',
            icon: 'success'
          })
        }
      }
    })
  }
})
