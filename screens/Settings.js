import React from "react";

import {
  StyleSheet,
  View,
  AsyncStorage
} from "react-native";

import { FormLabel, FormInput} from "react-native-elements";

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Settings"
  };

  state = {
    login: "",
    password: "",
    address: ""
  };
  handleLogin = text => {
    //zapis do globalnej zmiennej:
    AsyncStorage.setItem("login", text);
    //zapis stanu:
    this.setState({ login: text });
  };
  handlePassword = text => {
    AsyncStorage.setItem("password", text);
    this.setState({ password: text });
  };
  handleAddress = text => {
    AsyncStorage.setItem("address", text);
    this.setState({ address: text });
  };
  login = (login, pass, address) => {
    alert("login: " + login + " password: " + pass + " address: " + address);
  };
  //This will execute automatically before render() method gets triggered:
  componentDidMount = async function() {
    let login = await AsyncStorage.getItem("login");
    this.setState({ login: login });
    let password = await AsyncStorage.getItem("password");
    this.setState({ password: password });
    let address = await AsyncStorage.getItem("address");
    this.setState({ address: address });
  };

  render() {
    return (
      <View style={styles.container}>

          <FormLabel>Server address</FormLabel>
          <FormInput onChangeText={this.handleAddress} value={this.state.address}/>

          <FormLabel>Login</FormLabel>
          <FormInput onChangeText={this.handleLogin} value={this.state.login}/>

          <FormLabel>Password</FormLabel>
          <FormInput onChangeText={this.handlePassword} value={this.state.password}/>

        {/*<TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Address"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handleAddress}
          value={this.state.address}
        />

        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Login"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handleLogin}
          value={this.state.login}
        />

        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Password"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handlePassword}
          value={this.state.password}
      />*/}
        {/*
            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.login(this.state.login, this.state.password, this.state.address)
               }>
               <Text style = {styles.submitButtonText}> Submit </Text>
           </TouchableOpacity>
         */}
      </View>
    );
  }
}
export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 23
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: "#2089dc",
    borderWidth: 1
  },
  submitButton: {
    backgroundColor: "#2089dc",
    padding: 10,
    margin: 15,
    height: 40
  },
  submitButtonText: {
    color: "white"
  }
});
