import {NavigationActions} from 'react-navigation';
let navigation;

export function setNavigationRef(nav) {
  navigation = nav;
}

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOG_IN':
      navigation.dispatch(NavigationActions.navigate({
        type: NavigationActions.NAVIGATE,
        routeName: 'Home'
      }));
      return action.payload;
    case 'LOG_OUT':
      navigation.dispatch(NavigationActions.navigate({
        type: NavigationActions.NAVIGATE,
        routeName: 'Login'
      }));
      return null;
    default:
      return state;
  }
};

export default userReducer;
