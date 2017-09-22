import React, {Component} from 'react';
import {
     AppRegistry,
     StyleSheet,
     Text,
     Image,
     View,
     TouchableOpacity,
     ScrollView,
     Dimensions
} from 'react-native';

import Card from './components/card/Card.js'

export default class art extends Component {

     constructor(props) {
          super(props)

          this.state = {
               loading: true,
               images: []
          }
     }

     componentDidMount() {
          var that = this;
          fetch("http://104.236.141.69/art/response.json", {method: 'get'}).then(function(response) {
               return response.json();
          }).then(function(json) {
               let Images = json.images.map((image, key) => {
                    return (<Card key={key} name={image.name} uri={image.uri}/>);
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
     }
});

AppRegistry.registerComponent('art', () => art);
