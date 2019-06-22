import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import numeral from "numeral";
import { get } from "lodash";

import { values, color, images, config } from "../../../../../config";
import FastImage from "react-native-fast-image";
import { convertToPrice } from "../../../../../utils/Func";
export default class FlatlistItem extends Component {
  render() {
    let { item, clickItem, type } = this.props;
    let width = values.deviceWidth / 8 < 60 ? values.deviceWidth / 8 : 60;
    return (
      <TouchableOpacity
        onPress={() => clickItem({ ...item, type })}
        style={[
          {
            width: "100%",
            flexDirection: "row",
            paddingVertical: 7,
            alignItems: "center",
            backgroundColor: "transparent",
            borderBottomColor: "#ccc",
            borderBottomWidth: 0.5
          }
        ]}
      >
        <View
          style={{
            width: width,
            height: width,
            borderRadius: 10,
            overflow: "hidden"
          }}
        >
          {item.image ? (
            <FastImage
              style={{ width: "100%", height: "100%" }}
              source={{ uri: item.image }}
            />
          ) : (
            <FastImage
              style={{ width: "100%", height: "100%" }}
              source={images.default}
            />
          )}
        </View>
        <View
          style={{
            flex: 1,
            paddingLeft: 10,
            justifyContent: "space-between",
            backgroundColor: "transparent"
          }}
        >
          <Text
            numberOfLines={2}
            style={{
              fontSize: values.fontSizeNormal,
              color: color.HOME.nolected,
              width: "100%",
              backgroundColor: "transparent"
            }}
          >
            {get(item, "name")}
          </Text>
        </View>
        <View style={{ backgroundColor: "transparent" }}>
          <Text
            style={{
              color: color.mainColor,
              fontSize: values.fontSizeNormal,
              paddingLeft: 5
            }}
          >
            {get(item, "turnover")}
          </Text>
        </View>
      </TouchableOpacity>
      // </View >
    );
  }
}
