import React, {ChangeEvent, ChangeEventHandler, useState} from "react";
import style from './Login.module.css';
import {useDispatch, useSelector} from "react-redux";
import {Button, DatePicker, Input, Select} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {Redirect} from "react-router";
import {ILogin, IState} from "../../types";
import {
    changeEmailAC,
    changeLoginAC,
    changePasswordAC,
    changeRegBirthdayAC,
    changeRegEmailAC,
    changeRegFirstNameAC,
    changeRegGenderAC,
    changeRegLastNameAC,
    changeRegMiddleNameAC,
    changeRegPasswordAC,
    changeRegSexualPreferenceAC,
    setIsRegUserAC, setIsValidEmailResetUserAC,
    setIsValidLinkResetUserAC,
    setIsValidPassResetUserAC
} from "./LoginAC";
import {changeAccPassPostQuery, recoveryPasswordPostQuery, signInPostQuery, updateRegDataPostQuery} from "../../api";
import LoginWrapper from "../../parts/LoginWrapper/LoginWrapper";
import {Option} from "antd/es/mentions";
import cc from "classnames";

const Login = () => {

    const dispatch = useDispatch();

    // const loginAuth = (state: IState) => state.login.isAuth;
    const login = useSelector((state: IState) => state.login);
    // const error = useSelector((state: IState) => state.error);

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
        // dispatch(recoveryPasswordPostQuery({email: login.resetData!.email}));

        dispatch(changeAccPassPostQuery(login.resetData.email));

    };

    // const changeChosenIndex = () => {
    //   //  setChosenIndex(1);
    // }

    const changeChosenIndex = (value: number) => () => {
        if (chosenIndex === 1) {
            dispatch(setIsValidPassResetUserAC(null));
            dispatch(setIsValidLinkResetUserAC(null));
            dispatch(setIsValidEmailResetUserAC(null));

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

    // const changeRegBirthday = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    //     dispatch(changeRegBirthdayAC(value));
    // }

    const changeRegBirthday = (date: any, dateString: string) => {
        dispatch(changeRegBirthdayAC(dateString));
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

    const changeRegGender = (value: string) => {
        dispatch(changeRegGenderAC(value));
    };

    const changeRegSexualPreference = (value: string) => {
        dispatch(changeRegSexualPreferenceAC(value));
    };

    const onChangeSetPassword = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
        setPassword(value);
    }

    const changeValidatePassword = () => {
        setIsNotMatchPassword(false);
    }


    return (
      <LoginWrapper>
        <div className={style.whole_form}>
            {login.isAuth && <Redirect to={'/main'}/>}
            {/*<header className={style.header}>Матча</header>*/}
                {chosenIndex === 0 && <div>
                  <p className={style.title}>Join and start dating today!</p>
                  <div className={style.content}>
                    {/*<div className={style.form_header}>email или username</div>*/}
                    <Input type={'text'} onChange={changeLogin}
                           placeholder={'email или username'}
                           size="large"  prefix={<UserOutlined/>}/>
                    {/*<div className={style.form_header}>Пароль</div>*/}
                    <Input.Password type={'password'} onChange={changePassword} className={style.bottom_margin}
                                    placeholder={'пароль'} size="large"/>

                      <div className={style.buttons_container}>
                    <div className={style.button_container}>
                      <Button type={'primary'} size={'large'}  className={style.submit_button} onClick={signInButton}>
                        Войти
                      </Button>
                      <Button size={'large'} className={style.negative_button} onClick={changeChosenIndex(1)}>
                          Пароль?
                      </Button>
                        {/*{error.isServerError === true &&*/}
                        {/*<p className={style.error}>Ошибка сервера</p>}*/}
                        {/*{error.isServerError === true &&*/}
                        {/*<p className={style.error}>Не удается войти. Проверьте правильность написания email и*/}
                        {/*    пароля</p>}*/}
                    </div>


                    <Button block type={'primary'} size={'large'} className={style.reg_button} onClick={changeChosenIndex(2)}>
                      Регистрация
                    </Button>
                      </div>
                  </div>

                </div>}
                {chosenIndex === 1 && <span>
                    <p className={style.title}>Восстановление пароля</p>
                    <div className={style.content}>
                        {/*<div className={style.form_header}>Введите email</div>*/}
                        <Input placeholder={'email'} type={'text'} onBlur={changeEmail} className={style.form_input}/>
                        <div>
                            <Button type={'primary'} size={'large'} block className={style.reg_button} onClick={recoveryPassword}>
                                Отправить
                            </Button>
                            {login.resetData.isValidEmail === false &&
                            <div>
                              <p className={style.reset_password}>Неправильный email</p>
                            </div>
                            }
                            {login.resetData.isValidEmail === true &&
                            <div>
                              <p className={style.reset_password}>
                                На указанный адрес отправлено письмо для восстановления пароля
                              </p>
                              {/*<button type={'button'} className={style.submit_button} onClick={changeChosenIndex(0)}>*/}
                              {/*  Войти*/}
                              {/*</button>*/}
                            </div>
                            }
                        </div>
                    </div>
                </span>}
                {chosenIndex === 2 && <span>
                    <p className={style.title}>Регистрация</p>
                    <div className={style.content}>
                        <div className={style.body}>
                        {/*<div className={style.form_header}>Имя</div>*/}
                        <Input type={'text'} onBlur={changeFirstRegName} className={style.input_margin}
                        placeholder={'имя'}/>

                        {/*<div className={style.form_header}>Отчество</div>*/}
                        <Input type={'text'} onBlur={changeRegMiddleName} className={style.input_margin}
                               placeholder={'отчество'}/>


                        {/*<div className={style.form_header}>Фамилия</div>*/}
                        <Input type={'text'} onBlur={changeRegLastName} className={style.input_margin}
                               placeholder={'фамилия'}/>

                        {/*<div className={style.form_header}>Дата рождения</div>*/}
                        {/*<Input type={'date'} onBlur={changeRegBirthday} className={style.form_input}/>*/}
                        <DatePicker onChange={changeRegBirthday} placeholder={'дата рождения'} className={cc(style.whole_wide, style.input_margin)}/>

                        {/*<div className={style.form_header}>Пол</div>*/}
                        <Select onChange={changeRegGender} placeholder={'пол'} className={cc(style.whole_wide, style.input_margin)}>
                            {/*<Option>{'Не выбрано'}</Option>*/}
                            <Option value={'male'}>{'M'}</Option>
                            <Option value={'female'}>{'Ж'}</Option>
                        </Select>

                        {/*<div className={style.form_header}>Сексуальные предпочтения</div>*/}
                        <Select onChange={changeRegSexualPreference}
                                placeholder={'сексуальные предпочтения'}
                                className={cc(style.whole_wide, style.input_margin)}>
                            {/*<Option>{'Не выбрано'}</Option>*/}
                            <Option value={'getero'}>{'гетеро'}</Option>
                            <Option value={'bisexual'}>{'би'}</Option>
                            {login.regData?.gender === 'male' && <Option value={'gay'}>{'гей'}</Option>}
                            {login.regData?.gender === 'female' && <Option value={'lesbi'}>{'лесби'}</Option>}
                        </Select>
                        {/*<div className={style.form_header}>email</div>*/}
                        <Input type={'text'} onBlur={changeRegEmail} className={style.input_margin}
                               placeholder={'email'}/>

                        {/*<div className={style.form_header}>Пароль</div>*/}
                        <Input.Password type={'password'} onChange={changeValidatePassword} onBlur={onChangeSetPassword}
                               className={style.input_margin} placeholder={'пароль'}/>

                        {/*<div className={style.form_header}>Повторите пароль</div>*/}
                        <Input.Password type={'password'} onChange={changeValidatePassword} onBlur={changeRegPassword}
                               className={style.input_margin} placeholder={'повторите пароль'}/>
                        {isNotMatchPassword &&
                        <div className={style.reset_password}>Пароли не совпадают</div>}
                        </div>
                      <div>
                            <Button type={'primary'} className={cc(style.reg_button, style.whole_wide)} onClick={updateRegData}>
                                Зарегистрироваться
                            </Button>
                          {login.regData?.isRegUser &&
                          <div>
                            <div className={style.reset_password}>
                              На указанный адрес отправлено письмо для подтверждения регистрации
                            </div>
                            {/*<Button type={'primary'}  className={cc(style.submit_button, style.whole_wide)} onClick={changeChosenIndex(0)}>*/}
                            {/*  Войти*/}
                            {/*</Button>*/}
                          </div>}
                        </div>
                    </div>
                </span>}
        </div>
      </LoginWrapper>
    )
}

export default Login;