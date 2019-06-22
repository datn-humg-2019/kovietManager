import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
import FlatlistItem from './FlatlistItem';
import { color, values } from '../../../../../config';

// import { inject, observer } from 'mobx-react'
// import { toJS } from 'mobx';
// @inject('Sell')
// @observer
export default class ListItemChild extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    renderItem = ({ item }) => {
        let { type } = this.props
        return (<FlatlistItem type={type} item={item} clickItem={this.props.clickItemChild} />)
    }

    render() {
        let { data, isShow } = this.props;
        return (

            < View style={[{ width: '100%', borderRadius: 10, backgroundColor: '#fff', paddingHorizontal: 10 },
            ]}>
                <FlatList
                    style={[{},

                    ]}
                    ListEmptyComponent={<Text style={{ fontSize: values.fontSizeNormal, color: '#00000090', textAlign: 'center', padding: 15 }}>{'Không có kết quả tìm kiếm!'}</Text>}
                    // style={{ paddingTop: 10 }}
                    data={data}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View >
        )
    }
}