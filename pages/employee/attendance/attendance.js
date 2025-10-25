// pages/employee/attendance/attendance.js
Page({
  data: {
    currentTime: '',
    punchInTime: '',
    punchOutTime: '',
    monthStats: {
      workDays: 22,
      lateDays: 2,
      leaveDays: 1,
      overtimeHours: 15
    },
    attendanceHistory: [
      {
        date: '06-26',
        day: '周三',
        punchIn: '09:00',
        punchOut: '18:30',
        status: 'normal',
        statusText: '正常'
      },
      {
        date: '06-25',
        day: '周二',
        punchIn: '09:15',
        punchOut: '18:00',
        status: 'late',
        statusText: '迟到'
      },
      {
        date: '06-24',
        day: '周一',
        punchIn: '08:55',
        punchOut: '19:00',
        status: 'normal',
        statusText: '正常'
      },
      {
        date: '06-21',
        day: '周五',
        punchIn: '',
        punchOut: '',
        status: 'absent',
        statusText: '请假'
      },
      {
        date: '06-20',
        day: '周四',
        punchIn: '09:10',
        punchOut: '18:20',
        status: 'late',
        statusText: '迟到'
      }
    ]
  },

  onLoad: function (options) {
    this.updateCurrentTime()
    this.loadTodayAttendance()
    
    // 每分钟更新一次时间
    setInterval(() => {
      this.updateCurrentTime()
    }, 60000)
  },

  updateCurrentTime: function() {
    const now = new Date()
    const timeString = now.toLocaleTimeString('zh-CN', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    })
    const dateString = now.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'long'
    })
    
    this.setData({
      currentTime: `${dateString} ${timeString}`
    })
  },

  loadTodayAttendance: function() {
    // 模拟加载今日打卡记录
    const today = new Date().getDate()
    const savedPunchIn = wx.getStorageSync(`punchIn_${today}`)
    const savedPunchOut = wx.getStorageSync(`punchOut_${today}`)
    
    this.setData({
      punchInTime: savedPunchIn || '',
      punchOutTime: savedPunchOut || ''
    })
  },

  handlePunch: function() {
    const now = new Date()
    const currentTime = now.toLocaleTimeString('zh-CN', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    })
    const app = getApp()
    const userId = app.globalData.userInfo ? app.globalData.userInfo.userId : ''
    if (!userId) {
      wx.showToast({
        title: '请重新登录',
        icon: 'none'
      })
      return
    }

    const api = require('../../../utils/api')

    if (!this.data.punchInTime) {
      api.punchAttendance(userId, now.toISOString(), 'punchIn')
        .then(() => {
          this.setData({
            punchInTime: currentTime
          })
          wx.showToast({
            title: '上班打卡成功',
            icon: 'success'
          })
        })
        .catch(() => {
          wx.showToast({
            title: '打卡失败',
            icon: 'none'
          })
        })
    } else if (!this.data.punchOutTime) {
      api.punchAttendance(userId, now.toISOString(), 'punchOut')
        .then(() => {
          this.setData({
            punchOutTime: currentTime
          })
          wx.showToast({
            title: '下班打卡成功',
            icon: 'success'
          })
        })
        .catch(() => {
          wx.showToast({
            title: '打卡失败',
            icon: 'none'
          })
        })
    }
  },

  getPunchButtonText: function() {
    if (!this.data.punchInTime) {
      return '上班打卡'
    } else if (!this.data.punchOutTime) {
      return '下班打卡'
    } else {
      return '今日已完成'
    }
  }
})
