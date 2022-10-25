import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../redux/redux";
import { getPageChangeThunkCreater } from "../redux/usersReduser";
import s from "./Pagination.module.css";

export const Pagination: FC = React.memo(() => {

  const amountPagi = useSelector((state: AppState) => state.users.amountPagi);
  const totalUserCount = useSelector((state: AppState) => state.users.totalUserCount);
  const pageSize = useSelector((state: AppState) => state.users.pageSize);
  const currentPageData = useSelector((state: AppState) => state.users.currentPage);
  const filterUsers = useSelector((state: AppState) => state.users.filter);

  const dispatch: AppDispatch = useDispatch();

  const onPageChange = (offset: number, filter?: string) => {
    debugger
    if (offset > 2) {
      dispatch(getPageChangeThunkCreater(pageSize, offset, offset + pageSize, filterUsers) as any) //todo: any
    } else if (offset === 1) {
      dispatch(getPageChangeThunkCreater(pageSize, offset, offset - 1, filterUsers) as any) //todo: any
    } else {
      dispatch(getPageChangeThunkCreater(pageSize, offset, offset + pageSize, filterUsers) as any) //todo: any
    }
  };

  // useEffect(() => {
  //   debugger
  //   dispatch(getUsersThunkCreater(pageSize, currentPageData-1) as any) //todo: any
  // }, [])

  const maxPageCount = Math.ceil(totalUserCount / pageSize);
  const pages: Array<number> = [];

  for (let i = 1; i <= maxPageCount; i++) {
    pages.push(i);
  }

  const portionSize = Math.ceil(totalUserCount / amountPagi);
  const [portion, setPortion] = useState(1);
  const leftBackPagi = (portion - 1) * amountPagi + 1;
  const rightBackPagi = portion * amountPagi;

  return (
    <div className={s.pagi}>
      {leftBackPagi > 1 && (
        <button
          onClick={() => {
            setPortion(portion - 1);
          }}
          className={s.button}
        >
          PREV
        </button>
      )}

      {pages
        .filter((el) => el >= leftBackPagi && el <= rightBackPagi)
        .map((el) => (
          <span
            className={currentPageData === el ? s.selected : s.noSelected}
            style={{ cursor: "pointer" }}
            onClick={() => dispatch(onPageChange(el) as any)}
          >
            {el}
          </span>
        ))}

      {leftBackPagi < portionSize && (
        <button
          onClick={() => {
            setPortion(portion + 1);
          }}
          className={s.button}
        >
          NEXT
        </button>
      )}
    </div>
  );
});
