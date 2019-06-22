import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import NavbarPopup from '../../../../component/NavbarPopup';
import ListItemChild from '../listItem/listChild';
import { values } from '../../../../config';

export default class MoreView extends Component {
    render() {
        let { goBack, isShow, title, data, clickItemChild, type } = this.props;
        return (
            isShow
                ?
                <TouchableOpacity
                    onPress={goBack}
                    activeOpacity={1}
                    style={{
                        position: 'absolute', width: '100%',
                        height: '100%', backgroundColor: '#00000070', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 7
                    }}>
                    <View style={{ borderRadius: 10, backgroundColor: '#fff', width: '100%', maxHeight: values.deviceHeight * 2 / 3, }}>
                        <NavbarPopup
                            goBack={goBack}
                            title={title || 'Tất cả sản phẩm'}
                        />
                        <ListItemChild type={type} data={data} clickItemChild={clickItemChild} />
                    </View>
                </TouchableOpacity>
                :
                null
        )
    }
}