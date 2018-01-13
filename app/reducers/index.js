import { combineReducers } from 'redux';
import * as gameReducer from './score';
import * as standingsReducer from './standings';
import * as teamReducer from './team'
import * as playerReducer from './Player'


export default combineReducers(Object.assign({},
    gameReducer, standingsReducer,teamReducer,playerReducer))