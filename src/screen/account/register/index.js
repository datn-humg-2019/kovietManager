import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard
} from "react-native";
import ButtonGradient from "../../../component/ButtonGradient";
import { color, values, images } from "../../../config";
import { validateEmail } from "../../../utils/Func";
import SimpleToast from "react-native-simple-toast";
import FastImage from "react-native-fast-image";

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isUnderstand: false,
      email: "",
      password: "",
      repassword: "",
      company: "",
      nation: ""
    };
  }

  chooseUnderstand = () => {
    this.setState({ isUnderstand: !this.state.isUnderstand });
  };

  checkValue = () => {
    let check = false;
    if (this.state.email.trim() != "") {
      if (validateEmail(this.state.email)) {
        if (this.state.password.trim() != "") {
          if (this.state.password.trim().length > 6) {
            if (this.state.repassword.trim() != "") {
              if (this.state.repassword == this.state.password) {
                if (this.state.company.trim() != "") {
                  if (this.state.nation.trim() != "") {
                    check = true;
                  } else {
                    SimpleToast.show("Bạn cần nhập quốc gia");
                  }
                } else {
                  SimpleToast.show("Bạn cần nhập tên công ty");
                }
              } else {
                SimpleToast.show("Mật khẩu nhập lại không trùng khớp");
              }
            } else {
              SimpleToast.show("Bạn cần xác nhận lại mật khẩu");
            }
          } else {
            SimpleToast.show("Mật khẩu cần phải lớn hơn 6 kí tự");
          }
        } else {
          SimpleToast.show("Bạn cần nhập mật khẩu");
        }
      } else {
        SimpleToast.show("Bạn cần nhập đúng định dạng email");
      }
    } else {
      SimpleToast.show("Bạn cần nhập email");
    }
    return check;
  };

  clickRegister = () => {
    Keyboard.dismiss();
    if (this.checkValue) {
    }
  };

  render() {
    return (
      <View style={{ width: "100%", alignItems: "center" }}>
        <View style={{ width: "100%", overflow: "hidden" }}>
          <TextInput
            underlineColorAndroid={"transparent"}
            placeholder="Email"
            keyboardType="email-address"
            placeholderTextColor={color.colorText_nolected}
            style={{
              color: color.mainColor,
              height: 40,
              fontSize: values.fontSizeTitle,
              borderBottomColor: "#D6D6D6",
              borderBottomWidth: 0.5
            }}
          />
          <TextInput
            underlineColorAndroid={"transparent"}
            placeholder="Mật khẩu"
            secureTextEntry
            placeholderTextColor={color.colorText_nolected}
            style={{
              color: color.mainColor,
              height: 40,
              fontSize: values.fontSizeTitle,
              borderBottomColor: "#D6D6D6",
              borderBottomWidth: 0.5
            }}
          />
          <TextInput
            underlineColorAndroid={"transparent"}
            placeholder="Nhập lại mật khẩu"
            secureTextEntry
            placeholderTextColor={color.colorText_nolected}
            style={{
              color: color.mainColor,
              height: 40,
              fontSize: values.fontSizeTitle,
              borderBottomColor: "#D6D6D6",
              borderBottomWidth: 0.5
            }}
          />
          <TextInput
            underlineColorAndroid={"transparent"}
            placeholder="Tên doanh nghiệp"
            placeholderTextColor={color.colorText_nolected}
            style={{
              color: color.mainColor,
              height: 40,
              fontSize: values.fontSizeTitle,
              borderBottomColor: "#D6D6D6",
              borderBottomWidth: 0.5
            }}
          />
          <TextInput
            underlineColorAndroid={"transparent"}
            placeholder="Quốc gia"
            placeholderTextColor={color.colorText_nolected}
            style={{
              color: color.mainColor,
              height: 40,
              fontSize: values.fontSizeTitle,
              borderBottomColor: "#D6D6D6",
              borderBottomWidth: 0.5
            }}
          />
        </View>
        <TouchableOpacity
          onPress={this.chooseUnderstand}
          style={{
            flexDirection: "row",
            width: "100%",
            backgroundColor: "transparent",
            alignItems: "center",
            paddingVertical: 15
            // justifyContent: 'center'
          }}
        >
          {this.state.isUnderstand ? (
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 4,
                borderWidth: 1.5,
                borderColor: color.borderColor
              }}
            />
          ) : (
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 4,
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1.5,
                borderColor: color.mainColor
              }}
            >
              <FastImage
                resizeMode={FastImage.resizeMode.contain}
                style={{ width: 13 }}
                source={images.ic_tick}
              />
            </View>
          )}
          <Text
            numberOfLines={2}
            style={{
              fontSize: values.fontSizeNormal,
              flex: 1,
              color: "black",
              paddingLeft: 10
            }}
          >
            Tôi đã hiểu rõ và đồng ý với điều khoản sử dụng và chính sách bảo
            mật
          </Text>
        </TouchableOpacity>

        <ButtonGradient
          onPress={this.clickRegister}
          containStyle={{ width: "80%" }}
          title={"Đăng ký"}
        />
      </View>
    );
  }
}
