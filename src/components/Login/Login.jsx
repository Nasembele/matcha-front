import React from "react";
import style from './Login.module.css';
import {useDispatch} from "react-redux";
import {changeLoginAC, changePasswordAC} from "./LoginAC";
import {Route} from "react-router-dom";
import Registration from "../Registration/RegistrationPropsContainer";
import {Redirect} from "react-router";
import {signInPostQuery, usersAPI} from "../../api";

const Login = (login) => {

    const dispatch = useDispatch();

    const changeLogin = (login) => {
        dispatch(changeLoginAC(login.target.value));
    };

    const changePassword = (password) => {
        dispatch(changePasswordAC(password.target.value));
    };

    const signInButton = () => {
        dispatch(signInPostQuery({login: login.login, password: login.password}));
    };

    if (login.isAuth) {
        return  <Redirect to={'/main'}/>
    }

    return (
        <div>
            <header className={style.header}>Матча</header>
            <body className={style.body}>
            <div className={style.whole_form}>
                <p className={style.title}>Join and start dating today!</p>
                <div className={style.content}>
                    <div className={style.form_header}>Логин</div>
                    <input type={'text'} onChange={changeLogin} className={style.form_input}/>
                    <div className={style.form_header}>Пароль</div>
                    <input type={'password'} onChange={changePassword} className={style.form_input}/>
                    <div>
                        <button type={'button'} className={style.submit_button} onClick={signInButton}>
                            Войти
                        </button>
                        <button type={'button'} className={style.negative_button} onClick={signInButton}>
                            Забыли пароль?
                        </button>
                        {login.isAuth === false &&
                        <p className={style.error}>Не удается войти. Проверьте правильность написания логина и пароля</p>}
                    </div>
                    <button type={'button'} className={style.reg_button} onClick={signInButton}>
                        Регистрация
                    </button>
                </div>
            </div>
            </body>
        </div>
    )
}

export default Login;