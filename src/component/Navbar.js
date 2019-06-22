import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { values } from '../config';

export default class Navbar extends Component {
    render() {
        let { left, title, right } = this.props;
        return (
            <View style={{
                height: values.contenTopBar + values.marginTopScreen,
                width: '100%', backgroundColor: 'transparent', justifyContent: 'flex-end',
            }}>
                <View style={{
                    width: '100%', height: values.contenTopBar, backgroundColor: 'transparent',
                    flexDirection: 'row', paddingHorizontal: 10
                }}>
                    <View style={{
                        width: 80, height: '100%', backgroundColor: 'transparent', flexDirection: 'row',
                        justifyContent: 'flex-start', alignItems: 'center',
                    }}>
                        {left}
                    </View>
                    <View style={{ flex: 1, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', }}>
                        <Text numberOfLines={1}
                            style={{
                                width: '100%', fontSize: values.nav.fontSize, color: values.nav.color,
                                backgroundColor: 'transparent', textAlign: 'center'
                            }}>{title}</Text>
                    </View>

                    <View style={{
                        width: 80, height: '100%', backgroundColor: 'transparent', flexDirection: 'row',
                        justifyContent: 'flex-end', alignItems: 'center',
                    }}>
                        {right}
                    </View>
                </View>
            </View >
        )
    }
}