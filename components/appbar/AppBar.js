import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default class AppBar extends Component {
     constructor(props) {
          super(props);
     }

     render() {
          return (
               <View style={styles.header}>
                    <Text onPress={this.props.onLeftPress} style={styles.title}>{this.props.leftText}</Text>
                    <Text onPress={this.props.onCenterPress} style={styles.title}>{this.props.centerText}</Text>
                    <Text onPress={this.props.onRightPress} style={styles.title}>{this.props.rightText}</Text>
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
          margin: 16,
          color: "#2196f3",
          fontFamily: "Robot"
     }
});

AppRegistry.registerComponent('AppBar', () => AppBar);
