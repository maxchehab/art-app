import React from "react";
import { StatusBar, BackgroundImage } from "./src/components";
import { Game } from "./src/pages";
import { View, ImageBackground, StyleSheet } from "react-native";

export default class App extends React.Component {
  render() {
    return (
      <View>
        <StatusBar />
        <ImageBackground
          style={styles.image}
          source={require("./assets/static/background.png")}
        >
          <Game style={styles.game} />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: undefined,
    height: "100%"
  },
  game: {
    height: "100%",
    width: "100%"
  }
});
