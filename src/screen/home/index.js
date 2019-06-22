import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  AppRegistry,
  TouchableOpacity,
  ImageBackground,
  ScrollView
} from "react-native";

import Carousel, { Pagination } from "react-native-snap-carousel";
import { values, color, fonts, screenId, images } from "../../config";
import Navbar from "./navbar";
import { Navigation } from "react-native-navigation";

import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import ItemHome from "./ItemHome";

@inject("Home")
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSlide: 0
    };
  }

  showScreen = (screen, rightButton) => {
    console.log(screen);
    Navigation.push("MainScreen", {
      component: {
        id: screen.id,
        name: screen.id,
        passProps: {
          title: screen.title
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
              text: screen.title,
              color: "#fff",
              alignment: "center",
              fontSize: values.nav.fontSize
            },
            rightButtons: rightButton,
            visible: false,
            background: { color: color.mainColor }
          }
        }
      }
    });
  };

  componentDidMount() {
    let { Home } = this.props;
  }

  clickItem = value => {
    let rightButton = [];
    switch (value) {
      case screenId.HOME.item.sale.id:
        // rightButton = [{
        //     id: 'extraInfo',
        //     color: '#fff',
        //     icon: images.ic_extraInfo
        // }]
        this.showScreen(screenId.HOME.item.sale, rightButton);
        break;
      case screenId.HOME.item.debt.id:
        rightButton = [
          {
            id: "calendar",
            color: "#fff",
            icon: images.ic_calendar
          }
        ];
        this.showScreen(screenId.HOME.item.debt, rightButton);
        break;
      case screenId.HOME.item.inventory.id:
        this.showScreen(screenId.HOME.item.inventory, rightButton);
        break;

      default:
        // type.setting
        this.showScreen(screenId.HOME.item.profit, rightButton);
        break;
    }
  };

  render() {
    let { Home } = this.props;
    return (
      <ImageBackground
        style={{ width: "100%", flex: 1, height: "100%" }}
        source={images.background}
      >
        <View
          style={{ width: "100%", flex: 1, backgroundColor: "transparent" }}
        >
          <ScrollView
            style={{
              paddingTop: values.tabbarContent + values.marginTopScreen,
              flex: 1,
              height: "100%",
              width: "100%",
              position: "absolute"
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                marginBottom: 20,
                paddingHorizontal: 16
              }}
            >
              <ItemHome
                onPress={() => this.clickItem(screenId.HOME.item.sale.id)}
                title={screenId.HOME.item.sale.title}
                image={images.ic_sales}
                containStyles={{ marginRight: 8 }}
                //doanh số
              />
              <ItemHome
                onPress={() => this.clickItem(screenId.HOME.item.profit.id)}
                title={screenId.HOME.item.profit.title}
                image={images.ic_profit}
                containStyles={{ marginLeft: 8 }}
                //lợi nhuận
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                paddingBottom: 20,
                paddingHorizontal: 16
              }}
            >
              <ItemHome
                onPress={() => this.clickItem(screenId.HOME.item.inventory.id)}
                title={screenId.HOME.item.inventory.title}
                image={images.ic_inventory}
                //tồn kho
              />
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }
}
