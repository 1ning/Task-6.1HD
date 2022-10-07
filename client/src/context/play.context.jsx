import { createContext, useState } from "react";
import React from 'react';

//Get information about the video in the videolist screen by clicking on it
export const  PlayContext = createContext(
    {
        currentPlay:null,
        setcurrentPlay:()=>null
    }
)


export const PlayProvider = ({children})=>
{
    const [currentPlay,setcurrentPlay]=useState(null)
    const value= { currentPlay,setcurrentPlay}
    return <PlayContext.Provider value={value}>{children}</PlayContext.Provider>
}