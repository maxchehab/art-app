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
          selection: -1,
          selectCard: null
     }

     CompletedCards = [];

     compare(key, isFliped, card) {
          if (isFliped) {
               if (this.Game.selection == -1) {
                    this.Game.selection = key;
                    this.Game.selectCard = card;
               } else {
                    if (this.Game.selection == key) {
                         // alert("Match!");
                         this.Game.selectCard.setState({clickable: false});
                         card.setState({clickable: false});
                         this.CompletedCards.push(this.Game.selectCard, card);
                    } else {
                         // alert("No Match!");
                         this.Game.selectCard._toggleCard();
                         card._toggleCard();
                    }

                    this.Game.selection = -1;
                    this.Game.selectCard = null;
               }
          } else if (this.Game.selectCard == card && card.selected != true) {
               this.Game.selectCard = null;
               this.Game.selection = -1;
          }
     }

     press(key, card) {
          if (this.Game.selection == key && this.Game.selectCard != card) {
               this.Game.selectCard.selected = true;
               card._toggleCard();
          }

          if(!card.selected){
               card._toggleCard();
               return;
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
               Images.push(<Card key={i} compare={this.press.bind(this)} clickable={true} index={i} onFlipEnd={this.compare.bind(this)} source={images[i]}/>)
          }

          return Images;
     }

     reset() {
          for (var i = 0; i < this.CompletedCards.length; i++) {
               this.CompletedCards[i].setState({clickable: true});
               this.CompletedCards[i].selected = false;
          }
          this.CompletedCard = [];

          this.setState({images: this.generateImages()});
          this.Game.selection = -1;
          this.Game.selectCard = null;

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
