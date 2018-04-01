import React, { Component } from 'react';
import {connect, Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return action.payload;
    case 'LOG_OUT':
      return null;
    default:
      return state;
  }
};

const dataReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_SUCCEEDED':
      return action.payload;
    default:
      return state;
  }
}

function* fetchData() {
  try {
    const data = yield call(fetch('https://api.stackexchange.com/2.2/search?key=U4DMV*8nvpm3EOpvf69Rxw((&site=stackoverflow&order=desc&sort=activity&tagged=react-native&filter=default'));
    yield put({ type: 'FETCH_SUCCEEDED', payload: data });
  } catch (e) {
    alert(2222);
    yield put({type: 'FETCH_FAILED', error})
  }
}

const appReducers = combineReducers({
  user: userReducer,
  data: dataReducer
});

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  appReducers,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(fetchData);

const stackOverflowScreenStyle = StyleSheet.create({
  container: {
    display: 'flex',
    flexGrow: 1,
  }
});

class StackOverflowScreenComponent extends Component {
  render() {
    const { data } = this.props;

    return (
      <ScrollView contentContainerStyle={stackOverflowScreenStyle.container}>
        { data.map(item => (
          <Text key={item.question_id}>{`${item.title}`}</Text>
        )) }
      </ScrollView>
    );
  }
}

const StackOverflowScreen = connect(({ data }) => ({ data }))(StackOverflowScreenComponent);

const logoutStyle = StyleSheet.create({
  container: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center'
  },
  content: {
    marginBottom: 40
  }
});

class LogoutScreenComponent extends Component {
  logout = () => {
    this.props.dispatch({
      type: 'LOG_OUT'
    });
  }

  render() {
    return (
      <View style={logoutStyle.container}>
        <Text style={logoutStyle.content}>Logout</Text>
        <Button
          onPress={this.logout}
          title="Log Out"
        />
      </View>
    );
  }
}

const LogoutScreen = connect(() => ({}))(LogoutScreenComponent);

const homeStyle = StyleSheet.create({
  container: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center'
  }
})

class HomeScreenComponent extends Component {
  static navigationOptions = {
    title: 'Home'
  };

  render() {
    const { user } = this.props;

    return (
      <View style={homeStyle.container}>
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
        <RootNavigator/>
      </Provider>
    );
  }
}
