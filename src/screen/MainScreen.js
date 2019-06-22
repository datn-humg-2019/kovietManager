import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import HomeScreen from "./home/index";
import ProfileScreen from "./account/profile/ProfileScreen";
import { values, color, config, screenId, images } from "../config";
import { Navigation } from "react-native-navigation";
import Navbar from "../component/Navbar";

import { inject, observer } from "mobx-react";
import FastImage from "react-native-fast-image";
@inject("User", "OnApp")
@observer
class MainScreen extends Component {
  constructor(props) {
    super(props);
    Navigation.mergeOptions("MainScreen", {
      topBar: {
        visible: false,
        drawBehind: true,
        noBorder: true,
        background: { color: "transparent" }
      },
      statusBar: {
        style: "light",
        visible: true
      }
    });
    this.state = {
      type: config.typeHome.home
    };
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  }
  componentWillMount() {}

  navigationButtonPressed({ buttonId }) {}
  showNotif = () => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              id: "NotificationScreen",
              name: "NotificationScreen",
              passProps: {
                text: "stack with one child"
              },
              options: {
                topBar: {
                  leftButtons: [
                    {
                      id: "back",
                      color: color.mainColor,
                      icon: images.ic_back
                    }
                  ],

                  title: {
                    text: screenId.NOTIFICATION.title,
                    color: color.mainColor,
                    alignment: "center",
                    fontSize: values.nav.fontSize
                  },
                  noBorder: true,
                  visible: true,
                  background: { color: "#fff" }
                },
                statusBar: {
                  style: "dark",
                  visible: true
                }
              }
            }
          }
        ]
      }
    });
  };

  showInfo = () => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              id: "ProfileScreen",
              name: "ProfileScreen",
              passProps: {
                text: "stack with one child"
              }
            }
          }
        ]
      }
    });

    // Navigation.showModal({
    //     component: {
    //         name: 'ProfileScreen',
    //         options: {
    //             topBar: {
    //                 leftButtons: [
    //                     {
    //                         id: 'back',
    //                         color: '#fff',
    //                         icon: require('../../assets/images/ic_back.png')
    //                     }
    //                 ],

    //                 title: {
    //                     text: screenId.INFO.title,
    //                     color: '#fff',
    //                     fontSize: values.nav.fontSize
    //                 },
    //                 rightButtons: [
    //                     {
    //                         id: 'info',
    //                         component: {
    //                             name: 'InfoButton'
    //                         }
    //                     }
    //                 ],
    //                 visible: true,
    //                 background: { color: color.mainColor }
    //             }
    //         }
    //     }
    // });
  };

  render() {
    let { User, OnApp } = this.props;
    return (
      <View style={{ width: "100%", flex: 1, backgroundColor: "transparent" }}>
        <HomeScreen {...this.props} />
        <View style={{ width: "100%", position: "absolute" }}>
          <Navbar
            title={screenId.HOME.title}
            right={
              <View style={{ height: "100%", flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={this.showNotif}
                  style={{
                    width: 40,
                    height: "100%",
                    backgroundColor: "transparent",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <View style={{ padding: 5 }}>
                    <FastImage
                      resizeMode={FastImage.resizeMode.contain}
                      tintColor="#fff"
                      style={{
                        width: 24,
                        height: 24
                      }}
                      source={images.ic_ring}
                    />
                    {OnApp.numberOfNotif &&
                    parseInt(OnApp.numberOfNotif) > 0 ? (
                      <View
                        style={{
                          backgroundColor: "red",
                          right: 0,
                          top: 2,
                          position: "absolute",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 16,
                          height: 16,
                          borderRadius: 8,
                          borderColor: "#fff",
                          borderWidth: 1.5
                        }}
                      >
                        <Text
                          style={{
                            fontSize:
                              parseInt(OnApp.numberOfNotif + "") > 9 ? 8 : 11,
                            color: "#fff"
                          }}
                        >
                          {parseInt(OnApp.numberOfNotif + "") > 9
                            ? "+9"
                            : OnApp.numberOfNotif}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.showInfo}
                  style={{
                    width: 40,
                    height: "100%",
                    backgroundColor: "transparent",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <View
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 14,
                      overflow: "hidden",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <FastImage
                      style={{ width: "100%", height: "100%" }}
                      source={
                        User.userInfo && User.userInfo.avatar
                          ? { uri: User.userInfo.avatar }
                          : images.ic_user_info
                      }
                    />
                  </View>
                </TouchableOpacity>
              </View>
            }
          />
        </View>
      </View>
    );
  }
}
export default MainScreen;
