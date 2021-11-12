/*
 * @Author: wxh@siyuh.cn
 * @Date: 2021-02-03 11:30:47
 * @LastEditTime: 2021-11-11 19:39:10
 * @LastEditors: wxh@siyuh.cn
 * @Description: ble蓝牙
 * @FilePath: \ble_wxApp\src\utils\ble.js
 */

function ab2hex(buffer) {
  let hexArr = Array.prototype.map.call(new Uint8Array(buffer), function (bit) {
    return ("00" + bit.toString(16)).slice(-2);
  });
  return hexArr;
}

//初始化蓝牙
function startble() {
  wx.getSystemInfo({
    success(res) {
      if (res.platform == "devtools") {
        console.error("开发平台无法扫描ble 请使用真机调试");
      } else {
        if (res.bluetoothEnabled) {
          scanning();
        } else {
          wx.showModal({
            title: "蓝牙异常",
            content: "请在系统设置打开蓝牙",
            confirmText: "已打开",
            success(res) {
              if (res.confirm) scanning();
            },
          });
        }
      }
    },
  });
}

//扫描设备
function scanning() {

  let bleScanning = getApp().store.getState().bleScanning

  //状态未连接
  if (bleScanning === false) {

    wx.openBluetoothAdapter({
      success(res) {

        //开始扫描设备
        wx.startBluetoothDevicesDiscovery({
          // 指定厂商服务UUID
          // services: [
          //   "0000FFF0-0000-1000-8000-00805F9B34FB",
          // ],
          allowDuplicatesKey: true,
          interval: 500,
          powerLevel: "high",
          success(res) {

            //设置扫描状态
            getApp().store.setState({
              bleScanning: true
            });

            //监听设备新增设备
            onBluetoothDeviceFound();

          },
          fail(e) {
            console.log("Ble扫描错误");
            console.error(e);
          }
        });

      },
      fail(res) {

        wx.showModal({
          title: '蓝牙错误',
          content: '可能无法打开蓝牙',
          showCancel: false
        })

        console.error("蓝牙初始化错误");
        console.error(res);
      },
    });

  }
}

//清空设备列表
function clearlist() {
  getApp().store.setState({
    bleDevices: []
  });
}

//停止扫描
function stopSC() {
  try {
    //停止监听
    wx.offBluetoothDeviceFound();
    //停止搜索
    wx.stopBluetoothDevicesDiscovery();

    //设置扫描状态
    getApp().store.setState({
      bleScanning: false
    });

  } catch (e) {
    console.error(e);
  }
}

//监听新蓝牙设备列表
function onBluetoothDeviceFound() {
  wx.onBluetoothDeviceFound(function (res) {
    let devices = res.devices;

    for (var i = 0; i < devices.length; i++) {
      let data = ab2hex(devices[i].advertisData);
      devices[i].data = data;
      upBleList(devices[i]);
    }
  });
}

//更新设备信息
function upBleList(device) {

  let bleDevices = getApp().store.getState().bleDevices;
  let exist = false; //存在设备


  for (var i = 0; i < bleDevices.length; i++) {
    if (bleDevices[i].deviceId === device.deviceId) {
      exist = true;
      bleDevices[i] = device;
    }
  }

  if (exist === false) {
    bleDevices.push(device);
  }

  getApp().store.setState({
    bleDevices,
  });

}

module.exports = {
  startble,
  clearlist,
  stopSC,
  scanning
};
