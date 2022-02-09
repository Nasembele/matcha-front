import {useDispatch, useSelector} from "react-redux";
import {IMatches, IState} from "../../../types";
import style from './MatchSideBar.module.css';
import MultiToggle from "../../../parts/MultiToggle/MultiToggle";
import React, {useEffect, useState} from "react";
import {createChat, getUserMatch, logoutGetQuery} from "../../../api";
import {
  closeNotificationAboutNewMessageAC,
  setFirstPackMessagesAC,
  setIsOpenChatRoom,
  setNotificationAboutNewMessageAC,
  setUserMatchesAC
} from "../ChatAC";
import {getFirstMessages} from "../../../socket";
import 'bootstrap/dist/css/bootstrap.min.css';
import "antd/dist/antd.css";
import {HeartOutlined, LogoutOutlined, UserOutlined} from "@ant-design/icons";
import {Logout} from "grommet-icons";
import {Avatar, Button} from "antd";
import Title from "antd/es/typography/Title";

const matchTitles = ['Пары', 'Сообщения'];

type IProps = {
  closeAnotherWindowMobile?: VoidFunction
}

export const MatchSideBar = ({
                               closeAnotherWindowMobile
                             }: IProps) => {

  const dispatch = useDispatch();

  const chat = useSelector((state: IState) => state.chat);

  const [matchTypeIdx, setMatchTypeIdx] = useState(0);

  const onChangeMatchTypeIdx = (chosenIdx: number) => {
    setMatchTypeIdx(chosenIdx);
  };

  const getNewMatches = () => {
    const numberLastId = chat.matches.length - 1;
    const lastId = chat.matches[numberLastId]?.matchId;

    dispatch(getUserMatch('MATCH', setUserMatchesAC, lastId));
  };

  const showChatRoom = (el: any) => () => {
    if (closeAnotherWindowMobile) {
      closeAnotherWindowMobile();
    }
    if (el.chatId) {
      dispatch(setIsOpenChatRoom(true, el.chatId, el.userId));
      return;
    }
    dispatch(createChat(el.userId));
  }

  const showChatRoomAndCloseNotification = (el: any) => () => {
    if (el.chatId) {
      dispatch(setIsOpenChatRoom(true, el.chatId, el.userId));
      dispatch(closeNotificationAboutNewMessageAC(false, el.messageId));
      return;
    }
  }

  const onClickLogout = () => {
    dispatch(logoutGetQuery());
  }

  useEffect(() => {
    const setFirstPackMessagesCallBack = (parseEvent: any) => dispatch(setFirstPackMessagesAC(parseEvent));
    const setNotificationAboutNewMessageCallBack = (hasNewMessage: boolean, chatId: number, senderId: number, messageId: number) =>
      dispatch(setNotificationAboutNewMessageAC(hasNewMessage, chatId, senderId, messageId));
    // const setNotificationAboutNewVisitCallBack = (hasNewVisit: boolean, fromUsr: number, toUsr: number, action: string) =>
    //   dispatch(setNotificationAboutNewVisitAC(hasNewVisit, fromUsr, toUsr, action));

    chat.matches.map((el: IMatches) => {
      if (el.chatId) {
        return getFirstMessages(el.chatId, setFirstPackMessagesCallBack, setNotificationAboutNewMessageCallBack);
      }
      return ''
    })
  }, [chat.matches]);


  // const openLikesHistory = () => {
  //   dispatch(getUserMatch('LIKE', setUserMatchesAC));
  // }
  // // {/*todo история лайков*/}

  // const openVisitsHistory = () => {
  //   dispatch(getUserMatch('VISIT', setUserMatchesAC));
  // }
  // // {/*todo история визитов*/}

  return (
    <div className={style.match_side_bar}>
      <div className={style.menu}>
        <UserOutlined style={{fontSize: '25px'}}/>
        <HeartOutlined style={{fontSize: '25px'}}/>
        <LogoutOutlined style={{fontSize: '25px'}} onClick={onClickLogout}/>
        {/*<Logout color={'black'}/>*/}
      </div>
      {/*<MultiToggle tabTitles={matchTitles}*/}
      {/*             chosenIdx={matchTypeIdx}*/}
      {/*             onChangeChosenElement={onChangeMatchTypeIdx}*/}
      {/*/>*/}


      {/*{*/}
      {/*  matchTypeIdx === 0 &&*/}
      <div className={style.sidebar_content}>
        <Title level={5}>Пары</Title>

        <div className={style.pair_users}>
          {chat.matches.map((el: IMatches) => {
            return !el.chatId &&
              <div className={style.pair_user} onClick={showChatRoom(el)}>
                {el.icon?.content ?
                  <img height='100px'
                       width='75px'
                       src={`data:${el.icon?.format};base64,${el.icon?.content}`}
                       alt='фото'/> :
                  <Avatar shape="square" size={75} icon={<UserOutlined/>}
                          style={{backgroundColor: '#fde3cf', height: '100px'}}/>
                }
                <div className={style.pair_name}>
                  {el.firstName}
                </div>
              </div>
          })}
        </div>
        {/*/!*todo история лайков*  куда то отдельно их засунуть!/*/}
        {/*<div onClick={openLikesHistory}>История лайков</div>*/}
        {/*<div onClick={openVisitsHistory}>История визитов</div>*/}

        {/*}*/}
        <Title level={5}>Сообщения</Title>
        <div className={style.message_pairs}>
          {
            chat.matches.map((el: IMatches) => {
              const currentPackMessages = chat.firstPackMessages.find(messageEl => messageEl.messages.chatId === el.chatId)?.messages.messageAnswer;
              const lastMessage = currentPackMessages ? currentPackMessages[currentPackMessages.length - 1]?.content : '';
              return el.chatId &&
                  <div className={style.message_pair} onClick={showChatRoom(el)}>
                    {el.icon?.content ?
                    <img height='50px'
                         width={'40px'}
                         src={`data:${el.icon?.format};base64,${el.icon?.content}`}
                         alt='фото'/> :
                      <Avatar shape="square" size={40} icon={<UserOutlined/>}
                      style={{backgroundColor: '#fde3cf', height: '50px'}}/>}
                    <div className={style.text_container}>
                      <div className={style.name}>
                      {el.firstName}
                      </div>
                      <div>
                        {lastMessage}
                      </div>
                    </div>
                  </div>

            })
          }
        </div>
      </div>

      <Button onClick={getNewMatches} className={style.submit_button}>
        Загрузить ещё
      </Button>
      {chat.messageNotification.map((el, idx) => {
        if (el.isShow) {
          return <div className={style.notification}
                      style={{bottom: `${idx * 30}px`}}
                      onClick={showChatRoomAndCloseNotification(el)}>
            НОВОЕ СООБЩЕНИЕ!
          </div>
        }
      })}
      {chat.actionNotifications.map((el, idx) => {
        if (el.isShow) {
          return <div className={style.notification}
                      style={{bottom: `${idx * 20 + 10}px`}}
            // onClick={showChatRoomAndCloseNotification(el)} todo показывать кто посетил по клику
          >
            {el.action === 'VISIT' && 'НОВЫЙ ВИЗИТ!'}
            {el.action === 'LIKE' && 'НОВЫЙ LIKE!'}
            {el.action === 'MATCH' && 'НОВЫЙ MATCH!'}
            {el.action === 'TAKE_LIKE' && 'НОВЫЙ TAKE_LIKE!'}
          </div>
        }
      })}
    </div>
  )
}