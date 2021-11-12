/*
 * @Date: 2021-11-04 16:01:13
 * @LastEditors: wxh@siyuh.cn
 * @LastEditTime: 2021-11-09 19:05:44
 * @FilePath: \ble_wxApp\src\app.js
 */
import { startble } from "./utils/ble.js";
const store = require("./store.js");


App({
  store,
  globalData: {},
  onLaunch() {
    setTimeout(() => {
      startble();
    }, 1000);
  },
});
