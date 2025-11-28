//logs.js
import * as Sentry from "../../libs/sentry/index";
const util = require("../../utils/util.js");

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    const logs = (wx.getStorageSync("logs") || []).map(log => {
      return util.formatTime(new Date(log));
    })
    this.setData({
      logs
    });

    Sentry.captureMessage("this is a getCurrentPages test.");
  }
});
