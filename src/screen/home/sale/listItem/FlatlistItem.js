import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity, FlatList } from "react-native";
import numeral from "numeral";
import { values, color, images } from "../../../../config";
import ListItemChild from "./listChild/";
import FastImage from "react-native-fast-image";
export default class FlatlistItem extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { item, clickItem, clickItemChild, clickMore, index } = this.props;
    return (
      <TouchableOpacity
        // onPress={() => clickItem(item)}
        activeOpacity={1}
        style={[
          {
            width: "100%",
            paddingVertical: 10,

            backgroundColor: "transparent",

            // borderBottomColor: '#ccc', borderBottomWidth: 0.5,

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
            {item.title}
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
              style={{
                height: 9
              }}
              tintColor={color.HOME.nolected}
            />
          </View>
        </TouchableOpacity>
        <ListItemChild type={item.type} data={item.data.length > 3 ? item.data.splice(0, 3) : item.data} clickItemChild={clickItemChild} />
      </TouchableOpacity>
    );
  }
}
