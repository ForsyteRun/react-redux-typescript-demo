import React, { FC, useState } from "react";
import style from './Pagination.module.css';

export type PaginationType = {
  amountPagi: number
  totalUserCount: number
  pageSize: number
  currentPageData: number
  onPageChange: (pageNumber: number) => void
};

const Pagination: FC<PaginationType> = (props) => {
  const{amountPagi, totalUserCount, pageSize, currentPageData, onPageChange} = props;
  
  let maxPageCount = Math.ceil(totalUserCount / pageSize);
  let pages: Array<number> = [];

  for (let i = 1; i <= maxPageCount; i++) {
    pages.push(i);
  }

  let portionSize = Math.ceil(totalUserCount / amountPagi);
  const [portion, setPortion] = useState(1);
  let leftBackPagi = (portion - 1) * amountPagi + 1;
  let rightBackPagi = portion * amountPagi;

  return (
    <div className={style.pagi}>
      {(leftBackPagi > 1) &&
        <button onClick={() => {setPortion(portion - 1)}}
        className={style.button}
        >PREV</button>}
      
      {pages
      .filter((el) => el >= leftBackPagi && el <= rightBackPagi)
      .map(el => <span className={currentPageData === el ? style.selected : style.noSelected} style={{cursor: 'pointer'}}
            onClick={() => onPageChange(el)}>{el}</span>
        )}

      {leftBackPagi < portionSize && 
        <button onClick={() => {setPortion(portion + 1)}} 
        className={style.button}
        >NEXT</button>}
    </div>
  )
}

export default Pagination;