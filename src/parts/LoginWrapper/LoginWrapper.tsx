import React, {ReactNode} from 'react';
import style from './LoginWrapper.module.css';

type Props = {
  children?: ReactNode,
}

const LoginWrapper = ({
                        children
                      }: Props) => {


  return (
    <div className={style.wrapper}>
      {children}
    </div>
  )
};

export default LoginWrapper;