import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { UserType } from "./Git";
import { Timer } from "./Timer";

type PropsType = {
  nameColor: string | null
};

export const GitUserData: FC<PropsType> = React.memo(({nameColor}) => {
  console.log('Data');
  const [userData, setUserData] = useState<UserType | null>(null)

  useEffect(() => {
    if(!!nameColor){
      axios
      .get<UserType>(`https://api.github.com/users/${nameColor}`)
      .then((res) => setUserData(res.data))
      .catch((res) => console.log("Error"));
    }
  }, [nameColor])

  return (
    <>
      <div>
          {userData && <div>
            <Timer/>
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