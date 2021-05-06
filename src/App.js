import logo from './logo.svg';
import './App.css';
import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/LoginPropsContainer";
import ResetPassword from "./components/Login/ResetPassword/ResetPasswordPropsContainer";
import {Redirect} from "react-router";


function App() {
    return (
        <BrowserRouter>
            {/*авторизация пройдена?*/}
            {/*<Login/>*/}
            {/*<Redirect to={'/login'}/>*/}
            {/*какое-то условие для проверки*/}
            <div className='app-wrapper'>
                {/*<Navbar/>*/}
                <div className='app-wrapper-content'>
                    <Route path='/login' render={() => <Login/>}/>
                    <Route path='/resetpasschange' render={() => <ResetPassword/>}/>
                    <Route path='/main' render={() => <div>main page</div>}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
