import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator,
} from "react-navigation";
import PropTypes from 'prop-types';
import { Icon } from "react-native-elements";
import HomeScreen from "./screens/Home";
import CameraView from "./screens/Camera";
import Recorder from "./screens/Recorder";
import SettingsScreen from "./screens/Settings";



/*const CustomHeader = props => {
  return (
    <View
      style={{
        height: 56,
        marginTop: Platform.OS == "ios" ? 20 : 0
      }}
    >
        <Header {...props} />
      <LinearGradient
        colors={["#6200EE", "#3700B3"]}
      >

      </LinearGradient>
    </View>
  );
};*/

let headerDefaultNavigationConfig = {
 // header: props => <CustomHeader {...props} />,
  headerStyle: {
   backgroundColor: "#2089dc"
  },
  headerTitleStyle: {
    fontWeight: "bold",
    color: "#fff",
    zIndex: 1,
    fontSize: 18,
    lineHeight: 23
  },
  headerTintColor: "#fff"
};

//nawigacja dla tab1
const Navigation = createStackNavigator(
  {
    Home: HomeScreen ,/*
    navigationOptions: {
           headerTitle: 'Home',
             headerRight: ( <Button
                                   onPress={() => alert('This is a button!')}
                                   title="Info"
                                   color="#fff"
                                 />)
    },
    //},*/
    Settings: SettingsScreen ,
    /*navigationOptions: {
           headerTitle: 'Settings',

    }*/
    //},
    CameraView: CameraView,
    CameraView2: Recorder /*,
      navigationOptions: {
             headerTitle: 'Settings',

      }*/
    //    }
  },
  {
    navigationOptions: {
        ...headerDefaultNavigationConfig
    }
  }
);
//nawigacja dla tab2
const Navigation2 = createStackNavigator(
  {
    CameraView: CameraView
  },
  {
    navigationOptions: {
        ...headerDefaultNavigationConfig
    },
    initialRouteName: "CameraView",
  }
);

//tabs on bottom:
const tabBarIconHome = ({tintColor}) => <Icon type='font-awesome' name="home" color={tintColor} size={25} />
const tabBarIconCamera =  ({tintColor}) => <Icon type='font-awesome' name="camera" color={tintColor} size={25} />
tabBarIconHome.propTypes = {
  tintColor: PropTypes.string.isRequired
};
tabBarIconCamera.propTypes = {
  tintColor: PropTypes.string.isRequired
};
const Routing = createBottomTabNavigator(
  {
    Tab1: {
      screen: Navigation,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: tabBarIconHome
      }
    },
    Tab2: {
      screen: Navigation2,
      navigationOptions: {
        tabBarLabel: "Photo",
        tabBarIcon: tabBarIconCamera,

      }
    }
  },
  {
    initialRouteName: "Tab1",

  }
);

export default Routing;
