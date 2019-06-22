import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Image
} from "react-native";
import { Navigation } from "react-native-navigation";
import { images, values, color } from "../../../config";
import NavbarItem from "../../../component/NavbarItem";

import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import ListItemView from "./listItem";
import { convertToPrice } from "../../../utils/Func";

//tồn kho

@inject("Inventory")
@observer
export default class InventoryScreen extends Component {
  constructor(props) {
    super(props);

    Navigation.mergeOptions("InventoryScreen", {
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
      Navigation.pop("InventoryScreen");
    }
  }

  componentDidMount() {
    this.getDataInventory();
  }

  getDataInventory = (callback = null) => {
    let { Inventory } = this.props;
    Inventory.getListInventory(callback);
  };

  goBack = () => {
    Navigation.pop("InventoryScreen");
  };

  clickItem = item => {
    console.log(item);
  };
  render() {
    let { title, Inventory } = this.props;
    return (
      <ImageBackground
        style={{ width: "100%", flex: 1, height: "100%" }}
        source={images.background}
      >
        <View
          style={{ width: "100%", flex: 1, backgroundColor: "transparent" }}
        >
          <View
            style={{
              paddingTop: 70 + values.marginInfo,
              flex: 1,
              height: "100%",
              width: "100%",
              position: "absolute",
              paddingHorizontal: 15
            }}
          >
            <View
              style={[
                {
                  width: "100%",
                  backgroundColor: "#fff",
                  borderRadius: 15,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 20
                },
                values.platform == "ios"
                  ? {
                      shadowColor: "#000000",
                      shadowOffset: { width: 2, height: 4 },
                      shadowOpacity: 0.2,
                      shadowRadius: 5
                    }
                  : { elevation: 4 }
              ]}
            >
              <Text style={{ fontSize: values.fontSizeTitle, color: "#000" }}>
                {"Tồn kho"}
              </Text>
              <Text
                style={{
                  fontSize: values.fontSizeLarge,
                  color: "#DC0000",
                  fontWeight: "bold",
                  paddingVertical: 10
                }}
              >
                {convertToPrice(Inventory.totalPrice)}
              </Text>
              <Text
                style={{
                  fontSize: values.fontSizeNormal,
                  color: "#000",
                  marginBottom: 5
                }}
              >
                {"Sản phẩm"}
              </Text>
              <Text
                style={{
                  fontSize: values.fontSizeTitle,
                  color: color.mainColor,
                  fontWeight: "bold"
                }}
              >
                {Inventory.totalProduct}
              </Text>
            </View>
            <Text
              style={{
                paddingTop: 15,
                paddingBottom: 10,
                fontSize: values.fontSizeNormal
              }}
            >
              <Text>{"Tổng số hàng hóa với số tồn kho là "}</Text>
              <Text style={{ fontWeight: "500" }}>
                {Inventory.totalProduct}
              </Text>
            </Text>
            <ListItemView
              onRefresh={this.onRefresh}
              data={toJS(Inventory.listProduct)}
              clickItem={this.clickItem}
              getDataInventory={this.getDataInventory}
            />
          </View>
        </View>
        <NavbarItem goBack={this.goBack} title={title} />
      </ImageBackground>
    );
  }
}
