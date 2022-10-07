import { createContext, useState } from "react";
import React from 'react';
//Get information about the question in the question list screen by clicking on it
export const  CurrentQuestioncontext = createContext(
    {
        currentQuestion:null,
        setcurrentQuestion:()=>null
    }
)


export const CurrentQuestionProvider = ({children})=>
{
    const [currentQuestion,setcurrentQuestion]=useState(null)
    const value= { currentQuestion,setcurrentQuestion}
    return <CurrentQuestioncontext.Provider value={value}>{children}</CurrentQuestioncontext.Provider>
}