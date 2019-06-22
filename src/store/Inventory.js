import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import { observable, action, toJS } from "mobx";
import { config, values, api } from "../config";
import { get } from "lodash";
import moment from "moment";
import { PostWithToken } from "../config/request";

class Inventory {
  @observable isFront = false;
  @observable isFlash = false;
  @observable listProduct = [];
  @observable totalProduct = 0;
  @observable totalPrice = 0;

  @action
  getListInventory(callback = null) {
    PostWithToken(api.REPORTS.GetListInventory, {}, (data, status) => {
      if (status) {
        if (get(data, "code") == 0) {
          this.listProduct = get(data, "data.list_products");
          this.totalProduct = get(data, "data.total_count");
          this.totalPrice = get(data, "data.total_price");
          callback && callback(true);
        } else {
          callback && callback(false);
        }
      }
    });
  }
  
  @action
  changeTypeCamera() {
    this.isFront = !this.isFront;
  }

  @action
  changeTypeFlash() {
    this.isFlash = !this.isFlash;
  }
}

export default new Inventory();
