import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Keyboard
} from "react-native";
import { fonts, color, values, images, api } from "../../../config";
import ButtonGradient from "../../../component/ButtonGradient";
import { Navigation } from "react-native-navigation";
import SimpleToast from "react-native-simple-toast";
import { validateEmail } from "../../../utils/Func";
import AppComponent from "../../../component/AppComponent";
import { PostNoToken } from "../../../config/request";
import FastImage from "react-native-fast-image";

export default class FogotPasswordScreen extends AppComponent {
  constructor(props) {
    super(props);

    this.state = {
      username: ""
    };
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId == "back") {
      this.goBack();
    }
    // will be called when "buttonOne" is clicked
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId == "back") {
      this.goBack();
    }
    // will be called when "buttonOne" is clicked
  }

  goBack = () => {
    this.dismissKeyboard();
    Navigation.pop("FogotPasswordScreen");
  };

  handleSend = () => {
    let { username } = this.state;
    this.dismissKeyboard();
    if (username.trim() != "") {
      if (validateEmail(username)) {
        this.showLoading();
        PostNoToken(api.ACCOUNT.forgetPass, { username }, (status, data) => {
          this.hideLoading();
          if (status) {
            SimpleToast.show(data.message);
          } else {
            SimpleToast.show("Lỗi kết nối");
          }
        });
      } else {
        SimpleToast.show("Bạn cần nhập đúng định dạng email.");
      }
    } else {
      SimpleToast.show("Bạn cần nhập email.");
    }
  };

  dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  send = () => {
    this.dismissKeyboard();
    if (this.state.text.trim() != "") {
      if (validateEmail(this.state.text)) {
      } else {
        SimpleToast.show("Bạn cần nhập đúng định dạng email.");
      }
    } else {
      SimpleToast.show("Bạn cần nhập email.");
    }
  };

  render() {
    let { username } = this.state;
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={{ width: "100%", flex: 1 }}
        onPress={this.dismissKeyboard}
      >
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
          {/* <Text style={{
                        fontSize: 58, fontWeight: 'bold', marginBottom: 10,
                        fontFamily: fonts.svn_inter, color: color.mainColor
                    }}>{'SMARTPOS'}</Text> */}
          <View
            style={{
              backgroundColor: "transparent",
              paddingVertical: 20,
              width: "80%",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                color: color.mainColor,
                width: "100%",
                textAlign: "center"
              }}
            >
              {"Vui lòng nhập lại email đã đăng ký với hệ thống"}
            </Text>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                borderBottomColor: "#D6D6D6",
                borderBottomWidth: 1,
                marginVertical: 15
              }}
            >
              <TextInput
                underlineColorAndroid={"transparent"}
                placeholder="Email"
                placeholderTextColor={color.colorText_nolected}
                keyboardType="email-address"
                style={{
                  color: color.mainColor,
                  height: 40,
                  fontSize: values.fontSizeTitle,
                  flex: 1,
                  textAlign: "center"
                }}
                value={username}
                onChangeText={username => this.setState({ username })}
              />
              {username.trim() != "" ? (
                <TouchableOpacity
                  onPress={() => this.setState({ username: "" })}
                  style={{
                    width: 25,
                    backgroundColor: "transparent",
                    height: 40,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <FastImage
                    resizeMode={FastImage.resizeMode.contain}
                    style={{ width: 15 }}
                    source={images.ic_clear}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
            <ButtonGradient
              onPress={this.handleSend}
              containStyle={{ width: "80%" }}
              title={"Gửi"}
            />
          </View>
        </KeyboardAvoidingView>
      </TouchableOpacity>
    );
  }
}
