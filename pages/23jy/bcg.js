// pages/xjy/wzc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    status: 'Stop',
    autoplay: true,
    indicatorDots: true,
    vertical: false,
    circular: true,
    interval: 3888,
    duration: 800,
    screenW: '375',
    screenH: '225',

    homeBanner: [{
        id: '0',
        url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/--homeBanner--/0.png'
      },
      {
        id: '1',
        url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/--homeBanner--/1.png'
      },
      {
        id: '2',
        url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/--homeBanner--/2.png'
      },
      {
        id: '3',
        url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/--homeBanner--/3.png'
      },
      {
        id: '4',
        url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/--homeBanner--/4.png'
      }
    ],
    contList: [{
        id: 4,
        url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/bcg/gjzll.jpg',
        text1: '基因检测-生命说明书',
        text2: '每个人都需要拥有一张含有个人遗传信息的"生命说明书",它能告诉我吗生命该如何正确使用.'
      }, {
        id: 6,
        url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/bcg/jyjckpwd1.png',
        text1: '基因检测问答Q&A',
        text2: '深圳人体密码基因科技有限公司由数十位在高通量测序和临床健康领域有着丰富经验的专家团队发起成立，'
      },
      {
        id: 2,
        url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/bcg/ajln.jpg',
        text1: '安吉丽娜·朱莉《我的医疗选择》',
        text2: '"哪里有生命，哪里就有基因",基因检测不仅对医疗领域有革命性的作用,在普通人了解自己健康状况,针对性的调整饮食,制定健康计划,预防重症重疾等方面也有十分重要的作用,有名人效应的推动,有亲身感受者的口口相传,相信基因检测技术必将会为更多人带去健康福音.'
      },
      {
        id: 3,
        url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/bcg/xzfzrdejyjc.png',

        text1: '教你如何选择负责任的基因检测',
        text2: '如今，基因检测市场日渐红火.纵观市面上针对消费者的基因检测产品,诸如检测情商、二胎智商、抗雾霾指数、唱歌跑调等五花八门.'
      },
      {
        id: 8,
        url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/bcg/mxyjy1.png',
        text1: '名人教你如何选择基因检测',
        text2: '随着精准医疗的发展，基因检测大家应该不陌生了，不少人可能会出现跃跃欲试的心理，但精准医疗基因检测的作用到底如何呢？'
      }
    ]
  },

  bcgClick: function(e) {
    console.log(e.currentTarget.id)
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: './bcgContent?id=' + id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
  onShareAppMessage: function(sha) {
    if (sha.from === 'menu') {

    }
    return {
      title: "基因时代已来Ⅱ解读生命密码",
      imageUrl: "https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/bcg/jyjcscjsl.jpg"
    }
  }
})