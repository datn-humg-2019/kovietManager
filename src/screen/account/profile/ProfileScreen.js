import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  Alert,
  AsyncStorage
} from "react-native";
import { values, color, screenId, images, api } from "../../../config";
import { get } from "lodash";
import { Navigation } from "react-native-navigation";
import { goAuth } from "../../../../App";

import { inject, observer } from "mobx-react";
import Navbar from "../../../component/Navbar";
import { PostWithToken } from "../../../config/request";
import SimpleToast from "react-native-simple-toast";
import AppComponent from "../../../component/AppComponent";
import FastImage from "react-native-fast-image";

@inject("User")
@observer
export default class ProfileScreen extends AppComponent {
  constructor(props) {
    super(props);

    this.state = {};

    Navigation.mergeOptions("ProfileScreen", {
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
    // will be called when "buttonOne" is clicked
    if (buttonId == "close") {
      this.dismissModal();
    }
  }

  componentWillMount() {
    // Navigation.mergeOptions('ProfileScreen', {
    //   topBar: {
    //     leftButtons: [
    //       {
    //         id: 'close',
    //         color: '#fff',
    //         icon: images.ic_close
    //       }
    //     ],
    //     title: {
    //       text: screenId.INFO.title,
    //       color: '#fff',
    //       alignment: 'center',
    //       fontSize: values.nav.fontSize
    //     },
    //     visible: true,
    //     background: { color: color.mainColor }
    //   }
    // })
  }

  goBack = () => {
    Navigation.dismissModal("ProfileScreen");
  };
  dismissModal = () => {
    Navigation.dismissModal("ProfileScreen");
  };
  
  logout = () => {
    let { User } = this.props;
    const self = this;
    Alert.alert("Đăng xuất", "Bạn thực sự muốn đăng xuất khỏi tài khoản này?", [
      {
        text: "Huỷ",
        onPress: () => {
          console.log("huỷ đăng xuất");
        },
        style: "cancel"
      },
      {
        text: "Đồng ý",
        onPress: () => {
          self.dismissModal();
          User.logout();
        },
        style: "destructive"
      }
    ]);
  };

  renderContent() {
    let { User } = this.props;
    let width = values.deviceWidth / 3.5 < 100 ? values.deviceWidth / 3.5 : 100;
    return (
      <ImageBackground
        style={{ width: "100%", flex: 1, height: "100%" }}
        source={images.background}
      >
        <View
          style={{
            width: "100%",
            flex: 1,
            backgroundColor: "transparent",
            paddingTop: values.marginTopScreen,
            alignItems: "center"
          }}
        >
          <View
            style={{
              width: "100%",
              alignItems: "center",
              flex: 1,
              backgroundColor: "transparent",
              marginTop: 93 + values.marginInfo
            }}
          >
            <View
              style={{
                width: width,
                height: width,
                borderRadius: 20,
                overflow: "hidden",
                borderWidth: 1,
                borderColor: "#ffffff"
              }}
            >
              <FastImage
                style={{ width: width, height: width }}
                source={
                  get(User, "userInfo") && get(User, "userInfo.avatar")
                    ? { uri: get(User, "userInfo.avatar") }
                    : images.defaultProfile
                }
              />
            </View>
            <Text
              style={{ fontSize: 20, fontWeight: "500", marginVertical: 7 }}
            >
              {(User.userInfo && User.userInfo.name) || ""}
            </Text>
            <View
              style={{
                borderRadius: 10,
                borderWidth: 1,
                borderColor: color.mainColor
              }}
            >
              <Text
                style={{
                  fontSize: values.fontSizeNormal,
                  paddingHorizontal: 10,
                  paddingVertical: 3,
                  color: color.mainColor
                }}
              >
                {(get(User, "userInfo") && get(User, "userInfo.role")) || ""}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={this.logout}
            style={{
              flexDirection: "row",
              height: 40,
              marginBottom: values.marginTopScreen,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              style={{
                width: 17,
                height: 17,
                marginRight: 5
              }}
              tintColor="#DC0000"
              source={images.ic_logout}
            />
            <Text style={{ fontSize: values.fontSizeTitle, color: "#DC0000" }}>
              {"Đăng xuất"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ position: "absolute", width: "100%" }}>
          <Navbar
            left={
              <TouchableOpacity
                onPress={this.goBack}
                style={{
                  width: 40,
                  height: "100%",
                  backgroundColor: "transparent",
                  justifyContent: "center"
                  // alignItems: 'center',
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
            title={screenId.INFO.title}
          />
        </View>
      </ImageBackground>
    );
  }
}
