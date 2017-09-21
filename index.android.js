import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native';

import FlipCard from 'react-native-flip-card';
import { Col, Row, Grid } from "react-native-easy-grid";

export default class art extends Component {





  constructor (props) {
    super(props)
    this.state = {
      flip: false,
      width: Dimensions.get('window').width,
     circles : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32]
    }
  }
  render() {

       let Circles = this.state.circles.map((c, i) => {
            return <View key={ i } style={ styles.cContainer }><FlipCard
            flip={this.state.flip}
            friction={6}
            perspective={1000}
            flipHorizontal={true}
            flipVertical={false}
            clickable={true}
            style={styles.card}
            onFlipEnd={(isFlipEnd)=>{console.log('isFlipEnd', isFlipEnd)}}
         >
            {/* Face Side */}
            <View style={styles.face}>
              <Text>Front</Text>
            </View>
            {/* Back Side */}
            <View style={styles.back}>
              <Text>Back</Text>
            </View>
         </FlipCard></View>
 });


 return (
    <View style={{ flex:1 }}>
      <ScrollView style={{ flex:1 }}>
       <View style={ styles.container }>{ Circles }</View>
      </ScrollView>
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
       flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  card: {
       margin: 0,
    height:(Dimensions.get('window').width) / 4,
    width: (Dimensions.get('window').width) / 4
  },
  face: {
       flex: 1,
    backgroundColor: 'powderblue',
    justifyContent: 'center',
    alignItems:'center'

  },
  back: {
       flex: 1,
      backgroundColor: 'steelblue',
     justifyContent: 'center',
     alignItems:'center'
  },
});

AppRegistry.registerComponent('art', () => art);
