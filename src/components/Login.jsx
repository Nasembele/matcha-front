import style from './Login.module.css';
import React from "react";
import {NavLink, Route} from "react-router-dom";

const Login = () => {
    return <div>
        <p>Аутентификация</p>
        <p>Логин</p>
        <p>Пароль</p>
        <nav>
            <div>
                <NavLink to="/resetpassend">Забыли пароль?</NavLink>
            </div>
            <div>
                <NavLink to="/main">Главная страница</NavLink>
            </div>
        </nav>
        <div>
            <Route path='/resetpassend' render={() => <div>refrfrfrf</div>}/>
            <Route path='/main' render={() => <div>2ferferfer</div>}/>
        </div>
    </div>
}

export default Login;