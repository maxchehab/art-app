import React, {Component} from 'react';
import {
     AppRegistry,
     StyleSheet,
     Text,
     Image,
     View,
     TouchableOpacity,
     Dimensions
} from 'react-native';

import FlipCard from 'react-native-flip-card';

export default class Card extends Component {
     constructor(props) {
          super(props);
     }

     render() {
          let images = [
               require("../../assets/dynamic/afremov.jpg"),
               require("../../assets/dynamic/gothic.jpg"),
               require("../../assets/dynamic/mona-lisa.jpg"),
               require("../../assets/dynamic/saturn.png"),
               require("../../assets/dynamic/scream.jpg"),
               require("../../assets/dynamic/self-portrait.jpg"),
               require("../../assets/dynamic/seurat.jpg"),
               require("../../assets/dynamic/van-gough.gif")
          ];

          return (
               <View>
                    <FlipCard ref={(card) => { this._card = card; }}  flip={false} friction={6} perspective={1000} flipHorizontal={true} flipVertical={false} clickable={true} style={styles.card} onFlipEnd={(isFlipEnd) => {
                         if(isFlipEnd){
                              this.props.onFlipEnd(this.props.source, this.props.index, this._card);
                         }

                    }}>
                         <View style={styles.front}>
                              <Image style={styles.frontImage} source={require('../../assets/static/question.png')}/>
                         </View>
                         <View style={styles.back}>
                              <Image style={styles.backImage} source={images[this.props.source]}/>
                         </View>
                    </FlipCard>
               </View>
          );
     }
}

const styles = StyleSheet.create({
     card: {
          height: ((Dimensions.get('window').width) / 4),
          width: ((Dimensions.get('window').width) / 4)
     },
     front: {
          padding: 5,
          borderRadius: 5,
          borderWidth: 1,
          borderColor: "white",
          flex: 1,
          backgroundColor: 'powderblue',
          justifyContent: 'center',
          alignItems: 'center'
     },
     back: {
          flex: 1,
          backgroundColor: 'transparent',
          justifyContent: 'center',
          alignItems: 'center'
     },

     backImage: {
          borderRadius: 5,
          borderWidth: 1,
          borderColor: "white",
          flex: 1,
          justifyContent: "center",
          resizeMode: 'cover',
          aspectRatio: 1
     },
     frontImage: {
          flex: 1,
          justifyContent: "center",
          resizeMode: 'contain',
          aspectRatio: 1
     }
});

AppRegistry.registerComponent('Card', () => Card);
