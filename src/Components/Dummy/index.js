import React, { useState, useEffect, useReducer } from "react";

import {reduceToLetterColour, reduceSentanceLogic, actions} from "./libs/actions.js"


//actions.GET_NEW_SENTANCE.NEW_SENTANCE

export default function Dummy({
  textInput,
  setTextInput,
  timeout,
  arrayOfScores,
  setArrayOfScores,
}) {
  
  
  const [letterColor, getLetterColour] = useReducer(reduceToLetterColour, {
    payload: "",
  });
  
  const [sentanceData, getNewSentance] = useReducer(reduceSentanceLogic, actions.GET_NEW_SENTANCE.BOOTSTRAP_STATE());
    
    useEffect(()=>{ //Populate sentanceData
      getNewSentance({type:actions.GET_NEW_SENTANCE.NEW_SENTANCE})
    },[])
    

  //Render sentence and change background colour depending on user input(UGLY)
  const display = sentanceData.currentSentance.split.map((v, i) => {
    const { payload } = getLetterColour({
      characterAtIndex: v,
      usersCharacterAtIndex: textInput[i],
    });
    return payload;
  });


  useEffect(() => {
    if (textInput.length == display.length) {
      getNewSentance({type:actions.GET_NEW_SENTANCE.NEW_SENTANCE})
      setTextInput("");
      console.log(arrayOfScores);
    } else {
      return;
    }
  }, [textInput]);



  return <div style={{ display: "flex", flexDirection: "row" }}>{display}</div>;
}
