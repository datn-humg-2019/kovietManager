import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  AsyncStorage
} from "react-native";

import { goHome, goAuth } from "../../../App";
import StyleSheet from "./StyleSheet";
import { inject, observer } from "mobx-react";
import { images, values, fonts, color } from "../../config";
@inject("User", "OnApp")
@observer
export default class SplashScreen extends Component {
  clickLogin = () => {
    let { User } = this.props;
    User.setUserInfo({ fullname: "Tran Xuan Ai" });
    goAuth();
  };
  clickHome = () => {
    let { User } = this.props;
    User.setUserInfo({ fullname: "Tran Xuan Ai" });
    goHome();
  };

  componentDidMount() {
    let { User } = this.props;
    setTimeout(() => {
      AsyncStorage.getItem("token").then(token => {
        if (token) {
          User.getUserInfo(statusGetUser => {
            if (statusGetUser) {
              goHome();
            } else {
              goAuth();
            }
          });
        } else {
          goAuth();
        }
      });
    }, 2000);
  }

  render() {
    let { OnApp } = this.props;

    return (
      <View
        style={{
          width: "100%",
          flex: 1,
          backgroundColor: color.mainColor,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Text
          style={{
            fontSize: 50,
            fontWeight: "bold",
            fontFamily: fonts.svn_inter,
            color: "#fff",
            textAlign: "center"
          }}
        >
          {"KOViet Manager"}
        </Text>
        {!OnApp.isConnect ? (
          <Text style={StyleSheet.textDisconnect}>
            Đường truyền mạng trên thiết bị đã mất kết nối. Vui lòng kiểm tra và
            thử lại!
          </Text>
        ) : null}
      </View>
    );
  }
}
