import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import Login from './screens/Login';
import { StatusBar } from 'expo-status-bar';

const App = () => (
  <Provider store={store}>
    <StatusBar style="auto" />
    <Login />
  </Provider>
);

export default App;
