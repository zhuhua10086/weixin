"use strict";
const common_vendor = require("../common/vendor.js");
const useUserStore = common_vendor.defineStore("user", {
  state: () => ({
    token: "",
    userinfo: {
      id: 0,
      state: 0,
      userName: "",
      userType: "",
      token: "",
      binding: 0,
      email: "",
      mobile: ""
    }
  }),
  actions: {
    setToken(token) {
      this.token = token;
    },
    fillUser(userinfo) {
      this.userinfo = userinfo;
    }
  },
  persist: {
    enabled: true,
    H5Storage: window == null ? void 0 : window.localStorage
  }
});
exports.useUserStore = useUserStore;
