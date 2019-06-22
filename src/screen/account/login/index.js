import React from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  AsyncStorage
} from "react-native";
import { get, noop } from "lodash";

import ButtonGradient from "../../../component/ButtonGradient";
import { color, values, images, api } from "../../../config";
import SimpleToast from "react-native-simple-toast";
import { validateEmail } from "../../../utils/Func";
import { goHome } from "../../../../App";
import { PostNoToken } from "../../../config/request";
import { inject, observer } from "mobx-react";
import FastImage from "react-native-fast-image";
import styles from "./styles";

type PropsType = {
  showLoading?: Function,
  hideLoading?: Function
};
@inject("User")
@observer
export default class LoginScreen extends React.PureComponent<PropsType> {
  static defaultProps = {
    showLoading: noop,
    hideLoading: noop
  };

  constructor(props: PropsType): void {
    super(props);

    this.state = {
      email: "",
      password: "",
      // email: "aitranxuan.dev@gmail.com",
      // password: "123456",
      isShowPass: false
    };
  }

  checkValue = () => {
    let { email, password } = this.state;

    let check = false;
    if (email.trim() != "") {
      if (validateEmail(email)) {
        if (password.trim() != "") {
          check = true;
          // if (this.state.password.trim().length > 6) {

          // } else {
          //   SimpleToast.show('Mật khẩu cần phải lớn hơn 6 kí tự')
          // }
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

  handelClickLogin = () => {
    let { email, password } = this.state;
    let { User, showLoading, hideLoading } = this.props;
    Keyboard.dismiss();
    if (this.checkValue()) {
      showLoading();
      User.login({ email, password }, status => {
        if (status) {
          User.getUserInfo(statusGetUser => {
            hideLoading();
            if (statusGetUser) {
              goHome();
            }
          });
        } else {
          hideLoading();
        }
      });
    }
  };

  render() {
    let { clickFogotPass } = this.props;
    let { isShowPass, password, email } = this.state;
    return (
      <View style={styles.main}>
        <View style={styles.main2}>
          <View style={styles.main3}>
            <TextInput
              underlineColorAndroid={"transparent"}
              placeholder="email"
              keyboardType="email-address"
              style={styles.textInput}
              value={email}
              onChangeText={email => this.setState({ email })}
            />
            {this.state.email.trim() != "" ? (
              <TouchableOpacity
                onPress={() => this.setState({ email: "" })}
                style={styles.buttonClear}
              >
                <FastImage
                  resizeMode={FastImage.resizeMode.contain}
                  style={styles.imageClear}
                  source={images.ic_clear}
                />
              </TouchableOpacity>
            ) : null}
          </View>
          <View style={styles.containPass}>
            <TextInput
              underlineColorAndroid={"transparent"}
              placeholder="Mật khẩu"
              secureTextEntry={!isShowPass}
              style={styles.textInputPass}
              value={password}
              onChangeText={password => this.setState({ password })}
            />
            {password.trim() != "" ? (
              <TouchableOpacity
                onPress={() => this.setState({ isShowPass: !isShowPass })}
                style={styles.buttonClearPass}
              >
                <FastImage
                  resizeMode={FastImage.resizeMode.contain}
                  style={styles.imageClear}
                  source={
                    password.trim() == ""
                      ? images.ic_hide_pass
                      : images.ic_show_pass
                  }
                />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
        <ButtonGradient
          onPress={this.handelClickLogin}
          colors={["#fff", "#fff"]}
          styleText={styles.styleTextGradient}
          containStyle={styles.containStyle}
          title={"Đăng nhập"}
        />
        {/* <TouchableOpacity onPress={clickFogotPass}>
          <Text style={styles.fogotPass}>Quên mật khẩu?</Text>
        </TouchableOpacity> */}
      </View>
    );
  }
}
