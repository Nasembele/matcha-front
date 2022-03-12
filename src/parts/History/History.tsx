import React, {useEffect} from 'react';
import style from './History.module.css';
import Title from "antd/es/typography/Title";
import {getUserByIdWithAction, getUserMatch} from "../../api";
import {setUserLikesAC, setUserVisitsAC} from "../../components/Chat/ChatAC";
import {useDispatch, useSelector} from "react-redux";
import {IMatches, IState} from "../../types";
import {Avatar} from "antd";
import {UserOutlined} from "@ant-design/icons";
import cc from "classnames";
import {
  addUserFromLikesHistoryToUsersList,
  addUserFromVisitsHistoryToUsersList,
} from "../../components/MainPage/MainPageAC";

type Props = {
  changeChosenIndex: Function
}

const History = ({
                   changeChosenIndex
                 }: Props) => {

  const dispatch = useDispatch();

  const chat = useSelector((state: IState) => state.chat);

  const showUserInLikesHistory = (el: IMatches) => () => {
    changeChosenIndex(0);
    dispatch(getUserByIdWithAction(el.userId, addUserFromLikesHistoryToUsersList));
  }

  const showUserInVisitsHistory = (el: IMatches) => () => {
    changeChosenIndex(0);
    dispatch(getUserByIdWithAction(el.userId, addUserFromVisitsHistoryToUsersList));
  }

  useEffect(() => {
    dispatch(getUserMatch('LIKE', setUserLikesAC));
    dispatch(getUserMatch('VISIT', setUserVisitsAC));
  }, [dispatch])

  return (
    <div className={style.wrapper}>
      <Title level={5} className={style.title}>
        История лайков
      </Title>
      <div className={style.message_pairs}>
        {
          chat.likes.map((el: IMatches) => {
            return <div className={style.message_pair} onClick={showUserInLikesHistory(el)}>
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
              </div>
            </div>
          })
        }
      </div>
      <Title level={5} className={cc(style.title, style.margin)}>
        История визитов
      </Title>
      <div className={style.message_pairs}>
        {
          chat.visits.map((el: IMatches) => {
            return <div className={style.message_pair} onClick={showUserInVisitsHistory(el)}>
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
              </div>
            </div>
          })
        }
      </div>
    </div>
  )
};

export default History;