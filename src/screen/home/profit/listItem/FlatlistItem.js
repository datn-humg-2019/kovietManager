import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import { get } from "lodash";

import { values, color, images } from "../../../../config";
import ListItemChild from "./listChild/";
export default class FlatlistItem extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { item, clickItemChild, clickMore } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={[
          {
            width: "100%",
            paddingVertical: 10,
            backgroundColor: "transparent",
            alignItems: "center"
          }
        ]}
      >
        <TouchableOpacity
          onPress={() => clickMore(item)}
          style={{
            flexDirection: "row",
            flex: 1,
            backgroundColor: "transparent",
            marginVertical: 5
          }}
        >
          <Text
            numberOfLines={2}
            style={{ fontSize: values.fontSizeTitle, color: "black", flex: 1 }}
          >
            {get(item, "title")}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "transparent"
            }}
          >
            <Text
              style={{
                fontSize: values.fontSizeSmall,
                color: color.HOME.nolected
              }}
            >
              {"Xem thêm"}
            </Text>
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              source={images.ic_right}
              tintColor={color.HOME.nolected}
              style={{ height: 9 }}
            />
          </View>
        </TouchableOpacity>
        <ListItemChild
          type={item.type}
          data={item.data.length > 3 ? item.data.splice(0, 3) : item.data}
          clickItemChild={clickItemChild}
        />
      </TouchableOpacity>
    );
  }
}
