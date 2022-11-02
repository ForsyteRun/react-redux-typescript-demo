import React, { FC, useEffect, useState } from "react";

type PropsType ={
  second: number
  onChange: (el: number) => void
  timerKey: string
}

export const Timer: FC<PropsType> = React.memo(({second, onChange, timerKey}) => {
  console.log('Timer');

  const [time, setTime] = useState<number>(10)

  useEffect(() => {
    setTime(second)
  }, [second])

  useEffect(() => {
    onChange(time)
  }, [time])

  useEffect(()=>{
    const intervalId = setInterval(() => {
      setTime((prev: number) => prev - 1)
    }, 1000)

    return () => {clearInterval(intervalId)}
  }, [timerKey])

  return (
    <>
      {time}
    </>
  );
});