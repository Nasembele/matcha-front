import {useDispatch} from "react-redux";
import React, {useEffect, useState} from "react";
import style from './MainPage.module.css';
import {changeRegNameAC} from "../Login/LoginAC";
import {
    getUserAccountGetQuery,
    getUsersGetQuery,
    likeUserPostQuery,
    saveChangeAccPostQuery,
    updateRegDataPostQuery
} from "../../api";
import {
    changeBiographyAC,
    changeEducationAC,
    changeOrientAC,
    changePositionAC,
    changeTagsAC,
    changeWorkPlaceAC, deleteNotLikeUserAC, deleteTagsAC, setLikeUserAC, setUsersAC
} from "./MainPageAC";
import {tagsArray} from "./MainPage.helpers";

const MainPage = (state) => {

    const fakeUsers = [{
        id: 1, photoUrl: 'https://i.pinimg.com/originals/f3/ea/14/f3ea147653aee2883c9e54545b8963f9.jpg',
        followed: false, fullName: "Nadegda", status: "I am frontender", location: {city: 'Ekb', country: 'Russia'}
    },
        {
            id: 2, photoUrl: 'https://i.pinimg.com/originals/f3/ea/14/f3ea147653aee2883c9e54545b8963f9.jpg',
            followed: true, fullName: "Elena", status: "Hello everybody!", location: {city: 'Ekb', country: 'Russia'}
        },
        {
            id: 3, photoUrl: 'https://i.pinimg.com/originals/f3/ea/14/f3ea147653aee2883c9e54545b8963f9.jpg',
            followed: true, fullName: "Yurii", status: "How are you?", location: {city: 'Ekb', country: 'Russia'}
        },
        {
            id: 4, photoUrl: 'https://i.pinimg.com/originals/f3/ea/14/f3ea147653aee2883c9e54545b8963f9.jpg',
            followed: true, fullName: "Andrey", status: "I am cook", location: {city: 'Spb', country: 'Russia'}
        }]

    const dispatch = useDispatch();

    const [chosenIndex, setChosenIndex] = useState(0);
    const [hasGetUser, setHasGetUser] = useState(false); //выключать при логауте
    const [hasChangeTags, setHasChangeTags] = useState(false); //выключать при логауте
    const [userIndex, setUserIndex] = useState(0); //возможно просто задать 0?

    const countUsers = state.users.us.length;

    useEffect(() => {
        if (chosenIndex === 0 && countUsers === 0) {
            dispatch(setUsersAC(fakeUsers));
        }

    }, [chosenIndex, countUsers]);

    const openAccountSetting = () => {
        setChosenIndex(1);
        !hasGetUser && dispatch(getUserAccountGetQuery());
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
        if (state.account.tags.length === 5) {
            setHasChangeTags(false)
        }
    };

    const onClickChangeTags = () => {
        setHasChangeTags(true)
        dispatch(deleteTagsAC());
    };

    const onClickSaveChangesAcc = () => {
        dispatch(saveChangeAccPostQuery(state.account));
    };

    const onClickLikeUser = () => {
        dispatch(likeUserPostQuery(state.users.us[userIndex].id));
    };

    const onClickNotLikeUser = () => {
        dispatch(deleteNotLikeUserAC());
    }

    return (
        <div className={style.content_wrapper}>
            <div className={style.chat}>
            </div>
            <div className={style.main_field}>
                {chosenIndex === 1 &&
                <>
                    <div className={style.button_acc} onClick={closeAccountSetting}>Выйти из настроек аккаунта</div>
                    <div>
                        <div className={style.content}>
                            <div className={style.form_header}>Рейтинг</div>
                            <span>{state.account.rating}</span>
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
                                    onChange={changeTags} multiple="multiple" size="10"
                                >
                                    {tagsArray.map((item) => {
                                        return <option key={item}>{item}</option>
                                    })}
                                </select>}

                                <div>
                                    {state.account.tags.map((item) => {
                                        return <div>{item}</div>
                                    })}
                                </div>
                            </div>

                            {!hasChangeTags &&
                            <button className={style.change_button} onClick={onClickChangeTags}>
                                Изменить
                            </button>}
                            <div>
                                <button onClick={onClickSaveChangesAcc}>
                                    Сохранить
                                </button>
                            </div>
                        </div>
                    </div>
                </>}
                {chosenIndex === 0 && <>
                    <div className={style.button_acc} onClick={openAccountSetting}>Аккаунт</div>

                    {/*// fakeUsers.map(u => <div key={u.id}>*/}
                    <span>
                <div>
                    <img
                        src={state.users.us[userIndex]?.photoUrl != null ? state.users.us[userIndex]?.photoUrl : './images/account.png'} height={'100px'}/>
                </div>
                       </span>
                    <span>
                    <span>
                        <div>{state.users.us[userIndex]?.fullName}</div>
                        <div>{state.users.us[userIndex]?.status}</div>
                </span>
                    <span>
                        <div>{state.users.us[userIndex]?.location.country}</div>
                        <div>{state.users.us[userIndex]?.location.city}</div>
                    </span>
                </span>

                    {/*{state.users.us.map((item) => {*/}
                    {/*    return <div key={item.fullName}>{item.fullName}</div>*/}
                    {/*})}*/}

                    <div>
                            <button onClick={onClickLikeUser

                                // props.toggleFollowingProgress(true, u.id);
                                // usersAPI.unfollow(u.id)
                                //     .then(data => {
                                //         if (data.resultCode == 0) {
                                //             props.follow(u.id)
                                //         }
                                //         props.toggleFollowingProgress(false, u.id);
                                //     }).catch(props.toggleFollowingProgress(false, u.id));
                            }>Like</button>
                        <button onClick={onClickNotLikeUser}>Next</button>
                    </div>

                </>}
            </div>
            {/*<div className={style.main_field}>*/}
            {/*</div>*/}
        </div>
    )
}

export default MainPage;
