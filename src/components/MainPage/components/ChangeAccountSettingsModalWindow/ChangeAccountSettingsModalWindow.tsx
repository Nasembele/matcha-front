import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import style from "../../MainPage.module.css";
import {IState} from "../../../../types";
import {setNewEmailAC} from "../../MainPageAC";
import {confirmNewEmail, saveNewEmail, validateLink} from "../../../../api";

const ChangeAccountSettingsModalWindow = () => {

  const dispatch = useDispatch();

  const [isShowChangeEmailInput, setShowChangeEmailInput] = useState(false);
  const [isShowChangeEmailConfirm, setShowChangeEmailConfirm] = useState(false);

  const [isId, setId] = useState('');
  const [isLinkId, setLinkId] = useState('');
  const [isToken, setToken] = useState('');
  const [isNewEmail, setNewEmail] = useState('');


  useEffect(() => {

    const currentURL = window.location;

    dispatch(validateLink(currentURL.href));


    const arrURL = currentURL.search?.split('&');
    const act = arrURL[0]?.slice(1);


    const id = arrURL[1]?.slice(3);
    const token = arrURL[2]?.slice(6);
    const linkId = arrURL[3]?.slice(7);


    setId(id);
    setLinkId(linkId);
    setToken(token);

    if (act === 'act=confirmCurrentEmail') {
      setShowChangeEmailInput(true);
    }

    if (act === 'act=confirmNewEmail') {
      const newEmail = arrURL[4].slice(6);
      setNewEmail(newEmail);

      dispatch(confirmNewEmail(id, linkId, token, newEmail));
      setShowChangeEmailConfirm(true);
    }

  }, []);


  const changeValidatePassword = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch(setNewEmailAC(e.currentTarget.value));
  }

  const onClickResetPassword = () => {
    dispatch(saveNewEmail(isId, isLinkId, isToken));
  }

  const mainPage = useSelector((state: IState) => state.mainPage);

  console.log('LOLOLLOLOLO');

  console.log(isShowChangeEmailConfirm);
  console.log(mainPage.changeAccountSetting.isConfirmNewEmail);

  return (
    <div>

      {/*{isAuth && <Redirect to={'/main'}/>}*/}
      <header className={style.header}>Матча</header>
      <body className={style.body}>
      <div className={style.whole_form}>
        <p className={style.title}>Смена почты</p>
        {mainPage.changeAccountSetting.isValidPrevEmail === false &&
        <div className={style.content}>
          <div className={style.form_header}>Невалидная ссылка</div>
        </div>
        }
        {isShowChangeEmailInput
        // && mainPage.changeAccountSetting.isValidEmailPassLink
        && mainPage.changeAccountSetting.isValidEmailPassLink === true &&
        <div className={style.content}>
          <div className={style.form_header}>Введите новый email</div>
          <input type={'email'} className={style.form_input} onBlur={changeValidatePassword}/>
          <button type={'button'} className={style.reg_button} onClick={onClickResetPassword}>
            Сохранить
          </button>


          { mainPage.changeAccountSetting.isValidNewEmail === false &&
          <div className={style.content}>
            <div className={style.form_header}>
              Невалидная почта, введите другую
            </div>
          </div>
          }

          { mainPage.changeAccountSetting.isValidNewEmail === true &&
          <div className={style.content}>
            <div className={style.form_header}>
              Для подтверждения почты перейдите по ссылке из письма
            </div>
          </div>
          }
        </div>
        }

        {mainPage.changeAccountSetting.isValidEmailPassLink === false &&
        <div className={style.content}>
          <div className={style.form_header}>
            Невалидная ссылка
          </div>
        </div>
        }

        {isShowChangeEmailInput && mainPage.changeAccountSetting.isValidPrevEmail === false &&
        <div className={style.content}>
          <div className={style.form_header}>
            Ссылка невалидная
          </div>
        </div>
        }

        {
          isShowChangeEmailConfirm && mainPage.changeAccountSetting.isConfirmNewEmail === false &&
          <div className={style.content}>
            <div className={style.form_header}>Новая почта не подтверждена</div>
          </div>

        }

        {
          isShowChangeEmailConfirm && mainPage.changeAccountSetting.isConfirmNewEmail &&
          <div className={style.content}>
            <div className={style.form_header}>Новая почта подтверждена</div>
          </div>

        }
      </div>
      </body>
    </div>
  )
}

export default ChangeAccountSettingsModalWindow;