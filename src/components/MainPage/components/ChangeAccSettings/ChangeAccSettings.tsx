import React from "react";

const ChangeAccSettings = (
  setting: 'email' | 'pass',
  changeAccSetting: any
) => {

  return (
    <div>
      <button onClick={changeAccSetting}>
        Поменять email
      </button>
    </div>
  )
}

export default ChangeAccSettings;