import React, { useState, useEffect, useReducer } from "react";
import { sentances } from "./libs/data.jsm";
import { reduceToLetterColour } from "./libs/actions.js";
// import {reduceToLetterColour, reduceSentanceLogic} from "./libs/actions.js"


  // state = {
  //   previousSentances: [
  //     { Text: "Sentance", Length: 1 },
  //     { Text: "Sentance", Length: 1 },
  //   ],
  //   totalLength: 1,
  //   currentSentance: { split: ["", "", "", ""], joined: "" },
  // };

function reduceSentanceLogic(state, action) {
      const { previousSentances, currentSentance, totalLength } = state;
      const { type } = action;

      const getUniqueSentance = (history) => {
        const generateNewSentance =
          sentances[Math.floor(Math.random() * sentances.length)];
        const reduceHistory = history.reduce((a, b) => {
          return [...a, b.text];
        }, []);

        if (reduceHistory.indexOf(generateNewSentance) != -1) {
          return getUniqueSentance(history);
        } else {
          return generateNewSentance;
        }
      };

      const oldSentance = {
        text: currentSentance.joined,
        length: currentSentance.joined.length,
      };
      const newSentanceHistory = [...previousSentances, oldSentance];

      const newSentance = getUniqueSentance(newSentanceHistory);

}

export default function Dummy({
  textInput,
  setTextInput,
  timeout,
  arrayOfScores,
  setArrayOfScores,
}) {
  //useEffect
  // const [sentances, dispatch] = useReducer(reducer, sentances)

  const [letterColor, getLetterColour] = useReducer(reduceToLetterColour, {
    payload: "",
  });

  const [sentanceData, getSentanceData] = useReducer(reduceSentanceLogic, {
    payload: "",
  });

  // const dummyData =

  const [randomSent, setRandomSent] = useState(
    dummy[Math.floor(Math.random() * dummy.length)].split("")
  );

  //Render sentence and change background colour depending on user input(UGLY)
  const display = randomSent.map((v, i) => {
    const { payload } = getLetterColour({
      characterAtIndex: v,
      usersCharacterAtIndex: textInput[i],
    });
    return payload;
  });

  useEffect(() => {
    if (textInput.length == display.length) {
      setArrayOfScores([
        ...arrayOfScores,
        { correct: randomSent.join(""), user: textInput },
      ]);
      setTextInput("");
      setRandomSent(dummy[Math.floor(Math.random() * dummy.length)].split(""));

      console.log(arrayOfScores);
    } else {
      return;
    }
  }, [textInput]);

  return <div style={{ display: "flex", flexDirection: "row" }}>{display}</div>;
}
