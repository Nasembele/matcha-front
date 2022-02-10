import React, {useState} from 'react';
import style from './UserSettings.module.css';
import {tagsArray} from "../../components/MainPage/MainPage.helpers";
import {useDispatch, useSelector} from "react-redux";
import {IState} from "../../types";
import {
  changeBiographyAC,
  changeEducationAC, changeGenderAC,
  changePositionAC, changeSexualPreferenceAC, changeTagsAC,
  changeWorkPlaceAC, setPhotoContent, setPhotoParam
} from "../../components/MainPage/MainPageAC";
import {authGetUserQuery, changePhotoPostQuery, saveChangeAccPostQuery} from "../../api";
import {Avatar, Select, Upload} from "antd";
import {
  DeleteOutlined,
  LeftOutlined,
  LoadingOutlined,
  PlusOutlined,
  RightOutlined,
  UserOutlined
} from "@ant-design/icons";
import {Input} from 'antd';

const {TextArea} = Input;
const {Option} = Select;

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

type Props = {}

const UserSettings = ({}: Props) => {

  const dispatch = useDispatch();

  const userAccount = useSelector((state: IState) => state.mainPage.account);

  const [photoIndex, setPhotoIndex] = useState(0);

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
  }
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
    dispatch(setPhotoParam(number, e.file.name, e.file.type));
    getBase64(e.file.originFileObj).then(
      res => {
        dispatch(setPhotoContent(res, number));
        dispatch(changePhotoPostQuery(number, 'save'));
        // dispatch(authGetUserQuery()); TODO открыть когда заработает запрос
      }
    );
  }
  const deletePhoto = (number: number) => (e: any) => {
    dispatch(changePhotoPostQuery(number, 'delete'));
    dispatch(authGetUserQuery());
  };

  return (
    <div className={style.wrapper}>
      <div>
        <div>
          {`${userAccount.lastName} ${userAccount.firstName} ${userAccount.middleName}`}
        </div>
        <div className={style.user_photos}>
          {userAccount.card.photos[photoIndex - 1]?.content &&
          <div className={style.left_arrow} onClick={changePhotoIndex(-1)}>
            <LeftOutlined style={{fontSize: '1.2rem'}}/>
          </div>
          }
          {userAccount.card.photos[photoIndex]?.content ?
            <div className={style.image}>
              <img height={'200px'}
                   src={`data:${userAccount.card.photos[photoIndex].format};base64,${userAccount.card.photos[photoIndex].content}`}
                   alt='фото'/>
              {photoIndex === userAccount.card.photos.length - 1 &&
              <div className={style.image_bucket}>
                <DeleteOutlined onClick={deletePhoto(photoIndex)}/>
              </div>
              }
            </div>
            :
            <div className={style.empty_image}>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                onChange={changePhoto(photoIndex)}
              >
                <div>
                  <PlusOutlined/>
                  <div style={{marginTop: 8}}>Upload</div>
                </div>
              </Upload>
            </div>
          }
          {userAccount.card.photos[photoIndex]?.content && photoIndex !== 4 &&
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
          // optionFilterProp="children"
          onChange={changeGender}
          size={'small'}
          defaultValue={userAccount.card.gender}
          className={style.elem}
        >
          <Option value="male">М</Option>
          <Option value="female">Ж</Option>
        </Select>

        <Select
          placeholder="Предпочтения"
          // optionFilterProp="children"
          onChange={changeSexualPreference}
          size={'small'}
          style={{width: '90px', marginLeft: '10px'}}
          defaultValue={userAccount.card.sexualPreference}
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
    </div>
  )
};


export default UserSettings;