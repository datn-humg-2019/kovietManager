import React, { Component } from "react";
import {
    AsyncStorage,
} from "react-native";
import { observable, action } from "mobx";
import {
    config,
    values,
    api,
} from "../config";
import _ from 'lodash'
import moment from 'moment'

const themApp = {
    light: { id: 0, backgroundColor: '#EAEAEA', colorText: '#000000', borderColor: '#EFEFEF' },
    dark: { id: 0, backgroundColor: "#303030", colorText: '#fff', borderColor: '#3C3C3C' }
}
class OnApp {
    @observable isConnect = true;
    @observable isShowScanQR = true;
    @observable themCurrent = themApp.light
    @observable numberOfNotif = 0;
    @observable listNotificaion = [
        {
            id: 0,
            title: 'Hôm nay',
            data: [
                {
                    id: 0,
                    title: 'Thông báo thưởng tết',
                    isRead: 0,
                    description: 'Nhân dịp nghỉ Tết nguyên đán công ty thưởng anh em nhân viên 1 tỷ đồng',
                    time: 1546577731000,
                },
                {
                    id: 0,
                    title: 'Thông báo thưởng tết',
                    isRead: 0,
                    description: 'Nhân dịp nghỉ Tết nguyên đán công ty thưởng anh em nhân viên 1 tỷ đồng',
                    time: 1546577731000,
                },
                {
                    id: 0,
                    title: 'Thông báo thưởng tết',
                    isRead: 1,
                    description: 'Nhân dịp nghỉ Tết nguyên đán công ty thưởng anh em nhân viên 1 tỷ đồng',
                    time: 1546577731000,
                }
            ],
        },
        {
            id: 1,
            title: 'Hôm qua',
            data: [
                {
                    id: 0,
                    title: 'Thông báo thưởng tết',
                    isRead: 1,
                    description: 'Nhân dịp nghỉ Tết nguyên đán công ty thưởng anh em nhân viên 1 tỷ đồng',
                    time: 1546577731000,
                },
                {
                    id: 0,
                    title: 'Thông báo thưởng tết',
                    isRead: 1,
                    description: 'Nhân dịp nghỉ Tết nguyên đán công ty thưởng anh em nhân viên 1 tỷ đồng',
                    time: 1546577731000,
                },
                {
                    id: 0,
                    title: 'Thông báo thưởng tết',
                    isRead: 1,
                    description: 'Nhân dịp nghỉ Tết nguyên đán công ty thưởng anh em nhân viên 1 tỷ đồng',
                    time: 1546577731000,
                }
            ],
        }
    ]

    @action setDataNoti(dataNoti) {
        this.dataNoti = dataNoti
        console.log("setDataNoti", dataNoti)
    }

}

export default new OnApp();
