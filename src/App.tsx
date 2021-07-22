import logo from './logo.svg';
import './App.css';
import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/LoginPropsContainer";
import ResetPassword from "./components/Login/ResetPassword/ResetPasswordPropsContainer";
import {Redirect, Switch} from "react-router";
import MainPage from "./components/MainPage/MainPagePropsContainer";
import ErrorWrapper from "./components/ErrorWrapper/ErrorWrapper";


function App() {
    return (
        // <BrowserRouter>
        //     авторизация пройдена?
        //     <Error/>
            // {/*<Redirect to={'/login'}/>*/}
            // {/*какое-то условие для проверки*/}
            // {/*// проверяет залогиненность*/}

            <div className='app-wrapper'>
                {/*<Navbar/>*/}
                <ErrorWrapper/>
                <div className='app-wrapper-content'>
                    {/*<Route path='/login' render={() => <Error/>}/>*/}
                    {/*<Route path='/resetpasschange' render={() => <ResetPassword/>}/>*/}
                    {/*<Route path='/main' render={() => <MainPage/>}/>*/}

                    {/*<MainPage/>*/}
                    <Switch>
                        <Route path='/' component={MainPage} exact/>
                        <Route path='/login' component={Login} exact/>
                        <Route path='/resetpasschange' component={ResetPassword} exact/>
                        <Route path='/main' component={MainPage} exact/>

                        {/*<Route path={SIGN_IN_PATH} component={SignIn} exact/>*/}
                        {/*<Route path={PROFILE_PATH} component={InDevelopment} exact/>*/}
                        {/*<Route path={EVENT_PATH} component={Events} exact/>*/}
                        {/*<Route path={EMPLOYEES_PATH} component={Employees} exact/>*/}
                        {/*<Route path={MODULE_PATH} component={Modules} exact/>*/}
                    </Switch>
                </div>
            </div>
        // {/*</BrowserRouter>*/}
    );
}

export default App;
