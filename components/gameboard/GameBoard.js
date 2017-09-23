import React, {Component} from 'react';
import {AppRegistry, StyleSheet, ScrollView, View} from 'react-native';

import Card from '../card/Card.js';

export default class GameBard extends Component {
     constructor(props) {
          super(props);
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
               Images.push(<Card key={i} source={images[i]}/>)
          }
          this.state = {
               images: Images
          }
     }

     render() {
          return (
               <ScrollView>
                    <View style={styles.container}>{this.state.images}</View>
               </ScrollView>
          );
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