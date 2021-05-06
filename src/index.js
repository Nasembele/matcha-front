import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
//import Provider from "react-redux/lib/components/Provider";
import {Provider} from 'react-redux';
import {composeWithDevTools} from "redux-devtools-extension";
import LoginReducer from "./components/Login/Login.reducer";

let reducers = combineReducers({
    login: LoginReducer,
});

const composeEnhancers = composeWithDevTools({});
export const store = createStore(reducers, composeEnhancers( applyMiddleware(thunkMiddleware)));

//window.store = store;

ReactDOM.render(
        <Provider store={store}>
            <App/>
         </Provider>,
    document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
