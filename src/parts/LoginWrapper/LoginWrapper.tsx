import React, {Children, ReactNode} from 'react';
import style from './LoginWrapper.module.css';
import cc from "classnames";

type Props = {
  children?: ReactNode,

}

const LoginWrapper = ({
                        children
                      }: Props) => {


  return (
    // <div className={style.wrapper}>
      <div className={style.wrapper}>
        {children}
      </div>
    // </div>
  )
};


export default LoginWrapper;