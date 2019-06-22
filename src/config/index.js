//var DeviceInfo = require("react-native-device-info");
import { Platform } from "react-native";
import api from "./api";
import color from "./color";
import values from "./values";
import screenId from "./screenId";
import images from "./images";
import moment from "moment";

import fonts from "../config/fonts";
let config = {};

config.app_version = "0.0.1";
config.domain = "https://kiot-viet.herokuapp.com";
config.domain_api = config.domain + "/api";
config.unit = { f: { units: "imperial" }, c: { units: "metric" } };
config.typeHome = { home: 0, info: 1, notif: 2 };
config.typeData = { shop: "shop", staff: "staff" };
config.typeMerchandise = { import: "import", export: "export" };
config.typeFilterDate = [
  {
    id: "7days",
    name: "Tuần này",
    fromDate: moment()
      .startOf("week")
      .format("YYYY-MM-DD"),
    toDate: moment()
      .endOf("week")
      .format("YYYY-MM-DD")
  },
  {
    id: "30days",
    name: "Tháng này",
    fromDate: moment()
      .startOf("month")
      .format("YYYY-MM-DD"),
    toDate: moment()
      .endOf("month")
      .format("YYYY-MM-DD")
  }
];
config.typeChart = { date: 1, month: 2 };
export { api, color, config, fonts, images, screenId, values };
