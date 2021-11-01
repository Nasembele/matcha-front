import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import style from "../../MainPage.module.css";
import {IState} from "../../../../types";
import {validateLink} from "../../../../api";

const ConfirmLinkWindow = () => {

  const dispatch = useDispatch();

  const currentURL = window.location;

  useEffect(() => {
    dispatch(validateLink(currentURL.href));

    console.log(currentURL.href);

  }, [currentURL]);

  const isValidEmailPassLink = useSelector((state: IState) => state.mainPage?.changeAccountSetting?.isValidEmailPassLink);

  return (
    <div>
      <header className={style.header}>
        Матча
      </header>
      <body className={style.body}>
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
      </div>
      </body>
    </div>
  )
}

export default ConfirmLinkWindow;