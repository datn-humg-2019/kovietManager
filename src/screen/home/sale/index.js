import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  RefreshControl
} from "react-native";
import { Navigation } from "react-native-navigation";
import { images, values, color, config } from "../../../config";
import NavbarItem from "../../../component/NavbarItem";

import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import ListItemView from "./listItem";
import MoreView from "./more";
import FilterView from "./filter";
import LayeredChartsExample from "../../../component/LayeredChartsExample";
import FastImage from "react-native-fast-image";
import styles from "./styles";

//Doanh số
@inject("Sale", "Profit")
@observer
export default class SaleScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      isIncrease: true,
      isIncreaseNetRevenue: false,
      isShowMore: false,
      isShowFilter: false,
      dataAll: [],
      typeShowAll: ""
    };

    Navigation.mergeOptions("SaleScreen", {
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

  navigationButtonPressed({ buttonId }) {
    if (buttonId == "back") {
      this.goBack();
    }
  }

  componentDidMount() {
    this.handelGetDataSale();
  }

  handelGetDataSale = (callback = null) => {
    let { Sale, Profit } = this.props;
    Sale.getListMerchandiseImport(
      Profit.itemFilterSelected.fromDate,
      Profit.itemFilterSelected.toDate,
      status => {
        if (status) {
          Sale.getListMerchandiseExport(
            Profit.itemFilterSelected.fromDate,
            Profit.itemFilterSelected.toDate,
            statusNow => {
              callback && callback(statusNow);
            }
          );
        } else {
          callback && callback(false);
        }
      }
    );
  };

  goBack = () => {
    Navigation.pop("SaleScreen");
  };

  clickMore = item => {
    let { Sale } = this.props;
    switch (item.type) {
      case config.typeData.shop:
        this.setState({
          dataAll: toJS(Sale.listData[0].data),
          typeShowAll: item.type
        });
        break;
      case config.typeData.staff:
        this.setState({
          dataAll: toJS(Sale.listData[1].data),
          typeShowAll: item.type
        });
        break;
    }
    this.showMore();
  };

  clickItemChild = item => {
    // this.showDetailItem(item);
  };

  clickItemFilter = item => {
    let { Profit } = this.props;
    Profit.setItemFilter(item);
    // Profit.getChart();
    this.handelGetDataSale();
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

  showDetail = () => {
    // Navigation.push("SaleScreen", {
    //   component: {
    //     id: "DetailSaleScreen",
    //     name: "DetailSaleScreen",
    //     passProps: {
    //       title: "Lợi nhuận chi tiết"
    //     },
    //     options: {
    //       topBar: {
    //         leftButtons: [
    //           {
    //             id: "back",
    //             color: "#fff",
    //             icon: images.ic_back
    //           }
    //         ],
    //         title: {
    //           text: "",
    //           color: "#fff",
    //           alignment: "center",
    //           fontSize: values.nav.fontSize
    //         },
    //         rightButtons: [],
    //         visible: false,
    //         background: { color: color.mainColor }
    //       }
    //     }
    //   }
    // });
  };

  showDetailItem = item => {
    let { Profit } = this.props;

    Navigation.push("SaleScreen", {
      component: {
        id: "DetailItemSaleScreen",
        name: "DetailItemSaleScreen",
        passProps: {
          title:
            item.type == config.typeData.shop
              ? item.tencuahang
              : item.tennhanvien || "",
          item: item,
          fromDate: Profit.itemFilterSelected.fromDate,
          toDate: Profit.itemFilterSelected.toDate
        },
        options: {
          topBar: {
            leftButtons: [
              {
                id: "back",
                color: "#fff",
                icon: images.ic_back
              }
            ],
            title: {
              text: "",
              color: "#fff",
              alignment: "center",
              fontSize: values.nav.fontSize
            },
            rightButtons: [],
            visible: false,
            background: { color: color.mainColor }
          }
        }
      }
    });
  };

  onRefresh = () => {
    const self = this;
    this.setState({ refreshing: true }, () => {
      self.handelGetDataSale(status => {
        self.setState({ refreshing: false });
      });
    });
  };

  render() {
    const { title, Profit, Sale } = this.props;
    const {
      dataAll,
      isIncrease,
      isIncreaseNetRevenue,
      isShowFilter,
      isShowMore,
      refreshing,
      typeShowAll
    } = this.state;
    return (
      <ImageBackground style={styles.imgBg} source={images.background}>
        <View style={styles.content01}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={this.onRefresh}
              />
            }
            style={styles.content2}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={this.showFilter}
              style={styles.content3}
            >
              <Text style={styles.textFilter}>
                {(Profit.itemFilterSelected &&
                  Profit.itemFilterSelected.name) ||
                  ""}
              </Text>
              <FastImage
                resizeMode={FastImage.resizeMode.contain}
                tintColor="#fff"
                style={{ height: 6 }}
                source={images.ic_down}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={this.showDetail}
              style={[
                styles.showDetail1,
                values.platform == "ios"
                  ? styles.shadowIOS
                  : styles.shadowAndroid
              ]}
            >
              <View style={styles.content4}>
                <Text
                  style={[
                    styles.textContent4,
                    {
                      color: isIncrease ? color.mainColor : color.colorDecrease
                    }
                  ]}
                />
                <FastImage
                  resizeMode={FastImage.resizeMode.contain}
                  style={{
                    height: 8
                  }}
                  tintColor={isIncrease ? color.mainColor : color.colorDecrease}
                  source={isIncrease ? images.ic_increase : images.ic_decrease}
                />
              </View>
              <Text style={styles.text5}>{"Doanh thu thuần(Triệu đồng)"}</Text>
              <View style={styles.content6}>
                <Text
                  style={[
                    styles.text6,
                    {
                      color: isIncreaseNetRevenue
                        ? color.mainColor
                        : color.colorDecrease
                    }
                  ]}
                />
                <FastImage
                  resizeMode={FastImage.resizeMode.contain}
                  tintColor={
                    isIncreaseNetRevenue ? color.mainColor : color.colorDecrease
                  }
                  style={{
                    height: 8
                  }}
                  source={
                    isIncreaseNetRevenue
                      ? images.ic_increase
                      : images.ic_decrease
                  }
                />
              </View>
              <View style={styles.content7}>
                <View style={styles.content7Child}>
                  <LayeredChartsExample />
                </View>
              </View>
            </TouchableOpacity>
            <ListItemView
              data={toJS(Sale.listData)}
              clickMore={this.clickMore}
              clickItemChild={this.clickItemChild}
            />
          </ScrollView>
        </View>
        <View style={styles.contentNav}>
          <NavbarItem goBack={this.goBack} title={title} />
        </View>
        <MoreView
          isShow={isShowMore}
          title={"Tất cả "}
          goBack={this.dismissModal}
          clickItemChild={this.clickItemChild}
          data={dataAll}
          type={typeShowAll}
        />
        <FilterView
          goBack={this.dismissFilter}
          isShow={isShowFilter}
          clickItem={this.clickItemFilter}
          data={config.typeFilterDate}
        />
      </ImageBackground>
    );
  }
}
