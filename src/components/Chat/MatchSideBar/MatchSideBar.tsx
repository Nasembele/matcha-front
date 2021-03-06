import {useDispatch, useSelector} from "react-redux";
import {IMatches, IState} from "../../../types";
import style from './MatchSideBar.module.css';
import React, {useRef, useState} from "react";
import {getUserMatch, logoutGetQuery} from "../../../api";
import {
  setIsOpenChatRoom,
  setUserMatchesAC,
  setUserMessagesAC
} from "../ChatAC";
import 'bootstrap/dist/css/bootstrap.min.css';
import "antd/dist/antd.min.css";
import {HistoryOutlined, LogoutOutlined, UserOutlined} from "@ant-design/icons";
import {Avatar} from "antd";
import Title from "antd/es/typography/Title";
import UserSettings from "../../../parts/UserSettings/UserSettings";
import cc from "classnames";
import History from "../../../parts/History/History";
import {deleteNotLikeUserAC, setHasAddedUserInHistory} from "../../MainPage/MainPageAC";
import {usePageableScroll} from "../../../helpers";

type IProps = {
  closeAnotherWindowMobile: VoidFunction,
  changeChosenIndex?: Function
}

export const MatchSideBar = ({
                               closeAnotherWindowMobile,
                               changeChosenIndex
                             }: IProps) => {

  const dispatch = useDispatch();

  const chat = useSelector((state: IState) => state.chat);
  const hasAddedUserInHistory = useSelector((state: IState) => state.mainPage.hasAddedUserInHistory);

  const pairsContainer = useRef<HTMLDivElement>(null);
  const messagesContainer = useRef<HTMLDivElement>(null);

  const [isShowUserSettings, setIsShowUserSettings] = useState(false);
  const [isShowHistory, setIsShowHistory] = useState(false);

  const getNewPairs = () => {
    const numberLastId = chat.pairs?.length - 1;
    const lastId = chat.pairs[numberLastId]?.id;

    dispatch(getUserMatch('PAIR', setUserMatchesAC, false, lastId));
  };

  const getNewMessages = () => {
    const numberLastId = chat.messages?.length - 1;
    const lastId = chat.messages[numberLastId]?.id;

    dispatch(getUserMatch('MATCH', setUserMessagesAC, true, lastId));
  };

  const showChatRoom = (el: any, hasChatId: boolean) => () => {
    if (closeAnotherWindowMobile) {
      closeAnotherWindowMobile();
    }
    if (!hasChatId) {
      dispatch(setIsOpenChatRoom(true, -1, el.userId));
      return;
    }
    if (el.chatId) {
      dispatch(setIsOpenChatRoom(true, el.chatId, el.userId));
      return;
    }
  }

  const onClickLogout = () => {
    if (hasAddedUserInHistory) {
      dispatch(deleteNotLikeUserAC());
    }
    dispatch(setHasAddedUserInHistory(false));
    dispatch(logoutGetQuery());
  }

  const changeShowUserSettings = () => {
    if (hasAddedUserInHistory) {
      dispatch(deleteNotLikeUserAC());
    }
    dispatch(setHasAddedUserInHistory(false));
    setIsShowHistory(false);
    setIsShowUserSettings(prevState => !prevState);
  }

  const changeShowHistory = () => {
    if (hasAddedUserInHistory) {
      dispatch(deleteNotLikeUserAC());
    }
    dispatch(setHasAddedUserInHistory(false));
    setIsShowUserSettings(false);
    setIsShowHistory(prevState => !prevState);
  }

  const onScrollMatches = usePageableScroll(
    pairsContainer,
    () => getNewPairs(),
    [pairsContainer, chat.pairs]
  );

  const onScrollMessages = usePageableScroll(
    messagesContainer,
    () => getNewMessages(),
    [messagesContainer, chat.messages]
  );

  return (
    <div className={style.match_side_bar}>
      <div className={style.menu}>
        <UserOutlined style={{fontSize: '25px'}} onClick={changeShowUserSettings}/>
        <HistoryOutlined style={{fontSize: '25px'}} onClick={changeShowHistory}/>
        <LogoutOutlined style={{fontSize: '25px'}} onClick={onClickLogout}/>
      </div>
      {isShowUserSettings &&
      <div className={cc(style.sidebar_content, style.user_settings)}>
        <UserSettings/>
      </div>
      }
      {isShowHistory &&
      <div className={cc(style.sidebar_content, style.user_settings)}>
        <History changeChosenIndex={changeChosenIndex!}/>
      </div>
      }
      {!isShowUserSettings && !isShowHistory &&
      <div>
        <div className={style.sidebar_content}>
          <div>
            <Title level={5} className={style.title}>????????</Title>
            <div className={style.pair_users}
                 onScroll={onScrollMatches}
                 ref={pairsContainer}
            >
              {chat.pairs?.map((el: IMatches) => {
                return !el.chatId &&
                  <div className={style.message_pair} onClick={showChatRoom(el, false)} key={el.id}>
                    {el.icon?.content ?
                      <img height='60px'
                           width='60px'
                           src={`data:${el.icon?.format};base64,${el.icon?.content}`}
                           alt='????????'/> :
                      <Avatar shape="square" size={50} icon={<UserOutlined/>}
                              style={{backgroundColor: '#fde3cf', height: '60px', width: '60px'}}/>
                    }
                    <div className={style.text_container}>
                      <div className={style.name}>
                        {el.firstName}
                      </div>
                    </div>
                  </div>
              })}
            </div>
          </div>
          <div className={style.messages_container}>
            <Title level={5} className={style.title}>??????????????????</Title>
            <div className={style.message_pairs}
                 onScroll={onScrollMessages}
                 ref={messagesContainer}
            >
              {
                chat.messages?.map((el: IMatches) => {
                  return el.chatId &&
                    <div className={style.message_pair} onClick={showChatRoom(el, true)} key={el.id}>
                      {el.icon?.content ?
                        <img height='60px'
                             width={'60px'}
                             src={`data:${el.icon?.format};base64,${el.icon?.content}`}
                             alt='????????'/> :
                        <Avatar shape="square" size={50} icon={<UserOutlined/>}
                                style={{backgroundColor: '#fde3cf', height: '60px', width: '60px'}}/>}
                      <div className={style.text_container}>
                        <div className={style.name}>
                          {el.firstName}
                        </div>
                      </div>
                    </div>
                })
              }
            </div>
          </div>
        </div>
      </div>
      }
    </div>
  )
}