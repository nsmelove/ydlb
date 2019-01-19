// pages/yz/yz.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tv: true,
    homeItem: [
      {
        id: '2',
        Pic: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/--homeItem--/item2/0.jpg',
        text: "女性健康74项基因检测（肿瘤风险、常见疾病风险等）",
        info: ""
      },{
        id: '1',
        Pic: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/--homeItem--/item1/0.jpg',
        text: "男性健康73项基因检测（肿瘤风险、常见疾病风险等）",
        info: ""
      },

      {
        id: '3',
        Pic: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/--homeItem--/item3/0.jpg',
        text: "儿童健康成长基因检测（天赋、用药风险、基因ID等）",
        info: ""
      }, {
        id: '0',
        Pic: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/--homeItem--/item0/0.png',
        text: "人体密码基因肿瘤风险评估二十多项基因检测",
        info: ""
      },
    ],
    contList: [{
        id: 0,
        url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/bcg/rtmmjyjs.jpg',
        text1: '人体密码基因公司介绍',
        text2: '深圳人体密码基因科技有限公司由数十位在高通量测序和临床健康领域有着丰富经验的专家团队发起成立，依托国外领先的高通量测序平台并通过合作自助研发的GenSeizer基因捕获技术，开启了生命之门，为人类的健康事业提供专业、贴心的个性化服务.'
      },
      {
        id: 5,
        url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/bcg/wmdecp1.png',
        text1: '我们的产品',
        text2: '公司核心技术：公司已开发完成的GenSeizer基因捕获方案是独立自主研发的基因捕获技术体系，并具有以下特点：'
      },
      {
        id: 7,
        url: 'https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/bcg/jyjcyy1.png',
        text1: '基因检测意义',
        text2: '基因是DNA分子上携带有遗传信息的功能片段。简而言之，基因是生命的基本因子；基因是人类生老病死之因；'
      }
    ],

    status: 'Stop',
    autoplay: true,
    indicatorDots: true,
    vertical: false,
    circular: true,

    interval: 3888,
    duration: 800,



  },
  bcgClick: function (e) {
    console.log(e.currentTarget.id)
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: './bcgContent?id=' + id,
    })
  },
  
  /**
   * 二级页面跳转函数
   */
  navigateT: function(e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: './homeItem?id=' + id,
    })
  },

  clickMe: function(e) {
    console.log(e)
    wx.navigateTo({
      url: './3Dty'
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

  onReady: function(options) {},

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
  onShareAppMessage: function(sha) {
    if (sha.from === 'menu') {

    }
    return {
      title: "基因时代已来Ⅱ解读生命密码",
      imageUrl: "https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/bcg/jyjcscjsl.jpg"
    }
  }
})