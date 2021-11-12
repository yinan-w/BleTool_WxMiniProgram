/*
 * @Author: wxh@siyuh.cn
 * @Date: 2020-09-07 19:00:08
 * @LastEditTime: 2021-11-11 19:48:09
 * @LastEditors: wxh@siyuh.cn
 * @Description:
 * @FilePath: \ble_wxApp\src\pages\index\index.js
 */

import { scanning, stopSC, clearlist } from '../../utils/ble';

Page({
  scanning,
  stopSC,
  clearlist,

  data: {
    rssi: -100,
  },


  onPullDownRefresh: function () {
    let that = this
    this.stopSC()
    this.clearlist()

    setTimeout(() => {

      that.scanning()
      wx.stopPullDownRefresh(); //关闭下拉

    }, 1000);

  },


  //筛选RSSI强度
  sliderChange(e) {
    this.setData({ rssi: 0 - e.detail.value, });
  },

  //跳转设备数据
  dataPage(event) {
    wx.navigateTo({
      url: `/pages/deviceData/data?deviceId=${event.target.dataset.deviceid}&name=${event.target.dataset.localname}`,
    });
  },

  //跳转连接设备
  linkPage(event) {
    let deviceId = event.target.dataset.deviceid
    let name = event.target.dataset.name

    wx.navigateTo({
      url: `/pages/link/link?deviceId=${deviceId}&name=${name}`,
    });

  },

});
