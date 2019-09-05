/*
NOT USED YET
*/

import {Component} from "react";
import {AsyncStorage } from "react-native";
import PushNotification from 'react-native-push-notification';
type Props = {};
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


    class NotifyHandler extends Component<Props> {
      constructor(props) {
        super(props);
        this.state = { notifications: []};
      }

      fetchNews() {
        getDailyNews()
          .then(notifications => {
              for(let i= 0; i < notifications.length; i++){
                // if(notifications[i].id_element != 0)
                  PushNotification.localNotification({
                    //... You can use all the options from localNotifications
                    title: 'User '+notifications[i].id_author+' has added a new post.',
                    message: "Click here to see more..", // (required)
                   // date: new Date(Date.now() + (60 * 1000)) // in 60 secs
                  });
              }}
          )
          .catch();
      }

      componentDidMount() {
        alert('fetch news');
        this.fetchNews();
      }

      render() {
        return (null)
      }

    }
    export default NotifyHandler;
