import React from "react";

export default function Input({ setTextInput, value }){

    return(
        <form>
            <input autoFocus value={value} onChange = {({target : thisInputBox})=>{
                setTextInput(thisInputBox.value)
            }} />
            
        </form>
    )
}

