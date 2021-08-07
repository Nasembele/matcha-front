import {useDispatch, useSelector} from "react-redux";
import React, {ChangeEvent, useState} from "react";
import style from "../Login.module.css";
import {Redirect} from "react-router";
import {changeRegPasswordAC, changeResetPasswordAC, setIdResetUserAC} from "../LoginAC";
import {IState} from "../../../types";
import {resetPasswordPostQuery, validateResetLinkGetQuery} from "../../../api";

const ResetPassword = () => {

    const dispatch = useDispatch();

    const resetData = useSelector((state: IState) => state.login.resetData);
    const isAuth = useSelector((state: IState) => state.login.isAuth);

    const [password, setPassword] = useState('');
    const [isNotMatchPassword, setIsNotMatchPassword] = useState(false);

    const currentURL = window.location.href;

    if (resetData.isValidLink === null) {
        dispatch(validateResetLinkGetQuery(currentURL));
    }

    const [iIsGoToLogin, setIsGoToLogin] = useState(false);

    const changeResetPassword = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
        // dispatch(changeResetPasswordAC(value));
        setIsNotMatchPassword(false);
        if (password === value) {
            dispatch(changeResetPasswordAC(value));
        } else {
            setIsNotMatchPassword(true);
        }
    };

    const onClickResetPassword = () => {
        const startIndex = currentURL.indexOf('?id=');
        const endIndex = currentURL.indexOf('&passtoken');
        const id = Number(currentURL.substr(startIndex + 4, endIndex - startIndex - 4));

        dispatch(setIdResetUserAC(id));
        dispatch(resetPasswordPostQuery({id: id, password: resetData.resetPassword}));
    }

    const onClickGoToLogin = () => {
        setIsGoToLogin(true);
    }

    if (iIsGoToLogin) {
        return <Redirect to={'/login'}/>
    }

    const onChangeSetPassword = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
        setPassword(value);
    }

    const changeValidatePassword = () => {
        setIsNotMatchPassword(false);
    }

    return (
        <div>
            {isAuth && <Redirect to={'/main'}/>}
            <header className={style.header}>Матча</header>
            <body className={style.body}>
            <div className={style.whole_form}>
                <p className={style.title}>Восстановление пароля</p>
                {resetData.isValidLink === false &&
                <div className={style.content}>
                    <div className={style.form_header}>Невалидная ссылка</div>
                </div>
                }
                {resetData.isValidLink === true &&
                    <div className={style.content}>
                    <div className={style.form_header}>Введите новый пароль</div>
                    <input type={'password'} className={style.form_input} onChange={changeValidatePassword} onBlur={onChangeSetPassword}/>
                    <div className={style.form_header}>Повторите пароль</div>
                    <input type={'password'} onChange={changeValidatePassword} onBlur={changeResetPassword} className={style.form_input}/>
                    {/*валидация на совпадение паролей*/}
                        {isNotMatchPassword &&
                        <p className={style.reset_password}>Пароли не совпадают</p>}
                    <div>
                        <button type={'button'} className={style.reg_button} onClick={onClickResetPassword}>
                            Сохранить
                        </button>
                        {resetData?.isValidPass === true &&
                        <div>
                            <p className={style.reset_password}>Пароль обновлен</p>
                            <button type={'button'} className={style.login_button} onClick={onClickGoToLogin}>
                                Войти
                            </button>
                        </div>
                        }
                        {resetData?.isValidPass === 'old_pass' &&
                        <div>
                            <p className={style.reset_password}>Новый пароль должен отличаться от старого</p>
                        </div>
                        }
                        {resetData?.isValidPass === false &&
                        <div>
                            <p className={style.reset_password}>Ошибка</p>
                        </div>
                        }
                    </div>
                </div>
                }
            </div>
            </body>
        </div>
    )
}

export default ResetPassword;