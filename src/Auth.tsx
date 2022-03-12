import {useDispatch, useSelector} from "react-redux";
import Login from "./components/Login/Login";
import App from "./App";
import * as React from "react";
import {Switch, BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import {IState} from "./types";
import {authGetUserQuery} from "./api";
import ChangeAccountSettingsModalWindow
  from "./components/MainPage/components/ChangeAccountSettingsModalWindow/ChangeAccountSettingsModalWindow";
import ChangeAccountPassModalWindow
  from "./components/MainPage/components/ChangeAccountPassModalWindow/ChangeAccountPassModalWindow";
import ConfirmLinkWindow from "./components/MainPage/components/ConfirmLinkWindow/ConfirmLinkWindow";

function Auth() {
  const dispatch = useDispatch();

  const isAuthorised =
    useSelector((state: IState) => {
      return Boolean(state.login.isAuth);
    });

  if (!isAuthorised) {
    dispatch(authGetUserQuery());
  }

  return (
    <Router>
      <Switch>
        <Route path='/main/accountsettings' component={ChangeAccountSettingsModalWindow} exact/>
        <Route path='/passchange' component={ChangeAccountPassModalWindow} exact/>
        <Route path='/confirmAccount' component={ConfirmLinkWindow} exact/>
        <Route path={'/login'} component={Login}/>
        <Route path='/' render={() => (
          isAuthorised
            ? (<App/>)
            : (<Redirect to={'/login'}/>)
        )}>
        </Route>
      </Switch>
    </Router>
  )
}

export default Auth;