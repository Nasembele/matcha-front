import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import {Provider} from 'react-redux';
import {composeWithDevTools} from "redux-devtools-extension";
import LoginReducer from "./components/Login/Login.reducer";
import MainPageReducer from "./components/MainPage/MainPage.reducer";
import Auth from "./Auth";
import ErrorWrapperReducer from "./components/ErrorWrapper/ErrorWrapper.reducer";
import ChatReducer from "./components/Chat/Chat.reducer";

let reducers = combineReducers({
    login: LoginReducer,
    error: ErrorWrapperReducer,
    mainPage: MainPageReducer,
    chat: ChatReducer
});

const composeEnhancers = composeWithDevTools({});
export const store = createStore(reducers, {}, composeEnhancers( applyMiddleware(thunkMiddleware)));

//window.store = store;

// ReactDOM.render(
//         <Provider store={store}>
//             <App/>
//          </Provider>,
//     document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

// const App = Loadable({
//     loader: () => import('App'),
//     loading: () => <Spinner/>
// });

// const createReducer = () => combineReducers<IState>({
//     user: userReducer,
//     tokens: tokensReducer,
//     functionality: SkillsReducer,
//     employees: EmployeesReducer,
//     modules: ModulesReducer,
//     errors: ErrorBoundaryReducer,
//     events: EventsReducer,
//     pageLoader: PageLoaderReducer,
// });

// const configureStore = (initialState: any): Store<IState> => {
//     const composeEnhancers = composeWithDevTools({});
//     return createStore(
//         createReducer(),
//         initialState,
//         composeEnhancers(applyMiddleware(thunk)),
//     );
// };

// const store = configureStore({});

ReactDOM.render(
    <Provider store={store}>
        <Auth/>
    </Provider>,
    document.getElementById('root'));