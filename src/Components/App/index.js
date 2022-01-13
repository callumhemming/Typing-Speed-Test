//To fix:
//If timer runs out mid sentance response is not recorded
//
import React, { useState, useEffect, useReducer } from "react";
import "./App.css";
import Input from "../Input";
import Timer from "../Timer";
import Dummy from "../Dummy";

//const dummyPhrases = dummyPhrases

function App() {
  const [textInput, setTextInput] = useState(""); //,/
  const [timeout, setTimeout] = useState(false); //,/
  const [arrayOfScores, setArrayOfScores] = useState([]); //commented for testing
  const [pageOne, setPageOne] = useState(true);
  const [pageTwo, setPageTwo] = useState(false);
  // const [start, setStart] = useState(true);

  const [result, setResult] = useState({});

//   const [arrayOfScores, setArrayOfScores] = useState([
//     {
//       correct:
//         "The delicious aroma from the kitchen was ruined by",
//       user: "The delicious aroma from the",
//     },
// ]);

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

    setPageOne(false);
    workOutScore();
    setPageTwo(true);
  }, [timeout]);

  // useEffect(()=>{
  //   if(result === {})return

  //   console.log(result)

  // },[result])

  return (
    <div className="container">
      {/* {start? <button onClick={(e)=>{
        e.preventDefault()
        set
      }}>Start</button> : <></>} */}

      {pageOne ? <Timer timeout={timeout} setTimeout={setTimeout} /> : <></>}
      {pageOne ? (
        <Dummy
          textInput={textInput}
          setTextInput={setTextInput}
          arrayOfScores={arrayOfScores}
          setArrayOfScores={setArrayOfScores}
        />
      ) : (
        <></>
      )}
      {pageOne ? (
        <Input
          value={textInput}
          setTextInput={setTextInput}
          timeout={timeout}
        />
      ) : (
        <></>
      )}

      {pageTwo ? (
        <div>
          <h1>Words correct: {result.right}</h1>
          <h1>Words incorrect: {result.wrong}</h1>
          <h1>Accuracy: {result.Accuracy}</h1>
          <h1>Words per minute adjusted for Accuracy: {result.adjusted}</h1>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
