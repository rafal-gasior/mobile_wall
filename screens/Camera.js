import React, { Component } from "react";
import {
  StyleSheet,
  View,
  AsyncStorage,
  ImageBackground,
  ScrollView,
  ToastAndroid
} from "react-native";
import {
  Button,
  Avatar,
  Icon,
  FormLabel,
  FormInput
} from "react-native-elements";
import ImagePicker from "react-native-image-picker";
import Loader from "../elements/Loader";

class CameraView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickedImage: null,
      description: "",
      name: "",
      loading: false
    };
    this.pickImageHandler();
  }
  static navigationOptions = {
    title: "Send photo"
  };

  reset = () => {
    this.setState({
      pickedImage: null,
      description: "",
      name: "",
      loading: false
    });
  };
  previewLoader = value => {
    this.setState({ loading: value });
  };

  /**
   * The first arg is the options object for customization (it can also be null or omitted for default options),
   * The second arg is the callback which sends object: response (more info below in README)
   */

  pickImageHandler = () => {
    ImagePicker.showImagePicker(
      {
        title: "Pick an Image",
        mediaType: "photo",
        skipBackup: true,
        path: "images",
        maxWidth: 800,
        maxHeight: 600,
        takePhotoButtonTitle: "Take Photo...",
        chooseFromLibraryButtonTitle: "Choose from Library..."
      },
      res => {
        if (res.didCancel) {
          //console.log("User cancelled!");
        } else if (res.error) {
          //console.log("Error", res.error);
        } else {
          this.setState({
            pickedImage: res
          });
          // console.log("URI", res.uri);
        }
      }
    );
  };

  pickVideoHandler = () => {
    ImagePicker.showImagePicker(
      {
        title: "Pick an Video",
        mediaType: "video",
        videoQuality: "high",
        skipBackup: true,
        path: "images",
        takePhotoButtonTitle: "Take Video...",
        chooseFromLibraryButtonTitle: "Choose from Library..."
      },
      res => {
        if (res.didCancel) {
          //console.log("User cancelled!");
        } else if (res.error) {
          //console.log("Error", res.error);
        } else {
          this.setState({
            pickedImage: res
          });
          console.log("URI", res.uri);
        }
      }
    );
  };

  /*
  showCamera = () => {
  console.log('Click Camera');
  ImagePicker.launchCamera(
    {
      title: 'Video Picker',
      takePhotoButtonTitle: 'Take Video...',
      mediaType: 'video',
      videoQuality: 'medium',
    },
    response => {
        this.setState({
          pickedImage: { uri: response.uri }
        });
    }
  );
};*/
  sendData = () => {
    this.previewLoader(true);
    AsyncStorage.getItem("address")
      .then(address => {
        AsyncStorage.getItem("login").then(login => {
          AsyncStorage.getItem("password").then(password => {
            if(!address || !login || !password){
                this.previewLoader(false);
                alert("Fill out all fields correctly in the application settings");
                return;
            }
            const data = new FormData();

            data.append("uri", this.state.pickedImage);
            data.append("type", "image/jpeg");
            data.append("name", this.state.name);
            data.append("description", this.state.description);
            data.append("login", login);
            data.append("password", password);
            //alert("data:" + JSON.stringify(data));
            fetch("http://" + address + "/4ses/rest/files/download", {
              method: "post",
              body: data
            }).then(res => {
              this.previewLoader(false);
              ToastAndroid.show("The message has been send.",ToastAndroid.SHORT)
              this.resetHandler();
              console.log(res);
          });
          });
        });
      })
      .done();
  };

  resetHandler = () => {
    this.reset();
  };
  getAlert = () => {
    alert("clicked");
  };
  render() {
    return (
      <View style={styles.container}>
        <Loader loading={this.state.loading} />

        <ScrollView>
        <View style={styles.header}>
        <View style={styles.avatarContainer}>
        <Avatar
          style={styles.descriptionInputAvatar}
          large
          rounded
          source={{
            uri:
              "http://proconsultancies.org/wimages/icon-user-default.png" 
          }}
          activeOpacity={0.7}
        />
            </View>
        </View>
          <View style={styles.descriptionInput}>

            <View style={styles.InputDesc}>
              <FormLabel>What&apos;s up user?</FormLabel>
              <FormInput
                style={styles.descriptionInputElement}
                multiline={true}
                numberOfLines={1}
                editable={true}
                onChangeText={name => this.setState({ name })}
                placeholder="Title"
                value={this.state.name}
              />
              <FormInput
                style={styles.descriptionInputElement}
                multiline={true}
                numberOfLines={2}
                editable={true}
                onChangeText={description => this.setState({ description })}
                placeholder="Description"
                value={this.state.description}
              />
            </View>
          </View>
          <View style={styles.placeholder}>
            <ImageBackground
              source={this.state.pickedImage}
              style={styles.previewImage}
            >
              <View style={styles.button}>
                <Icon
                  raised
                  name="image"
                  type="font-awesome"
                  color="#2089dc"
                  title="Pick Image"
                  onPress={this.pickImageHandler}
                />
                <Icon
                  raised
                  name="camera"
                  type="font-awesome"
                  color="#2089dc"
                  title="Pick Video"
                  onPress={this.pickVideoHandler}
                />
                <Icon
                  raised
                  name="reply-all"
                  type="font-awesome"
                  color="#2089dc"
                  title="Reset"
                  onPress={this.resetHandler}
                />
              </View>
            </ImageBackground>
          </View>
        </ScrollView>

        <View style={styles.submitButtonView}>
          <Button
            small
            icon={{ name: "send", type: "font-awesome" }}
            title="Send"
            color="#fff" //text color
            backgroundColor="#2089dc" //button color
            containerViewStyle={{ width: "100%", marginLeft: 0 }}
            onPress={this.sendData}
          />
        </View>
      </View>
    );
  }
}

export default CameraView;

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  header: {
   //backgroundColor: "#2089dc",
  },
  submitButtonView: {
    width: "100%",
    height: 50,
    backgroundColor: "#2089dc",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0
  },
  submitView: {
    width: "100%"
  },
  descriptionInput: {
    width: "100%",
    flexDirection: "row",
//    margin: 10
  },
  descriptionInputElement: {
    width: "100%"
  },
  descriptionInputAvatar: {
    alignItems: "center",
  },
  avatarContainer: {
      alignItems: "center",
    padding:15,
  },
  container: {
    alignItems: "center",
    flex: 1
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  containerToolbar: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
    textAlign: "center",
    backgroundColor: "#F5FCFF"
  },
  InputDesc: {
    flexDirection: "column",
    width: "100%"
  },
  toolbar: {
    backgroundColor: "#e9eaed",
    height: 56
  },
  textStyle: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    color: "red",
    marginTop: 10
  },
  placeholder: {
    //borderWidth: 1,
    //borderColor: "black",
    backgroundColor: "#eee",
    width: "100%",
    height: 280,
    marginTop: 10
  },
  button: {
    /*width: "100%",*/
    flexDirection: "row"
  },
  bottomRow: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 0
  },
  previewImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  }
});
