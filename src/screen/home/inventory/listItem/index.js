import React, { Component } from 'react'
import { Text, View, FlatList, RefreshControl } from 'react-native'
import FlatlistItem from './FlatlistItem';
import { color, values } from '../../../../config';

// import { inject, observer } from 'mobx-react'
// import { toJS } from 'mobx';
// @inject('Sell')
// @observer
export default class ListItemView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            refreshing: false
        }
    }

    onRefresh = () => {
        this.setState({
            refreshing: true
        }, () => {
            this.props.getDataInventory(status => {
                this.setState({
                    refreshing: false
                })
            })
        })
    }

    renderItem = ({ item }) => {
        return (<FlatlistItem item={item} clickItem={this.props.clickItem} />)
    }

    render() {
        let { data, isShow } = this.props;
        let { refreshing } = this.state
        return (

            < View style={{ flex: 1, width: '100%', backgroundColor: 'white' }}>
                <FlatList
                    ListEmptyComponent={<Text style={{ fontSize: values.fontSizeNormal, color: '#00000090', textAlign: 'center', padding: 15 }}>{'Không có kết quả tìm kiếm!'}</Text>}
                    // style={{ paddingTop: 10 }}
                    data={data}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    refreshControl={<RefreshControl
                        refreshing={refreshing}
                        onRefresh={this.onRefresh}
                    />}
                />
            </View >
        )
    }
}