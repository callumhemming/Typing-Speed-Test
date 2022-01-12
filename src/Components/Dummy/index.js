import React, { useState, useEffect } from "react";
import {v4 as uuidv4} from "uuid"

export default function Dummy({
  textInput,
  setTextInput,
  timeout,
  arrayOfScores,
  setArrayOfScores,
}) {
  const [dummy, setDummy] = useState([
    "The delicious aroma from the kitchen was ruined by cigarette smoke.",
    "The manager of the fruit stand always sat and only sold vegetables.",
    "He was the type of guy who liked Christmas lights on his house in the middle of July.",
    "When nobody is around, the trees gossip about the people who have walked under them.",
    "If eating three-egg omelets causes weight-gain, budgie eggs are a good substitute.",
    "Excitement replaced fear until the final moment.",
    "The green tea and avocado smoothie turned out exactly as would be expected.",
    "The swirled lollipop had issues with the pop rock candy.",
    "I may struggle with geography, but I'm sure I'm somewhere around here.",
    "Check back tomorrow; I will see if the book has arrived.",
    "He had a vague sense that trees gave birth to dinosaurs.",
  ]);

  const [randomSent, setRandomSent] = useState(
    dummy[Math.floor(Math.random() * dummy.length)].split("")
  );

  //Render sentence and change background colour depending on user input(UGLY)
  const display = randomSent.map((v, i) => {
    if (textInput[i] == null)
      return v === " " ? (
        <p key={uuidv4()} style={{ backgroundColor: "white", whiteSpace: "pre" }}> {v}</p>
      ) : (
        <p key={uuidv4()} style={{ backgroundColor: "white" }}> {v}</p>
      );

    if (textInput[i] != v) {
      return v === " " ? (
        <p key={uuidv4()} style={{ backgroundColor: "red", whiteSpace: "pre" }}> {v}</p>
      ) : (
        <p key={uuidv4()} style={{ backgroundColor: "red" }}> {v}</p>
      );
    } else {
      return v === " " ? (
        <p key={uuidv4()} style={{ backgroundColor: "green", whiteSpace: "pre" }}> {v}</p>
      ) : (
        <p key={uuidv4()} style={{ backgroundColor: "green" }}> {v}</p>
      );
    }
  });


useEffect(()=>{
    
    if(textInput.length == display.length){
      setArrayOfScores([...arrayOfScores,{ correct: randomSent.join(""), user: textInput } ]);
      setTextInput("")
      setRandomSent(dummy[Math.floor(Math.random() * dummy.length)].split(""))

    console.log(arrayOfScores);
    }else{return}
    },[textInput])

  
  return <div style={{ display: "flex", flexDirection: "row" }}>{display}</div>;
}
