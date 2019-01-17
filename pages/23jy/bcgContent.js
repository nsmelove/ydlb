// pages/23jy/bcgContent.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: '',
    bcgContentImg: [{
        id: 0,
        url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/bcg/bcgabout.jpg'
      }, {
        id: 1,
        url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/bcg/jyjcscjs.jpg'
      }, {
        id: 2,
        url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/bcg/ajln1.jpg'
      }, {
        id: 3,
        url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/bcg/xzfzrdejyjc.jpg'
      }, {
        id: 4,
        url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/bcg/gjzl.jpg'
      }, {
        id: 5,
        url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/bcg/wmdecp.jpg'
      }, {
        id: 6,
        url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/bcg/jykpwd.jpg'
      }, {
        id: 7,
        url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/bcg/jyjcyy.jpg'
      },
      {
        id: 8,
        url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/bcg/mxyjy.jpg'
      }
    ]
  },

  controlWH: function(obj) {
    var that = this;
    var infoUrl = obj.url;
    wx.getSystemInfo({
      success: function(res) {
        var screenW = res.screenWidth;
        var screenH = res.screenHeight;
        wx.getImageInfo({
          src: infoUrl,
          success: function(c) {
            that.setData({
              screenW: res.screenWidth,
              screenH: c.height / (c.width / res.screenWidth),
              imgUrl: c.path
            })
          }
        })
      },
    })
  },
  bindload: function() {
    wx.hideLoading()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var id = options.id;
    var tmpimgUrl = this.data.imgUrl;
    if (id == 0) {
      that.controlWH(this.data.bcgContentImg[0]);
    } else if (id == 1) {
      that.controlWH(this.data.bcgContentImg[1]);
    } else if (id == 2) {
      that.controlWH(this.data.bcgContentImg[2]);
    } else if (id == 3) {
      that.controlWH(this.data.bcgContentImg[3]);
    } else if (id == 4) {
      that.controlWH(this.data.bcgContentImg[4]);
    } else if (id == 5) {
      that.controlWH(this.data.bcgContentImg[5]);
    } else if (id == 6) {
      that.controlWH(this.data.bcgContentImg[6]);
    } else if (id == 7) {
      that.controlWH(this.data.bcgContentImg[7]);
    } else if (id == 8) {
      that.controlWH(this.data.bcgContentImg[8]);
    }
    wx.showLoading({
      title: '图片加载中',
      mask: true
    })
    /**
    this.setData({
      imgUrl: tmpimgUrl
    })
     */
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})