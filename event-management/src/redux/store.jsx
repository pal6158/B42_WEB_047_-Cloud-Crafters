import { legacy_createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk'; // Correct import for thunk middleware
import { DataReducers } from './reducers'; // Import your DataReducers

// You could use combineReducers if you plan to have multiple reducers in the future
// import { combineReducers } from 'redux';
// const rootReducer = combineReducers({
//     data: DataReducers,
//     // other reducers if any
// });

export let store = legacy_createStore(
  DataReducers, // Or rootReducer if using combineReducers in the future
  applyMiddleware(thunk)
);
