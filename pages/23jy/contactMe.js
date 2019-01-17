// pages/xjy/contactMe.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: ['https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/contactMe/contactCop.jpg','https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/contactMe/precyh.png']
  },

  clickMe: function (e) {
    console.log(e)
    wx.navigateTo({
      url: './3Dty'
    })
  },

  previewImage: function (e) {
    wx.previewImage({
      urls: this.data.imgList
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (sha) {
    if (sha.from === 'menu') {

    }
    return {
      title: "基因时代已来Ⅱ解读生命密码",
      //imageUrl: "https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/bcg/jyjcscjsl.jpg"
    }
  }
})