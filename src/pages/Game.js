import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView
} from "react-native";

import { AppBar, GameBoard } from "../components";

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  render() {
    var output = (
      <View>
        <AppBar
          onRightPress={() => {
            this.gameBoard.reset();
          }}
          rightText="Reset"
          centerText="Home"
          leftText="Exit"
        />

        <GameBoard onRef={ref => (this.gameBoard = ref)} />
      </View>
    );
    return output;
  }
}
