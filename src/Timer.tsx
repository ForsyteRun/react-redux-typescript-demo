import React, { FC, useEffect, useState } from "react";

export const Timer: FC= React.memo(() => {
  console.log('Timer');

  const [time, setTime] = useState<number>(100)

  useEffect(()=>{
    setInterval(() => {
      setTime(prev => prev - 1)
    }, 1000)
  }, [])

  return (
    <>
      {time}
    </>
  );
});