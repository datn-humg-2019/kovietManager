import React, { Component } from "react";
import { Text, View, ImageBackground, TouchableOpacity } from "react-native";
import { Navigation } from "react-native-navigation";
import { images, values, color } from "../../../../config";

import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import Navbar from "../../../../component/Navbar";
import ListItemDetail from "./listChild";
import FastImage from "react-native-fast-image";
import { convertToPrice } from "../../../../utils/Func";

@inject("Profit", "Sale")
@observer
export default class DetailItemScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowMore: false,
      isShowFilter: false,
      page: 0
    };
    Navigation.mergeOptions("DetailItemSaleScreen", {
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
    this.getDataDetail(this.state.page);
  }

  componentWillUnmount() {
    let { Sale } = this.props;
    Sale.setDataDetail([]);
  }

  setPage = page => {
    this.setState({ page });
  };

  goBack = () => {
    Navigation.pop("DetailItemSaleScreen");
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
    Profit.setTypeDetail(item);
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

  renderTotalMoney() {
    let { Sale } = this.props;
    let total = 0;
    toJS(Sale.dataDetail).map((v, k) => {
      total += parseInt(v.tongtien);
    });

    return total;
  }

  render() {
    let { title, Profit, Sale, item } = this.props;
    let { page } = this.state;
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
                tintColor="#fff"
                style={{
                  width: 20,
                  height: 20
                }}
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
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 7
            }}
          >
            <TouchableOpacity
              onPress={this.showFilter}
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row"
              }}
            >
              <Text
                style={{
                  fontSize: values.fontSizeTitle,
                  color: color.mainColor
                }}
              >
                {/* {item.type == config.typeData.shop ? "Cửa hàng" : "Nhận viên"} */}
                Hoá đơn
              </Text>
              <FastImage
                resizeMode={FastImage.resizeMode.contain}
                style={{
                  height: 6
                }}
                tintColor={color.mainColor}
                source={images.ic_down}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: values.fontSizeTitle,
                color: color.HOME.nolected
              }}
            >
              {"Doanh thu " + Profit.itemFilterSelected.name}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <ListItemDetail
              data={toJS(Sale.dataDetail)}
              clickItemChild={this.clickItemChild}
              getDataDetail={this.getDataDetail}
              page={page}
              setPage={this.setPage}
            />
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 7,
              height: 50
            }}
          >
            <Text
              style={{ fontSize: values.fontSizeTitle, color: color.mainColor }}
            >
              {"Tổng cộng"}
            </Text>
            <Text
              style={{ fontSize: values.fontSizeTitle, color: color.mainColor }}
            >
              {convertToPrice(this.renderTotalMoney())}
            </Text>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
