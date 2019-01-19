// pages/23jy/homeItem.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contentDetail: [{
        id: 0,
        url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/--homeItem--/item0/0.png',
        text: '人体密码基因肿瘤风险评估二十多项基因检测',
        bottomUrl: [{
            id: 0,
            url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/--homeItem--/item0/1.jpg'
          }, {
            id: 1,
            url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/--homeItem--/item0/2.jpg'
          }, {
            id: 2,
            url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/--homeItem--/item0/3.jpg'
          }, {
            id: 3,
            url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/--homeItem--/item0/4.jpg'
          },
          {
            id: 4,
            url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/--homeItem--/item0/5.jpg'
          }
        ]
      },
      {
        id: 1,
        url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/--homeItem--/item1/0.jpg',
        text: '男性健康73项基因检测（肿瘤风险、常见疾病风险等）',
        bottomUrl: [{
            id: 0,
            url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/--homeItem--/item1/1.jpg'
          },
          {
            id: 1,
            url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/--homeItem--/item1/2.jpg'
          },
          {
            id: 2,
            url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/--homeItem--/item1/3.jpg'
          },
          {
            id: 3,
            url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/--homeItem--/item1/4.jpg'
          },
          {
            id: 4,
            url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/--homeItem--/item1/5.jpg'
          },
          {
            id: 5,
            url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/--homeItem--/item1/6.jpg'
          },
          {
            id: 6,
            url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/--homeItem--/item1/7.jpg'
          },
        ]
      }, {
        id: 2,
        url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/--homeItem--/item2/0.jpg',
        text: '女性健康74项基因检测（肿瘤风险、常见疾病风险等）',
        bottomUrl: [{
          id: 0,
          url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/--homeItem--/item2/1.jpg'
        }, {
          id: 1,
          url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/--homeItem--/item2/2.jpg'
        }, {
          id: 2,
          url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/--homeItem--/item2/3.jpg'
        }, {
          id: 3,
          url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/--homeItem--/item2/4.jpg'
        }, {
          id: 4,
          url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/--homeItem--/item2/5.jpg'
        }]
      }, {
        id: 3,
        url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/--homeItem--/item3/0.jpg',
        text: '儿童健康成长基因检测（天赋、用药风险、基因ID等）',
        bottomUrl: [{
          id: 0,
          url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/--homeItem--/item3/1.jpg'
        }, {
          id: 1,
          url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/--homeItem--/item3/2.jpg'
        }, {
          id: 2,
          url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/--homeItem--/item3/3.jpg'
        }, {
          id: 3,
          url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/--homeItem--/item3/4.jpg'
        }, {
          id: 4,
          url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/--homeItem--/item3/5.jpg'
        }, {
          id: 5,
          url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/--homeItem--/item3/6.jpg'
        }]
      }, {
        id: 4,
        url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/--homeItem--/item4/0.jpg',
        text: '美容全套基因检测（皮肤抗性、美容因子、减肥能力等）',
        bottomUrl: [{
          id: 0,
          url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/--homeItem--/item4/1.jpg'
        }, {
          id: 1,
          url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/--homeItem--/item4/2.jpg'
        }, {
          id: 2,
          url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/--homeItem--/item4/3.jpg'
        }, {
          id: 3,
          url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/--homeItem--/item4/4.jpg'
        }, {
          id: 4,
          url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/--homeItem--/item4/5.jpg'
        }, {
          id: 5,
          url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/--homeItem--/item4/6.jpg'
        }, {
          id: 6,
          url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/--homeItem--/item4/7.jpg'
        }]
      }
    ]

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var id = options.id;
    var tmpcontent = this.data.content;
    var tmpbottomUrl = this.data.bottomUrl;
    if (id == 0) {
      tmpcontent = this.data.contentDetail[0];
      tmpbottomUrl = this.data.contentDetail[0].bottomUrl;
    } else if (id == 1) {
      tmpcontent = this.data.contentDetail[1];
      tmpbottomUrl = this.data.contentDetail[1].bottomUrl;
    } else if (id == 2) {
      tmpcontent = this.data.contentDetail[2];
      tmpbottomUrl = this.data.contentDetail[2].bottomUrl;
    } else if (id == 3) {
      tmpcontent = this.data.contentDetail[3];
      tmpbottomUrl = this.data.contentDetail[3].bottomUrl;
    } else if (id == 4) {
      tmpcontent = this.data.contentDetail[4];
      tmpbottomUrl = this.data.contentDetail[4].bottomUrl;
    } else if (id == 5) {
      tmpcontent = this.data.contentDetail[5];
      tmpbottomUrl = this.data.contentDetail[5].bottomUrl;
    } else if (id == 6) {
      tmpcontent = this.data.contentDetail[6];
      tmpbottomUrl = this.data.contentDetail[6].bottomUrl;
    } else if (id == 7) {
      tmpcontent = this.data.contentDetail[7];
      tmpbottomUrl = this.data.contentDetail[7].bottomUrl;
    } else if (id == 8) {
      tmpcontent = this.data.contentDetail[8];
      tmpbottomUrl = this.data.contentDetail[8].bottomUrl;
    }
    this.setData({
      content: tmpcontent,
      bottomUrl: tmpbottomUrl
    })
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
    wx.stopPullDownRefresh();
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