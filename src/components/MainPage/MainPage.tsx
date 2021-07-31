import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import style from './MainPage.module.css';

import {
    changeBiographyAC,
    changeEducationAC, changeGenderAC,
    changePositionAC, changeSexualPreferenceAC,
    changeTagsAC,
    changeWorkPlaceAC, deleteNotLikeUserAC, deleteTagsAC, setLikeUserAC, setUserDataAC, setUsersAC
} from "./MainPageAC";
import {tagsArray} from "./MainPage.helpers";
import {logoutGetQuery, saveChangeAccPostQuery} from "../../api";
import {IState} from "../../types";
import {changeRegGenderAC, changeRegSexualPreferenceAC} from "../Login/LoginAC";

const MainPage = (state: IState) => {

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

    const mainPage = useSelector((state: IState) => state.mainPage);
    // const userData = useSelector((state: IState) => state.login.userData);

    const [chosenIndex, setChosenIndex] = useState(0);
    const [hasGetUser, setHasGetUser] = useState(false); //выключать при логауте
    const [hasChangeTags, setHasChangeTags] = useState(false); //выключать при логауте
    const [userIndex, setUserIndex] = useState(0); //возможно просто задать 0?
    const [isSaveChange, setIsSaveChange] = useState(false); //выключать при логауте

    const countUsers = mainPage.users.length;

    useEffect(() => {
        if (chosenIndex === 0 && countUsers === 0) {
            dispatch(setUsersAC([]));
        }

    }, [chosenIndex, countUsers]);

    const openAccountSetting = () => {
        // dispatch(setUserDataAC(userData));
        setChosenIndex(1);
     //   !hasGetUser && dispatch(getUserAccountGetQuery());
        setHasGetUser(true);
    }

    const closeAccountSetting = () => {
        setChosenIndex(0);
    }

    // const changeOrient = (orient: any) => {
    //     dispatch(changeOrientAC(orient.target.value));
    // };

    const changeRegName = () => {
        // dispatch(changeOrientAC(orient.target.value));
    };

    const changeEducation = (education: any) => {
        dispatch(changeEducationAC(education.target.value));
    };

    const changeWorkPlace = (workPlace: any) => {
        dispatch(changeWorkPlaceAC(workPlace.target.value));
    };

    const changePosition = (position: any) => {
        dispatch(changePositionAC(position.target.value));
    };

    const changeBiography = (biography: any) => {
        dispatch(changeBiographyAC(biography.target.value));
    };

    const changeTags = (tags: any) => {
        dispatch(changeTagsAC(tags.target.value));
        if (mainPage.account.card.tags.length === 5) {
            setHasChangeTags(false)
        }
    };

    const onClickChangeTags = () => {
        setHasChangeTags(true)
        dispatch(deleteTagsAC());
    };

    const onClickSaveChangesAcc = () => {
       dispatch(saveChangeAccPostQuery(mainPage.account.card));
        setIsSaveChange(true);
    };

    const onClickLikeUser = () => {
     //   dispatch(likeUserPostQuery(state.users.us[userIndex].id));
    };

    const onClickNotLikeUser = () => {
        dispatch(deleteNotLikeUserAC());
    }

    const onClickLogout = () => {
        dispatch(logoutGetQuery());
    }

    const changeGender = (e: React.FormEvent<HTMLSelectElement>) => {
        dispatch(changeGenderAC(e.currentTarget.value));
    };

    const changeSexualPreference = (e: React.FormEvent<HTMLSelectElement>) => {
        dispatch(changeSexualPreferenceAC(e.currentTarget.value));
    };

    return (
        <div className={style.content_wrapper}>
            <div className={style.chat}>
            </div>
            <div className={style.main_field}>
                {chosenIndex === 1 &&
                <div>
                    <div className={style.button_acc} onClick={closeAccountSetting}>Выйти из настроек аккаунта</div>
                    <div>
                        <div className={style.content}>
                            <div className={style.form_header}>Имя</div>
                            <span>{mainPage.account.firstName}</span>

                            <div className={style.form_header}>Отчество</div>
                            <span>{mainPage.account.middleName}</span>

                            <div className={style.form_header}>Фамилия</div>
                            <span>{mainPage.account.lastName}</span>

                            <div className={style.form_header}>Возраст</div>
                            <span>{mainPage.account.yearsOld}</span>

                            <div className={style.form_header}>Месторасположение</div>
                            <span>{mainPage.account.location}</span>

                            <div className={style.form_header}>Рейтинг</div>
                            <span>{mainPage.account.card.rating}</span>

                            <div className={style.form_header}>Пол</div>
                            <select onChange={changeGender}>
                                <option>{'Не выбрано'}</option>
                                <option value={'male'} selected={mainPage.account.card.gender === 'male'}>{'M'}</option>
                                <option value={'female'} selected={mainPage.account.card.gender === 'female'}>{'Ж'}</option>
                            </select>

                            <div className={style.form_header}>Сексуальные предпочтения</div>
                            <select onChange={changeSexualPreference}>
                                <option>{'Не выбрано'}</option>
                                <option value={'getero'} selected={mainPage.account.card.sexualPreference === 'getero'}>{'гетеро'}</option>
                                <option value={'bisexual'} selected={mainPage.account.card.sexualPreference === 'bisexual'}>{'би'}</option>
                                {mainPage.account?.card?.gender === 'male' && <option value={'gay'} selected={mainPage.account.card.sexualPreference === 'gay'}>{'гей'}</option>}
                                {mainPage.account?.card?.gender === 'female' && <option value={'lesbi'} selected={mainPage.account.card.sexualPreference === 'lesbi'}>{'лесби'}</option>}
                            </select>

                            <div className={style.form_header}>Биография</div>
                            <textarea onChange={changeBiography} className={style.form_input}
                            value={mainPage.account?.card?.biography}/>

                            {/*<div className={style.form_header}>Фото</div>*/}

                            <div className={style.form_header}>Образование</div>
                            <textarea onChange={changeEducation} className={style.form_input}
                                      value={mainPage.account?.card?.education}/>


                            <div className={style.form_header}>Место работы</div>
                            <textarea onChange={changeWorkPlace} className={style.form_input}
                                      value={mainPage.account?.card?.workPlace}/>


                            <div className={style.form_header}>Должность</div>
                            <textarea onChange={changePosition} className={style.form_input}
                                      value={mainPage.account?.card?.position}/>


                            <div className={style.form_header}>Интересы</div>
                            <div className={style.tags}>
                                {hasChangeTags &&
                                <select
                                    onChange={changeTags} multiple={true} size={10}
                                >
                                    {tagsArray.map((item: string) => {
                                        return <option key={item}>{item}</option>
                                    })}
                                </select>}

                                <div>
                                    {mainPage.account?.card?.tags?.map((item: string) => {
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
                            {
                                isSaveChange &&
                                <div>Изменения сохранены</div>
                            }
                        </div>
                    </div>
                </div>}
                {chosenIndex === 0 && <div>
                    <div className={style.button_acc} onClick={openAccountSetting}>Аккаунт</div>

                    {/*// fakeUsers.map(u => <div key={u.id}>*/}
                    <span>
                <div>
                    {/*<img*/}
                    {/*     src={mainPage.users[userIndex]?.photoUrl != null ? mainPage.users[userIndex]?.photoUrl : './images/account.png'} height={'100px'}/>*/}
                </div>
                       </span>
                    <span>
                    <span>
                        <div>{mainPage.users[userIndex]?.firstName}</div>
                        <div>{mainPage.users[userIndex]?.card.rating}</div>
                </span>
                    <span>
                        <div>{mainPage.users[userIndex]?.yearsOld}</div>
                        <div>{mainPage.users[userIndex]?.location}</div>
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

                </div>}
                <p className={style.logout} onClick={onClickLogout}>Выйти</p>

            </div>
            {/*<div className={style.main_field}>*/}
            {/*</div>*/}
        </div>
    )
}

export default MainPage;
