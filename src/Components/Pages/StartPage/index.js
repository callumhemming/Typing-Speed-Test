import React from "react";
import { Link} from "react-router-dom";

export default function StartPage(){
    return(
        <Link to="/Typify">
            <button>Start!</button>
        </Link>
    )
}