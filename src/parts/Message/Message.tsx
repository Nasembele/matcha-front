import React, {Children, ReactNode, useState} from 'react';
import style from './Message.module.css';
import cc from "classnames";
import {IMessage, IPhotos, IState, IUserData} from "../../types";
import {
  CloseCircleTwoTone, DeleteOutlined,
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
  message: IMessage,
  fromUserId: number,
  userPhoto?: IPhotos,
  userFirstName?: string,
  onClickDeleteMessage: any
}

const Message = ({
                   message,
                   fromUserId,
                   userPhoto,
                   userFirstName,
                   onClickDeleteMessage
                 }: IProps) => {

  const dispatch = useDispatch();

  const [isShowBucket, setIsShowBucket] = useState(false);

  const changeShowBucket = (isShow: boolean) => () => {
    setIsShowBucket(isShow);
  }

  return (
    <div className={cc(style.wrapper)} onMouseEnter={changeShowBucket(true)} onMouseLeave={changeShowBucket(false)}>
      {message.fromId !== fromUserId ?
        <div className={style.message}>
          <div>
            {
              userPhoto?.content ?
                <div className={style.photo}>
                  <img className={style.photo_item}
                       src={`data:${userPhoto.format};base64,${userPhoto.content}`}
                       alt='фото'/>
                </div> :
                <Avatar style={{color: '#7200f5', backgroundColor: 'rgba(114,0,245,0.13)', marginRight: '10px'}}>
                  {userFirstName ? userFirstName[0] : ''}
                </Avatar>
            }
          </div>
          {isShowBucket ?
            <div className={style.message}>
              <DeleteOutlined className={style.delete_message} onClick={onClickDeleteMessage}
                              data-message-id={message.id}/>
              <div className={style.user_message}>
                {message.content}
              </div>
            </div>
            :
            <div className={style.user_message}>
              {message.content}
            </div>
          }
        </div> :
        <div className={style.my_message}>
          <div className={style.my_message_content}>
            {message.content}
          </div>
          {isShowBucket &&
          <DeleteOutlined className={style.delete_my_message} onClick={onClickDeleteMessage}
                          data-message-id={message.id}/>
          }
        </div>
      }
    </div>
  )
};


export default Message;