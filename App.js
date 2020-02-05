import React, { Component } from 'react';
import AppContainer from './src/navigation';
import { Provider } from 'react-redux';
import appStore from './src/store';


export default class App extends Component {

  render() {
    return (
      <Provider store={appStore}>
        <AppContainer />
      </Provider>
    );
  }
}