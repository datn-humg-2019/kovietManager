import React, { Component } from "react";
import { Text, View, TouchableOpacity, FlatList } from "react-native";
import { size } from "lodash";

import NavbarPopup from "../../../../component/NavbarPopup";
import ListItemChild from "../listItem/listChild";
import { values, color } from "../../../../config";
import ButtonGradient from "../../../../component/ButtonGradient";

export default class FilterView extends Component {
  renderItem = ({ item ,index}) => {
    const border = index !== size(this.props.data)-1;
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.clickItem(item);
        }}
        style={[
          {
            height: 40,
            alignItems: "center",
            justifyContent: "center"
          },
          border && { borderBottomColor: "#ccc", borderBottomWidth: 0.5 }
        ]}
      >
        <Text
          style={{
            color: "#00000090",
            width: "100%",
            paddingHorizontal: 10,
            textAlign: "center",
            fontSize: values.fontSizeNormal,
            backgroundColor: "transparent"
          }}
        >
          {item.name || ""}
        </Text>
      </TouchableOpacity>
      // <FlatlistItem item={item} clickItem={this.props.clickItemChild} />
    );
  };

  render() {
    let { goBack, isShow, title, data, clickItem } = this.props;
    return isShow ? (
      <TouchableOpacity
        onPress={goBack}
        activeOpacity={1}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "#00000070",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingHorizontal: 15
        }}
      >
        <View style={{ width: "100%", paddingBottom: 30 }}>
          <View
            style={{
              backgroundColor: "#fff",
              width: "100%",
              borderRadius: 10,
              maxHeight: (values.deviceHeight * 2) / 3
            }}
          >
            <FlatList
              style={[{}]}
              ListEmptyComponent={
                <Text
                  style={{
                    fontSize: values.fontSizeNormal,
                    color: "#00000090",
                    textAlign: "center",
                    padding: 15
                  }}
                >
                  {"Không có kết quả tìm kiếm!"}
                </Text>
              }
              // style={{ paddingTop: 10 }}
              data={data}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <ButtonGradient
            // onPress={this.send}
            containStyle={{ marginTop: 10 }}
            title={"Huỷ bỏ"}
          />
        </View>
      </TouchableOpacity>
    ) : null;
  }
}
