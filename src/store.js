/*
 * @Date: 2021-11-09 18:59:34
 * @LastEditors: wxh@siyuh.cn
 * @LastEditTime: 2021-11-11 19:42:11
 * @FilePath: \ble_wxApp\src\store.js
 */




const Store = require("./utils/store.js");

module.exports = new Store({
  state: {
    
    bleScanning: false,//蓝牙扫描状态
    blestatu: false, //蓝牙连接状态

    //蓝牙扫描列表
    bleDevices: [
      {
        deviceId: "1F384171-B1E9-E6DD-E7CE-05FB6718208E",
        name: "示例数据",
        localName: "示例数据",
        advertisServiceUUIDs: [
          "06:00:d5:10:bb:08"
        ],
        RSSI: -70,
        data: '06,00,d5,10,bb,08,7e,d5,10,bb,08,7e]',
      },
    ],
  },
})