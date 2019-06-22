import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import numeral from 'numeral'
import moment from 'moment'
import { values, color } from '../../../../config';
export default class FlatlistItem extends Component {
    render() {
        let { item, clickItem } = this.props;
        let colorText = item.isRead ? color.HOME.nolected : '#000';
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                style={{ padding: 15, backgroundColor: '#fff', borderBottomColor: '#ccc', borderBottomWidth: 0.5 }}>
                <Text numberOfLines={1} style={{ fontSize: values.fontSizeNormal, color: colorText, fontWeight: 'bold' }}>{item.title || ''}</Text>
                <Text numberOfLines={2} style={{ fontSize: values.fontSizeNormal, paddingVertical: 5, color: colorText }}>{item.description || ''}</Text>
                <Text numberOfLines={1} style={{ fontSize: values.fontSizeNormal, color: colorText }}>{moment(item.time).format('HH:mm - DD/MM/YYYY')}</Text>
            </TouchableOpacity>
        )
    }
}