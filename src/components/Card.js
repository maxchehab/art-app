import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Dimensions
} from "react-native";

import FlipCard from "react-native-flip-card";

export default class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <FlipCard
          source={this.props.source}
          ref={card => {
            this._card = card;
          }}
          flip={false}
          friction={6}
          compare={this.props.compare}
          perspective={1000}
          flipHorizontal={true}
          flipVertical={false}
          clickable={true}
          style={styles.card}
          onFlipEnd={isFlipEnd => {
            this.props.onFlipEnd(this.props.index, isFlipEnd, this._card);
          }}
        >
          <View style={styles.front}>
            <Image
              style={styles.frontImage}
              source={this.props.i % 2 ? question1 : question2}
            />
          </View>
          <View style={styles.back}>
            <Image
              style={styles.backImage}
              source={{ uri: this.props.source }}
            />
          </View>
        </FlipCard>
      </View>
    );
  }
}

const question1 = require("../../assets/static/question1.png");
const question2 = require("../../assets/static/question2.png");

const styles = StyleSheet.create({
  card: {
    height: Dimensions.get("window").width / 4,
    width: Dimensions.get("window").width / 4
  },
  front: {
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "white",
    flex: 1,
    backgroundColor: "powderblue",
    justifyContent: "center",
    alignItems: "center"
  },
  back: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center"
  },

  backImage: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "white",
    flex: 1,
    justifyContent: "center",
    resizeMode: "cover",
    aspectRatio: 1
  },
  frontImage: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "contain",
    aspectRatio: 1
  }
});
