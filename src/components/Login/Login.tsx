import React, {ChangeEvent, ChangeEventHandler, useState} from "react";
import style from './Login.module.css';
import {useDispatch, useSelector} from "react-redux";

import {Redirect} from "react-router";
import {ILogin, IState} from "../../types";
import {
    changeEmailAC,
    changeLoginAC,
    changePasswordAC, changeRegBirthdayAC, changeRegEmailAC,
    changeRegFirstNameAC, changeRegGenderAC,
    changeRegLastNameAC,
    changeRegMiddleNameAC, changeRegPasswordAC, changeRegSexualPreferenceAC, setIsRegUserAC, setIsResetUserAC
} from "./LoginAC";
import {recoveryPasswordPostQuery, signInPostQuery, updateRegDataPostQuery} from "../../api";

const Login = () => {

    const dispatch = useDispatch();

    // const loginAuth = (state: IState) => state.login.isAuth;
    const login = useSelector((state: IState) => state.login);
    const error = useSelector((state: IState) => state.error);

   const [chosenIndex, setChosenIndex] = useState(0);
   // const [isResetPassword, setIsResetPassword] = useState(false);
   // const [isRegSuccess, setIsRegSuccess] = useState(false);
   const [password, setPassword] = useState('');
   const [isNotMatchPassword, setIsNotMatchPassword] = useState(false);


    const changeLogin = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
       dispatch(changeLoginAC(value));
    };

    const changePassword = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
       dispatch(changePasswordAC(value));
    };

    const changeEmail = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
       dispatch(changeEmailAC(value));
    };

    const signInButton = () => {
       dispatch(signInPostQuery(login.authData));
    };

    const recoveryPassword = () => {
        dispatch(recoveryPasswordPostQuery({email: login.resetData!.email}));
    };

    // const changeChosenIndex = () => {
    //   //  setChosenIndex(1);
    // }

    const changeChosenIndex = (value: number) => () => {
        if (chosenIndex === 1) {
            dispatch(setIsResetUserAC(false));
        }
        if (chosenIndex === 2) {
            dispatch(setIsRegUserAC(false));
        }
        setChosenIndex(value);
    }

    const changeFirstRegName = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
       dispatch(changeRegFirstNameAC(value));
    }

    const changeRegLastName = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
       dispatch(changeRegLastNameAC(value));
    }

    const changeRegMiddleName = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
       dispatch(changeRegMiddleNameAC(value));
    }

    const changeRegBirthday = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeRegBirthdayAC(value));
    }

    const changeRegEmail = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
       dispatch(changeRegEmailAC(value));
    }

    const changeRegLogin = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
      //  dispatch(changeRegLoginAC(value));
    }

    const changeRegPassword = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
        setIsNotMatchPassword(false);
        if (password === value) {
            dispatch(changeRegPasswordAC(value));
        } else {
            setIsNotMatchPassword(true);
        }
    }

    const updateRegData = () => {
       dispatch(updateRegDataPostQuery(login.regData!));
       // setIsRegSuccess(true);
    }

    // if (login.isAuth) {
    //     return <Redirect to={'/main'}/>
    // }

    const changeRegGender = (e: React.FormEvent<HTMLSelectElement>) => {
        dispatch(changeRegGenderAC(e.currentTarget.value));
    };

    const changeRegSexualPreference = (e: React.FormEvent<HTMLSelectElement>) => {
        dispatch(changeRegSexualPreferenceAC(e.currentTarget.value));
    };

    const onChangeSetPassword = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
        setPassword(value);
    }

    const changeValidatePassword = () => {
        setIsNotMatchPassword(false);
    }

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
                            <button type={'button'} className={style.negative_button} onClick={changeChosenIndex(1)}>
                                Забыли пароль?
                            </button>
                            {/*{error.isServerError === true &&*/}
                            {/*<p className={style.error}>Ошибка сервера</p>}*/}
                            {/*{error.isServerError === true &&*/}
                            {/*<p className={style.error}>Не удается войти. Проверьте правильность написания email и*/}
                            {/*    пароля</p>}*/}
                        </div>
                        <button type={'button'} className={style.reg_button} onClick={changeChosenIndex(2)}>
                            Регистрация
                        </button>
                    </div>
                </div>}
                {chosenIndex === 1 && <span>
                    <p className={style.title}>Восстановление пароля</p>
                    <div className={style.content}>
                        <div className={style.form_header}>Введите email</div>
                        <input type={'text'} onBlur={changeEmail} className={style.form_input}/>
                        <div>
                            <button type={'button'} className={style.reg_button} onClick={recoveryPassword}>
                                Отправить
                            </button>
                            {login.resetData?.isResetUser &&
                                <div>
                            <p className={style.reset_password}>На указанный адрес отправлено письмо для восстановления
                                пароля</p>
                                <button type={'button'} className={style.submit_button} onClick={changeChosenIndex(0)}>
                                Войти
                                </button>
                                </div>
                            }
                        </div>
                    </div>
                </span>}
                {chosenIndex === 2 && <span>
                    <p className={style.title}>Регистрация</p>
                    <div className={style.content}>
                        <div className={style.form_header}>Имя</div>
                        <input type={'text'} onBlur={changeFirstRegName} className={style.form_input}/>

                        <div className={style.form_header}>Отчество</div>
                        <input type={'text'} onBlur={changeRegMiddleName} className={style.form_input}/>

                        <div className={style.form_header}>Фамилия</div>
                        <input type={'text'} onBlur={changeRegLastName} className={style.form_input}/>

                        <div className={style.form_header}>Дата рождения</div>
                        <input type={'date'} onBlur={changeRegBirthday} className={style.form_input}/>

                        <div className={style.form_header}>Пол</div>
                        <select onChange={changeRegGender}>
                            <option>{'Не выбрано'}</option>
                            <option value={'male'}>{'M'}</option>
                            <option value={'female'}>{'Ж'}</option>
                        </select>

                        <div className={style.form_header}>Сексуальные предпочтения</div>
                        <select onChange={changeRegSexualPreference}>
                            <option>{'Не выбрано'}</option>
                            <option value={'getero'}>{'гетеро'}</option>
                            <option value={'bisexual'}>{'би'}</option>
                            {login.regData?.gender === 'male' && <option  value={'gay'}>{'гей'}</option>}
                            {login.regData?.gender === 'female' && <option  value={'lesbi'}>{'лесби'}</option>}
                        </select>

                        <div className={style.form_header}>email</div>
                        <input type={'text'} onBlur={changeRegEmail} className={style.form_input}/>

                        <div className={style.form_header}>Пароль</div>
                        <input type={'text'} onChange={changeValidatePassword} onBlur={onChangeSetPassword} className={style.form_input}/>

                        <div className={style.form_header}>Повторите пароль</div>
                        <input type={'text'} onChange={changeValidatePassword} onBlur={changeRegPassword} className={style.form_input}/>
                        {isNotMatchPassword &&
                        <p className={style.reset_password}>Пароли не совпадают</p>}
                        <div>
                            <button type={'button'} className={style.reg_button} onClick={updateRegData}>
                                Зарегистрироваться
                            </button>
                            {login.regData?.isRegUser &&
                                <div>
                            <p className={style.reset_password}>На указанный адрес отправлено письмо для подтверждения регистрации</p>
                                    <button type={'button'} className={style.submit_button} onClick={changeChosenIndex(0)}>
                                        Войти
                                    </button>
                                </div>}
                        </div>
                    </div>
                </span>}
            </div>
            </body>
        </div>
    )
}

export default Login;