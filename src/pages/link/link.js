/*
 * @Date: 2021-11-09 14:24:28
 * @LastEditors: wxh@siyuh.cn
 * @LastEditTime: 2021-11-12 11:28:11
 * @FilePath: \ble_wxApp\src\pages\link\link.js
 */



//16进制转换hex字符
function ab2hex(buffer) {
  let hexArr = Array.prototype.map.call(
    new Uint8Array(buffer),
    function (bit) {
      return ('00' + bit.toString(16)).slice(-2)
    }
  )
  return hexArr;
}

//转换16进制数据
function hexString(str) {
  if (!str) return new ArrayBuffer(0);

  var buffer = new ArrayBuffer(str.length / 2);
  let dataView = new DataView(buffer);

  let ind = 0;

  for (var i = 0, len = str.length; i < len; i += 2) {
    let code = parseInt(str.substr(i, 2), 16);
    dataView.setUint8(ind, code);
    ind++;
  }

  return buffer;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    deviceId: null, //设备UID
    blestatu: false, //连接状态
    notify: false, //监听状态
    services: [
      // {
      //   uuid: "AAA-xxx-xxx-xxx",
      //   isPrimary: true,
      //   characteristics: [{
      //     properties: {
      //       read: false,
      //       write: false,
      //       notify: false,
      //       indicate: false,
      //     },
      //     uuid: "BBB-xxx-xxx-xxx",
      //   }]
      // }
    ],//服务列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    console.log(ab2hex(hexString("681B0100008416")));

    //设置顶部标题
    wx.setNavigationBarTitle({
      title: options.name,
    });

    //设置设备ID
    this.setData({
      deviceId: options.deviceId,
    });

    //连接设备
    this.connection()
    //监听状态
    this.onstatus()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.cancelValueChange()
    this.disconnect();
  },

  //连接设备
  connection() {
    let that = this;
    let deviceId = that.data.deviceId;

    //连接ble
    wx.createBLEConnection({
      deviceId,
      timeout: 3000,
      success(res) {

        wx.showToast({
          title: "连接成功",
          duration: 2000,
        });

        that.setData({
          blestatu: true,
        });


        that.getServices();

        that.monitorBLE()


      },
      fail(err) {

        wx.showToast({
          title: "连接失败",
          image: "/img/err.png",
          duration: 2000,
        });

        that.setData({
          blestatu: false,
        });

      },
    });
  },

  //断开蓝牙设备
  disconnect() {
    let deviceId = this.data.deviceId;

    wx.closeBLEConnection({ deviceId });

    // wx.showToast({
    //   title: "断开Ble",
    //   image: "/img/err.png",
    //   duration: 2000,
    // });

    this.setData({
      blestatu: false,
    });

    wx.offBLEConnectionStateChange()

  },

  //监听Ble连接状态
  onstatus() {
    let then = this;
    wx.onBLEConnectionStateChange(function (res) {

      if (!res.connected) {
        wx.showToast({
          title: "Ble断开",
          image: "/img/err.png",
          duration: 2000,
        });
      }

      then.setData({
        blestatu: res.connected,
      });

    });
  },

  //获取服务
  getServices() {
    let that = this;
    let deviceId = this.data.deviceId;

    //获取服务IDs
    wx.getBLEDeviceServices({
      deviceId,
      success(red) {

        that.data.services = red.services

        for (let i = 0; i < red.services.length; i++) {
          that.getCharacteristics(i, deviceId, red.services[i].uuid)
        }

      },
    });
  },

  //获取服务下特征值
  getCharacteristics(index, deviceId, serviceId) {

    let that = this
    let services = this.data.services

    //获取服务特征值
    wx.getBLEDeviceCharacteristics({
      deviceId,
      serviceId,
      success(rec) {

        services[index].characteristics = rec.characteristics

        that.setData({
          services
        })

      },
    });
  },



  //读取蓝牙低功耗设备特征值的二进制数据
  readFun(e) {
    let deviceId = this.data.deviceId;
    let { index, idx } = e.currentTarget.dataset
    let serviceId = this.data.services[index].uuid
    let characteristicId = this.data.services[index].characteristics[idx].uuid

    if (!this.data.notify) {
      this.monitorBLE()
    }

    wx.readBLECharacteristicValue({
      deviceId,
      serviceId,
      characteristicId,
      success(res) {
        wx.showToast({
          title: "发送读取",
        });

      },
      fail(e) {
        wx.showToast({
          title: "读取失败",
          image: "/img/err.png",
        });
        console.error(e);
      }
    })

  },

  //写入二进制数据
  writeBLE(e) {

    let deviceId = this.data.deviceId;
    let { index, idx } = e.currentTarget.dataset
    let serviceId = this.data.services[index].uuid
    let characteristicId = this.data.services[index].characteristics[idx].uuid

    wx.writeBLECharacteristicValue({
      deviceId,
      serviceId,
      characteristicId,
      value: hexString("681B0100008416"),//16进制字符串
      success(res) {
        console.log("写入成功");
      },
      fail() {
        console.log("写入失败");
      }
    });

  },
  
  //订阅特征值
  onValueChange(e) {

    let deviceId = this.data.deviceId;
    let { index, idx } = e.currentTarget.dataset
    let serviceId = this.data.services[index].uuid
    let characteristicId = this.data.services[index].characteristics[idx].uuid

    if (!this.data.notify) {
      this.monitorBLE()
    }

    wx.notifyBLECharacteristicValueChange({
      state: true, // 启用 notify 功能
      deviceId,
      serviceId,
      characteristicId,

      success: function (res) {

        wx.showToast({
          title: "订阅成功",
        });

      },
      fail: function (e) {
        console.error("订阅UUID失败");
        console.error(e);

        wx.showToast({
          title: "订阅UUID失败",
          image: "/img/err.png",
        });

      },
    });
  },

  //取消监听
  cancelValueChange() {
    wx.offBLECharacteristicValueChange();

    this.setData({
      notify: false
    })

  },

  //监听蓝牙特征值数据
  monitorBLE() {
    let that = this

    this.setData({
      notify: true
    })

    wx.onBLECharacteristicValueChange(function (res) {
      console.log(res);
      that.addLogs(res)
    })

  },

  //增加日志
  addLogs(data) {
    let that = this
    let services = this.data.services

    for (var i = 0; i < services.length; i++) {

      if (services[i].uuid == data.serviceId) {

        let characteristics = services[i].characteristics


        for (var c = 0; c < characteristics.length; c++) {

          if (characteristics[c].uuid == data.characteristicId) {

            services[i].characteristics[c].log = characteristics[c].log ? characteristics[c].log + ab2hex(data.value) + "\n" : ab2hex(data.value) + "\n"

            that.setData({
              services
            })
            break;
          }
        }
        break;
      }
    }
  },

  //清空日志
  clearLog(e) {
    let services = this.data.services
    let { index, idx } = e.currentTarget.dataset
    services[index].characteristics[idx].log = null
    this.setData({ services })
  }

})