import React, {ChangeEvent, useState} from 'react';
import style from './UserSettings.module.css';
import {tagsArray} from "../../components/MainPage/MainPage.helpers";
import {useDispatch, useSelector} from "react-redux";
import {IState} from "../../types";
import {
  changeAccBirthdayAC,
  changeAccFirstNameAC,
  changeAccLastNameAC,
  changeAccMiddleNameAC,
  changeBiographyAC,
  changeEducationAC,
  changeGenderAC,
  changePositionAC,
  changeSexualPreferenceAC,
  changeTagsAC,
  changeWorkPlaceAC,
  setEndFilterAgeAC,
  setFilterCommonTagsAC,
  setFilterLocationAC,
  setFilterRatingAC,
  setPhotoContent,
  setPhotoParam,
  setStartFilterAgeAC
} from "../../components/MainPage/MainPageAC";
import {
  changeAccEmailPostQuery,
  changeAccPassPostQuery,
  changePhotoPostQuery,
  saveChangeAccPostQuery,
  setUserFilterPutQuery,
  updateAccountSettings
} from "../../api";
import {Button, DatePicker, InputNumber, Select, Upload} from "antd";
import {
  DeleteOutlined,
  LeftOutlined,
  PlusOutlined,
  RightOutlined
} from "@ant-design/icons";
import {Input} from 'antd';
import Title from "antd/es/typography/Title";
import cc from "classnames";
import {
  actionDataForPhoto,
  englishLetter,
  forbiddenForLocation,
  forbiddenForText,
  getBase64,
  russianLetter
} from "../../helpers";

const {TextArea} = Input;
const {Option} = Select;

