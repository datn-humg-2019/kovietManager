import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import { observable, action, toJS } from "mobx";
import { config, values, api } from "../config";
import { get, map, size, round, max } from "lodash";
import moment from "moment";
import { GetNoToken, PostWithToken } from "../config/request";
import SimpleToast from "react-native-simple-toast";
class Profit {
  //Lợi nhuận
  @observable itemFilterSelected = config.typeFilterDate[1];
  @observable dataChart = { days: [], counts: [], prices: [] };
  @observable dataChartConvert = { days: [], max: [] };
  @observable typeDetail = { id: 0, name: "Nhập hàng" };
  @observable getDataChart = false;
  @observable filterDetail = [
    { id: 0, name: "Nhập hàng" },
    { id: 1, name: "Xuất hàng" }
  ];

  @observable dataDetail = [];

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

  @action
  getListMerchandiseImport(fromDate, toDate, callback = null) {
    PostWithToken(
      api.REPORTS.GetListBuysPrice,
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
      api.REPORTS.GetListSalesPrice,
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
  convertToMilion(data) {
    return round(data / 1000000);
  }
  @action
  convertToString(data) {
    let dt = [];
    if (data && size(data)) {
      map(data, obj => {
        dt.push(obj + "");
      });
    }
    return dt;
  }
  @action
  convertDataMonthToReductionMonth(data) {
    this.getDataChart=true;
    this.dataChart.days = get(data, "days");
    this.dataChart.prices = get(data, "prices");
    this.dataChart.counts = this.convertToString(get(data, "counts"));
    const pricesMin = round(this.convertToMilion(max(get(data, "prices"))) / 4);
    const dataMax = [
      "0",
      `${pricesMin}`,
      `${2 * pricesMin}`,
      `${3 * pricesMin}`,
      `${4 * pricesMin}`
    ];
    let days = [];
    if (size(get(data, "days")) > 0) {
      if (this.itemFilterSelected.id === config.typeFilterDate[0].id) {
        if (values.deviceWidth < 348) {
          map(get(data, "days"), (obj, index) => {
            if (index === 0 || index === size(get(data, "days")) - 1) {
              days.push(moment(obj).format("DD/MM") + "");
            } else {
              if (index % 2 === 0) {
                days.push(moment(obj).format("DD/MM") + "");
              } else {
              }
            }
          });
        } else {
          map(get(data, "days"), (obj, index) => {
            days.push(moment(obj).format("DD/MM") + "");
          });
        }
      } else {
      }
    }
    this.dataChartConvert.days = days;
    this.dataChartConvert.max = dataMax.reverse();
  }

  @action
  getChart(callback = null) {
    const count_day =
      this.itemFilterSelected.id === config.typeFilterDate[0].id ? 7 : 30;
    const body = { count_day };
    PostWithToken(api.REPORTS.getChart, body, (data, status) => {
      if (status) {
        if (get(data, "code") == 0) {
          if (get(data, "data")) {
            this.convertDataMonthToReductionMonth(get(data, "data"));
          }
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
  setItemFilter(item) {
    this.itemFilterSelected = item;
  }

  @action
  setDataImportMerchandise(data) {
    this.listData[0].data = data;
  }

  @action
  setDataExportMerchandise(data) {
    this.listData[1].data = data;
  }

  @action
  setDataDetail(data) {
    this.dataDetail = data;
  }
}

export default new Profit();
