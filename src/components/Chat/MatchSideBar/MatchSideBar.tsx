import {useDispatch, useSelector} from "react-redux";
import {IMatches, IState} from "../../../types";
import style from './MatchSideBar.module.css';
import MultiToggle from "../../../parts/MultiToggle/MultiToggle";
import {useState} from "react";
import {getUserMatch} from "../../../api";

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
    const lastId = chat.matches[numberLastId].matchId; //TODO id чата или юзера?
    dispatch(getUserMatch(lastId));
  };

  return (
    <div className={style.match_side_bar}>
      <MultiToggle tabTitles={matchTitles}
                   chosenIdx={matchTypeIdx}
                   onChangeChosenElement={onChangeMatchTypeIdx}
      />
      {
        matchTypeIdx === 0 &&
        chat.matches.map((el: IMatches) => //TODO поместить сюда тех кто без сообщений выводтть фотки юеров и мб их имя
          <div>
            {el.matchId}
          </div>)
      }
      {
        matchTypeIdx === 1 && //TODO поместить сюда тех кто с сообщениями
        <div>
          KEK
        </div>
      }
      <button onClick={getNewMatches}>
        Загрузить ещё
      </button>
    </div>
  )
}