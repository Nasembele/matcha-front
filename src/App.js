import logo from './logo.svg';
import './App.css';
import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/RegistrationPropsContainer";


function App() {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                {/*<HeaderContainer/>*/}
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/login' render={() => <Login/>}/>
                    <Route path='/registration' render={() => <Registration/>}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
