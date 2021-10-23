import {useDispatch, useSelector} from "react-redux";
import React, {ChangeEvent, useEffect, useState} from "react";
import style from './MainPage.module.css';

import {
  changeAccBirthdayAC,
  changeAccFirstNameAC, changeAccLastNameAC, changeAccMiddleNameAC,
  changeBiographyAC,
  changeEducationAC,
  changeGenderAC,
  changePositionAC,
  changeSexualPreferenceAC,
  changeTagsAC,
  changeWorkPlaceAC,
  deleteNotLikeUserAC,
  deleteTagsAC, setEndFilterAgeAC, setFilterCommonTagsAC, setFilterRatingAC,
  setLikeUserAC,
  setPhotoContent, setPhotoParam, setStartFilterAgeAC,
  setUserDataAC,
  setUsersAC
} from "./MainPageAC";
import {tagsArray} from "./MainPage.helpers";
import {
  authGetUserQuery, changeAccEmailPostQuery, changeAccPassPostQuery,
  changePhotoPostQuery,
  getUsersPostQuery, likeUserPostQuery,
  logoutGetQuery,
  saveChangeAccPostQuery, updateAccountSettings
} from "../../api";
import {IPhotos, IState} from "../../types";
import {
  changeRegBirthdayAC,
  changeRegFirstNameAC,
  changeRegGenderAC,
  changeRegLastNameAC, changeRegMiddleNameAC,
  changeRegSexualPreferenceAC
} from "../Login/LoginAC";
import ChangeAccountSettingsModalWindow from "./components/ChangeAccountSettingsModalWindow/ChangeAccountSettingsModalWindow";

const getBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let encoded = reader.result!.toString().replace(/^data:(.*,)?/, '');
      if ((encoded.length % 4) > 0) {
        encoded += '='.repeat(4 - (encoded.length % 4));
      }
      resolve(encoded);
    };
    reader.onerror = error => reject(error);
  });
}

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
  const login = useSelector((state: IState) => state.login);

  // const userData = useSelector((state: IState) => state.login.userData);

  const [chosenIndex, setChosenIndex] = useState(0);
  const [hasGetUser, setHasGetUser] = useState(false); //выключать при логауте
  const [hasChangeTags, setHasChangeTags] = useState(false); //выключать при логауте
  const [userIndex, setUserIndex] = useState(0); //возможно просто задать 0?
  const [isSaveChange, setIsSaveChange] = useState(false); //выключать при логауте
  const [isOpenFilter, setIsOpenFilter] = useState(false); //выключать при логауте

  const [isShowChangeBirthday, setIsShowChangeBirthday] = useState(false);
  const [isShowChangeEmail, setIsShowChangeEmail] = useState(false);
  const [isShowChangePass, setIsShowChangePass] = useState(false);




  const countUsers = mainPage.users.length;

  useEffect(() => {
    if (chosenIndex === 0 && countUsers === 0) {
      dispatch(getUsersPostQuery());
    }
    // dispatch(getUsersPostQuery());


  }, [chosenIndex, countUsers]);

  useEffect(() => {
    dispatch(getUsersPostQuery());
  }, [mainPage.userFilters]);

  const openAccountSetting = () => {
    // dispatch(setUserDataAC(userData));
    setChosenIndex(1);
    //   !hasGetUser && dispatch(getUserAccountGetQuery());
    setHasGetUser(true);
  }

  const openAccountProperties = () => {
    // dispatch(setUserDataAC(userData));
    setChosenIndex(2);
    //   !hasGetUser && dispatch(getUserAccountGetQuery());
    // setHasGetUser(true);
  }

  const openUserFilter = () => {
    setIsOpenFilter(true);

  }

  const closeUserFilter = () => {
    setIsOpenFilter(false);

  }
  const setFilterAge = (parameter: string) => (e: any) => {
    if (parameter === 'start') {
      dispatch(setStartFilterAgeAC(e.target.value));
    }
    if (parameter === 'end') {
      dispatch(setEndFilterAgeAC(e.target.value));

    }
  }


  const setFilterRating = (e: any) => {
    dispatch(setFilterRatingAC(e.target.value));
  }
  const setFilterCommonTags = (e: any) => {
    dispatch(setFilterCommonTagsAC(e.target.value));
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
    if (mainPage.account.card.tags?.length === 5) {
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
    dispatch(likeUserPostQuery(mainPage.users[userIndex]?.id));
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

  const changePhoto = (number: number) => (e: any) => {
    dispatch(setPhotoParam(number, e.target.files[0].name, e.target.files[0].type));
    getBase64(e.target.files[0]).then(
      res => {
        dispatch(setPhotoContent(res, number));
        dispatch(changePhotoPostQuery(number));
        // dispatch(authGetUserQuery()); TODO открыть когда заработает запрос
      }
    );
  }
  const deletePhoto = (number: number) => (e: any) => {
    dispatch(changePhotoPostQuery(number, 'delete'));
    dispatch(authGetUserQuery());
  };

  const saveChangedFIO = () => {
    const newFio = `${mainPage.account.lastName} ${mainPage.account.firstName} ${mainPage.account.middleName}`;
    dispatch(updateAccountSettings("fio", newFio));
  }

  const saveChangedBirthday = () => {
    dispatch(updateAccountSettings("birthDate", mainPage.account.birthday));
  }

  // dispatch(changePhotoPostQuery(number));
//отправлять на сервер каждую фотку
//     обновлять всю инфу
  //сделать кнопук удаления каждой отдельной фотки и после этого обновлять инфу


  // const pnh = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAADgAAAAjACAYAAABL

  const changeFirstAccName = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeAccFirstNameAC(value));
  }

  const changeAccLastName = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeAccLastNameAC(value));
  }

  const changeAccMiddleName = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeAccMiddleNameAC(value));
  }

  const changeAccBirthday = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeAccBirthdayAC(value));
    dispatch(updateAccountSettings("birthDate", value));
  }

  const changeShowBirthday = () => {
    setIsShowChangeBirthday(true);
  }

  const changeAccEmail = () => {
    dispatch(changeAccEmailPostQuery());
    setIsShowChangeEmail(true);
  }

  const changeAccPass = () => {
    dispatch(changeAccPassPostQuery());
    setIsShowChangePass(true);
  }

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

              <div className={style.form_header}>Фото 1</div>
              {!mainPage.account.card.photos[0] &&
              <input type="file" id="file" name="file" onChange={changePhoto(0)}/>}

              {mainPage.account.card.photos[0] &&
              <span>
                <img height='100px'
                     src={`data:${mainPage.account.card.photos[0]?.format};base64,${mainPage.account.card.photos[0]?.content}`}
                     alt='фото 1'/>
                <div onClick={deletePhoto(0)}>Удалить фото</div>

                <div className={style.form_header}>Фото 2</div>
                {!mainPage.account.card.photos[1] &&
                <input type="file" id="file" name="file" onChange={changePhoto(1)}/>}
              </span>
              }

              {mainPage.account.card.photos[1] &&
              <span>
                            <img height='100px'
                                 src={`data:${mainPage.account.card.photos[1]?.format};base64,${mainPage.account.card.photos[1]?.content}`}
                                 alt='фото 2'/>

                            <div className={style.form_header}>Фото 3</div>
                {!mainPage.account.card.photos[2] &&
                <input type="file" id="file" name="file" onChange={changePhoto(2)}/>}
                                  </span>}

              {mainPage.account.card.photos[2] &&
              <span>
                            <img height='100px'
                                 src={`data:${mainPage.account.card.photos[2]?.format};base64,${mainPage.account.card.photos[2]?.content}`}
                                 alt='фото 3'/>

                            <div className={style.form_header}>Фото 4</div>
                {!mainPage.account.card.photos[3] &&
                <input type="file" id="file" name="file" onChange={changePhoto(3)}/>}
</span>}
              {mainPage.account.card.photos[3] &&
              <span>
                            <img height='100px'
                                 src={`data:${mainPage.account.card.photos[3]?.format};base64,${mainPage.account.card.photos[3]?.content}`}
                                 alt='фото 4'/>

                            <div className={style.form_header}>Фото 5</div>
                {!mainPage.account.card.photos[4] &&
                <input type="file" id="file" name="file" onChange={changePhoto(4)}/>}
                                    </span>}

              {mainPage.account.card.photos[4] &&
              <span>
                            <img height='100px'
                                 src={`data:${mainPage.account.card.photos[4]?.format};base64,${mainPage.account.card.photos[4]?.content}`}
                                 alt='фото 5'/>
</span>}
              <div className={style.form_header}>Месторасположение</div>
              <span>{mainPage.account.location}</span>

              <div className={style.form_header}>Рейтинг</div>
              <span>{mainPage.account.card.rating}</span>

              <div className={style.form_header}>Пол</div>
              <select onChange={changeGender}>
                <option>{'Не выбрано'}</option>
                <option value={'male'} selected={mainPage.account.card.gender === 'MALE'}>{'M'}</option>
                <option value={'female'} selected={mainPage.account.card.gender === 'FEMALE'}>{'Ж'}</option>
              </select>

              <div className={style.form_header}>Сексуальные предпочтения</div>
              <select onChange={changeSexualPreference}>
                <option>{'Не выбрано'}</option>
                <option value={'getero'}
                        selected={mainPage.account.card.sexualPreference === 'GETERO'}>{'гетеро'}</option>
                <option value={'bisexual'}
                        selected={mainPage.account.card.sexualPreference === 'BISEXUAL'}>{'би'}</option>
                {mainPage.account?.card?.gender === 'MALE' &&
                <option value={'GAY'} selected={mainPage.account.card.sexualPreference === 'GAY'}>{'гей'}</option>}
                {mainPage.account?.card?.gender === 'FEMALE' && <option value={'lesbi'}
                                                                        selected={mainPage.account.card.sexualPreference === 'LESBI'}>{'лесби'}</option>}
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

        {chosenIndex === 2 &&
        <div>
          <div className={style.button_acc} onClick={closeAccountSetting}>Выйти из настроек аккаунта</div>
          <div>
            <div className={style.content}>

              <div className={style.form_header}>Имя</div>
              <input type={'text'} onChange={changeFirstAccName} className={style.form_input}
                     value={mainPage.account.firstName}/>

              <div className={style.form_header}>Отчество</div>
              <input type={'text'} onChange={changeAccMiddleName} className={style.form_input}
                     value={mainPage.account.middleName}/>


              <div className={style.form_header}>Фамилия</div>
              <input type={'text'} onChange={changeAccLastName} className={style.form_input}
                     value={mainPage.account.lastName}/>

              <button onClick={saveChangedFIO}>
                Сохранить изменения
              </button>

              <div className={style.form_header}>Дата рождения</div>

              <div>{mainPage.account.birthday}</div>

              {
                !isShowChangeBirthday &&
                <button onClick={changeShowBirthday}>
                  Поменять дату рождения
                </button>
              }
              {isShowChangeBirthday &&
              <input className={style.form_input} type={'date'}
                     onChange={changeAccBirthday}
                     value={mainPage.account.birthday}/>}

                {/*<button onClick={saveChangedBirthday}>*/}
                {/*  Сохранить изменения*/}
                {/*</button>*/}


              <div className={style.form_header}>e-mail</div>
              <button onClick={changeAccEmail}>
                Поменять email
              </button>
              {isShowChangeEmail &&
              <div>{'Перейдите по ссылке из почты'}</div>
              }
              {/*TODO change pass*/}

              <div className={style.form_header}>Пароль</div>
              <button onClick={changeAccPass}>
                Поменять пароль
              </button>
              {isShowChangePass &&
              <div>{'Перейдите по ссылке из почты'}</div>
              }

              {mainPage.changeAccountSetting.isValidPrevEmail &&
              <div>

              </div>
              }

              {/*<input className={style.form_input}*/}
              {/*       value={login.authData.email}/>*/}

            </div>
          </div>
        </div>}

        {chosenIndex === 0 &&
        <div>
          <div className={style.button_acc} onClick={openAccountSetting}>Аккаунт</div>
          <div className={style.button_acc} onClick={openAccountProperties}>Настройки аккаунта</div>
          <div className={style.button_acc} onClick={openUserFilter}>Фильтр</div>
          {/*{<div className={style.button_acc} onClick={closeUserFilter}>Закрыть фильтр</div>}*/}

          {isOpenFilter &&
          <div>
            <div className={style.button_acc} onClick={closeUserFilter}>Закрыть фильтр</div>
            <div className={style.userFilter}>
              <p>Фильтр
              </p>
              <p>Возраст
                <div>От
                  <input type='number' onChange={setFilterAge("start")} value={mainPage.userFilters.ageBy}/>
                </div>
                <div>До
                  <input type='number' onChange={setFilterAge("end")} value={mainPage.userFilters.ageTo}/>
                </div>
              </p>
              <p>Рейтинг
                <div>
                  <input type='number' onChange={setFilterRating} value={mainPage.userFilters.rating}/>
                </div>
              </p>
              <p>Количество общих интересов
                <div>
                  <input type='number' onChange={setFilterCommonTags} value={mainPage.userFilters.commonTagsCount}/>
                </div>
              </p>

            </div>
          </div>
          }

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
                        <div>{mainPage.users[userIndex]?.middleName}</div>
                        <div>{mainPage.users[userIndex]?.lastName}</div>

                      {mainPage.users[userIndex]?.card.photos?.map((el: IPhotos) => {
                        return el &&
                          <span>
                            <img height='100px' src={`data:${el.format};base64,${el.content}`}
                                 alt='фото'/>
</span>
                      })
                      }

                      <div>{mainPage.users[userIndex]?.card.rating}</div>
                </span>
                    <span>
                        <div>{mainPage.users[userIndex]?.yearsOld}</div>
                        <div>{mainPage.users[userIndex]?.location}</div>
                        <div>{mainPage.users[userIndex]?.card.biography}</div>
                        <div>{mainPage.users[userIndex]?.card.workPlace}</div>
                        <div>{mainPage.users[userIndex]?.card.position}</div>
                        <div>{mainPage.users[userIndex]?.card.education}</div>

                      <div>
                        Интересы:
                        {mainPage.users[userIndex]?.card.tags?.map((item: string) => {
                          return <div>{item}</div>
                        })}
                </div>

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
            }>Like
            </button>
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
