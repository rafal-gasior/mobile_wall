import React , {Component} from "react";
import PropTypes from "prop-types";
import {StyleSheet} from "react-native";
import Video from "react-native-video";

export default class VideoPlayer extends Component {
  render() {
    let isVisible =  this.props.isVisible;
    let url = this.props.url;
    if(isVisible){
    return (
        <Video
         source={{uri: url}}  // Can be a URL or a local file.
         ref={(ref) => {
           this.player = ref
         }}                                       // Store reference
         onBuffer={this.onBuffer}                // Callback when remote video is buffering
         onError={this.videoError}               // Callback when video cannot be loaded
         style={styles.backgroundVideo} />
    );
} else {
    return null;
}
  }
}

VideoPlayer.propTypes = {
  url: PropTypes.string,
  isVisible: PropTypes.bool
};

// Later on in your styles..
var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  container: {
    flex: 1,
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
