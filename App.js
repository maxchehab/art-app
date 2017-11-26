import React from "react";
import { StatusBar, Game } from "./src/components";
import { View } from "react-native";

export default class App extends React.Component {
  render() {
    return (
      <View>
        <StatusBar backgroundColor="blue" barStyle="light-content" />
        <Game />
      </View>
    );
  }
}
