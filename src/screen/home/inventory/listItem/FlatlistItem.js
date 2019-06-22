import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { get } from "lodash";
import numeral from "numeral";
import { values, color, images } from "../../../../config";
import FastImage from "react-native-fast-image";
import { convertToPrice } from "../../../../utils/Func";
export default class FlatlistItem extends Component {
  render() {
    let { item, clickItem } = this.props;
    let width = values.deviceWidth / 7.5 < 80 ? values.deviceWidth / 7.5 : 80;
    return (
      // <View style={[{
      //     width: '100%', alignItems: 'center', justifyContent: 'center'
      // },
      //     // values.platform == 'ios' ? {
      //     //     shadowColor: '#000000',
      //     //     shadowOffset: { width: 2, height: 4 },
      //     //     shadowOpacity: 0.2,
      //     //     shadowRadius: 10,

      //     // }
      //     //     :
      //     //     { elevation: 10 }
      // ]} >
      <TouchableOpacity
        onPress={() => clickItem(item)}
        style={[
          {
            width: "100%",
            flexDirection: "row",
            paddingVertical: 10,
            // marginBottom: 10,
            backgroundColor: "white",
            // borderRadius: 10,
            borderBottomColor: "#ccc",
            borderBottomWidth: 0.5,
            // overflow: 'hidden',
            alignItems: "center"
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
          {get(item, "image") ? (
            <FastImage
              style={{ width: "100%", height: "100%" }}
              source={{ uri: get(item, "image") }}
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
              flex: 1,
              backgroundColor: "transparent"
            }}
          >
            {get(item, "name") || ""}
          </Text>
          <Text style={{ color: "#000", fontWeight: "500", flex: 1 }}>
            {get(item, "price") ? convertToPrice(get(item, "price")) : ""}
          </Text>
        </View>
        <View style={{ backgroundColor: "transparent" }}>
          <Text
            style={{ color: color.mainColor, fontSize: values.fontSizeNormal }}
          >
            {get(item, "count") ?get(item, "count") : ""}
          </Text>
        </View>
      </TouchableOpacity>
      // </View >
    );
  }
}
