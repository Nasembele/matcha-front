import {useDispatch, useSelector} from "react-redux";
import React, {ChangeEvent, useEffect, useState} from "react";
import style from "../../../Login/Login.module.css";
import {IState} from "../../../../types";
import {saveNewPassword, validateLink} from "../../../../api";
import LoginWrapper from "../../../../parts/LoginWrapper/LoginWrapper";
import {Button, Input} from "antd";
import cc from "classnames";
import {Typography} from 'antd';
import {forbiddenForAuthPassword, regexForPassword} from "../../../../helpers";
import {Redirect} from "react-router-dom";

const {Text} = Typography;

const ChangeAccountPassModalWindow = () => {

  const dispatch = useDispatch();

  const [isId, setId] = useState('');
  const [isLinkId, setLinkId] = useState('');
  const [isToken, setToken] = useState('');
  const [isNewPassword, setNewPassword] = useState('');
  const [isSecondPassword, setSecondPassword] = useState('');
  const [isNotValidPassword, setIsNotValidPassword] = useState(false);

  const [isRedirect, setIsRedirect] = useState(false);

  useEffect(() => {
    const currentURL = window.location;
    dispatch(validateLink(currentURL.href));
    const arrURL = currentURL.search?.split('&');

    const id = arrURL[0]?.slice(4);
    const token = arrURL[1]?.slice(6);
    const linkId = arrURL[2]?.slice(7);

    setId(id);
    setLinkId(linkId);
    setToken(token);
  }, [dispatch]);

  const changePassword = (e: React.FormEvent<HTMLInputElement>) => {
    setNewPassword(e.currentTarget.value);
  }

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
    return !!(isNotMatchPassword || isNewPassword !== isSecondPassword || !isNewPassword.match(regexForPassword) || isNewPassword.match(forbiddenForAuthPassword));
  }

  const mainPage = useSelector((state: IState) => state.mainPage);

  const [isNotMatchPassword, setIsNotMatchPassword] = useState(false);

  const changeValidatePassword = () => {
    setIsNotMatchPassword(false);
  }

  const changeResetPassword = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    setIsNotMatchPassword(false);
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

  const redirectFunction = () => {
    setIsRedirect(true);
  }

  if (isRedirect) return <Redirect to={'/login'}/>;

  return (
    <LoginWrapper>
      <div className={style.whole_form}>
        <p className={style.title}>?????????? ????????????</p>
        {
          mainPage.changeAccountSetting.isValidEmailPassLink === true &&
          <div className={style.content}>
            <Input.Password type={'password'} className={style.input_margin} onChange={changeValidatePassword}
                            onBlur={changePassword}
                            placeholder={'?????????? ????????????'}/>
            <Input.Password type={'password'} onChange={changeValidatePassword} onBlur={changeResetPassword}
                            placeholder={'?????????????????? ????????????'} className={style.input_margin}/>
            <Button type={'primary'} className={cc(style.reg_button, style.whole_wide)} onClick={onClickChangePassword}
                    disabled={validateSubmitRegButton()}>
              ??????????????????
            </Button>
            {isNotMatchPassword &&
            <p className={style.reset_password}>???????????? ???? ??????????????????</p>}
            {isNotValidPassword &&
            <div className={style.reset_password}>
              {'???????????? ???????????? ?????????? ?????????? ???? ?????????? 8 ????????????????, ?????????????????? ?????????????????? ??????????, ?? ?????? ?????????? ??????????????????,' +
              '?????????? ?? ???????? ?????? ?????????????????? ????????????????????????: !, ;, $, %, & ?? ???? ?????????????????? (, ), \', ", <, >, =, +'}
            </div>}
          </div>
        }
        {mainPage.changeAccountSetting.isValidEmailPassLink === false &&
        <div className={style.content}>
          <div className={style.form_header}>
            ???????????????? ????????????
          </div>
        </div>
        }
        {
          mainPage.changeAccountSetting.isChangePass === true &&
          <div className={style.form_header}>???????????? ??????????????</div>
        }
        {
          mainPage.changeAccountSetting.isChangePass === false &&
          <div className={style.form_header}>???? ?????????????? ???????????????? ????????????</div>
        }
        <div className={style.enter}>
          <Text style={{color: 'dimgrey', fontWeight: 700}} onClick={redirectFunction}>
            ??????????
          </Text>
        </div>
      </div>
    </LoginWrapper>
  )
}

export default ChangeAccountPassModalWindow;