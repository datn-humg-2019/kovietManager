import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import numeral from "numeral";
import { values, color, images } from "../../../../../config";
import FastImage from "react-native-fast-image";
import { convertToPrice } from "../../../../../utils/Func";
export default class FlatlistItem extends Component {
  render() {
    let { item, clickItem } = this.props;
    let width = values.deviceWidth / 8 < 60 ? values.deviceWidth / 8 : 60;
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
            width: "100%"

            // borderBottomColor: '#ccc', borderBottomWidth: 0.5
          }
        ]}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "transparent",
            paddingVertical: 7
          }}
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
                resizeMode={FastImage.resizeMode.contain}
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
              {item.madonhang || ""}
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
              {item.tongtien ? convertToPrice(item.tongtien) : ""}
            </Text>
          </View>
        </View>

        <View
          style={{
            width: "100%",
            height: 1,
            borderColor: "#ccc",
            borderWidth: 0.5,
            borderStyle: "dashed"
          }}
        />
      </TouchableOpacity>
      // </View >
    );
  }
}
