import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import values from "../../../config/values";
import { color, images } from "../../../config";
import FastImage from "react-native-fast-image";

export default class Navbar extends Component {
  render() {
    let { content, onPressLeft, onPressRight } = this.props;
    return (
      <View
        style={{
          width: "100%",
          backgroundColor: "transparent",
          height: values.toolbarHeight,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 10
        }}
      >
        <TouchableOpacity
          onPress={onPressLeft}
          style={{
            width: 40,
            height: 40,
            backgroundColor: "transparent",
            justifyContent: "center",
            alignItems: "center",
            // borderWidth: 2, borderColor: 'white',
            borderRadius: 20,
            overflow: "hidden"
          }}
          activeOpacity={0}
        >
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            tintColor={color.HOME.colortext}
            style={{ height: 30, width: 30 }}
            source={images.ic_user_info}
          />
        </TouchableOpacity>
        {content}
        <TouchableOpacity
          onPress={onPressRight}
          style={{
            width: 40,
            height: 40,
            backgroundColor: "transparent",
            justifyContent: "center",
            alignItems: "flex-end"
          }}
          activeOpacity={0}
        >
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            tintColor={color.HOME.colortext}
            style={{
              height: 25,
              width: 25
            }}
            source={images.ic_list}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
