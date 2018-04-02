import React, { Component } from 'react';
import {Provider} from 'react-redux';
import {DrawerNavigator, StackNavigator} from 'react-navigation';
import {Button} from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import StackOverflowScreen from './src/screens/StackOverflowScreen';
import LogoutScreen from './src/screens/LogoutScreen';
import HomeScreen from './src/screens/HomeScreen';
import store from './src/store';
import {setNavigationRef} from './src/reducers/userReducer';

const DrawerNavigationOptions = {navigationOptions: ({ navigation }) => ({
    headerLeft: (
      <Button
        title="D"
        onPress={() => navigation.navigate('DrawerToggle')}
      />
    )
  })};

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
  StackOverflow: {
    screen: StackNavigator({
      MainScreen: StackOverflowScreen
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
        <RootNavigator ref={nav => setNavigationRef(nav)}/>
      </Provider>
    );
  }
}