const UserSettings = () => {

  const dispatch = useDispatch();

  const mainPage = useSelector((state: IState) => state.mainPage);
  const userAccount = mainPage.account;

  const [photoIndex, setPhotoIndex] = useState(0);
  const [isShowChangeEmail, setIsShowChangeEmail] = useState(false);
  const [isShowChangePass, setIsShowChangePass] = useState(false);

  let userPhotos = [...userAccount.card.photos];
  userPhotos?.length > 1 && userPhotos.pop();

  const options: any = [];

  for (let i = 0; i < 44; i++) {
    const value = tagsArray[i];
    options.push({
      label: value,
      value,
    });
  }

  const changeTags = (newValue: string[]) => {
    if (newValue.length > 5) {
      let currentTags = newValue.slice(0, 5);
      dispatch(changeTagsAC(currentTags));
    } else {
      dispatch(changeTagsAC(newValue));
    }
  }

  const selectProps = {
    mode: 'multiple' as const,
    style: {width: '100%'},
    maxTagCount: 5,
    size: 'small' as const,
    tags: userAccount.card.tags,
    value: userAccount.card.tags,
    options,
    onChange: (newValue: string[]) => changeTags(newValue),
    onBlur: () => onClickSaveChangesAcc(),
    placeholder: 'Интересы',
  };

  const changePhotoIndex = (number: number) => () => {
    setPhotoIndex(prevState => prevState + number);
  };

  const changeEducation = ({target: {value}}: ChangeEvent<HTMLTextAreaElement>) => {
    if (value === '' || (value.match(russianLetter) && !value.match(forbiddenForText))) {
      dispatch(changeEducationAC(value));
    }
  };

  const changeWorkPlace = ({target: {value}}: ChangeEvent<HTMLTextAreaElement>) => {
    if (value === '' || (value.match(russianLetter) && !value.match(forbiddenForText))) {
      dispatch(changeWorkPlaceAC(value));
    }
  };

  const changePosition = ({target: {value}}: ChangeEvent<HTMLTextAreaElement>) => {
    if (value === '' || (value.match(russianLetter) && !value.match(forbiddenForText))) {
      dispatch(changePositionAC(value));
    }
  };

  const changeBiography = ({target: {value}}: ChangeEvent<HTMLTextAreaElement>) => {
    if (value === '' || (value.match(russianLetter) && !value.match(forbiddenForText))) {
      dispatch(changeBiographyAC(value));
    }
  };

  const onClickSaveChangesAcc = () => {
    dispatch(saveChangeAccPostQuery(userAccount.card));
  };

  const changeGender = (gender: string) => {
    dispatch(changeGenderAC(gender));
  };

  const changeSexualPreference = (preference: string) => {
    dispatch(changeSexualPreferenceAC(preference));
  };

  const changePhoto = (number: number) => (e: any) => {
    if (e.file?.status === 'done' &&
      (e.file?.type === 'image/jpeg' || e.file?.type === 'image/png' || e.file?.type === 'image/jpg')) {
      dispatch(setPhotoParam(number, e.file.name, e.file.type));
      getBase64(e.file.originFileObj).then(
        res => {
          dispatch(setPhotoContent(res, number));
          dispatch(changePhotoPostQuery(number, 'save'));
        }
      );
    }
  }

  const deletePhoto = (number: number) => (e: any) => {
    dispatch(changePhotoPostQuery(number, 'delete'));
  };

  const changeFirstAccName = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    if (value === '' || (value.match(russianLetter) && !value.match(forbiddenForText))) {
      dispatch(changeAccFirstNameAC(value));
    }
  };

  const changeAccLastName = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    if (value === '' || (value.match(russianLetter) && !value.match(forbiddenForText))) {
      dispatch(changeAccLastNameAC(value));
    }
  };

  const changeAccMiddleName = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    if (value === '' || (value.match(russianLetter) && !value.match(forbiddenForText))) {
      dispatch(changeAccMiddleNameAC(value));
    }
  };

  const saveChangedFIO = () => {
    const newFio = `${mainPage.account.lastName} ${mainPage.account.firstName} ${mainPage.account.middleName}`;
    dispatch(updateAccountSettings("fio", newFio));
  }

  const changeAccBirthday = (date: any, dateString: string) => {
    dispatch(changeAccBirthdayAC(dateString));
    dispatch(updateAccountSettings("birthDate", dateString));
  }

  const changeAccEmail = () => {
    dispatch(changeAccEmailPostQuery());
    setIsShowChangeEmail(true);
  }

  const changeAccPass = () => {
    dispatch(changeAccPassPostQuery());
    setIsShowChangePass(true);
  }

  const setFilterAge = (parameter: string) => (value: number) => {
    if (parameter === 'start') {
      dispatch(setStartFilterAgeAC(value));
    }
    if (parameter === 'end') {
      dispatch(setEndFilterAgeAC(value));
    }
  }

  const setFilterRating = (value: number) => {
    dispatch(setFilterRatingAC(value));
  }

  const setFilterCommonTags = (value: number) => {
    dispatch(setFilterCommonTagsAC(value));
  }

  const setFilterLocation = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    if (value === '' || (value.match(englishLetter) && !value.match(forbiddenForLocation))) {
      dispatch(setFilterLocationAC(value));
    }
  }

  const getUsersByFilters = () => {
    dispatch(setUserFilterPutQuery());
  }

  return (
    <div>
      <div>
        <div>
          {`${userAccount.lastName} ${userAccount.firstName} ${userAccount.middleName}`}
        </div>
        <div className={style.user_photos}>
          {userPhotos[photoIndex - 1]?.content &&
          <div className={style.left_arrow} onClick={changePhotoIndex(-1)}>
            <LeftOutlined style={{fontSize: '1.2rem'}}/>
          </div>
          }
          {userPhotos[photoIndex]?.content ?
            <div className={style.image}>
              <img height={'200px'}
                   src={`data:${userPhotos[photoIndex].format};base64,${userPhotos[photoIndex].content}`}
                   alt='фото'/>
              <div className={style.image_bucket}>
                <DeleteOutlined onClick={deletePhoto(photoIndex)}/>
              </div>
            </div>
            :
            <div className={style.empty_image}>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action={actionDataForPhoto}
                onChange={changePhoto(photoIndex)}
              >
                <div>
                  <PlusOutlined/>
                  <div style={{marginTop: 8}}>Upload</div>
                </div>
              </Upload>
            </div>
          }
          {userPhotos[photoIndex]?.content && photoIndex !== 4 &&
          <div className={style.right_arrow} onClick={changePhotoIndex(1)}>
            <RightOutlined style={{fontSize: '1.2rem'}}/>
          </div>
          }
        </div>
        <div className={style.elem}>
          {`${userAccount.location} ${userAccount.yearsOld} ${userAccount.card.rating?.toFixed(1)}`}
        </div>
        <Select
          placeholder="Пол"
          onChange={changeGender}
          size={'small'}
          defaultValue={userAccount.card.gender}
          className={style.elem}
          onBlur={onClickSaveChangesAcc}
        >
          <Option value="male">М</Option>
          <Option value="female">Ж</Option>
        </Select>
        <Select
          placeholder="Предпочтения"
          onChange={changeSexualPreference}
          size={'small'}
          style={{width: '90px', marginLeft: '10px'}}
          defaultValue={userAccount.card.sexualPreference}
          onBlur={onClickSaveChangesAcc}
        >
          <Option value="getero">гетеро</Option>
          <Option value="bisexual">би</Option>
          {userAccount?.card?.gender === 'male' &&
          <Option value={'gay'} selected={userAccount.card.sexualPreference === 'gay'}>{'гей'}</Option>}
          {userAccount?.card?.gender === 'female' &&
          <Option value={'lesbi'}
                  selected={userAccount.card.sexualPreference === 'lesbi'}>{'лесби'}</Option>}
        </Select>
        <TextArea
          onChange={changeEducation}
          onBlur={onClickSaveChangesAcc}
          placeholder="Образование"
          autoSize={{minRows: 1, maxRows: 1}}
          value={userAccount?.card?.education}
          className={style.elem}
        />
        <TextArea
          onChange={changePosition}
          onBlur={onClickSaveChangesAcc}
          placeholder="Должность"
          autoSize={{minRows: 1, maxRows: 1}}
          value={userAccount?.card?.position}
          className={style.elem}
        />
        <TextArea
          onChange={changeWorkPlace}
          onBlur={onClickSaveChangesAcc}
          placeholder="Место работы"
          autoSize={{minRows: 1, maxRows: 1}}
          value={userAccount?.card?.workPlace}
          className={style.elem}
        />
        <TextArea
          onChange={changeBiography}
          onBlur={onClickSaveChangesAcc}
          placeholder="Биография"
          autoSize={{minRows: 2, maxRows: 3}}
          value={userAccount?.card?.biography}
          className={style.elem}
        />
        <Select {...selectProps} className={style.elem}/>
      </div>
      <div>
        <Title level={5} className={style.title}>
          Настройки аккаунта
        </Title>
        <div className={style.content}>
          <Input type={'text'} onChange={changeFirstAccName}
                 value={userAccount.firstName}
                 onBlur={saveChangedFIO}/>
          <Input type={'text'} onChange={changeAccMiddleName} className={style.elem}
                 value={userAccount.middleName}
                 onBlur={saveChangedFIO}/>
          <Input type={'text'} onChange={changeAccLastName} className={style.elem}
                 value={userAccount.lastName}
                 onBlur={saveChangedFIO}/>
          <DatePicker onChange={changeAccBirthday}
                      placeholder={mainPage.account.birthday}
                      className={cc(style.whole_wide, style.elem)}
                      allowClear={false}/>
          <div>
            <Button className={cc(style.elem, style.change_button)}
                    onClick={changeAccEmail} size={'small'}>
              Поменять email
            </Button>
            {isShowChangeEmail &&
            <div className={style.text_answer}>
              Перейдите по ссылке из почты
            </div>
            }
          </div>
          <Button className={cc(style.elem, style.change_button)} size={'small'}
                  onClick={changeAccPass}>
            Поменять пароль
          </Button>
          {isShowChangePass &&
          <div className={style.text_answer}>
            Перейдите по ссылке из почты
          </div>
          }
        </div>
      </div>
      <div>
        <Title level={5} className={style.title}>
          Настройки поиска
        </Title>
        <div>
          <div>
            Возраст
          </div>
          <div>
            <InputNumber size="small" min={0} max={150} defaultValue={18}
                         value={mainPage.userFilters.ageBy} onChange={setFilterAge("start")}
                         onBlur={getUsersByFilters}/>
            {' - '}
            <InputNumber size="small" min={0} max={150} defaultValue={90}
                         value={mainPage.userFilters.ageTo} onChange={setFilterAge("end")}
                         onBlur={getUsersByFilters}/>
          </div>
          <div className={style.elem}>
            Рейтинг
          </div>
          <div>
            <InputNumber size="small" min={0} max={10} defaultValue={0}
                         value={mainPage.userFilters.rating} onChange={setFilterRating}
                         onBlur={getUsersByFilters}/>
          </div>
          <div className={style.elem}>
            Количество общих интересов
          </div>
          <div>
            <InputNumber size="small" min={0} max={5} defaultValue={0}
                         value={mainPage.userFilters.commonTagsCount} onChange={setFilterCommonTags}
                         onBlur={getUsersByFilters}/>
          </div>
          <div className={style.elem}>
            Месторасположение
          </div>
          <div>
            <Input size="small" type={'text'} defaultValue={'Moscow'}
                   value={mainPage.userFilters.location} onChange={setFilterLocation}
                   onBlur={getUsersByFilters}/>
          </div>
        </div>
      </div>
    </div>
  )
};

export default UserSettings;