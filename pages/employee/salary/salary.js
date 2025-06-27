// pages/employee/salary/salary.js
Page({
  data: {
    currentMonth: '',
    currentSalary: {
      basic: '8000',
      bonus: '2000',
      overtime: '800',
      allowance: '500',
      gross: '11300',
      tax: '650',
      insurance: '1130',
      otherDeduction: '0',
      total: '9520',
      status: 'paid',
      statusText: '已发放'
    },
    salaryHistory: [
      {
        month: '2024年05月',
        total: '9520',
        status: 'paid',
        statusText: '已发放'
      },
      {
        month: '2024年04月',
        total: '9850',
        status: 'paid',
        statusText: '已发放'
      },
      {
        month: '2024年03月',
        total: '9200',
        status: 'paid',
        statusText: '已发放'
      },
      {
        month: '2024年02月',
        total: '8900',
        status: 'paid',
        statusText: '已发放'
      },
      {
        month: '2024年01月',
        total: '10200',
        status: 'paid',
        statusText: '已发放'
      }
    ],
    yearStats: {
      total: '57,672',
      average: '9,612',
      tax: '3,900',
      insurance: '6,780'
    }
  },

  onLoad: function (options) {
    this.setCurrentMonth()
  },

  setCurrentMonth: function() {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const monthStr = month < 10 ? `0${month}` : month
    
    this.setData({
      currentMonth: `${year}年${monthStr}月`
    })
  },

  viewDetail: function(e) {
    const month = e.currentTarget.dataset.month
    wx.showModal({
      title: `${month}工资详情`,
      content: '工资详情功能开发中...',
      showCancel: false
    })
  }
})
