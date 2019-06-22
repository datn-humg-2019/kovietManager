import { Navigation } from "react-native-navigation";
import { AppRegistry } from 'react-native';
import { registerScreens } from "./src/screen/RegisterScreens";
import store from "./src/store";
import Provider from './src/utils/MobxRnnProvider'
import { color } from "./src/config";
registerScreens(store, Provider)
console.disableYellowBox=true
export const goHome = () => Navigation.setRoot({
  root: {
    stack: {
      children: [
        {
          component: {
            id: 'MainScreen',
            name: 'MainScreen',
            options:{
                statusBar: {
                style: 'light',
                visible: true
            }
            }
          }
        }
      ],
    }
  }
})


export const goAuth = () => Navigation.setRoot({
  root: {
    stack: {
      children: [
        {
          component: {
            id: 'AuthScreen',
            name: 'AuthScreen',
            options: {
              topBar: {
                visible: false
              },
              statusBar: {
                style: 'light',
                visible: true
              }
            }
          }
        }
      ],
    }
  }
})

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        id: 'SplashScreen',
        name: "SplashScreen",
        // name:'AuthScreen'
        // id: "MainScreen",
        // name: "MainScreen",

      }

    }
  });
});