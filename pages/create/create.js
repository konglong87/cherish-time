// pages/create/create.js
const app = getApp()
var CONFIG = require("../../config");
Page({
  data: {
    id: "2343534",
    color: ['#86A8E7', '#91EAE4'],
    date: 1332,
    name: "233",
    remark: "46757",
    timeType: 2,

    colorList: [
      ['#fc9e9a', '#fed89c'],
      ['#eda1c1', '#fab2ac'],
      ['#90aeff', '#92e6e6'],
      ['#dad4ec', '#f3e7e9'],
      ['#ff9a9e', '#fad0c4'],
      ['#a1c4fd', '#c2e9fb'],
      ['#a3bded', '#6991c7'],
      ['#d9afd9', '#97d9e1'],
      ['#f794a4', '#fdd6bd'],
      ['#86A8E7', '#91EAE4'],
      ['#ee9ca7', '#ffdde1'],
      ['#acb6e5', '#86fde8'],
      ['#77A1D3', '#79CBCA'],
      ['#02AAB0', '#00CDAC'],
      ['#CC95C0', '#DBD4B4'],
      ['#757F9A', '#D7DDE8'],
      ['#EC6F66', '#F3A183'],
      ['#EC6166', '#F3A883'],
      ['#E99166', '#F99883'],
      ['#E99999', '#F99899'],
      ['#111111', '#111111'],
      ['#222222', '#908801'],
      ['#222222', '#123456'],
      ['#333333', '#911111'],
      ['#444444', '#911111'],
      ['#555555', '#911111'],
      ['#666666', '#911111'],
      ['#777777', '#911111'],
      ['#888888', '#911111'],
      ['#999999', '#911111'],
      ['#101010', '#911111'],
      ['#dad4ec', '#f22222'],
      ['#aad4ec', '#f22222'],
      ['#1ad4ec', '#f22222'],
      ['#3ad4ec', '#f22222'],
      ['#6ad4ec', '#f22222'],

    ],
    isButtonDisabled: false, //是否隐藏提交按钮
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(option) {
    // wx.hideLoading()
    var color = decodeURIComponent(option.color || '#fc9e9a,#fed89c')
    this.setData({
      id: option.id || '',
      color: color.split(","),
      date: decodeURIComponent(option.date || ''),
      name: decodeURIComponent(option.name || ''),
      remark: decodeURIComponent(option.remark || ''),
      timeType: decodeURIComponent(option.type || 2),
    });
  },

  selectRadio: function(e) {
    this.setData({
      color: e.currentTarget.dataset.text
    })
  },

  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },

  //输入名称事件
  onInputName(e) {
    this.setData({
      name: e.detail.value
    });
  },

  //输入备注事件
  onInputRemark(e) {
    this.setData({
      remark: e.detail.value
    });
  },

  dataToInt: function(val) {
    return val.replace(/-/g, '');
  },

  validate: function(inputData, type) {
    if (inputData.name.length == 0) {
      wx.showToast({
        title: '小黑干嘛了',
        icon:'loading',
        duration:2700,
    })
      return false
    }

    console.log(inputData.date)
    if (inputData.date === null) {
      wx.showToast({
          title: '日期必须填写哦',
          icon:'error',
          duration:2700,
      })
      return false
    }

    return true
  },

  formSubmit: function(e) {
    var inputData = e.detail.value
    let _this = this

    
    //判断是否为空
    if (!this.validate(inputData)) {
      return
    }

    var data = {
      'id': this.data.id,
      'name': inputData.name,
      'date': this.dataToInt(inputData.date),
      'color': this.data.color,
      'remark': this.data.remark
    }

    //隐藏提交按钮
    this.setData({
      isButtonDisabled: true
    })

    //判断是新增还是删除
    var event = CONFIG.ACTION.TIME.CREATE
    if (this.data.id != '') {
      event = CONFIG.ACTION.TIME.EDIT
    }

    app.postRequest(event, data, true, function(res) {
      var pages = getCurrentPages();
      if (_this.data.id != '' && pages[0].__route__ == 'pages/index/index') {
        pages[0].changeCurrentMaskItemData(
          res.data || {}
        )
      }

      wx.navigateBack({
        delta: 1
      })
    })
  },
})