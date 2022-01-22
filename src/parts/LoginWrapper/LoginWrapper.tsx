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
    <div className={cc(style.main, style.wrapper)}>
      <div/>
      <div className={style.children}>
        {children}
      </div>
      <div/>
    </div>
  )
};


export default LoginWrapper;