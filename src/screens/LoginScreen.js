import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {headingFontSize} from '../constants';

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40
  },
  heading: {
    textAlign: 'center',
    fontSize: headingFontSize,
    marginBottom: 40
  },
  inputs: {
    marginBottom: 40,
  },
  input: {
    width: 280
  }
});

class LoginScreen extends Component {
  static navigationOptions = {
    header: null,
    headerLeft: null,
    drawerLabel: () => null
  };
  state = {
    username: '',
    password: ''
  };

  onSubmit = () => {
    const {username, password} = this.state;

    if (username.length && password.length) {
      this.props.dispatch({
        type: 'LOG_IN',
        payload: {
          username,
          password
        }
      });
    }
  }

  render() {
    const { username, password } = this.state;

    return (
      <View style={style.container}>
        <Text style={style.heading}>Welcome</Text>
        <View style={style.inputs}>
          <TextInput
            placeholder="username"
            value={username}
            style={style.input}
            onChangeText={value => this.setState({ username: value })}
          />
          <TextInput
            placeholder="password"
            value={password}
            secureTextEntry={true}
            style={style.input}
            onChangeText={value => this.setState({ password: value })}
          />
        </View>
        <Button
          style={style.submit}
          title="Log In"
          onPress={this.onSubmit}
        />
      </View>
    );
  }
}

export default connect(({}) => ({}))(LoginScreen);