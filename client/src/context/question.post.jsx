import { createContext, useState } from "react";
import React from 'react';

//Get the value of the posting page, question section
export const  QuestionContextpost = createContext(
    {
        currentQuestion:[],
    }
)

export const  QuestionpostProvider = ({children})=>
{
    const [currentQuestion,setCurrentQuestion]=useState(null)
    const value= { currentQuestion,setCurrentQuestion}
    return <QuestionContextpost.Provider value={value}>{children}</QuestionContextpost.Provider>
}