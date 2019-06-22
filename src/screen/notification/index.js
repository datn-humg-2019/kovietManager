import React, { Component } from 'react'
import { Text, View } from 'react-native'

import { Navigation } from 'react-native-navigation';
import { color } from '../../config';
import ListItemView from './listItem';

import { inject, observer } from 'mobx-react'
@inject('User', 'OnApp')
@observer
export default class NotificationScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
        Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
    }
    navigationButtonPressed({ buttonId }) {
        // will be called when "buttonOne" is clicked
        if (buttonId == 'back') {
            this.goBack()
        }
    }

    componentWillMount() {

    }

    goBack = () => {
        Navigation.dismissModal('NotificationScreen')
    };
    render() {
        let { OnApp } = this.props;
        return (
            <View style={{ flex: 1, width: '100%', backgroundColor: color.HOME.bgColorHome }}>
                <ListItemView data={OnApp.listNotificaion} />
            </View>
        )
    }
}