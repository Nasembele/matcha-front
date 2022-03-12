import React, {useState} from 'react';
import style from './Message.module.css';
import cc from "classnames";
import {IMessage, IPhotos} from "../../types";
import {DeleteOutlined} from "@ant-design/icons";
import {Avatar} from "antd";

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
                {message.type === 'TEXT' &&
                message.content}
                {message.type === 'IMAGE' &&
                <img height={'200px'}
                     src={`data:${message.typeInfo};base64,${message.content}`}
                     alt='фото'/>}
              </div>
            </div>
            :
            <div className={style.user_message}>
              {message.type === 'TEXT' &&
              message.content}
              {message.type === 'IMAGE' &&
              <img height={'200px'}
                   src={`data:${message.typeInfo};base64,${message.content}`}
                   alt='фото'/>}
            </div>
          }
        </div> :
        <div className={style.my_message}>
          <div className={style.my_message_content}>
            {message.type === 'TEXT' &&
            message.content}
            {message.type === 'IMAGE' &&
            <img height={'200px'}
                 src={`data:${message.typeInfo};base64,${message.content}`}
                 alt='фото'/>}
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