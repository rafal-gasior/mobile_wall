import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from "react-native";
import ImageView from "react-native-image-view";
import HTML from "react-native-render-html";
import PropTypes from "prop-types";
import { Card, Button } from "react-native-elements";
import moment from "moment";
import default_image from "../images/default_image.jpg";
//import VideoPlayer from "./VideoPlayer";

export default class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isImageViewVisible: false,
      isVideoViewVisible: false,
    };
  }
  render() {
    const {
      title,
      content,
      resource_real_name,
      create_date,
      id_author,
     /* id_element,
      article_type,
      link*/
    } = this.props.article;
    const date = moment
      .utc(create_date, "ddd MMM DD HH:mm:ss")
      .format("YYYY-MM-DD hh:mm:ss");
    const time = moment(date || moment.now()).fromNow();

    function checkURL(url) {
      return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
    }
    const image = checkURL(resource_real_name)
      ? { uri: resource_real_name }
      : default_image;

    /*function checkImageExists(imageUrl, callBack) {
      var imageData = new Image();
      imageData.onload = function() {
        callBack(true);
      };
      imageData.onerror = function() {
        callBack(false);
      };
      imageData.src = imageUrl;
  }*/

    /*    function getImagePath() {
        if(checkURL(resource_real_name)){
            checkImageExists(resource_real_name, function(resp){
                if(resp){
                    return resource_real_name;
                } else {
                    return default_image;
                }
            })
        } else {
            return default_image;
        }
    }*/

    return (
      <View>
        <Card title={title} image={image}>
          <Text style={{ fontWeight: "bold" }}>{id_author}</Text>
          <Text style={{ fontWeight: "bold" }}>{time}</Text>
          <HTML html={content} />

          {/*<Text style={{ marginBottom: 10 }}>{content}</Text>*/}

          {/*social icons:*/}
          <View style={styles.cardFooter}>
            <View style={styles.socialBarContainer}>
              <View style={styles.socialBarSection}>
                <TouchableOpacity style={styles.socialBarButton}>
                  <Image
                    style={styles.icon}
                    source={{
                      uri: "https://png.icons8.com/android/75/e74c3c/hearts.png"
                    }}
                  />
                  <Text style={styles.socialBarLabel}>78</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.socialBarSection}>
                <TouchableOpacity style={styles.socialBarButton}>
                  <Image
                    style={styles.icon}
                    source={{
                      uri:
                        "https://png.icons8.com/ios-glyphs/75/2ecc71/comments.png"
                    }}
                  />
                  <Text style={styles.socialBarLabel}>25</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.socialBarSection}>
                <TouchableOpacity style={styles.socialBarButton}>
                  <Image
                    style={styles.icon}
                    source={{
                      uri:
                        "https://png.icons8.com/metro/75/3498db/administrator-male.png"
                    }}
                  />
                  <Text
                    rkType="primary4 hintColor"
                    style={styles.socialBarLabel}
                  >
                    13
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/*social icons END*/}

          <Button
            icon={{ name: "code" }}
            backgroundColor="#03A9F4"
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0
            }}
            title="VIEW NOW"
            onPress={() => {
              //  Linking.openURL(resource_real_name);
            //  if(article_type != 5){
                  //show picture:
                  this.setState({
                    isImageViewVisible: true
                  });
            /*  }else {
                  //show video:
                  this.setState({
                    isVideoViewVisible: true
                  });
              }*/
            }}  />

         {/* <VideoPlayer
              url={resource_real_name}
              isVisible={this.state.isVideoViewVisible}/>*/}

        </Card>
        <ImageView
          images={[
            {
              source: image,
              title: title
            }
          ]}
          /*   imageWidth={currentImage.width}
                 imageHeight={currentImage.height}*/
          title={title}
          isVisible={this.state.isImageViewVisible}
          onClose={() => this.setState({ isImageViewVisible: false })}
        />
      </View>
    );
  }
}
Article.propTypes = {
  article: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  cardFooter: {
    marginBottom: 10
  },
  list: {
    paddingHorizontal: 17,
    backgroundColor: "#E6E6E6"
  },
  separator: {
    marginTop: 10
  },
  icon: {
    width: 25,
    height: 25
  },
  socialBarContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 1
  },
  socialBarSection: {
    justifyContent: "center",
    flexDirection: "row",
    flex: 1
  },
  socialBarlabel: {
    marginLeft: 8,
    alignSelf: "flex-end",
    justifyContent: "center"
  },
  socialBarButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});
