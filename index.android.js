import React, {Component} from 'react';
import {
     AppRegistry,
     StyleSheet,
     View,
     Text,
     Image,
     Button,
     TouchableOpacity,
     TouchableHighlight,
     ScrollView
} from 'react-native';

import AppBar from './components/appbar/AppBar.js';
import GameBoard from './components/gameboard/GameBoard.js';

export default class art extends Component {

     constructor(props) {
          super(props);
          this.state = {
               loading: false
          }
     }

     render() {
          var output = (
               <View>
                    <AppBar rightText="Reset" centerText="Home" leftText="Exit"/>
                    <GameBoard/>
               </View>
          );

          return (output);

     }
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap'
     }
});

AppRegistry.registerComponent('art', () => art);
