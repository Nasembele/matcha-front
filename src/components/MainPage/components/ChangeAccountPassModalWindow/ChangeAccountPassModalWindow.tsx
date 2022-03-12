import {useDispatch, useSelector} from "react-redux";
import React, {ChangeEvent, useEffect, useState} from "react";
import style from "../../../Login/Login.module.css";
import {IState} from "../../../../types";
import {setNewEmailAC} from "../../MainPageAC";
import {confirmNewEmail, getUsersPostQuery, saveNewEmail, saveNewPassword, validateLink} from "../../../../api";
import {changeRegPasswordAC, changeResetPasswordAC} from "../../../Login/LoginAC";
import LoginWrapper from "../../../../parts/LoginWrapper/LoginWrapper";
import {Button, Input} from "antd";
import cc from "classnames";
import {Typography} from 'antd';
import {forbiddenForAuthPassword, regexForPassword} from "../../../../helpers";

const {Text} = Typography;

const ChangeAccountPassModalWindow = () => {

  const dispatch = useDispatch();
  //
  // const [isShowChangeEmailInput, setShowChangeEmailInput] = useState(false);
  // const [isShowChangeEmailConfirm, setShowChangeEmailConfirm] = useState(false);
  //
  const [isId, setId] = useState('');
  const [isLinkId, setLinkId] = useState('');
  const [isToken, setToken] = useState('');
  // const [isNewEmail, setNewEmail] = useState('');
  //
  //
   const [isNewPassword, setNewPassword] = useState('');
  const [isSecondPassword, setSecondPassword] = useState('');
  const [isNotValidPassword, setIsNotValidPassword] = useState(false);


  useEffect(() => {
    const currentURL = window.location;

    dispatch(validateLink(currentURL.href));

    const arrURL = currentURL.search?.split('&');
//    const act = arrURL[0].slice(1);

    console.log(arrURL);

    const id = arrURL[0]?.slice(4);
    const token = arrURL[1]?.slice(6);
    const linkId = arrURL[2]?.slice(7);

    console.log(id);
    console.log(token);
    console.log(linkId);

    setId(id);
    setLinkId(linkId);
    setToken(token);

    // if (act === 'act=confirmCurrentEmail') {
    //   setShowChangeEmailInput(true);
    // }

    // if (act === 'act=confirmNewEmail') {
    //   const newEmail = arrURL[4].slice(6);
    //   setNewEmail(newEmail);

      // dispatch(confirmNewEmail(id, linkId, token, newEmail));
      // setShowChangeEmailConfirm(true);
    // }

  }, []);
  //
  //
  const changePassword = (e: React.FormEvent<HTMLInputElement>) => {
    // setIsNotMatchPassword(false);

    setNewPassword(e.currentTarget.value);
    // if (e.currentTarget.value === isSecondPassword) {
    //   setIsNotMatchPassword(false);
    //
    // } else {
    //   setIsNotMatchPassword(true);
    // }
  }
  //
  const onClickChangePassword = () => {

    if (isNewPassword.match(regexForPassword) && !isNewPassword.match(forbiddenForAuthPassword)) {
      setIsNotValidPassword(false);
    }
    if (isNewPassword === isSecondPassword) {
      setIsNotMatchPassword(false);

      dispatch(saveNewPassword(isId, isLinkId, isToken, isNewPassword));


    } else {
      setIsNotMatchPassword(true);
    }


  }

  const validateSubmitRegButton = () => {
    if (isNotMatchPassword || isNewPassword !== isSecondPassword || !isNewPassword.match(regexForPassword) || isNewPassword.match(forbiddenForAuthPassword)) {
      return true
    }
    return false
  }

  const mainPage = useSelector((state: IState) => state.mainPage);

  const [isNotMatchPassword, setIsNotMatchPassword] = useState(false);


  const changeValidatePassword = () => {
    setIsNotMatchPassword(false);
  }

  const changeResetPassword = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    // dispatch(changeResetPasswordAC(value));
    setIsNotMatchPassword(false);

    // setSecondPassword(value);

    if (isNewPassword === value) {
      setSecondPassword(value);
    } else {
      setIsNotMatchPassword(true);
    }
    if (isNewPassword.match(regexForPassword) && !isNewPassword.match(forbiddenForAuthPassword)) {
      setIsNotValidPassword(false);
    } else {
      setIsNotValidPassword(true);
    }
  };

  return (
    <LoginWrapper>

      {/*{isAuth && <Redirect to={'/main'}/>}*/}
      {/*<header className={style.header}>Матча</header>*/}
      {/*<body className={style.body}>*/}
      <div className={style.whole_form}>
        <p className={style.title}>Смена пароля</p>
        {
          mainPage.changeAccountSetting.isValidEmailPassLink === true &&
          // TODO проверка на валидацию ссылки
        <div className={style.content}>
          {/*<div className={style.form_header}>Введите новый пароль</div>*/}
          <Input.Password type={'password'} className={style.input_margin} onChange={changeValidatePassword} onBlur={changePassword}
          placeholder={'новый пароль'}/>


          {/*<div className={style.form_header}>Повторите пароль</div>*/}
          <Input.Password type={'password'} onChange={changeValidatePassword} onBlur={changeResetPassword}
                          placeholder={'повторите пароль'} className={style.input_margin}/>

          <Button type={'primary'} className={cc(style.reg_button, style.whole_wide)} onClick={onClickChangePassword}
                  disabled={validateSubmitRegButton()}>
            Сохранить
          </Button>
          {isNotMatchPassword &&
          <p className={style.reset_password}>Пароли не совпадают</p>}

          {isNotValidPassword &&
          <div className={style.reset_password}>
            {'Пароль должен иметь длину не менее 8 символов, содержать латинские буквы, в том числе заглавную,' +
            'цифры и один или несколько спецсимволов: !, ;, $, %, & и не содержать (, ), \', ", <, >, =, +'}
          </div>}

          {/*TODO проверка на разные пароли не работает*/}
        </div>
          }


        {mainPage.changeAccountSetting.isValidEmailPassLink === false &&
        <div className={style.content}>
          <div className={style.form_header}>
            Неверная ссылка
          </div>
        </div>
        }

        {
          mainPage.changeAccountSetting.isChangePass === true && //TODO проверка на валидацию ссылки
          <div className={style.form_header}>Пароль изменен</div>
        }
        {
          mainPage.changeAccountSetting.isChangePass === false && //TODO проверка на валидацию ссылки
          <div className={style.form_header}>Не удалось изменить пароль</div>
        }

        <div className={style.enter}>
          <Text style={{color: 'dimgrey', fontWeight: 700}} >
            Войти
          </Text>
        </div>

      </div>
      {/*</body>*/}
    </LoginWrapper>
  )
}

export default ChangeAccountPassModalWindow;