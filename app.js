//app.js
App({
  onLaunch: function () {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.width = res.windowWidth;
        that.height = res.windowHeight;
      }
    })
    // 登录
    wx.login({
      success: res => {
        console.log(res);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    });
  },
})