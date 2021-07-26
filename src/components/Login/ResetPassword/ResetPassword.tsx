import {useDispatch, useSelector} from "react-redux";
import React, {ChangeEvent, useState} from "react";
import style from "../Login.module.css";
import {Redirect} from "react-router";
import {changeResetPasswordAC} from "../LoginAC";
import {IState} from "../../../types";
import {resetPasswordPostQuery} from "../../../api";

const ResetPassword = () => {

    const dispatch = useDispatch();

    const resetData = useSelector((state: IState) => state.login.resetData);

    const [iIsGoToLogin, setIsGoToLogin] = useState(false);

    const changeResetPassword = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeResetPasswordAC(value));
    };

    const onClickResetPassword = () => {
        dispatch(resetPasswordPostQuery({resetPassword: resetData!.resetPassword}));
    }

    const onClickGoToLogin = () => {
        setIsGoToLogin(true);
    }

    if (iIsGoToLogin) {
        return <Redirect to={'/login'}/>
    }

    return (
        <div>
            <header className={style.header}>Матча</header>
            <body className={style.body}>
            <div className={style.whole_form}>
                <p className={style.title}>Восстановление пароля</p>
                <div className={style.content}>
                    <div className={style.form_header}>Введите новый пароль</div>
                    <input type={'password'} className={style.form_input}/>
                    <div className={style.form_header}>Повторите пароль</div>
                    <input type={'password'} onChange={changeResetPassword} className={style.form_input}/>
                    {/*валидация на совпадение паролей*/}
                    <div>
                        <button type={'button'} className={style.reg_button} onClick={onClickResetPassword}>
                            Сохранить
                        </button>
                        {resetData?.isResetUser &&
                        <div>
                            <p className={style.reset_password}>Пароль обновлен</p>
                            <button type={'button'} className={style.login_button} onClick={onClickGoToLogin}>
                                Войти
                            </button>
                        </div>
                        }
                    </div>
                </div>
            </div>
            </body>
        </div>
    )
}

export default ResetPassword;