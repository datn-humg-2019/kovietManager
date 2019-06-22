import React, { Component } from "react";
import { Text, View, TouchableOpacity, ViewPropTypes } from "react-native";
import { values, images, color } from "../../config";
import FastImage from "react-native-fast-image";

type PropsType = {
  containStyles?: ViewPropTypes.style
};
export default class ItemHome extends React.PureComponent<PropsType> {
  static defaultProps = { containStyles: {} };
  render() {
    const { containStyles, onPress, title, image } = this.props;
    const width = 140;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={[
          {
            flex: 1,
            height: width,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ffffff",
            borderRadius: 12
          },
          values.platform == "ios"
            ? {
                shadowColor: "#000000",
                shadowOffset: { width: 2, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 5
              }
            : { elevation: 4 },
          containStyles
        ]}
      >
        <FastImage
        tintColor={color.mainColor}
          resizeMode={FastImage.resizeMode.contain}
          style={{ width: 50, height: 50 }}
          source={image || images.ic_sell}
        />
        <Text
          numberOfLines={2}
          style={{
            fontSize: 18,
            paddingTop: 5,
            textAlign: "center",
            color: color.mainColor,
            width: "100%"
          }}
        >
          {title || ""}
        </Text>
      </TouchableOpacity>
    );
  }
}
