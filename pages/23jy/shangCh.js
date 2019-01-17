// pages/23jy/shangCh.js
const md55 = require('./md5.js')
const xmlParse = require('./lib/dom-parser.js').DOMParser
let app = getApp();
let shopItems = require("../../data/shopItems.js").shopItems
let formatTime = require("../../utils/util.js").formatTime
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pageWidth:app.width,
    pageHeight:app.height,
    tabs:{
      'home': {
        name: '首页',
        selected: true,
        icon: 'tabbarIcon/1black.png',
        selectIcon: 'tabbarIcon/1blue.png'
      },
      'car': {
          name: '购物车',
          selected: false,
          icon: 'tabbarIcon/CarBlack.png',
          selectIcon: 'tabbarIcon/CarBlue.png'
      },
      'order': {
          name: '订单',
          selected: false,
          icon: '../../img/order.png',
          selectIcon: '../../img/order_blue.png'
      }
    },
    shopItem:{
      offset:0,
      limit:0,
      items:[]
    },
    shoppingCar:{
      num: 0,
      allChecked: false,
      checkedNum: 0,
      checkedSum: 0,
      items: []
    },
    shopOrder:{
      offset: 0,
      limit: 0,
      needPay: false,
      orders: [{
        id:8888888888888,
        items:[{
          id: 1,
          name: "基因检测8项",
          img: "https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/--homeItem--/item3/0.jpg",
          price: 888,
          num: 2,
        }, {
            id: 2,
            name: "基因检测32项",
            img: "https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/--homeItem--/item3/0.jpg",
            price: 3000,
            num: 2,
          }],
        totalNum:4,
        totalFee:7776,
        createTime: 1560000000,
        paiedTime: 1560000000,
        createTimeFormat: "2019年1月17 10:48:16",
        paied:true,
        paiedTimeFormat: "2019年1月17 10:48:16"
      },
        {
          id: 8888888888889,
          items: [{
            id: 1,
            name: "基因检测8项",
            img: "https://773233436-1257195280.cos.ap-chengdu.myqcloud.com/--homeItem--/item3/0.jpg",
            price: 888,
            num: 2,
          }],
          totalNum: 4,
          totalFee: 7776,
          createTime: 1560000000,
          createTimeFormat: "2019年1月17 10:48:16"
        }]
    }
  },
  showTab: function (e) {
    let key = e.currentTarget.dataset.key;
    if (this.data.tabs[key].selected){
      return;
    }
    for (let tab in this.data.tabs) {
      if (tab == key){
        this.data.tabs[tab].selected = true;
      }else {
        this.data.tabs[tab].selected = false;
      }
    }
    this.setData({
      "tabs": this.data.tabs
    });
  },
  // 标记购物车商品有变动
  shoppingCarChanged: function(){
    let num = 0, checkedNum = 0, checkedSum = 0;
    let checkedItems = [];
    for(let item of this.data.shoppingCar.items){
      num += item.num;
      if (item.checked){
        checkedItems.push(item);
        checkedNum += item.num;
        checkedSum += item.price * item.num;
      }
    }
    this.data.shoppingCar.num = num;
    if (checkedItems.length == 0){
      this.data.shoppingCar.allChecked = false;
    } else if (checkedItems.length == this.data.shoppingCar.items.length){
      this.data.shoppingCar.allChecked = true;
    }
    this.data.shoppingCar.checkedNum = checkedNum;
    this.data.shoppingCar.checkedSum = checkedSum;
    this.setData({shoppingCar: this.data.shoppingCar});
  },
  addToShoppingCar: function(e){
    let itemId = e.target.dataset.id;
    for (let item of this.data.shoppingCar.items){
      if (item.id == itemId) {
        if(item.num == 999){
          return;
        }
        item.num++;
        return this.shoppingCarChanged();
      }
    }
    for (let item of this.data.shopItem.items){
      if (item.id == itemId) {
        let carItem = JSON.parse(JSON.stringify(item));
        carItem.num = 1;
        this.data.shoppingCar.items.push(carItem);
        return this.shoppingCarChanged();
      }
    }  
  },
  remFromShoppingCar: function (e){
    let itemId = e.target.dataset.id;
    let items = this.data.shoppingCar.items;
    let that = this;
    for (let i = 0; i < items.length; i ++) {
      if (items[i].id == itemId) {
        if (items[i].num == 1){
          wx.showModal({
            title:"确定要删除该商品？",
            showCancel:true,
            complete:function(e){
              if(e.cancel){
                return that.shoppingCarChanged();
              }
              items.splice(i,1);
              return that.shoppingCarChanged();
            }
          });
        }else {
          items[i].num--;
          return that.shoppingCarChanged();
        }
        return;
      }
    }
  },
  changgingShoppingCarItemNum: function (e){
    let value = parseInt(e.detail.value);
    if (!value) {
      value = 0;
    } else if (value > 999) {
      value = 999;
    }
    return value;
  },
  changedShoppingCarItemNum: function(e){
    let itemId = e.currentTarget.dataset.id;
    let items = this.data.shoppingCar.items;
    let value = parseInt(e.detail.value);
    let that = this;
    for (let i = 0; i < items.length; i++ ){
      if (itemId == items[i].id){
        if(value == 0){
          wx.showModal({
            title: "确定要删除该商品？",
            showCancel: true,
            complete: function (e) {
              if (e.cancel) {
                return that.shoppingCarChanged();
              }
              items.splice(i,1);
              that.shoppingCarChanged();
            }
          });
        }else {
          items[i].num = value;
          this.shoppingCarChanged();
        }
        return;
      }
    }
  },
  topCheckChange: function(e){
    let checked = !this.data.shoppingCar.allChecked;
    this.data.shoppingCar.allChecked = checked;
    for (let item of this.data.shoppingCar.items) {
      item.checked = checked;
    }
    this.shoppingCarChanged();
  },
  itemCheckChange:function(e){
    let itemId = e.currentTarget.dataset.id;
    for (let item of this.data.shoppingCar.items){
      if (itemId == item.id){
        item.checked = !item.checked;
      }
    }
    this.shoppingCarChanged();
  },

  submitOrder: function(){
    if (this.data.shoppingCar.checkedNum == 0){
      return;
    }
    let order = {};
    order.id = new Date().getTime();
    order.createTime = new Date().getTime();
    order.totalNum = this.data.shoppingCar.checkedNum;
    order.totalFee = this.data.shoppingCar.checkedSum;
    order.items = [];
    for(let i = 0; i < this.data.shoppingCar.items.length;){
      let item = this.data.shoppingCar.items[i];
      if(item.checked){
        order.items.push(JSON.parse(JSON.stringify(item)));
        this.data.shoppingCar.items.splice(i,1);
      }else{
        i++
      }
    }

    order.createTimeFormat = formatTime(new Date(order.createTime));
    this.data.shopOrder.orders.push(order);
    this.data.shopOrder.needPay = true;
    this.shoppingCarChanged();
    this.setData({
      shopOrder: this.data.shopOrder
    });
  },


  formSubmit: function(res) {
    let that = this
    console.log(res)
    wx.request({
      url: 'https://flyhui.cn/cusInfo',
      method: 'POST',
      data: res.detail.value,
      success: function(res) {
        console.log(res)
        if (res.data === 'ok') {
          that.setData({
            yesOrNo: true
          })
        }else{
          console.log('保存信息失败，请重试！')
        }
      }
    })
  },

  wxClick: function(res) {
    let qian = parseInt(res.currentTarget.id)
    console.log(qian)

    let that = this
    //通用日期时间定义
    let year = (new Date()).getFullYear() + ''
    let month = ((new Date()).getMonth() + 1) + ''
    let day = (new Date()).getDate() + ''
    let hours = (new Date()).getHours() + ''
    let minutes = (new Date()).getMinutes() + ''
    let seconds = (new Date()).getSeconds() + ''
    let millseconds = (new Date()).getMilliseconds() + ''

    //统一下单接口
    let appid = 'wx2223ba0264d4b5c4'
    let mch_id = 1511480931
    let nonce_str = Math.random().toString(18).substr(2)
    let body = 'gen-tc'
    let out_trade_no = 'G' + year + month + day + hours + minutes + seconds + millseconds
    let total_fee = 1
    let spbill_create_ip = '127.0.0.1'
    let notify_url = 'https://flyhui.cn/wxpay'
    let trade_type = 'JSAPI'
    let key = 'GewFabcdefghijklmnopqrstuvwxyzyZ'

    //发起小程序支付
    let timeStamp = (new Date()).getTime() + ''
    let nonceStr = Math.random().toString(28).substr(2)
    let signType = 'MD5'
    let appId = 'wx2223ba0264d4b5c4'

    wx.login({
      success(r) {
        console.log(r)
        if (r.code) {
          wx.request({
            url: 'https://flyhui.cn/login?code=' + r.code,
            success: function(res) {
              console.log(res)
              let openid = res.data
              let strA = 'appid=' + appid + '&body=' + body + '&mch_id=' + mch_id + '&nonce_str=' + nonce_str + '&notify_url=' + notify_url + '&openid=' + openid + '&out_trade_no=' + out_trade_no + '&spbill_create_ip=' + spbill_create_ip + '&total_fee=' + total_fee + '&trade_type=' + trade_type
              let strTemp = strA + '&key=' + key
              let sign = md55.hexMD5(strTemp).toUpperCase()

              wx.request({
                url: 'https://api.mch.weixin.qq.com/pay/unifiedorder',
                data: `<xml><appid>${appid}</appid><body>${body}</body><mch_id>${mch_id}</mch_id><nonce_str>${nonce_str}</nonce_str><notify_url>${notify_url}</notify_url><openid>${openid}</openid><out_trade_no>${out_trade_no}</out_trade_no><spbill_create_ip>${spbill_create_ip}</spbill_create_ip><total_fee>${total_fee}</total_fee><trade_type>${trade_type}</trade_type><sign>${sign}</sign></xml>`,
                method: 'POST',
                header: {
                  'content-type': 'text/xml'
                },
                success: function(res) {
                  console.log(res)
                  let newData = new xmlParse().parseFromString(res.data, 'text/xml')
                  let prepay_id = (newData.getElementsByTagName('prepay_id')[0]).firstChild.data
                  let strB = 'appId=' + appId + '&nonceStr=' + nonceStr + '&package=' + 'prepay_id=' + prepay_id + '&signType=' + signType + '&timeStamp=' + timeStamp + '&key=' + key
                  let paySign = md55.hexMD5(strB)

                  wx.requestPayment({
                    timeStamp: timeStamp,
                    nonceStr: nonceStr,
                    package: 'prepay_id=' + prepay_id,
                    signType: signType,
                    paySign: paySign,
                    success: function(res) {
                      console.log(res)
                      that.setData({
                        yesOrNo: false
                      })
                    },
                    fail: function(res) {
                      console.log(res)
                    },
                    complete: function(res) {
                      console.log(res)
                    }
                  })
                }
              })
            },
            fail: function(res) {
              console.log(res)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)

        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function(query) {
    let that = this;
    for (let item of shopItems){
      that.data.shopItem.items.push(item);
    }
    that.setData({
          shopItem: that.data.shopItem
    });
    console.log(that.data.shopItem.items);
    // wx.request({
    //   url: '../../data/shopItems.json',
    //   success: function(res) {
    //     that.data.shopItem.items.push(res.data);
    //     that.setData({
    //       shopItem: that.data.shopItem
    //     })
    //   },
    //   fail: function(res) {
    //     console.log(res)
    //   }
    // })
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
  onShareAppMessage: function(e) {
    console.log(e);
  }
})