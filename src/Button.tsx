import React, { FC } from "react";
import cn from 'classnames';
import s from './Button.module.css';

type PropsType = {
  children: string
  outline?: boolean
};

export const Button: FC<PropsType> = React.memo((props) => {
 
  return (
   <button className={cn({'btn': props.outline})}>
    {props.children}
   </button>
  )
});
