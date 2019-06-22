import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  SectionList
} from "react-native";
import { Navigation } from "react-native-navigation";
import { images, screenId, values, color, config } from "../../../../config";

import numeral from "numeral";

import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import NavbarItem from "../../../../component/NavbarItem";
import Navbar from "../../../../component/Navbar";
import FastImage from "react-native-fast-image";
import { convertToPrice } from "../../../../utils/Func";

@inject("Profit", "Sale")
@observer
export default class DetailScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isIncrease: true,
      profit: 7891122,
      netRevenue: "82%",
      isIncreaseNetRevenue: false,
      allProduct: 11672,
      isShowMore: false,
      isShowFilter: false,
      page: 0
    };
    Navigation.mergeOptions("DetailSaleScreen", {
      topBar: {
        visible: false,
        drawBehind: true,
        noBorder: true,
        background: { color: "transparent" }
      },
      statusBar: {
        style: "light",
        visible: true
      }
    });
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  }
  componentWillMount() {}

  navigationButtonPressed({ buttonId }) {
    if (buttonId == "back") {
      this.goBack();
    }
  }

  componentDidMount() {
    this.getDataDetail();
  }
  getDataDetail(callback = null) {
    // let { Sale, fromDate, toDate, item } = this.props
    // let { page } = this.state
    // switch (item.type) {
    //   case config.typeData.shop:
    //     Sale.getDetailSalesStores(fromDate, toDate, idcuahang, page, (status) => {
    //       console.log("status", status)
    //     })
    //     break;
    //   case config.typeData.staff:
    //     break;
    // }
  }

  goBack = () => {
    Navigation.pop("DetailSaleScreen");
  };

  clickMore = item => {
    console.log("item more: " + JSON.stringify(item));
    this.showMore();
  };
  clickItemChild = item => {
    console.log("item clickItemChild: " + JSON.stringify(item));
  };

  clickItemFilter = item => {
    let { Profit } = this.props;
    Profit.setItemFilter(item);
    this.dismissFilter();
  };

  dismissFilter = () => {
    this.setState({
      isShowFilter: false
    });
  };
  showFilter = () => {
    this.setState({
      isShowFilter: true
    });
  };

  dismissModal = () => {
    this.setState({
      isShowMore: false
    });
  };
  showMore = () => {
    this.setState({
      isShowMore: true
    });
  };

  render() {
    let { title, Profit } = this.props;
    return (
      <ImageBackground
        style={{ width: "100%", flex: 1, height: "100%" }}
        source={images.bg_detail}
      >
        <Navbar
          left={
            <TouchableOpacity
              onPress={this.goBack}
              style={{
                width: 40,
                height: "100%",
                backgroundColor: "transparent",
                justifyContent: "center"
              }}
            >
              <FastImage
                resizeMode={FastImage.resizeMode.contain}
                style={{
                  width: 20,
                  height: 20
                }}
                tintColor="#fff"
                source={images.ic_back}
              />
            </TouchableOpacity>
          }
          title={title || ""}
        />
        <View
          style={{
            width: "100%",
            flex: 1,
            backgroundColor: "transparent",
            paddingTop: 35 + values.marginTopScreen,
            paddingHorizontal: 15
          }}
        >
          <View style={{ width: "100%" }}>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 7
              }}
            >
              <Text
                style={{
                  fontSize: values.fontSizeTitle,
                  color: "#000",
                  fontWeight: "500"
                }}
              >
                {"Doanh thu gộp"}
              </Text>
              <Text
                style={{
                  fontSize: values.fontSizeTitle,
                  color: color.mainColor,
                  fontWeight: "500"
                }}
              >
                {convertToPrice(7113122)}
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 5
              }}
            >
              <Text
                style={{
                  fontSize: values.fontSizeNormal,
                  color: color.HOME.nolected
                }}
              >
                {"Hoàn tiền"}
              </Text>
              <Text
                style={{
                  fontSize: values.fontSizeNormal,
                  color: color.HOME.nolected
                }}
              >
                {convertToPrice(7113122)}
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <Text
                style={{
                  fontSize: values.fontSizeNormal,
                  color: color.HOME.nolected
                }}
              >
                {"Giảm giá"}
              </Text>
              <Text
                style={{
                  fontSize: values.fontSizeNormal,
                  color: color.HOME.nolected
                }}
              >
                {convertToPrice(7113122)}
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                height: 1,
                marginTop: 7,
                borderColor: "#ccc",
                borderWidth: 0.5,
                borderStyle: "dashed"
              }}
            />
          </View>
          <View style={{ width: "100%" }}>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 7
              }}
            >
              <Text
                style={{
                  fontSize: values.fontSizeTitle,
                  color: "#000",
                  fontWeight: "500"
                }}
              >
                {"Doanh thu tuần"}
              </Text>
              <Text
                style={{
                  fontSize: values.fontSizeTitle,
                  color: color.mainColor,
                  fontWeight: "500"
                }}
              >
                {convertToPrice(7113122)}
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 5
              }}
            >
              <Text
                style={{
                  fontSize: values.fontSizeNormal,
                  color: color.HOME.nolected
                }}
              >
                {"Giá gốc"}
              </Text>
              <Text
                style={{
                  fontSize: values.fontSizeNormal,
                  color: color.HOME.nolected
                }}
              >
                {convertToPrice(7113122)}
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                height: 1,
                marginTop: 7,
                borderColor: "#ccc",
                borderWidth: 0.5,
                borderStyle: "dashed"
              }}
            />
          </View>
          <View style={{ width: "100%" }}>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 7
              }}
            >
              <Text
                style={{
                  fontSize: values.fontSizeTitle,
                  color: "#000",
                  fontWeight: "500"
                }}
              >
                {"Lợi nhuận gộp"}
              </Text>
              <Text
                style={{
                  fontSize: values.fontSizeTitle,
                  color: color.mainColor,
                  fontWeight: "500"
                }}
              >
                {convertToPrice(7113122)}
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
