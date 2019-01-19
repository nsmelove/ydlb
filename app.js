//app.js
App({
  appId: "wx2223ba0264d4b5c4",
  mchKey: "GewFabcdefghijklmnopqrstuvwxyzyZ",
  serverAddress: "https://lemonfire.cn:1443/",
  onLaunch: function () {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.width = res.windowWidth;
        that.height = res.windowHeight;
      }
    })
     // 登录
    function login(){
      that.sessionId = "logining";
      wx.login({
        complete: res => {
          console.log("wx.login", res);
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          if (res.code) {
            wx.request({
              url: that.serverAddress + 'gene/wx_login?code=' + res.code,
              complete: res => {
                console.log("wx_login", res);
                if (res.statusCode == 200) {
                  that.sessionId = res.data;
                }else {
                  that.sessionId = undefined;
                }
              },
              fail: res => {
                console.log(res);
              }
            })
          }
        }
      });
    }
    login();
    wx.onNetworkStatusChange(function(res){
      if (res.isConnected && !that.sessionId){
        login();
      }
    })
  },
})