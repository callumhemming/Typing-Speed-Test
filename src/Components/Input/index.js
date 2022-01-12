import React from "react";

export default function Input({ setTextInput, value }){
    
    function onChange({ target: self }) {
        setTextInput(self.value);
      }

    return(
        <form>
            <input value={value} onChange = {onChange} />
            
        </form>
    )
}

