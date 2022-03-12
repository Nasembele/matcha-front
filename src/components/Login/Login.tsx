import React, {ChangeEvent, ChangeEventHandler, useState} from "react";
import style from './Login.module.css';
import {useDispatch, useSelector} from "react-redux";
import {Button, DatePicker, Input, Select} from 'antd';
import {UserOutlined} from '@ant-design/icons';
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
  changeRegSexualPreferenceAC, changeRegUsernameAC,
  setIsRegUserAC, setIsValidEmailResetUserAC,
  setIsValidLinkResetUserAC,
  setIsValidPassResetUserAC
} from "./LoginAC";
import {changeAccPassPostQuery, recoveryPasswordPostQuery, signInPostQuery, updateRegDataPostQuery} from "../../api";
import LoginWrapper from "../../parts/LoginWrapper/LoginWrapper";
import {Option} from "antd/es/mentions";
import cc from "classnames";
import {
  forbiddenForAuthPassword,
  forbiddenForText,
  regexForEmail,
  regexForPassword,
  russianLetter
} from "../../helpers";
import {Typography} from 'antd';

const {Text} = Typography;

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
  const [isNotValidPassword, setIsNotValidPassword] = useState(false);


  const changeLogin = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    if (value === '' || value.match(regexForEmail)) {
      dispatch(changeLoginAC(value));
    }
  };

  const changePassword = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    if (value === '' || !value.match(forbiddenForAuthPassword)) {
      dispatch(changePasswordAC(value));
    }
  };

  const changeEmail = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    if (value === '' || value.match(regexForEmail)) {
      dispatch(changeEmailAC(value));
    }
  };

  const signInButton = () => {
    dispatch(signInPostQuery(login.authData));
  };

  const recoveryPassword = () => {
    // dispatch(recoveryPasswordPostQuery({email: login.resetData!.email}));

    dispatch(changeAccPassPostQuery(login.resetData.email));

  };

  const onChangeChosenIndex = (number: number) => () => {
    setChosenIndex(number);
    dispatch(setIsRegUserAC(false));
    dispatch(setIsValidEmailResetUserAC(null));
  }

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
    if (value === '' || (value.match(russianLetter) && !value.match(forbiddenForText))) {
      dispatch(changeRegFirstNameAC(value));
    }
  }

  const changeRegLastName = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    if (value === '' || (value.match(russianLetter) && !value.match(forbiddenForText))) {
      dispatch(changeRegLastNameAC(value));
    }
  }

  const changeRegUsername = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    if (value === '' || value.match(regexForEmail)) {
      dispatch(changeRegUsernameAC(value));
    }
  }

  const changeRegMiddleName = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    if (value === '' || (value.match(russianLetter) && !value.match(forbiddenForText))) {
      dispatch(changeRegMiddleNameAC(value));
    }
  }

  // const changeRegBirthday = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
  //     dispatch(changeRegBirthdayAC(value));
  // }

  const changeRegBirthday = (date: any, dateString: string) => {
    dispatch(changeRegBirthdayAC(dateString));
  }

  const changeRegEmail = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    // dispatch(changeRegEmailAC(value)); //todo

    if (value === '' || value.match(regexForEmail)) {
      dispatch(changeRegEmailAC(value));

    }
  }

  const changeRegLogin = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    //  dispatch(changeRegLoginAC(value));
  }

  const changeRegPassword = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    setPassword(value);
    setIsNotMatchPassword(false);
    if (login.regData.password === value) { //todo
      // dispatch(changeRegPasswordAC(value));
    } else {
      setIsNotMatchPassword(true);
    }
    if (login.regData.password.match(regexForPassword) && !login.regData.password.match(forbiddenForAuthPassword)) {
      setIsNotValidPassword(false);
    } else {
      setIsNotValidPassword(true);
    }
  }

  const updateRegData = () => {
    dispatch(updateRegDataPostQuery(login.regData!));
    // setIsRegSuccess(true);
  }

  const validateSubmitRegButton = () => {
    if ((password !== login.regData.password || !password.match(regexForPassword) || password.match(forbiddenForAuthPassword)
      || !login.regData.firstName || !login.regData.lastName || !login.regData.middleName || !login.regData.userName
      || !login.regData.birthday || !login.regData.gender || !login.regData.sexualPreference || !login.regData.email
      || !login.regData.password
    || !login.regData.email.match(/[@]/ )     || !login.regData.email.match(/[.]/ ))) {
      return true
    }
    return false
  }

  const changeRegGender = (value: string) => {
    dispatch(changeRegGenderAC(value));
  };

  const changeRegSexualPreference = (value: string) => {
    dispatch(changeRegSexualPreferenceAC(value));
  };

  const onChangeSetPassword = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    // setPassword(value);
    dispatch(changeRegPasswordAC(value));


    setIsNotMatchPassword(false);
    if (password === value) {
      // dispatch(changeRegPasswordAC(value));
    } else {
      setIsNotMatchPassword(true);
    }
    if (password.match(regexForPassword) && !password.match(forbiddenForAuthPassword)) {
      setIsNotValidPassword(false);
    } else {
      setIsNotValidPassword(true);
    }
  }

  const changeValidatePassword = () => {
    setIsNotMatchPassword(false);
  }

  const validateSignInButton = Boolean(login.authData.login && login.authData.password);

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
                   size="large" prefix={<UserOutlined/>}
                   value={login.authData.login}
            />
            {/*<div className={style.form_header}>Пароль</div>*/}
            <Input.Password type={'password'} onChange={changePassword} className={style.bottom_margin}
                            placeholder={'пароль'} size="large"
                            value={login.authData.password}
            />

            <div className={style.buttons_container}>
              <div className={style.button_container}>
                <Button type={'primary'} size={'large'} className={style.submit_button} onClick={signInButton}
                        disabled={!validateSignInButton}>
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
                      <Input placeholder={'email'} type={'text'} onChange={changeEmail} className={style.form_input}
                             value={login.resetData.email}
                      />
                        <div>
                            <Button type={'primary'} size={'large'} block className={style.reg_button}
                                    onClick={recoveryPassword}
                                    disabled={!Boolean(login.resetData.email)}
                            >
                                Отправить
                            </Button>
                          {login.resetData.isValidEmail === false &&
                          <div>
                            <p className={style.user_attention}>Неправильный email</p>
                          </div>
                          }
                          {login.resetData.isValidEmail === true &&
                          <div>
                            <p className={style.user_attention}>
                              На указанный адрес отправлено письмо для восстановления пароля
                            </p>
                          </div>
                          }
                          <div className={style.enter}>
                          <Text style={{color: 'dimgrey', fontWeight: 700}} onClick={onChangeChosenIndex(0)}>
                            Войти
                          </Text>
                          </div>
                        </div>
                    </div>
                </span>}
        {chosenIndex === 2 && <span>
                    <p className={style.title}>Регистрация</p>
                    <div className={style.content}>
                        <div className={style.body}>
                        {/*<div className={style.form_header}>Имя</div>*/}
                          <Input type={'text'} onChange={changeFirstRegName} className={style.input_margin}
                                 placeholder={'имя'} value={login.regData.firstName}/>

                          {/*<div className={style.form_header}>Отчество</div>*/}
                          <Input type={'text'} onChange={changeRegMiddleName} className={style.input_margin}
                                 placeholder={'отчество'} value={login.regData.middleName}/>


                          {/*<div className={style.form_header}>Фамилия</div>*/}
                          <Input type={'text'} onChange={changeRegLastName} className={style.input_margin}
                                 placeholder={'фамилия'} value={login.regData.lastName}/>

                            <Input type={'text'} onChange={changeRegUsername} className={style.input_margin}
                                   placeholder={'username'} value={login.regData.userName}/>
                          {/*<div className={style.form_header}>Дата рождения</div>*/}
                          {/*<Input type={'date'} onBlur={changeRegBirthday} className={style.form_input}/>*/}
                          <DatePicker onChange={changeRegBirthday} placeholder={'дата рождения'}
                                      className={cc(style.whole_wide, style.input_margin)}
                                      allowClear={false}/>

                          {/*<div className={style.form_header}>Пол</div>*/}
                          <Select onChange={changeRegGender} placeholder={'пол'}
                                  className={cc(style.whole_wide, style.input_margin)}>
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
                          <Input type={'text'} onChange={changeRegEmail} className={style.input_margin}
                                 placeholder={'email'} value={login.regData.email}/>

                          {/*<div className={style.form_header}>Пароль</div>*/}
                          <Input.Password type={'password'} onChange={changeValidatePassword}
                                          onBlur={onChangeSetPassword}
                                          className={style.input_margin} placeholder={'пароль'}/>

                          {/*<div className={style.form_header}>Повторите пароль</div>*/}
                          <Input.Password type={'password'} onChange={changeValidatePassword} onBlur={changeRegPassword}
                                          className={style.input_margin} placeholder={'повторите пароль'}/>
                          {isNotMatchPassword &&
                          <div className={style.reset_password}>Пароли не совпадают</div>}
                          {isNotValidPassword &&
                          <div className={style.reset_password}>
                            {'Пароль должен иметь длину не менее 8 символов, содержать латинские буквы, в том числе заглавную,' +
                            'цифры и один или несколько спецсимволов: !, ;, $, %, & и не содержать (, ), \', ", <, >, =, +'}
                          </div>}

                        </div>
                      <div>
                            <Button type={'primary'} className={cc(style.reg_button, style.whole_wide)}
                                    onClick={updateRegData}
                                    disabled={validateSubmitRegButton()}
                            >
                                Зарегистрироваться
                            </Button>
                        {login.regData?.isRegUser &&
                        <div className={style.reset_password}>
                          На указанный адрес отправлено письмо для подтверждения регистрации
                        </div>
                        }
                        <div className={style.enter}>
                            <Text style={{color: 'dimgrey', fontWeight: 700}} onClick={onChangeChosenIndex(0)}>
                              Войти
                            </Text>
                          </div>
                        </div>
                    </div>
                </span>}
      </div>
    </LoginWrapper>
  )
}

export default Login;