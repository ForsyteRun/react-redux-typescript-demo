import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { UserType } from "./Git";
import { Timer } from "./Timer";

type PropsType = {
  nameColor: string | null
};

export const GitUserData: FC<PropsType> = React.memo(({nameColor}) => {

  const [userData, setUserData] = useState<UserType | null>(null)
  const [second, setSecond] = useState<number>(10)

  useEffect(() => {
    if(!!nameColor){
      axios
      .get<UserType>(`https://api.github.com/users/${nameColor}`)
      .then((res) => {
       setUserData(res.data) 
       setSecond(10)
      })
      .catch((res) => console.log("Error"));
    }
  }, [nameColor])

  useEffect(() => {
    if(second < 1)
    setUserData(null)
  }, [second])

  return (
    <>
      <div>
          {userData && <div>
            <Timer second={second} onChange={setSecond} timerKey={userData.id.toString()}/>
            <br/>
            {userData.login}
            <div>
               <img src={userData.avatar_url} alt='logo'/>
            </div>
            </div>}
      </div>
    </>
  );
});