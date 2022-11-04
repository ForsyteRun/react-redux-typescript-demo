import React, { FC, useEffect, useState } from "react";
import { getDatabase, ref, get, child } from "firebase/database";
import s from './Shop.module.css';
import { Button } from "./Button";

export const Shop: FC = React.memo(() => {
  const [dbData, setDbData] = useState<any[]>([]);

  // useEffect(() => {//first load data
  //   const db = ref(getDatabase())
  //   get(child(db, 'cardsDsn')).then((res) => {
  //     if (res.exists()) {
  //       setDbData(res.val())
  //     } else {
  //       console.log("No data available");
  //     }
  //   }).catch((error) => {
  //     console.error(error);
  //   });
  // }, []);

  return (
    <div>
      {/* {dbData && 
        dbData.map((el: any) => <span>{el[1]}</span>)
      } */}
     <Button outline >123</Button>
     <Button>123</Button>
    </div>
  )
 
});
