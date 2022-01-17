//To fix:
//If timer runs out mid sentance response is not recorded
//
import React, { useState, useEffect, useReducer } from "react";
import { BrowserRouter,Routes,Route, Link } from "react-router-dom";
import "./App.css";

import Layout from "../Pages/Typeify/Layout";
import StartPage from "../Pages/StartPage"
import Typeify from "../Pages/Typeify/Typeify";
import Results from "../Pages/Results"

//const dummyPhrases = dummyPhrases

function App() {
 

  return (

    <BrowserRouter>
    <Routes>
    
      <Route path="/" element={<Layout />}> 
      <Route index element={<StartPage />}/>
      <Route path="Typify" element ={<Typeify />}/>
      <Route path="Results" element ={<Results />}/>
      
      </Route>
    </Routes>
    </BrowserRouter>

  );
}

export default App;
