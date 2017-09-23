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
          return (
               <View>
                    <FlipCard flip={false} friction={6} perspective={1000} flipHorizontal={true} flipVertical={false} clickable={true} style={styles.card} onFlipEnd={(isFlipEnd) => {
                         console.log('isFlipEnd', isFlipEnd)
                    }}>
                         <View style={styles.face}>
                              <Text>{this.props.name}</Text>
                         </View>
                         <View style={styles.back}>
                              <Image style={styles.image} source={{
                                   uri: this.props.uri
                              }}/>
                         </View>
                    </FlipCard>
               </View>
          );
     }
}

const styles = StyleSheet.create({
     card: {
          margin: 0,
          height: (Dimensions.get('window').width) / 4,
          width: (Dimensions.get('window').width) / 4
     },
     face: {
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

     image: {
          width: (Dimensions.get('window').width) / 4,
          height: (Dimensions.get('window').width) / 4
     }
});

AppRegistry.registerComponent('Card', () => Card);
