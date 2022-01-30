import React, {Children, ReactNode, useState} from 'react';
import style from './UserCard.module.css';
import cc from "classnames";
import {IPhotos, IState, IUserData} from "../../types";
import {
  CloseCircleTwoTone,
  DownCircleTwoTone,
  HeartTwoTone,
  InfoCircleTwoTone,
  LeftOutlined, MinusCircleTwoTone, RadiusBottomrightOutlined, RightCircleTwoTone,
  RightOutlined, UserOutlined
} from "@ant-design/icons";
import {Avatar, Tag} from "antd";
import {likeUserPutQuery, setVisitUserPutQuery} from "../../api";
import {setAction} from "../../socket";
import {useDispatch, useSelector} from "react-redux";
import {deleteNotLikeUserAC} from "../../components/MainPage/MainPageAC";

type IProps = {
  user: IUserData,
  isCurrentUser: boolean,
  actionAfterTakeLike?: Function
}

const UserCard = ({
                    user,
                    isCurrentUser,
                    actionAfterTakeLike
                  }: IProps) => {

  const dispatch = useDispatch();

  const [photoIndex, setPhotoIndex] = useState(0);

  const [isShowInfo, setIsShowInfo] = useState(false);

  const mainPage = useSelector((state: IState) => state.mainPage);

  const changePhotoIndex = (number: number) => () => {
    setPhotoIndex(prevState => prevState + number);
  }

  const onClickVisitUser = () => {
    dispatch(setVisitUserPutQuery(user.id));
    setAction('VISIT', mainPage.account.id, user.id);
  };

  const changeShowInfo = () => {
    setIsShowInfo(prevState => !prevState);
    onClickVisitUser();
  };

  const onClickLikeUser = () => {
    dispatch(likeUserPutQuery(user.id, 'LIKE'));
  };

  const onClickDisLikeUser = () => {
    dispatch(likeUserPutQuery(user.id, 'DISLIKE'));
    dispatch(deleteNotLikeUserAC());
  };

  const onClickNotLikeUser = () => {
    dispatch(deleteNotLikeUserAC());
  };

  const onClickTakeLikeUser = () => {
    dispatch(likeUserPutQuery(user.id, 'TAKE_LIKE'));
    onClickNotLikeUser();
    if (actionAfterTakeLike) {
      actionAfterTakeLike();
    }
  };

  return (
    <div className={style.wrapper}>
      {!isShowInfo &&
      <span>
        <div className={style.card_title}>
          <div className={style.name_and_age}>
            <div className={style.name}>
              {user.firstName}
            </div>
            <div className={style.age}>
              {user.yearsOld}
            </div>
          </div>
        </div>
         <div className={style.icon_info_container} onClick={changeShowInfo}>
            <InfoCircleTwoTone twoToneColor="rgb(75, 79, 206)" style={{fontSize: '2rem'}}/>
          </div>
        <span>
          {!user.card.photos[0]?.content &&
          <Avatar shape="square" size={400} icon={<UserOutlined/>}
                  style={{backgroundColor: '#fde3cf', height: '600px', width: '400px'}}/>}
          {user.card.photos[photoIndex - 1]?.content &&
        <div className={style.left_arrow} onClick={changePhotoIndex(-1)}>
          <LeftOutlined style={{fontSize: '30px', color: 'white'}}/>
        </div>
        }
          {user.card.photos[photoIndex]?.content &&
          <img height={'100%'}
               src={`data:${user.card.photos[photoIndex].format};base64,${user.card.photos[photoIndex].content}`}
               alt='фото'/>
          }
          {user.card.photos[photoIndex + 1]?.content &&
          <div className={style.right_arrow} onClick={changePhotoIndex(1)}>
            <RightOutlined style={{fontSize: '30px', color: 'white'}}/>
          </div>
          }
        </span>
      </span>
      }
      {
        isShowInfo &&
        <div className={style.info_card}>
          <div className={style.info_card_title}>
            <div className={style.name_and_age}>
              <div className={style.second_name}>
                {user.firstName}
              </div>
              <div className={style.second_age}>
                {user.yearsOld}
              </div>
            </div>
            <div className={style.rating_container}>
              <div className={cc(style.second_name, style.rating)}>
                {user.card.rating && user.card.rating.toFixed(1)}
              </div>
              <DownCircleTwoTone twoToneColor="rgb(75, 79, 206)" style={{fontSize: '2rem'}} onClick={changeShowInfo}/>
            </div>
          </div>
          <div className={cc(style.flex, style.space_between)}>
            <div className={style.text}>
              {user.location}
            </div>
            <div className={style.flex}>
              <div className={cc(style.text, style.margin)}>
                {user.card.gender}
              </div>
              <div className={style.text}>
                {user.card.sexualPreference}
              </div>
            </div>
          </div>
          <div className={style.small_text}>
            {user.card.education}
          </div>
          <div className={style.small_text}>
            {`${user.card.position}, ${user.card.workPlace}`}
          </div>
          <div className={style.tags_container}>
            {
              user.card.tags?.map((el: string) => {
                return <Tag color="magenta" style={{marginTop: '5px'}}>
                  {`#${el}`}
                </Tag>
              })
            }
          </div>
          <div className={style.biography_text}>
            {user.card.biography}
          </div>
        </div>
      }
      {!isCurrentUser &&
        <div className={style.like_container}>
          {mainPage.currentUser?.match ?
            <div className={style.like_content}>
              <MinusCircleTwoTone twoToneColor="#FF0000" style={{fontSize: '3rem'}} onClick={onClickTakeLikeUser}/>
              <RightCircleTwoTone twoToneColor="#52c41a" style={{fontSize: '3rem'}} onClick={onClickNotLikeUser}/>
            </div> :
            <div className={style.like_content}>
              <HeartTwoTone twoToneColor="#eb2f96" style={{fontSize: '3rem'}} onClick={onClickLikeUser}/>
              <CloseCircleTwoTone style={{fontSize: '3rem'}} onClick={onClickDisLikeUser}/>
            </div>
          }
          {mainPage.currentUser?.match &&
          <div className={cc(style.match_text, isShowInfo && style.text_color)}>
            матч!
          </div>}
        </div>
      }
      {isCurrentUser &&
      <div className={style.like_container}>
        <div className={style.like_content}>
          <MinusCircleTwoTone twoToneColor="#FF0000" style={{fontSize: '3rem'}} onClick={onClickTakeLikeUser}/>
        </div>
      </div>
      }
    </div>
  )
};


export default UserCard;