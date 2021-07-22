import {useDispatch} from "react-redux";
import React, {useState} from "react";
import style from "../Login.module.css";
import {Redirect} from "react-router";

const ResetPassword = (resetPassword) => {

    const dispatch = useDispatch();

    const [isRecoveryPassword, setIsRecoveryPassword] = useState(false);
    const [iIsGoToLogin, setIsGoToLogin] = useState(false);

    const changeResetPassword = (password) => {
        dispatch(changeResetPasswordAC(password.target.value));
    };

    const onClickResetPassword = () => {
        dispatch(resetPasswordPostQuery({resetPassword: resetPassword.resetPassword}));
        setIsRecoveryPassword(true);
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
                        {isRecoveryPassword && <p className={style.reset_password}>Пароль обновлен</p>}
                        {isRecoveryPassword &&
                        <button type={'button'} className={style.login_button} onClick={onClickGoToLogin}>
                            Войти
                        </button>}
                    </div>
                </div>
            </div>
            </body>
        </div>
    )
}

export default ResetPassword;