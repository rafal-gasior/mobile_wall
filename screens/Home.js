import React, { Component } from "react";
import {
  StyleSheet,
  /*Platform,
  Text,
  View,
  ScrollView,*/
} from "react-native";
import PropTypes from "prop-types";
import { Icon,  /*Button*/ } from "react-native-elements";
import ArticleHandler from "../elements/ArticleHandler";
type Props = {};

/*const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on  vdsfdsf sdyour keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});*/

class HomeScreen extends Component<Props> {

constructor(){
    super();
}
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Home",
      /*headerStyle: {
        backgroundColor: "#f4511e"
      },*/
      /*headerTintColor: "#fff",*/
      headerRight: (
        <Icon
          name="cog"
          color="#fff"
          containerStyle={styles.optionsIcon}
          type="font-awesome"
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            navigation.navigate("Settings", {
              itemId: 86,
              otherParam: "anything you want here"
            });
          }}
          title="Info"
        />
      )
    };
  };
  render() {
    return (
        <ArticleHandler/>
        /*{
        <View style={styles.container}>

          <Button
            title="Make picture"
            onPress={() => {
              this.props.navigation.navigate("CameraView", {
                itemId: 86,
                otherParam: "anything you want here"
              });
            }}
          />

          <Button
            title="TEST REACT-NATIVE-CAMERA"
            onPress={() => {
              this.props.navigation.navigate("CameraView2", {
                itemId: 86,
                otherParam: "anything you want here"
              });
            }}
          />

          <Text style={styles.welcome}>Hello dude!!! Its React Native!</Text>
          <Text style={styles.instructions}>To get started, edit App.js</Text>
          <Text style={styles.instructions}>{instructions}</Text>
        </View>
    }*/

    );
  }
}
HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  optionsIcon: {
    marginRight: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
