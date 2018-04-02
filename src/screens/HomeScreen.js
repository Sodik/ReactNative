import {StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {headingFontSize} from '../constants';

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  heading: {
    fontSize: headingFontSize
  }
});

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home'
  };

  render() {
    const { user } = this.props;

    return (
      <View style={style.container}>
        <Text style={style.heading}>{`Hello, ${user.username}!`}</Text>
      </View>
    )
  }
}

export default connect(({ user }) => ({ user }))(HomeScreen);