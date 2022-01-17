import React, { useState, useEffect } from "react";

export default function Timer({ timeout, setTimeout }) {
  //config\\
  const __default_time = 60;
  const __speed = 1000;
  //config\\

  let [timer, setTimer] = useState(0);
  let [time, setTime] = useState(__default_time);

  function startTimer(time) {
    setTime(time);
    const updateTime = setInterval(() => {
      setTimer(updateTime);
      if(time === 0) {clearInterval(updateTime); setTimeout(true);}else
      { setTime(time--)}
      
         
    }, __speed);
  }

  function handleClick() {
    clearInterval(timer);
    startTimer(__default_time);
  }

  useEffect(() => {
    startTimer(__default_time);
  }, []);

  return (
    <div>
      <h1>{time}</h1>
      <button
        onClick={e => {
          e.preventDefault();
          handleClick();
        }}
      >
        Reset
      </button>
    </div>
  );
}
