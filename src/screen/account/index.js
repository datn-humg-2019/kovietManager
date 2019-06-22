import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { fonts, color, values, images } from "../../config";
import ButtonGradient from "../../component/ButtonGradient";
import LoginScreen from "./login/index";
import RegisterScreen from "./register/";
import { Navigation } from "react-native-navigation";
import AppComponent from "../../component/AppComponent";
import FastImage from "react-native-fast-image";
const type = { login: 0, register: 1 };

export default class AuthScreen extends AppComponent {
  constructor(props) {
    super(props);

    this.state = {
      type: type.login
    };
    Navigation.mergeOptions("AuthScreen", {
      topBar: {
        leftButtons: [
          // {
          //     id: 'left',
          //     component: {
          //         name: 'LeftButton',
          //     }
          // }
        ],
        // title: {
        //     text: screenId.HOME.title,
        //     color: '#fff',
        //     alignment: 'center',

        //     fontSize: values.nav.fontSize
        // },
        // rightButtons: [
        //     {
        //         id: 'info',
        //         component: {
        //             name: 'InfoButton',

        //         }
        //     }
        // ],
        visible: false,
        drawBehind: true,
        noBorder: true,
        background: { color: "transparent" }
      }
    });
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  }

  navigationButtonPressed({ buttonId }) {
    // will be called when "buttonOne" is clicked
  }

  changeType = typeNow => {
    if (typeNow == type.login) {
      this.setState({ type: type.login });
    } else {
      this.setState({ type: type.register });
    }
  };

  dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  clickFogotPass = () => {
    Navigation.push("AuthScreen", {
      component: {
        id: "FogotPasswordScreen",
        name: "FogotPasswordScreen",
        passProps: {
          text: "Pushed screen"
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
              text: "Đặt lại mật khẩu",
              color: "#fff",
              alignment: "center",
              fontSize: values.nav.fontSize
            },
            rightButtons: [],
            visible: true,
            background: { color: color.mainColor }
          }
        }
      }
    });
  };

  renderContent() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={{ width: "100%", flex: 1 }}
        onPress={this.dismissKeyboard}
      >
        <ScrollView style={{ height: "100%", width: "100%" }}>
          <KeyboardAvoidingView
            behavior="padding"
            enabled={values.platform == "ios" ? true : false}
            style={{
              width: "100%",
              flex: 1,
              backgroundColor: "#fff",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                fontSize: 56,
                fontWeight: "bold",
                marginBottom: 20,
                marginTop: values.isTablet
                  ? values.marginTopScreen + 120
                  : values.marginTopScreen + 20,
                fontFamily: fonts.svn_inter,
                color: color.mainColor
              }}
            >
              {"KoViet Manager"}
            </Text>
            <View
              style={{
                backgroundColor: "transparent",
                // paddingVertical: 20,
                flexDirection: "row"
              }}
            />
            <View style={{ width: "80%" }}>
              {this.state.type == type.login ? (
                <LoginScreen
                  clickFogotPass={this.clickFogotPass}
                  showLoading={this.showLoading}
                  hideLoading={this.hideLoading}
                />
              ) : (
                <RegisterScreen />
              )}
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </TouchableOpacity>
    );
  }
}
