import {useDispatch, useSelector} from "react-redux";
import {IMatches, IState} from "../../../types";
import style from './MatchSideBar.module.css';
import React, {useState} from "react";
import {createChat, getUserMatch, logoutGetQuery} from "../../../api";
import {
  setIsOpenChatRoom,
  setUserMatchesAC
} from "../ChatAC";
import 'bootstrap/dist/css/bootstrap.min.css';
import "antd/dist/antd.min.css";
import {HistoryOutlined, LogoutOutlined, UserOutlined} from "@ant-design/icons";
import {Avatar, Button} from "antd";
import Title from "antd/es/typography/Title";
import UserSettings from "../../../parts/UserSettings/UserSettings";
import cc from "classnames";
import History from "../../../parts/History/History";
import {deleteNotLikeUserAC, setHasAddedUserInHistory} from "../../MainPage/MainPageAC";

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

  const [isShowUserSettings, setIsShowUserSettings] = useState(false);
  const [isShowHistory, setIsShowHistory] = useState(false);

  const getNewMatches = () => {
    const numberLastId = chat.matches.length - 1;
    const lastId = chat.matches[numberLastId]?.id;

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
          <Title level={5} className={style.title}>Пары</Title>
          <div className={style.pair_users}>
            {chat.matches?.map((el: IMatches) => {
              return !el.chatId &&
                <div className={style.pair_user} onClick={showChatRoom(el)} key={el.id}>
                  {el.icon?.content ?
                    <img height='60px'
                         width='60px'
                         src={`data:${el.icon?.format};base64,${el.icon?.content}`}
                         alt='фото'/> :
                    <Avatar shape="square" size={50} icon={<UserOutlined/>}
                            style={{backgroundColor: '#fde3cf', height: '60px', width: '60px'}}/>
                  }
                  <div className={style.pair_name}>
                    {el.firstName}
                  </div>
                </div>
            })}
          </div>
          <Title level={5} className={style.title}>Сообщения</Title>
          <div className={style.message_pairs}>
            {
              chat.matches.map((el: IMatches) => {
                return el.chatId &&
                  <div className={style.message_pair} onClick={showChatRoom(el)} key={el.id}>
                    {el.icon?.content ?
                      <img height='60px'
                           width={'60px'}
                           src={`data:${el.icon?.format};base64,${el.icon?.content}`}
                           alt='фото'/> :
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
        <Button onClick={getNewMatches} className={style.submit_button_upload}>
          Посмотреть ещё
        </Button>
      </div>
      }
    </div>
  )
}