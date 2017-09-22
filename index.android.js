import React, {Component} from 'react';
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
import {Col, Row, Grid} from "react-native-easy-grid";

export default class art extends Component {

     constructor(props) {
          super(props)

          this.state = {
               loading: true,
               width: Dimensions.get('window').width,
               images: []
          }
     }

     componentDidMount() {
          var that = this;
          fetch("http://104.236.141.69/art/response.json", {method: 'get'}).then(function(response) {
               return response.json();
          }).then(function(json) {
               let Images = json.images.map((image, key) => {
                    return (
                         <View key={key} style={styles.cContainer}>
                              <FlipCard flip={false} friction={6} perspective={1000} flipHorizontal={true} flipVertical={false} clickable={true} style={styles.card} onFlipEnd={(isFlipEnd) => {
                                   console.log('isFlipEnd', isFlipEnd)
                              }}>
                                   {/* Face Side */}
                                   <View style={styles.face}>
                                        <Text>{image.name}</Text>
                                   </View>
                                   {/* Back Side */}
                                   <View style={styles.back}>
                                        <Text>{image.description}</Text>
                                   </View>
                              </FlipCard>
                         </View>
                    );
               });
               that.setState({images: Images, loading: false});
          }).catch(function(err) {
               alert(err);
          });

     }

     render() {
          return (
               <View style={{
                    flex: 1
               }}>
                    <ScrollView style={{
                         flex: 1
                    }}>
                         <View style={styles.container}>{this.state.images}</View>
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
          backgroundColor: 'steelblue',
          justifyContent: 'center',
          alignItems: 'center'
     }
});

AppRegistry.registerComponent('art', () => art);
