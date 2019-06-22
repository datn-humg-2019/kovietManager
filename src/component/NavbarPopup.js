import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { values, images } from "../config";
import FastImage from "react-native-fast-image";

export default class NavbarPopup extends Component {
  render() {
    let {
      left,
      title,
      imgs,
      right,
      goBack,
      styleClose,
      styleTitle
    } = this.props;
    return (
      <View
        style={{
          width: "100%",
          height: values.contenTopBar,
          backgroundColor: "transparent",
          flexDirection: "row",
          paddingHorizontal: 10,
          borderBottomColor: "#ccc",
          borderBottomWidth: 0.5
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
              tintColor="#000"
              style={[
                {
                  width: 20,
                  height: 20
                },
                styleClose
              ]}
              source={images.ic_close}
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
            style={[
              {
                width: "100%",
                fontSize: 14,
                color: "#000",
                backgroundColor: "transparent",
                textAlign: "center"
              },
              styleTitle
            ]}
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
    );
  }
}
