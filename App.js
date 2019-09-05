import React from "react";
import Routing from "./Routing";
import { View, YellowBox, ToastAndroid, AsyncStorage } from "react-native";
import PushNotification from "react-native-push-notification";
import BackgroundTimer from "react-native-background-timer";
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function(token) {
    console.log("TOKEN:", token);
    alert("onregister");
  },

  // (required) Called when a remote or local notification is opened or received
  onNotification: function(notification) {
    //alert('on notification');
    console.log("NOTIFICATION:", notification);
    setTimeout(() => {
      if (!notification["foreground"]) {
        ToastAndroid.show("Read the post", ToastAndroid.show);
      }
    }, 1);
    // process the notification

    // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
    //    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
  senderID: "YOUR GCM (OR FCM) SENDER ID",

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   */
  requestPermissions: true
});

export async function getDailyNews() {
  //get user login and user Password and pass to link
  let login = await AsyncStorage.getItem("login");
  let password = await AsyncStorage.getItem("password");
  let address = await AsyncStorage.getItem("address");
  let data = await fetch(
    "http://" +
      address +
      "/4ses/servlet/wall-notification-service" +
      "?auth_key=540dc2800a3a54e07149bdedbe5332e3" +
      "&format=json" +
      "&mode=newest" +
      "&username=" +
      login +
      "&password=" +
      password
  ).then(response => response.json());
  return data.results;
}
function search(nameKey, myArray) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].id_element === nameKey) {
      return myArray[i];
    }
  }
  return null;
}
var notifyHistory = [];
function fetchNews() {

  getDailyNews()
    .then(notifications => {
      // alert("odpalono notyfikację" + notifications[i].id_element);

      AsyncStorage.getItem("posts").then(posts => {
        if (posts) {
          let showedPosts = JSON.parse(posts);

          for (let i = 0; i < notifications.length; i++) {
            if (search(notifications[i].id_element, showedPosts) || search(notifications[i].id_element, notifyHistory)) {
              // alert("jest" + notifications[i].id_element);
            } else {
              PushNotification.localNotificationSchedule({
                //... You can use all the options from localNotifications
                title:
                  "User " +
                  notifications[i].id_author +
                  " has added a new post.",
                message: "Click here to see more..", // (required)
                date: new Date(Date.now() + 5 * 1000) // in 5 secs
              });
              notifyHistory.push({"id_element": notifications[i].id_element})
            }
          }
        }
      });
    })
    .catch();
}

//check new every 10 s:
BackgroundTimer.runBackgroundTimer(() => {
  fetchNews();
}, 20000);
YellowBox.ignoreWarnings([
  "Warning: isMounted(...) is deprecated",
  "Module RCTImageLoader",
  "Warning: componentWillReceiveProps is deprecated",
  "Warning: componentWillMount is deprecated"
]);

const App = () => (
  <View style={{ flex: 1 }}>
    <Routing />
  </View>
);
export default App;
