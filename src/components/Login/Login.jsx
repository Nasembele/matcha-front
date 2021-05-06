import React, {useState} from "react";
import style from './Login.module.css';
import {useDispatch} from "react-redux";
import {
    changeEmailAC,
    changeLoginAC,
    changePasswordAC, changeRegEmailAC,
    changeRegLastNameAC, changeRegLoginAC,
    changeRegMiddleNameAC,
    changeRegNameAC, changeRegPasswordAC
} from "./LoginAC";
import {Redirect} from "react-router";
import {recoveryPasswordPostQuery, signInPostQuery, updateRegDataPostQuery} from "../../api";

const Login = (login) => {

    const dispatch = useDispatch();

    const [chosenIndex, setChosenIndex] = useState(0);
    const [isResetPassword, setIsResetPassword] = useState(false);
    const [isRegSuccess, setIsRegSuccess] = useState(false);

    const changeLogin = (login) => {
        dispatch(changeLoginAC(login.target.value));
    };

    const changePassword = (password) => {
        dispatch(changePasswordAC(password.target.value));
    };

    const changeEmail = (email) => {
        dispatch(changeEmailAC(email.target.value));
    };

    const signInButton = () => {
        dispatch(signInPostQuery({login: login.login, password: login.password}));
    };

    const recoveryPassword = () => {
        dispatch(recoveryPasswordPostQuery({email: login.email}));
        setIsResetPassword(true);
    };

    const changeChosenIndex = () => {
        setChosenIndex(1);
    }

    const RegButton = () => {
        setChosenIndex(2);
    }

    const changeRegName = (nameInput) => {
        dispatch(changeRegNameAC(nameInput.target.value));
    }

    const changeRegLastName = (lastNameInput) => {
        dispatch(changeRegLastNameAC(lastNameInput.target.value));
    }

    const changeRegMiddleName = (middleNameInput) => {
        dispatch(changeRegMiddleNameAC(middleNameInput.target.value));
    }

    const changeRegEmail = (emailInput) => {
        dispatch(changeRegEmailAC(emailInput.target.value));
    }

    const changeRegLogin = (loginInput) => {
        dispatch(changeRegLoginAC(loginInput.target.value));
    }

    const changeRegPassword = (passwordInput) => {
        dispatch(changeRegPasswordAC(passwordInput.target.value));
    }

    const updateRegData = () => {
        dispatch(updateRegDataPostQuery(login.regData));
        setIsRegSuccess(true);
    }

    if (login.isAuth) {
        return <Redirect to={'/main'}/>
    }

    return (
        <div>
            <header className={style.header}>Матча</header>
            <body className={style.body}>
            <div className={style.whole_form}>
                {chosenIndex === 0 && <div>
                    <p className={style.title}>Join and start dating today!</p>
                    <div className={style.content}>
                        <div className={style.form_header}>Логин или email</div>
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
                            {login.isAuth === false &&
                            <p className={style.error}>Не удается войти. Проверьте правильность написания email и
                                пароля</p>}
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