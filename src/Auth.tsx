import {useDispatch, useSelector} from "react-redux";
import Login from "./components/Login/Login";
import App from "./App";
import * as React from "react";
import {Switch, BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import {ILogin, IState} from "./types";
import {authGetUserQuery} from "./api";

// const App = Loadable({
//     loader: () => import('App'),
//     loading: () => <Spinner/>
// });

// export interface IState {
//     login: ILogin,
//     // tokens: ITokenState,
//     // functionality: ISkillState,
//     // employees: IEmployeesState,
//     // modules: IModulesState,
//     // errors: IErrorBoundaryState,
//     // events: IEventsState,
//     // pageLoader: IPageLoaderState
// }

function Auth() {
    const dispatch = useDispatch();
    // saveUserToRedux(dispatch); засунуть в юзэффект запрос?
    // const logout = () => deleteUser(dispatch);

     //1


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
                <Route path={'/login'} component={Login}>
                </Route>
                <Route path='/' render={() => (
                    isAuthorised
                        ? (<App />)
                        : (<Redirect to={'/login'}/>)
                )}>
                </Route>
            </Switch>
        </ Router>
    )
}

export default Auth;