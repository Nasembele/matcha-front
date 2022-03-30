import React, {useEffect, useMemo, useState} from 'react';
import style from './UserCard.module.css';
import cc from "classnames";
import {IState, IUserData} from "../../types";
import {
  AlertTwoTone,
  CloseCircleTwoTone,
  DownCircleTwoTone,
  HeartTwoTone,
  InfoCircleTwoTone,
  LeftOutlined,
  MinusCircleTwoTone,
  RightCircleTwoTone,
  RightOutlined,
  StopTwoTone,
  UserOutlined
} from "@ant-design/icons";
import {Avatar, Tag} from "antd";
import {getUserStatus, likeUserPutQuery, setVisitUserPutQuery} from "../../api";
import {useDispatch, useSelector} from "react-redux";
import {deleteNotLikeUserAC} from "../../components/MainPage/MainPageAC";
import {setAction} from "../../components/Chat/Chat.reducer";
import {Typography} from 'antd';
import moment from "moment";

const {Text} = Typography;

type IProps = {
  user: IUserData,
  isCurrentUser: boolean,
  actionAfterTakeLike?: Function,
  isShowButton?: boolean,
}

const UserCard = ({
                    user,
                    isCurrentUser,
                    actionAfterTakeLike,
                    isShowButton = true
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
    dispatch(setAction('VISIT', mainPage.account.id, user.id));
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

  const onClickBlockUser = () => {
    dispatch(likeUserPutQuery(user.id, 'BLOCK'));
    if (actionAfterTakeLike) {
      actionAfterTakeLike();
    }
  };

  const onClickFakeUser = () => {
    dispatch(likeUserPutQuery(user.id, 'FAKE'));
  };

  useEffect(() => {
    dispatch(getUserStatus(user.id));
  }, [user.id, dispatch]);

  const status = useMemo(() => {
    if (mainPage.userInCardStatus && mainPage.userInCardStatus[0].status) {
      return mainPage.userInCardStatus[0]
    } else {
      return {
        status: user.status,
        lastAction: user.lastAction
      }
    }
  }, [user, mainPage.userInCardStatus])

  let userPhotos = [...user.card.photos];
  userPhotos?.length > 1 && userPhotos.pop();

  return (
    <div className={style.wrapper}>
      {!isShowInfo &&
      <div className={style.width}>
        <span>
          {!userPhotos[0]?.content &&
          <Avatar shape="square" size={400} icon={<UserOutlined/>}
                  style={{backgroundColor: '#fde3cf', height: '600px', width: '100%'}}/>}
          {userPhotos[photoIndex - 1]?.content &&
          <div className={style.left_arrow} onClick={changePhotoIndex(-1)}>
            <LeftOutlined style={{fontSize: '30px', color: 'white'}}/>
          </div>
          }
          {userPhotos[photoIndex]?.content &&
          <img width={'100%'}
               height={'600px'}
               src={`data:${userPhotos[photoIndex].format};base64,${userPhotos[photoIndex].content}`}
               alt='фото'/>
          }
          {userPhotos[photoIndex + 1]?.content &&
          <div className={style.right_arrow} onClick={changePhotoIndex(1)}>
            <RightOutlined style={{fontSize: '30px', color: 'white'}}/>
          </div>
          }
        </span>
        <div className={style.card_title}>
          <div className={style.name_and_age}>
            {
              status.status === 'ONLINE' ?
                <div className={style.online}/> :
                <div className={style.offline}/>
            }
            <div className={style.name}>
              {user.firstName}
            </div>
            <div className={style.age}>
              {user.yearsOld}
            </div>
          </div>
          {
            status.status === 'OFFLINE' &&
            <Text italic className={style.last_action}>
              {`Был(а) в сети ${moment(status.lastAction).format('ll')} в ${moment(status.lastAction).format('LT')}`}
            </Text>
          }
        </div>
        <div className={style.icon_info_container} onClick={changeShowInfo}>
          <InfoCircleTwoTone twoToneColor="rgb(75, 79, 206)" style={{fontSize: '2rem'}}/>
        </div>
      </div>
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
              <DownCircleTwoTone className={style.down_circle} twoToneColor="rgb(75, 79, 206)"
                                 style={{fontSize: '2rem'}} onClick={changeShowInfo}/>
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
                return <Tag color="magenta" style={{marginTop: '5px'}} key={el}>
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
      {isShowButton &&
      <>
        {!isCurrentUser && mainPage.account.card.photos.length !== 0 &&
        <div className={style.like_container}>
          {mainPage.currentUser?.match &&
          <div className={cc(style.match_text, isShowInfo && style.text_color)}>
            матч!
          </div>}
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
        </div>
        }
        {isCurrentUser &&
        <div className={style.like_container}>
          <div className={style.like_content}>
            <MinusCircleTwoTone twoToneColor="#FF0000" style={{fontSize: '2rem'}} onClick={onClickTakeLikeUser}/>
            <StopTwoTone twoToneColor="#FF0000" style={{fontSize: '2rem'}} onClick={onClickBlockUser}/>
            <AlertTwoTone twoToneColor="#FF0000" style={{fontSize: '2rem'}} onClick={onClickFakeUser}/>
          </div>
        </div>
        }
      </>
      }
      {user.isUserFromVisitHistory &&
      <div className={style.like_container}>
        <div className={style.like_content}>
          <RightCircleTwoTone twoToneColor="#52c41a" style={{fontSize: '3rem'}} onClick={onClickNotLikeUser}/>
        </div>
      </div>
      }
    </div>
  )
};


export default UserCard;