/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Provider } from 'react-redux'
import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose
} from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from './app/reducers'
import { StackNavigator, TabNavigator } from 'react-navigation'

import Home from './app/components/Home/Home'
import Team from './app/components/Team'
import Game from './app/components/Game'
import IndividualPlayer from './app/components/Player/IndividualPlayer'


const loggerMiddleware = createLogger({ predicate: () => __DEV__ })

const configureStore = (initialState) => {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    ))
  return createStore(reducer, initialState, enhancer)
}

const store = configureStore({})

export default class App extends Component<{}> {

  render() {

    return (
      <Provider store={store}>
        <NBAStack />
      </Provider>
    );
  }
}

const NBAStack = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerMode: 'none',
      header: null//to remove toolbar
    }
  },
  TeamStats: {
    screen: Team
  },
  GameStats: {
    screen: Game
  },
  IndividualPlayer: {
    screen: IndividualPlayer
  }

})