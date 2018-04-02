import {Button, StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {headingFontSize} from '../constants';

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 40,
    paddingRight: 40,
  },
  content: {
    fontSize: headingFontSize,
    marginBottom: 40
  }
});

class LogoutScreen extends Component {
  logout = () => {
    this.props.dispatch({
      type: 'LOG_OUT'
    });
  }

  render() {
    return (
      <View style={style.container}>
        <Text style={style.content}>Good Bye</Text>
        <Button
          onPress={this.logout}
          title="Log Out"
        />
      </View>
    );
  }
}

export default connect(() => ({}))(LogoutScreen);