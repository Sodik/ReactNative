import React, { Component } from 'react';
import {connect, Provider} from 'react-redux';
import {combineReducers, createStore} from 'redux';
import {DrawerNavigator, StackNavigator} from 'react-navigation';
import {View, Text, Button, TextInput, StyleSheet} from 'react-native';

const userReducer = (state = null, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const appReducers = combineReducers({
  user: userReducer
});

const store = createStore(
  appReducers
);

class LogoutScreenComponent extends Component {
  render() {
    return (
      <View>
        <Text>Logout</Text>
      </View>
    );
  }
}

const LogoutScreen = connect(() => ({}))(LogoutScreenComponent);

class HomeScreenComponent extends Component {
  static navigationOptions = {
    title: 'Home'
  };

  render() {
    const { user } = this.props;

    return (
      <View>
        <Text>{`Hello, ${user.username}!`}</Text>
      </View>
    )
  }
}

const loginStyle = StyleSheet.create({
  container: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    padding: 40
  },
  heading: {
    textAlign: 'center',
    marginBottom: 40
  },
  inputs: {
    marginBottom: 40
  }
});

class LoginScreenComponent extends Component {
  static navigationOptions = {
    header: null,
    headerLeft: null,
    drawerLabel: () => null
  };
  state = {
    username: '',
    password: ''
  };

  componentDidMount() {
    if (this.props.user) {
      this.props.navigation.navigate('Home');
    }
  }

  onSubmit = () => {
    const {username, password} = this.state;
    if (username === 'Steve' && password === 'steve') {

    }
  }


  render() {
    const { username, password } = this.state;

    return (
      <View style={loginStyle.container}>
        <Text style={loginStyle.heading}>Welcome</Text>
        <View style={loginStyle.inputs}>
          <TextInput
            placeholder="username"
            value={username}
            onChange={value => this.setState({ username: value })}
          />
          <TextInput
            placeholder="password"
            value={password}
            onChange={value => this.setState({ password: value })}
          />
        </View>
        <Button
          style={loginStyle.submit}
          title="Log In"
          onPress={this.onSubmit}
        />
      </View>
    );
  }
}

const DrawerNavigationOptions = {navigationOptions: ({ navigation }) => ({
    headerLeft: (
      <Button
        title="Drawer"
        onPress={() => navigation.navigate('DrawerToggle')}
      />
    )
  })};

const LoginScreen = connect(({ user }) => ({ user }))(LoginScreenComponent);

const HomeScreen = connect(({ user }) => ({ user }))(HomeScreenComponent);

const RootNavigator = DrawerNavigator({
  Home: {
    screen: StackNavigator({
      MainScreen: HomeScreen
    }, DrawerNavigationOptions)
  },
  Logout: {
    screen: StackNavigator({
      MainScreen: LogoutScreen
    }, DrawerNavigationOptions)
  },
  Login: {
    screen: LoginScreen
  }
}, {
  initialRouteName: 'Login',
  navigationOptions: ({ navigation }) => ({
    headerLeft: (
      <Button
        title="Drawer"
        onPress={() => navigation.navigate('DrawerToggle')}
      />
    )
  })
});

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootNavigator/>
      </Provider>
    );
  }
}