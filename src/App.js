import logo from './logo.svg';
import './App.css';
import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Navbar from "./components/Navbar/Navbar";
import Registration from "./components/Registration/RegistrationPropsContainer";
import Login from "./components/Login/LoginPropsContainer";


function App() {
    return (
        <BrowserRouter>
            {/*авторизация пройдена?*/}
            <Login/>


            {/*<div className='app-wrapper'>*/}
            {/*    /!*<HeaderContainer/>*!/*/}
            {/*    /!*<Navbar/>*!/*/}
                <div className='app-wrapper-content'>
                    <Route path='/login' render={() => <Login/>}/>
                    <Route path='/registration' render={() => <Registration/>}/>
                </div>
            {/*</div>*/}
        </BrowserRouter>
    );
}

export default App;
