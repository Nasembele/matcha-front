import style from './Registration.module.css';
import React from "react";
import {useDispatch} from "react-redux";
import {changeFioAC} from "./RegistrationAC";
import {updateRegDataPostQuery} from "./Registration.reducer";

const Registration = (registration) => {

    const dispatch = useDispatch();

    const changeFio = (fioInput) => {
        dispatch(changeFioAC(fioInput.target.value));
    }

    const updateRegData = () => {
        dispatch(updateRegDataPostQuery(registration));
    }

    return (
        <div className={style.wraper}>
            <div>
                <label>ФИО   </label>
                <input type={'text'} onChange={changeFio} value={registration.fio}/>
            </div>
            <p>email</p>
            <p>Пароль</p>
            <p>Пароль еще раз</p>
            <p>Пол</p>
            <p>Страна</p>
            <button onClick={updateRegData}>Отправить</button>
        </div>
    )
}

export default Registration;