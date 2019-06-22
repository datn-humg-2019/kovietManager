import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import { observable, action, toJS } from "mobx";
import { config, values, api } from "../config";
import _ from "lodash";
import moment from "moment";
import { GetNoToken, PostWithToken } from "../config/request";

class Sale {
  @observable listData = [
    {
      title: "Top cửa hàng nhập nhiều hàng",
      data: [],
      type: config.typeMerchandise.import
    },
    {
      title: "Top cửa hàng xuất nhiều hàng",
      data: [],
      type: config.typeMerchandise.export
    }
  ];
  @observable dataDetail = [];

  @observable dataChart = [
    {
      doanhso: "1000.00",
      loinhuan: "500.000000",
      time: "201904"
    },
    {
      doanhso: "2000.00",
      loinhuan: "200.000000",
      time: "201904"
    },
    {
      doanhso: "1000.00",
      loinhuan: "100.000000",
      time: "201904"
    },
    {
      doanhso: "3000.00",
      loinhuan: "100.000000",
      time: "201904"
    }
  ];

  @observable dataSale = [];
  @observable dataProfit = [];
  @observable dataTitleChart = [];
  @observable dataY = [];

  @observable totalProfit = 0;
  @observable totalSale = 0;

  @action
  getListMerchandiseImport(fromDate, toDate, callback = null) {
    PostWithToken(
      api.REPORTS.GetListBuysCount,
      { fromDate, toDate },
      (data, status) => {
        if (status) {
          if (data.code == 0) {
            this.setDataImportMerchandise(data.data);
            callback && callback(true);
          } else {
            callback && callback(false);
          }
        }
      }
    );
  }

  @action
  getListMerchandiseExport(fromDate, toDate, callback = null) {
    PostWithToken(
      api.REPORTS.GetListSalesCount,
      { fromDate, toDate },
      (data, status) => {
        if (status) {
          if (data.code == 0) {
            this.setDataExportMerchandise(data.data);
            callback && callback(true);
          } else {
            callback && callback(false);
          }
        }
      }
    );
  }


  @action
  setDataImportMerchandise(data) {
    this.listData[0].data = data;
  }

  @action
  setDataExportMerchandise(data) {
    this.listData[1].data = data;
  }
}

export default new Sale();
