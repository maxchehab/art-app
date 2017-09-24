import React, {Component} from 'react';
import {AppRegistry, StyleSheet, ScrollView, View} from 'react-native';

import Card from '../card/Card.js';

export default class GameBard extends Component {
     constructor(props) {
          super(props);
          this.state = {
               images: this.generateImages()
          }
     }

     Game = {
          firstSelection: -1,
          secondSelection: -1,
          firstCard: null,
          secondCard: null
     }

     onFlipEnd(key, index, card) {
          if (this.Game.firstSelection == -1) {
               this.Game.firstSelection = key;
               this.Game.firstCard = card;
          } else if (this.Game.secondSelection == -1) {
               this.Game.secondSelection = key;
               this.Game.secondCard = card;
          }

          if (this.Game.firstSelection != -1 && this.Game.secondSelection != -1) {
               if (this.Game.firstSelection == this.Game.secondSelection) {
                    alert("Match!");
               } else {
                    alert("No Match!");
                    this.Game.firstCard._toggleCard();
                    this.Game.secondCard._toggleCard();
               }

               this.Game.firstSelection = -1;
               this.Game.secondSelection = -1;
          }

     }

     generateImages() {
          //var images = require('../../assets/dynamic/images.json');
          var images = [
               0,
               1,
               2,
               3,
               4,
               5,
               6,
               7
          ];
          //Randomize the entire array
          images.sort(function() {
               return 0.5 - Math.random()
          });

          //Take the first 8
          images = images.slice(0, 8);

          //Duplicate
          images = images.reduce(function(res, current, index, array) {
               return res.concat([current, current]);
          }, []);

          //Randomize again
          images.sort(function() {
               return 0.5 - Math.random()
          });

          let Images = [];
          for (var i = 0; i < images.length; i++) {
               Images.push(<Card key={i} index={i} onFlipEnd={this.onFlipEnd.bind(this)} source={images[i]}/>)
          }

          return Images;
     }

     reset() {
          this.setState({images: this.generateImages()});
          this.Game.firstSelection = -1;
          this.Game.secondSelection = -1;
          this.Game.firstCard = null;
          this.Game.secondCard = null;
     }

     render() {
          return (
               <ScrollView>
                    <View style={styles.container}>{this.state.images}</View>
               </ScrollView>
          );
     }

     componentDidMount() {
          this.props.onRef(this)
     }
     componentWillUnmount() {
          this.props.onRef(undefined)
     }
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap'
     }
});

AppRegistry.registerComponent('GameBard', () => GameBard);
