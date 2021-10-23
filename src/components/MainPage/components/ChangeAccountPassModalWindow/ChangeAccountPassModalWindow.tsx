import {useDispatch, useSelector} from "react-redux";
import React, {ChangeEvent, useEffect, useState} from "react";
import style from "../../MainPage.module.css";
import {IState} from "../../../../types";
import {setNewEmailAC} from "../../MainPageAC";
import {confirmNewEmail, getUsersPostQuery, saveNewEmail, saveNewPassword, validateLink} from "../../../../api";
import {changeResetPasswordAC} from "../../../Login/LoginAC";

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


  useEffect(() => {
    const currentURL = window.location;

    dispatch(validateLink(currentURL.href));

    const arrURL = currentURL.search.split('&');
//    const act = arrURL[0].slice(1);

    console.log(arrURL);

    const id = arrURL[0].slice(4);
    const token = arrURL[1].slice(6);
    const linkId = arrURL[2].slice(7);

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
    setIsNotMatchPassword(false);

    setNewPassword(e.currentTarget.value);
  }
  //
  const onClickChangePassword = () => {

    if (isNewPassword === isSecondPassword) {
      setIsNotMatchPassword(false);

      dispatch(saveNewPassword(isId, isLinkId, isToken, isNewPassword));


    } else {
      setIsNotMatchPassword(true);
    }


  }

  const mainPage = useSelector((state: IState) => state.mainPage);

  const [isNotMatchPassword, setIsNotMatchPassword] = useState(false);


  const changeValidatePassword = () => {
    setIsNotMatchPassword(false);
  }

  const changeResetPassword = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    // dispatch(changeResetPasswordAC(value));
    setSecondPassword(value);
  };

  return (
    <div>

      {/*{isAuth && <Redirect to={'/main'}/>}*/}
      <header className={style.header}>Матча</header>
      <body className={style.body}>
      <div className={style.whole_form}>
        <p className={style.title}>Смена пароля</p>
        {
          mainPage.changeAccountSetting.isValidEmailPassLink === true &&
          // TODO проверка на валидацию ссылки
        <div className={style.content}>
          <div className={style.form_header}>Введите новый пароль</div>
          <input type={'password'} className={style.form_input} onChange={changeValidatePassword} onBlur={changePassword}/>


          <div className={style.form_header}>Повторите пароль</div>
          <input type={'password'} onChange={changeValidatePassword} onBlur={changeResetPassword} className={style.form_input}/>

          <button type={'button'} className={style.reg_button} onClick={onClickChangePassword}>
            Сохранить
          </button>
          {isNotMatchPassword &&
          <p className={style.reset_password}>Пароли не совпадают</p>}
        </div>
          }


        {mainPage.changeAccountSetting.isValidEmailPassLink === false &&
        <div className={style.content}>
          <div className={style.form_header}>
            Невалидная ссылка
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

      </div>
      </body>
    </div>
  )
}

export default ChangeAccountPassModalWindow;