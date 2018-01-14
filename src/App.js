import React from 'react';
import { applyMiddleware, compose, createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { Router } from 'react-native-router-flux';

// Consts and Libs
// import { AppStyles } from '@theme/';
import AppRoutes from '@navigation/';

// All redux reducers (rolled into one mega-reducer)
import rootReducer from '@redux/index';

// Connect RNRF with Redux
const RouterWithRedux = connect()(Router);

// Load middleware
let middleware = [
  thunk, // Allows action creators to return functions (not just plain objects)
];

if (__DEV__) {
  // Dev-only middleware
  middleware = [
    ...middleware,
    createLogger(), // Logs state changes to the dev console
  ];
}

// Init redux store (using the given reducer & middleware)
const store = compose(
  applyMiddleware(...middleware),
)(createStore)(rootReducer);

/* Component ==================================================================== */
// Wrap App in Redux provider (makes Redux available to all sub-components)
export default function AppContainer() {
  return (
    <Provider store={store}>
      <RouterWithRedux
        scenes={AppRoutes}
        // style={AppStyles.appContainer}
      />
    </Provider>
  );
}

// import React, { Component } from 'react';
// import { Text, View, StyleSheet } from 'react-native';
// import { Constants } from 'expo';

// export default class App extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.paragraph}>
//           Hello How are you?
//         </Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingTop: Constants.statusBarHeight,
//     backgroundColor: '#ecf0f1',
//   },
//   paragraph: {
//     margin: 24,
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: '#34495e',
//   },
// });
