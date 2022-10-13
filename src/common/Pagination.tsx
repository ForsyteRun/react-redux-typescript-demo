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

  let maxPageCount = Math.ceil(props.totalUserCount / props.pageSize);
  let pages: Array<number> = [];

  for (let i = 1; i <= maxPageCount; i++) {
    pages.push(i);
  }

  let portionSize = Math.ceil(props.totalUserCount / props.amountPagi);
  const [portion, setPortion] = useState(1);
  let leftBackPagi = (portion - 1) * props.amountPagi + 1;
  let rightBackPagi = portion * props.amountPagi;

  return (
    <div className={style.pagi}>
      {(leftBackPagi > 1) &&
        <button onClick={() => {setPortion(portion - 1)}}
        style={{margin: '0 10px', fontStyle: 'italic', backgroundColor:'transparent', border: '1px solid #999', borderRadius: '15%'}}
        >PREV</button>}
      
      {pages
      .filter((el) => el >= leftBackPagi && el <= rightBackPagi)
      //@ts-ignore
      .map(el => <span className={props.currentPageData === el && style.selected}
            onClick={() => props.onPageChange(el)}>{el}</span>
        )}

      {leftBackPagi < portionSize && 
        <button onClick={() => {setPortion(portion + 1)}} 
        style={{margin: '0 10px', fontStyle: 'italic', backgroundColor:'transparent', border: '1px solid #999', borderRadius: '15%'}}
        >NEXT</button>}
    </div>
  )
}

export default Pagination;