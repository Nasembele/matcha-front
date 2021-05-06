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
//         dispatch(userAPI.signIn(login))
//             .then(() => {
//                 setIsSuccessSubmit(true);
//           //
 //
//             .catch(() => {
//                 setIsSuccessSubmit(false);
//


            const signIn = (login) => (dispatch) => {
                usersAPI.signIn(login)
                    .then(response => {
                        alert('ок');
                       // dispatch(setUserAccount(response.data));
                    })
                    .catch(() => {
                        alert('error');
                    });

    };

    // if (login.login) {
    //     return <Redirect to={'/registration'}/>
    // }
    return (
        <div>
            <header className={style.header}>Матча</header>
            <body className={style.body}>
            <div className={style.whole_form}>
                <p className={style.title}>Join and start dating today!</p>
                <div className={style.content}>
                <form onSubmit={onSubmit}>
                    <div className={style.form_header}>Логин</div>
                    <input type={'text'} onChange={changeLogin} className={style.form_input}/>
                    <div className={style.form_header}>Пароль</div>
                    <input type={'password'} onChange={changePassword} className={style.form_input}/>
                    <div>
                        <button type={'submit'} className={style.button}>
                            Войти
                        </button>
                    </div>
                </form>
                </div>
            </div>
            </body>
        </div>
    )
}