import {useDispatch} from "react-redux";
import React, {useState} from "react";
import style from './MainPage.module.css';
import {changeRegNameAC} from "../Login/LoginAC";
import {getUserAccountGetQuery, updateRegDataPostQuery} from "../../api";
import {
    changeBiographyAC,
    changeEducationAC,
    changeOrientAC,
    changePositionAC,
    changeTagsAC,
    changeWorkPlaceAC, deleteTagsAC
} from "./MainPageAC";
import {tagsArray} from "./MainPage.helpers";

const MainPage = (account) => {
    const dispatch = useDispatch();

    const [chosenIndex, setChosenIndex] = useState(0);
    const [hasGetUser, setHasGetUser] = useState(false); //выключать при логауте
    const [hasChangeTags, setHasChangeTags] = useState(false); //выключать при логауте

    const openAccountSetting = () => {
        setChosenIndex(1);
        {!hasGetUser && dispatch(getUserAccountGetQuery())};
        setHasGetUser(true);
    }

    const closeAccountSetting = () => {
        setChosenIndex(0);
    }

    const changeOrient = (orient) => {
        dispatch(changeOrientAC(orient.target.value));
    };

    const changeRegName = () => {
       // dispatch(changeOrientAC(orient.target.value));
    };

    const changeEducation = (education) => {
        dispatch(changeEducationAC(education.target.value));
    };

    const changeWorkPlace = (education) => {
        dispatch(changeWorkPlaceAC(education.target.value));
    };

    const changePosition = (education) => {
        dispatch(changePositionAC(education.target.value));
    };

    const changeBiography = (education) => {
        dispatch(changeBiographyAC(education.target.value));
    };

    const changeTags = (tags) => {
        dispatch(changeTagsAC(tags.target.value));
        if (account.account.tags.length === 5) {
            setHasChangeTags(false)
        }
    };

    const onClickChangeTags = () => {
        setHasChangeTags(true)
        dispatch(deleteTagsAC());
    };


    return (
        <div className={style.content_wrapper}>
            <div className={style.chat}>
                {chosenIndex === 1 &&
                <>
                    <div className={style.button_acc} onClick={closeAccountSetting}>Выйти из настроек аккаунта</div>
                    <div>
                        <div className={style.content}>
                            <div className={style.form_header}>Рейтинг</div>
                            <span>{account.account.rating}</span>
                            <div className={style.form_header}>Фото</div>
                            {/*<div className={style.form_header}>Ориентация</div>*/}
                            {/*{account.account.gender === 'man' &&*/}
                            {/*<select*/}
                            {/*    onChange={changeOrient}*/}
                            {/*>*/}
                            {/*    <option>{'getero'}</option>*/}
                            {/*    <option>{'gay'}</option>*/}
                            {/*    <option>{'bisexual'}</option>*/}
                            {/*</select>*/}

                            {/*}*/}
                            {/*{account.account.gender === 'woman' &&*/}
                            {/*<select*/}
                            {/*    onChange={changeOrient}*/}
                            {/*>*/}
                            {/*    <option>{'getero'}</option>*/}
                            {/*    <option>{'lesbi'}</option>*/}
                            {/*    <option>{'bisexual'}</option>*/}
                            {/*</select>}*/}

                            <div className={style.form_header}>Образование</div>
                            <textarea onChange={changeEducation} className={style.form_input}/>
                            <div className={style.form_header}>Место работы</div>
                            <textarea onChange={changeWorkPlace} className={style.form_input}/>
                            <div className={style.form_header}>Должность</div>
                            <textarea onChange={changePosition} className={style.form_input}/>
                            <div className={style.form_header}>Биография</div>
                            <textarea onChange={changeBiography} className={style.form_input}/>


                            <div className={style.form_header}>Интересы</div>

                            <div className={style.tags}>


                            {hasChangeTags &&
                            <select
                                onChange={changeTags} multiple="multiple" size = "10"
                            >
                                {tagsArray.map((item) => {
                                    return <option key={item}>{item}</option>
                                    // if (account.account.tags.includes(item)) {
                                    //     return <option key={item} selected>{item}</option>
                                    // } else {
                                    //     return <option key={item}>{item}</option>
                                    // }
                                })}
                            </select>}

                                <div>
                                    {account.account.tags.map((item) => {
                                        return <div>{item}</div>
                                    })}
                                </div>
                            </div>

                            {!hasChangeTags &&
                            <button className={style.change_button} onClick={onClickChangeTags}>
                                Изменить
                            </button>}

                                {/*{tagsArray.map((el) => (*/}
                                {/*    <div>*/}
                                {/*    <label key={el}>*/}
                                {/*        {el}*/}
                                {/*        <input type="checkbox"*/}
                                {/*               // checked={account.account.tags.includes(el)}*/}
                                {/*               onChange={changeTags}*/}
                                {/*        />*/}
                                {/*        /!*<span className={style.checkbox_checkmark}/>*!/*/}
                                {/*    </label>*/}
                                {/*        </div>*/}
                                {/*))}*/}


                            {/*    <button type={'button'} className={style.reg_button} onClick={updateRegData}>*/}
                            {/*        Зарегистрироваться*/}
                            {/*    </button>*/}
                            {/*    {isRegSuccess &&*/}
                            {/*    <p className={style.reset_password}>На указанный адрес отправлено письмо для подтверждения регистрации</p>}*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </>}
                {chosenIndex === 0 && <div className={style.button_acc} onClick={openAccountSetting}>Аккаунт</div>}
            </div>
            <div className={style.main_field}>
            </div>
        </div>
    )
}

export default MainPage;
