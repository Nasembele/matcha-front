import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {IState} from "../../../../types";
import {validateLink} from "../../../../api";
import style from "../../../Login/Login.module.css";
import LoginWrapper from "../../../../parts/LoginWrapper/LoginWrapper";

const ConfirmLinkWindow = () => {

  const dispatch = useDispatch();

  const currentURL = window.location;

  useEffect(() => {
    dispatch(validateLink(currentURL.href));

    console.log(currentURL.href);

  }, [currentURL]);

  const isValidEmailPassLink = useSelector((state: IState) => state.mainPage?.changeAccountSetting?.isValidEmailPassLink);

  return (
    <LoginWrapper>
    {/*<div>*/}
      {/*<header className={style.header}>*/}
      {/*  Матча*/}
      {/*</header>*/}
      <div className={style.whole_form}>
        <p className={style.title}>
          Подтверждение регистрации
        </p>
        {
          isValidEmailPassLink === true &&
          <p className={style.reset_password}>
            Ваша почта подтверждена
          </p>
        }
        {
          isValidEmailPassLink === false &&
          <p className={style.reset_password}>
            Невалидная ссылка
          </p>
        }
      {/*</body>*/}
    </div>
    </LoginWrapper>
  )
}

export default ConfirmLinkWindow;