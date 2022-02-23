import logo from './logo.svg';
import './App.css';
import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/LoginPropsContainer";
import {Redirect, Switch} from "react-router";
import MainPage from "./components/MainPage/MainPage";
import ErrorWrapper from "./components/ErrorWrapper/ErrorWrapper";
import ChangeAccountSettingsModalWindow
  from "./components/MainPage/components/ChangeAccountSettingsModalWindow/ChangeAccountSettingsModalWindow";
import ConfirmLinkWindow from "./components/MainPage/components/ConfirmLinkWindow/ConfirmLinkWindow";


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
      {/*<ErrorWrapper/>*/}
      <div className='app-wrapper-content'>
        {/*<Route path='/login' render={() => <Error/>}/>*/}
        {/*<Route path='/resetpasschange' render={() => <ResetPassword/>}/>*/}
        {/*<Route path='/main' render={() => <MainPage/>}/>*/}

        {/*<MainPage/>*/}
        <Switch>
          <Route path='/' component={MainPage} exact/>
          <Route path='/login' component={Login} exact/>
          <Route path='/confirmAccount' component={ConfirmLinkWindow} exact/>

          <Route path='/main' component={MainPage} exact/>
          <Route path='/main/accountsettings' component={ChangeAccountSettingsModalWindow} exact/>

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
