import React, { Component } from "react";
import { StyleSheet, Platform, View } from "react-native";

export default class StatusBar extends Component {
  render() {
    return (
      <View style={[styles.statusBarBackground, this.props.style || {}]} />
    );
  }
}

const styles = StyleSheet.create({
  statusBarBackground: {
    height: Platform.OS === "ios" ? 20 : Expo.Constants.statusBarHeight,
    backgroundColor: "white"
  }
});
