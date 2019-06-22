import React, { Component } from 'react'
import { Text, View, FlatList, RefreshControl } from 'react-native'
import FlatlistItem from './FlatlistItem';
import { color, values } from '../../../../../config';

// import { inject, observer } from 'mobx-react'
// import { toJS } from 'mobx';
// @inject('Sell')
// @observer
export default class ListItemDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            refreshing: false,
            loading: false
        }
    }

    onRefresh = () => {
        let { page, getDataDetail, setPage } = this.props;
        setPage(0)
        this.setState({
            refreshing: true
        }, () => {
            this.props.getDataDetail(0, (status) => {
                this.setState({ refreshing: false })
            })
        })
    }

    onLoadMore = () => {
        let { page, getDataDetail, setPage } = this.props;
        let { loading } = this.state
        if (!loading) {
            this.setState({ loading: true }, () => {
                getDataDetail(page + 1, (status) => {
                    if (status) {
                        this.setState({ loading: false })
                        setPage(page + 1)
                    } else {
                        this.setState({ loading: false })
                    }
                })
            })
        }
    }

    renderItem = ({ item }) => {
        return (<FlatlistItem item={item} clickItem={this.props.clickItemChild} />)
    }


    render() {
        let { data, isShow, page } = this.props;
        let { refreshing } = this.state;
        return (

            < View style={[{ width: '100%', },
            ]}>
                <FlatList
                    style={[{},

                    ]}
                    ListEmptyComponent={<Text style={{ fontSize: values.fontSizeNormal, color: '#00000090', textAlign: 'center', padding: 15 }}>{'Không có kết quả tìm kiếm!'}</Text>}
                    // style={{ paddingTop: 10 }}
                    data={data}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    refreshControl={<RefreshControl
                        refreshing={refreshing}
                        onRefresh={this.onRefresh}
                    />}
                    onEndReachedThreshold={0.5}
                    onEndReached={this.onLoadMore}
                />
            </View >
        )
    }
}