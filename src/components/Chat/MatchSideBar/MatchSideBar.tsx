import {useDispatch, useSelector} from "react-redux";
import {IMatches, IState} from "../../../types";
import style from './MatchSideBar.module.css';
import MultiToggle from "../../../parts/MultiToggle/MultiToggle";
import React, {useEffect, useState} from "react";
import {createChat, getUserMatch, getUsersPostQuery} from "../../../api";
import {setFirstPackMessagesAC, setIsOpenChatRoom} from "../ChatAC";
import {socket} from "../../MainPage/MainPage";

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
    const lastId = chat.matches[numberLastId].matchId;
    dispatch(getUserMatch(lastId));
  };

  const showChatRoom = (el: IMatches) => () => {
    if (el.chatId) {
      dispatch(setIsOpenChatRoom(true, el.chatId));
      return;
    }
    dispatch(createChat(el.userId));
  }

  useEffect(() => {
    chat.matches.map((el: IMatches) => {
      if (el.chatId) {
        const getFirstMessage = {
          chatId: el.chatId,
          getMessageRq: {
            type: "GET_FIRST_PACK"
          }
        };

        socket.send(JSON.stringify(getFirstMessage));

        socket.onmessage = function (event) {
          dispatch(setFirstPackMessagesAC(JSON.parse(event.data)));
        };
      }
    })
  }, [chat.matches]);


  return (
    <div className={style.match_side_bar}>
      <MultiToggle tabTitles={matchTitles}
                   chosenIdx={matchTypeIdx}
                   onChangeChosenElement={onChangeMatchTypeIdx}
      />
      {
        matchTypeIdx === 0 &&
        chat.matches.map((el: IMatches) => {
          return !el.chatId &&
            <div onClick={showChatRoom(el)}>
              {el.icon?.content &&
              <img height='40px'
                   src={`data:${el.icon?.format};base64,${el.icon?.content}`}
                   alt='фото'/>}
              {el.matchId}
              {el.fio}
            </div>
        })
      }
      {matchTypeIdx === 1 &&
      chat.matches.map((el: IMatches) => {
        return el.chatId &&
          <div>
            <div onClick={showChatRoom(el)}>
              {el.icon?.content &&
              <img height='40px'
                   src={`data:${el.icon?.format};base64,${el.icon?.content}`}
                   alt='фото'/>}
              {el.matchId}
              {el.fio}
              {chat.firstPackMessages.find(messageEl => messageEl.messages.chatId === el.chatId)?.messages.messageAnswer[0]?.content}
            </div>
          </div>
      })
      }
      <button onClick={getNewMatches}>
        Загрузить ещё
      </button>
    </div>
  )
}