import React from "react";
import style from './Login.module.css';
import {useDispatch} from "react-redux";
import {changeLoginAC, changePasswordAC} from "./LoginAC";
import {Route} from "react-router-dom";
import Registration from "../Registration/RegistrationPropsContainer";
import {Redirect} from "react-router";

export const Login = (login) => {

    const dispatch = useDispatch();

    const changeLogin = (login) => {
        dispatch(changeLoginAC(login.target.value));
    };

    const changePassword = (password) => {
        dispatch(changePasswordAC(password.target.value));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        // dispatch(signIn(login))
        //     .then(() => {
        //         setIsSuccessSubmit(true);
        //     })
        //     .catch(() => {
        //         setIsSuccessSubmit(false);
        //     })
    };

    // if (login.login) {
    //     return <Redirect to={'/registration'}/>
    // }
    return (
        <div>
            <header className={style.header}>Матча</header>
            <body className={style.body}>
            <div className={style.content}>
                <h1 className={style.title}>Join and start dating today!</h1>
                <form onSubmit={onSubmit}>
                    <div className={style.form_header}>Login</div>
                    <input type={'text'} onChange={changeLogin}/>
                    <div className={style.form_header}>Password</div>
                    <input type={'password'} onChange={changePassword}/>
                    <button type={'submit'}>
                        Log In
                    </button>
                </form>
            </div>
            </body>
        </div>
    )
}

export default Login;
