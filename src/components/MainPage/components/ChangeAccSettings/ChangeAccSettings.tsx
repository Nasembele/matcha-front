import {useDispatch, useSelector} from "react-redux";
import React from "react";

const ChangeAccSettings = (
  setting: 'email' | 'pass',
  changeAccSetting: any
) => {

  const dispatch = useDispatch();


  return (
    <div>
      <button onClick={changeAccSetting}>
        Поменять email
      </button>

    </div>
  )
}

export default ChangeAccSettings;