import {useDispatch, useSelector} from "react-redux";
import {IMatches, IState} from "../../../types";
import style from './MatchSideBar.module.css';
import MultiToggle from "../../../parts/MultiToggle/MultiToggle";
import React, {useEffect, useState} from "react";
import {createChat, getUserMatch} from "../../../api";
import {
  setFirstPackMessagesAC,
  setIsOpenChatRoom,
  setNotificationAboutNewMessageAC, setUserMatchesAC
} from "../ChatAC";
import {getFirstMessages} from "../../../socket";

const matchTitles = ['Пары', 'Сообщения'];

export const MatchSideBar = () => {

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
    if (el.chatId) {
      dispatch(setIsOpenChatRoom(true, el.chatId, el.userId));
      return;
    }
    dispatch(createChat(el.userId));
  }

  const showChatRoomAndCloseNotification = (el: any) => () => {
    if (el.chatId) {
      dispatch(setIsOpenChatRoom(true, el.chatId, el.userId));
      dispatch(setNotificationAboutNewMessageAC(false));
      return;
    }
  }

  useEffect(() => {
    const setFirstPackMessagesCallBack = (parseEvent: any) => dispatch(setFirstPackMessagesAC(parseEvent));
    const setNotificationAboutNewMessageCallBack = (hasNewMessage: boolean, parseEvent: any) =>
      dispatch(setNotificationAboutNewMessageAC(true, parseEvent.chatId, parseEvent.messageNotification.senderId));

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
      <MultiToggle tabTitles={matchTitles}
                   chosenIdx={matchTypeIdx}
                   onChangeChosenElement={onChangeMatchTypeIdx}
      />
      {
        matchTypeIdx === 0 &&
        <div>
          {chat.matches.map((el: IMatches) => {
            return !el.chatId &&
              <div onClick={showChatRoom(el)}>
                {el.icon?.content &&
                <img height='40px'
                     src={`data:${el.icon?.format};base64,${el.icon?.content}`}
                     alt='фото'/>}
                {el.firstName}
              </div>
          })}
          {/*/!*todo история лайков*  куда то отдельно их засунуть!/*/}
          {/*<div onClick={openLikesHistory}>История лайков</div>*/}
          {/*<div onClick={openVisitsHistory}>История визитов</div>*/}

        </div>
      }
      {matchTypeIdx === 1 &&
      chat.matches.map((el: IMatches) => {
        const currentPackMessages = chat.firstPackMessages.find(messageEl => messageEl.messages.chatId === el.chatId)?.messages.messageAnswer;
        const lastMessage = currentPackMessages ? currentPackMessages[currentPackMessages.length - 1]?.content : '';
        return el.chatId &&
          <div>
            <div onClick={showChatRoom(el)}>
              {el.icon?.content &&
              <img height='40px'
                   src={`data:${el.icon?.format};base64,${el.icon?.content}`}
                   alt='фото'/>}
              {el.firstName}
              <div>
                {lastMessage}
              </div>
            </div>
          </div>

      })
      }
      <button onClick={getNewMatches}>
        Загрузить ещё
      </button>
      {chat.messageNotification?.hasNewMessage &&
      <div className={style.notification}
           onClick={showChatRoomAndCloseNotification(chat.messageNotification)}>
        НОВОЕ СООБЩЕНИЕ!
      </div>}
    </div>
  )
}