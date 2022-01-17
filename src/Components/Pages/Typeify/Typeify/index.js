//To fix:
//If timer runs out mid sentance response is not recorded
//
import React, { useState, useEffect, useReducer } from "react";

import "./App.css";
import Input from "../Input";
import Timer from "../Timer";
import Dummy from "../Dummy";

//const dummyPhrases = dummyPhrases

export default function Typeify() {
  const [textInput, setTextInput] = useState(""); //,/
  const [timeout, setTimeout] = useState(false); //,/
  const [arrayOfScores, setArrayOfScores] = useState([]); //commented for testing


  const [result, setResult] = useState({});



  function workOutScore() {
    const scores = [...arrayOfScores]; //Works
    if (scores.length === 0) {
      return 0;
    } // Works

    const totalWords = scores
      .map((v) => {
        return v.correct.split(" ");
      })
      .map((v) => {
        return v.length;
      })
      .reduce((a, b) => a + b); // Number of total words requested

    const rightWords = scores
      .map((v) => {
        const userAnswer = v.user.split(" "); // works
        return v.correct
          .split(" ")
          .map((v, i) => (v === userAnswer[i] ? 1 : 0)); // returns three arrays of ones and 0s
      })
      .map((v) => v.reduce((a, b) => a + b))
      .reduce((a, b) => a + b);

    let wrongWords = totalWords - rightWords;

    

    const Accuracy = ((rightWords / totalWords) * 100).toFixed(2)

    const adjusted = (rightWords - ((Accuracy/100).toFixed(2)*rightWords)).toFixed(2)

    setResult({
      ...result,
      wrong: wrongWords,
      right: rightWords,
      Accuracy: `${Accuracy}%`,
      adjusted: `${adjusted}wpm`,
    });
  } //Function end

  useEffect(() => {
    if (!timeout) return;

    
    workOutScore();
    
  }, [timeout]);



  return (
    <div className="container">


     <Timer timeout={timeout} setTimeout={setTimeout} />
      
        <Dummy
          textInput={textInput}
          setTextInput={setTextInput}
          arrayOfScores={arrayOfScores}
          setArrayOfScores={setArrayOfScores}
        />
 
      
     
        <Input
          value={textInput}
          setTextInput={setTextInput}
          timeout={timeout}
        />
      

    </div>
  );
}

