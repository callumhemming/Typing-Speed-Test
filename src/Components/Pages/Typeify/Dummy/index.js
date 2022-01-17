import React, { useEffect, useReducer } from "react";

import {
  reduceToLetterColour,
  reduceSentanceLogic,
  actions,
} from "./libs/actions.js";

export default function Dummy({ textInput, setTextInput, arrayOfScores }) {

  
  const [sentanceData, getNewSentance] = useReducer(
    reduceSentanceLogic,
    actions.GET_NEW_SENTANCE.BOOTSTRAP_STATE()
  );

  const [letterColor, setLetterColour] = useReducer(
    reduceToLetterColour,
    actions.GET_STYLE.BOOTSTRAP_STYLE(sentanceData.currentSentance.split)
  );

  useEffect(() => {
    setLetterColour({
      currentSentance: sentanceData.currentSentance.split,
      textInput: textInput,
    });
  }, [textInput]);

  useEffect(() => {
    if (textInput.length == letterColor.length) {
      getNewSentance({ type: actions.GET_NEW_SENTANCE.NEW_SENTANCE });
      setTextInput("");
      console.log(arrayOfScores);
    } else {
      return;
    }
  }, [textInput]);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>{letterColor}</div>
  );
}
