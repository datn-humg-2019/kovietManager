import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import numeral from 'numeral'
import { color, values } from '../../../config';
import ListItemChild from './listItemChild';
export default class FlatlistItem extends Component {
    render() {
        let { item, clickItem } = this.props;
        return (
            <View style={{ width: '100%' }}>
                <Text style={{ flex: 1, padding: 15, fontSize: values.fontSizeTitle, fontWeight: 'bold', color: '#000' }}>{item.title || ''}</Text>
                <ListItemChild data={item.data} clickItem={this.clickItem} />
            </View >
        )
    }
}