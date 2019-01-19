// pages/23jy/shangCh.js
const md5 = require('./md5.js').hexMD5
const xmlParse = require('./lib/dom-parser.js').DOMParser
let formatTime = require("../../utils/util.js").formatTime
let app = getApp();
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
      page:0,
      size:10,
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
      page: 0,
      size: 10,
      needPay: false,
      orders: []
    }
  },
  showTab: function (e) {
    let key = e;
    if(typeof e == "object"){
      key = e.currentTarget.dataset.key;
    }
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
        carItem.checked = true;
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
  /**统一下单接口 */
  preOrder: function(shopItems, callback){
    wx.request({
      url: app.serverAddress + "gene/wx_prepay",
      method: "post",
      header: { "sessionId": app.sessionId },
      data: shopItems,
      complete: function (res) {
        console.log("preOrder", res);
        if (res.statusCode == 200 && res.data) {
          callback(res.data);
        } else {
          callback();
        }
      }
    })
  },
  /**调起支付请求 
   * timeStamp	string		是	时间戳，从 1970 年 1 月 1 日 00:00:00 至今的秒数，即当前的时间
   * nonceStr	string		是	随机字符串，长度为32个字符以下
   * package	string		是	统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=***
   * signType	string	MD5	否	签名算法
   * paySign	string		是	签名，具体签名方案参见 小程序支付接口文档
   * success	function		否	接口调用成功的回调函数
   * fail	function		否	接口调用失败的回调函数
   * complete	function		否	接口调用结束的回调函数（调用成功、失败都会执行）
   * 
   * paySign = MD5(appId=wxd678efh567hg6787
   * &nonceStr=5K8264ILTKCH16CQ2502SI8ZNMTM67VS
   * &package=prepay_id=wx2017033010242291fcfe0db70013231072
   * &signType=MD5
   * &timeStamp=1490840662
   * &key=qazwsxedcrfvtgbyhnujmikolp111111)
   * = 22D9B4E54AB1950F51E0649E8810ACD6
  */
  requestPayment: function (prepayId, callback){
    let that = this;
    if (typeof prepayId == "object"){
      prepayId = prepayId.currentTarget.dataset.prepayid;
    }
    if (prepayId) {
      let timeStamp = Math.floor(new Date().getTime / 1000) + "";
      let nonceStr = Math.floor(Math.random() * 100000000000 + 100000000000) + "";
      let pkg = "prepay_id=" + prepayId;
      let signStr = [
        "appId=" + app.appId,
        "&nonceStr=" + nonceStr,
        "&package=" + pkg,
        "&signType=MD5",
        "&timeStamp=" + timeStamp,
        "&key=" + app.mchKey
      ].join("");
      let paySign = md5(signStr);
      wx.requestPayment({
        timeStamp: timeStamp,
        nonceStr: nonceStr,
        package: pkg,
        signType: "MD5",
        paySign: paySign,
        success: res =>{
          //更新订单状态
          for (let order of that.data.shopOrder.orders) {
            if (order.prepayId == prepayId) {
              order.paid = 1;
              that.setData({shopOrder: that.data.shopOrder });
              break;
            }
          }
        },
        complete: res => {
          console.log(res);
          callback && callback(res);   
        }
      });
    }
  },
  /**提交订单 */
  submitOrder: function(){
    let that = this;
    if (this.data.shoppingCar.checkedNum == 0){
      return;
    }
    let shopItems = [];
    for(let i = 0; i < this.data.shoppingCar.items.length; i++){
      let item = this.data.shoppingCar.items[i];
      if(item.checked){
        shopItems.push(JSON.parse(JSON.stringify(item)));
      }
    }
    this.preOrder(shopItems, data =>{
      this.requestPayment(data, res =>{
        //移除购物车支付商品
        for (let shopItem of shopItems) {
          for (let i = 0; i < that.data.shoppingCar.items.length; i++) {
            let item = this.data.shoppingCar.items[i];
            if (item.id == shopItem.id) {
              that.data.shoppingCar.items.splice(i, 1);
              break;
            }
          }
        }
        that.shoppingCarChanged();
        that.loadShopOrders(true, res => that.showTab("order"));
      });
    });
  },
  loadShopItems: function(reload,callback) {
    let that = this;
    let page = reload ? 0: this.data.shopItem.page + 1;
    let size = reload ? 10 : this.data.shopItem.size;
    wx.request({
      url: app.serverAddress + "gene/shop_items?page="+page+"&size="+size,
      complete: function (res) {
        console.log("getShopItems", res);
        if (res.statusCode == 200 && res.data) {
          if (reload) {
            that.data.shopItem.items = [];
          }
          for (let item of res.data) {
            that.data.shopItem.items.push(item);
          }
          that.data.shopItem.page = page;
          that.data.shopItem.size = size;
          that.setData({
            shopItem: that.data.shopItem
          });
        }
        callback && callback(res);
      }
    })
  },
  loadShopOrders: function(reload, callback) {
    let that = this;
    let page = reload ? 0 : this.data.shopOrder.page + 1;
    let size = reload ? 10 : this.data.shopOrder.size;
    wx.request({
      url: app.serverAddress + "gene/shop_orders?page=" + page + "&size=" + size,
      header: {"sessionId": app.sessionId},
      complete: function (res) {
        console.log("getShopOrders", res);
        if (res.statusCode == 200 && res.data) {
          if (reload) {
            that.data.shopOrder.orders = [];
          }
          for (let order of res.data) {
            if(order.paid == 0){
              that.data.shopOrder.needPay = true;
            }
            if (order.items && typeof order.items == "string") {
              order.items = JSON.parse(order.items);
            }
            if (order.createTime) {
              order.createTimeFormat = formatTime(new Date(order.createTime));
            }
            if (order.paidTime) {
              order.paidTimeFormat = formatTime(new Date(order.paidTime));
            }
            that.data.shopOrder.orders.push(order);
            that.data.shopOrder.page = page;
            that.data.shopOrder.size = size;
          }
          that.setData({
            shopOrder: that.data.shopOrder
          });
        }
        callback && callback(res);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(query) {
    let that = this;
    that.loadShopItems(true);
    that.loadShopOrders(true);
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
    if (this.data.tabs["home"].selected) {
      this.loadShopItems(true, res => wx.stopPullDownRefresh());
    } else if (this.data.tabs["order"].selected) {
      this.loadShopOrders(true, res => wx.stopPullDownRefresh());
    }else{
      wx.stopPullDownRefresh();
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.tabs["home"].selected) {
      this.loadShopItems(false);
    } else if (this.data.tabs["order"].selected) {
      this.loadShopOrders(false);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(e) {
    console.log(e);
  }
})