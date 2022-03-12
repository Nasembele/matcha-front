import React from 'react';
import {Route} from 'react-router-dom';
import {Switch} from "react-router";
import MainPage from "./components/MainPage/MainPage";
import ChangeAccountSettingsModalWindow
  from "./components/MainPage/components/ChangeAccountSettingsModalWindow/ChangeAccountSettingsModalWindow";
import ConfirmLinkWindow from "./components/MainPage/components/ConfirmLinkWindow/ConfirmLinkWindow";
import Login from "./components/Login/Login";

function App() {
  return (
    <div className='app-wrapper'>
      <div className='app-wrapper-content'>
        <Switch>
          <Route path='/' component={MainPage} exact/>
          <Route path='/login' component={Login} exact/>
          <Route path='/confirmAccount' component={ConfirmLinkWindow} exact/>
          <Route path='/main' component={MainPage} exact/>
          <Route path='/main/accountsettings' component={ChangeAccountSettingsModalWindow} exact/>
        </Switch>
      </div>
    </div>
  );
}

export default App;
