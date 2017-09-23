import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Ripple from 'react-native-material-ripple';

export default class AppBar extends Component {
     constructor(props) {
          super(props);
     }

     render() {
          return (
               <View style={styles.header}>
                    <Ripple onPress={this.props.onLeftPress}>
                         <Text style={styles.title}>{this.props.leftText}</Text>
                    </Ripple>
                    <Ripple onPress={this.props.onCenterPress}>
                         <Text style={styles.title}>{this.props.centerText}</Text>
                    </Ripple>
                    <Ripple onPress={this.props.onRightPress}>
                         <Text style={styles.title}>{this.props.rightText}</Text>
                    </Ripple>
               </View>
          );
     }
}

const styles = StyleSheet.create({
     header: {
          height: 56,
          justifyContent: 'space-between',
          flexDirection: 'row',
          flexWrap: 'wrap'
     },
     title: {
          fontSize: 18,
          padding: 16,
          color: "#2196f3",
          fontFamily: "Robot"
     }
});

AppRegistry.registerComponent('AppBar', () => AppBar);
