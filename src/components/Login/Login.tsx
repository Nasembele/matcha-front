import React, {ChangeEvent, useState} from "react";
import style from './Login.module.css';
import {useDispatch, useSelector} from "react-redux";

import {Redirect} from "react-router";
import {ILogin, IState} from "../../types";
import {changeLoginAC, changePasswordAC} from "./LoginAC";
import {signInPostQuery} from "../../api";

const Login = () => {

    const dispatch = useDispatch();

    // const loginAuth = (state: IState) => state.login.isAuth;
    const login = useSelector((state: IState) => state.login);
    const error = useSelector((state: IState) => state.error);

   const [chosenIndex, setChosenIndex] = useState(0);
   const [isResetPassword, setIsResetPassword] = useState(false);
   const [isRegSuccess, setIsRegSuccess] = useState(false);

    const changeLogin = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
       dispatch(changeLoginAC(value));
    };

    const changePassword = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
       dispatch(changePasswordAC(value));
    };

    const changeEmail = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
      //  dispatch(changeEmailAC(value));
    };

    const signInButton = () => {
       dispatch(signInPostQuery(login.authData)); //1
    };

    const recoveryPassword = () => {
        // dispatch(recoveryPasswordPostQuery({email: login.email})); 2
      //  setIsResetPassword(true);
    };

    const changeChosenIndex = () => {
      //  setChosenIndex(1);
    }

    const RegButton = () => {
      //  setChosenIndex(2);
    }

    const changeRegName = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
     //   dispatch(changeRegNameAC(value));
    }

    const changeRegLastName = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
       // dispatch(changeRegLastNameAC(value));
    }

    const changeRegMiddleName = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
     //   dispatch(changeRegMiddleNameAC(value));
    }

    const changeRegEmail = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
      //  dispatch(changeRegEmailAC(value));
    }

    const changeRegLogin = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
      //  dispatch(changeRegLoginAC(value));
    }

    const changeRegPassword = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
     //   dispatch(changeRegPasswordAC(value));
    }

    const updateRegData = () => {
       // dispatch(updateRegDataPostQuery(login.regData));
      //  setIsRegSuccess(true);
    }

    // if (login.isAuth) {
    //     return <Redirect to={'/main'}/>
    // }

    return (
        <div>
            {login.isAuth && <Redirect to={'/main'}/>}
            <header className={style.header}>Матча</header>
            <body className={style.body}>
            <div className={style.whole_form}>
                {chosenIndex === 0 && <div>
                    <p className={style.title}>Join and start dating today!</p>
                    <div className={style.content}>
                        <div className={style.form_header}>email</div>
                        <input type={'text'} onChange={changeLogin} className={style.form_input}/>
                        <div className={style.form_header}>Пароль</div>
                        <input type={'password'} onChange={changePassword} className={style.form_input}/>
                        <div>
                            <button type={'button'} className={style.submit_button} onClick={signInButton}>
                                Войти
                            </button>
                            <button type={'button'} className={style.negative_button} onClick={changeChosenIndex}>
                                Забыли пароль?
                            </button>
                            {/*{error.isServerError === true &&*/}
                            {/*<p className={style.error}>Ошибка сервера</p>}*/}
                            {/*{error.isServerError === true &&*/}
                            {/*<p className={style.error}>Не удается войти. Проверьте правильность написания email и*/}
                            {/*    пароля</p>}*/}
                        </div>
                        <button type={'button'} className={style.reg_button} onClick={RegButton}>
                            Регистрация
                        </button>
                    </div>
                </div>}
                {chosenIndex === 1 && <span>
                    <p className={style.title}>Восстановление пароля</p>
                    <div className={style.content}>
                        <div className={style.form_header}>Введите email</div>
                        <input type={'text'} onChange={changeEmail} className={style.form_input}/>
                        <div>
                            <button type={'button'} className={style.reg_button} onClick={recoveryPassword}>
                                Отправить
                            </button>
                            {isResetPassword &&
                            <p className={style.reset_password}>На указанный адрес отправлено письмо для восстановления
                                пароля</p>}
                        </div>
                    </div>
                </span>}
                {chosenIndex === 2 && <span>
                    <p className={style.title}>Регистрация</p>
                    <div className={style.content}>
                        <div className={style.form_header}>Фамилия</div>
                        <input type={'text'} onChange={changeRegName} className={style.form_input}/>
                        <div className={style.form_header}>Имя</div>
                        <input type={'text'} onChange={changeRegLastName} className={style.form_input}/>
                        <div className={style.form_header}>Отчество</div>
                        <input type={'text'} onChange={changeRegMiddleName} className={style.form_input}/>
                        <div className={style.form_header}>email</div>
                        <input type={'text'} onChange={changeRegEmail} className={style.form_input}/>
                        <div className={style.form_header}>Логин</div>
                        <input type={'text'} onChange={changeRegLogin} className={style.form_input}/>
                        <div className={style.form_header}>Пароль</div>
                        <input type={'text'} className={style.form_input}/>
                        <div className={style.form_header}>Повторите пароль</div>
                        <input type={'text'} onChange={changeRegPassword} className={style.form_input}/>
                        {/*валидация совпадения паролей*/}
                        <div>
                            <button type={'button'} className={style.reg_button} onClick={updateRegData}>
                                Зарегистрироваться
                            </button>
                            {isRegSuccess &&
                            <p className={style.reset_password}>На указанный адрес отправлено письмо для подтверждения регистрации</p>}
                        </div>
                    </div>
                </span>}
            </div>
            </body>
        </div>
    )
}

export default Login;