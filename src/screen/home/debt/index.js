import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Navigation } from 'react-native-navigation';

export default class DebtScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
        Navigation.mergeOptions('DebtScreen', {
            topBar: {
                visible: false,
                drawBehind: true,
                noBorder: true,
                background: { color: 'transparent' }
            },
            statusBar: {
                style: 'light',
                visible: true
            }
        })
        Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
    }
    componentWillMount() {
    }

    navigationButtonPressed({ buttonId }) {
        if (buttonId == 'back') {
            Navigation.pop('DebtScreen')
        }
    }
    render() {
        return (
            <View>
                <Text> DebtScreen </Text>
            </View>
        )
    }
}