import { v4 as uuidv4 } from "uuid";
import { sentances } from "./data.js";
import React from "react";

const INIT_SENTANCE_STATE = {
  previousSentances: [{ split: ["BOOT"], Length: 0, joined: "BOOT" }],
  currentSentance: { split: ["STRAP"], Length: 0, joined: "STRAP" },
  totalLength: 0,
};

export const actions = {
  GET_NEW_SENTANCE: {
    NEW_SENTANCE: "NEW_SENTANCE",
    BOOTSTRAP_STATE: () => {
      return reduceSentanceLogic(INIT_SENTANCE_STATE, { type: "NEW_SENTANCE" });
    },
  },
};

function getStyle(usersCharacterAtIndex, characterAtIndex) {
  const color =
    usersCharacterAtIndex == null
      ? "white"
      : usersCharacterAtIndex !== characterAtIndex
      ? "red"
      : "green";
  const style = {
    backgroundColor: color,
    whiteSpace: characterAtIndex === " " ? "pre" : "normal",
  };
  return style;
}

export function reduceToLetterColour(state, action) {
  // characterAtIndex, usersCharacterAtIndex
  const { currentSentance, textInput } = action;
  return currentSentance.map((v, i) => {
    return (
      <p key={uuidv4()} style={getStyle(textInput[i], v)}>
        {v}
      </p>
    );
  });
}

export function reduceSentanceLogic(state, action) {
  let { previousSentances, currentSentance } = state;
  const { type } = action;

  switch (type) {
    case "NEW_SENTANCE":
      const getUniqueSentance = (history) => {
        //Returns a unique new sentance
        const generateNewSentance =
          sentances[Math.floor(Math.random() * sentances.length)];
        const reduceHistory = history.reduce((a, b) => {
          return [...a, b.joined];
        }, []);

        if (reduceHistory.indexOf(generateNewSentance) !== -1) {
          return getUniqueSentance(history);
        } else {
          return generateNewSentance;
        }
      };
      previousSentances = [...previousSentances, { ...currentSentance }];
      const getNewSentance = getUniqueSentance(previousSentances);

      const totalLength = previousSentances.reduce((a, b) => {
        return a + b["Length"];
      }, 0);

      currentSentance = {
        split: getNewSentance.split(""),
        joined: getNewSentance,
        Length: getNewSentance.split(" ").length,
      };

      return { previousSentances, totalLength, currentSentance };

    default:
      return state;
  }
}

//Object model... I think is up to date lol

// state = {//{type:"NEW_SENTANCE"}
//   previousSentances: [
//     { split:[],joined: "", Length: 0 }

//   ],
//   totalLength: 0,
//   currentSentance: { split: [], joined: "", Length:0 },
// };
