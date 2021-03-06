import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";
import FlatlistItem from "./FlatlistItem";
import { color, values } from "../../../../config";

// import { inject, observer } from 'mobx-react'
// import { toJS } from 'mobx';
// @inject('Sell')
// @observer
export default class ListItemView extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  renderItem = ({ item, index }) => {
    return (
      <FlatlistItem
        index={index}
        item={item}
        clickItem={this.props.clickItem}
        clickMore={this.props.clickMore}
        clickItemChild={this.props.clickItemChild}
      />
    );
  };

  render() {
    let { data } = this.props;
    return (
      <View style={{ flex: 1, width: "100%" }}>
        <FlatList
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
          data={data}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
