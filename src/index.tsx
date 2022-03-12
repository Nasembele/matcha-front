import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import {Provider} from 'react-redux';
import {composeWithDevTools} from "redux-devtools-extension";
import LoginReducer from "./components/Login/Login.reducer";
import MainPageReducer from "./components/MainPage/MainPage.reducer";
import Auth from "./Auth";
import ChatReducer from "./components/Chat/Chat.reducer";

let reducers = combineReducers({
  login: LoginReducer,
  mainPage: MainPageReducer,
  chat: ChatReducer
});

const composeEnhancers = composeWithDevTools({});
export const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(thunkMiddleware)));

ReactDOM.render(
  <Provider store={store}>
    <Auth/>
  </Provider>,
  document.getElementById('root'));