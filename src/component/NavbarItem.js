import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";

import { values, images } from "../config";

export default class NavbarItem extends Component {
  render() {
    let { left, title, right, goBack } = this.props;
    return (
      <View
        style={{
          position: "absolute",
          height: values.contenTopBar + values.marginTopScreen,
          width: "100%",
          backgroundColor: "transparent",
          justifyContent: "flex-end"
        }}
      >
        <View
          style={{
            width: "100%",
            height: values.contenTopBar,
            backgroundColor: "transparent",
            flexDirection: "row",
            paddingHorizontal: 10
          }}
        >
          <View
            style={{
              // width: 80,
              height: "100%",
              backgroundColor: "transparent",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              onPress={goBack}
              style={{
                width: 40,
                height: "100%",
                backgroundColor: "transparent",
                justifyContent: "center"
              }}
            >
              <FastImage
                resizeMode={FastImage.resizeMode.contain}
                tintColor="#fff"
                style={{
                  width: 20,
                  height: 20
                }}
                source={images.ic_back}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                width: "100%",
                fontSize: values.nav.fontSize,
                color: values.nav.color,
                backgroundColor: "transparent",
                textAlign: "center"
              }}
            >
              {title}
            </Text>
          </View>

          <View
            style={{
              width: 40,
              height: "100%",
              backgroundColor: "transparent",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center"
            }}
          >
            {right}
          </View>
        </View>
      </View>
    );
  }
}
