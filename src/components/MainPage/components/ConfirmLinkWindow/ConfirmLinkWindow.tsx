import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {IState} from "../../../../types";
import {validateLink} from "../../../../api";
import style from "../../../Login/Login.module.css";
import LoginWrapper from "../../../../parts/LoginWrapper/LoginWrapper";
import {Redirect} from "react-router-dom";
import {Typography} from 'antd';
const {Text} = Typography;

const ConfirmLinkWindow = () => {

  const dispatch = useDispatch();

  const currentURL = window.location;

  const [isRedirect, setIsRedirect] = useState(false);

  useEffect(() => {
    dispatch(validateLink(currentURL.href));

    // console.log(currentURL.href);

  }, [currentURL]);

  const isValidEmailPassLink = useSelector((state: IState) => state.mainPage?.changeAccountSetting?.isValidEmailPassLink);

  const redirectFunction = () => {
    setIsRedirect(true);
  }

  if (isRedirect) return <Redirect to={'/login'}/>;

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
        <div className={style.enter}>
          <Text style={{color: 'dimgrey', fontWeight: 700}} onClick={redirectFunction}>
            Войти
          </Text>
        </div>
      {/*</body>*/}
    </div>
    </LoginWrapper>
  )
}

export default ConfirmLinkWindow;