import {v4 as uuidv4} from "uuid"
import {sentances} from "./data.js"




export function reduceToLetterColour(state, action){
    const {characterAtIndex, usersCharacterAtIndex} = action
  
    const color = usersCharacterAtIndex == null? "white" : usersCharacterAtIndex != characterAtIndex? "red" : "green"
    const style = { backgroundColor: color, 
                    whiteSpace: characterAtIndex == " "?"pre":"normal"}
  
          return { ...state.payload, payload : <p key= {uuidv4()} style= {style}> {characterAtIndex} </p> }
              
  }