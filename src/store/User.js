import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import { observable, action } from "mobx";
import { config, values, api } from "../config";
import { get } from "lodash";
import moment from "moment";
import { PostWithToken, PostNoToken } from "../config/request";
import SimpleToast from "react-native-simple-toast";
import { goAuth } from "../../App";

class User {
  @observable userInfo = {
    name: "Tran Xuan Ai",
    lever: "staff",
    avatar: "http://i.ytimg.com/vi/-Iha_M9fRY4/hqdefault.jpg"
  };
  @observable isTheFirst = false;
  @observable isLogin = false;
  @observable rootNavigator = null;

  @action
  setUserInfo(data) {
    this.userInfo = data;
  }

  @action
  login(body, callback = null) {
    console.log("body: ", body);
    PostNoToken(api.AUTH.login, body, (data, status) => {
      console.log("data login ", data);
      if (status) {
        if (get(data, "code") == 0) {
          AsyncStorage.setItem("token", get(data, "data.loginToken"));
          callback && callback(true);
        } else {
          callback && callback(false);
          SimpleToast.show(data.message);
        }
      } else {
        callback && callback(false);
        SimpleToast.show("Lỗi kết nối");
      }
    });
  }

  @action
  getUserInfo(callback = null) {
    PostWithToken(api.AUTH.userInfo, {}, (data, status) => {
      console.log("data: ", data);
      if (status) {
        if (get(data, "code") == 0) {
          this.setUserInfo(get(data, "data"));
          callback && callback(true);
        } else {
          callback && callback(false);
          SimpleToast.show(data.message);
        }
      } else {
        callback && callback(false);
        SimpleToast.show("Lỗi kết nối");
      }
    });
  }

  @action
  removeKey() {
    let key = ["token"];
    AsyncStorage.multiRemove(key);
  }

  @action
  logout() {
    this.removeKey();
    goAuth();
  }
}

export default new User();
