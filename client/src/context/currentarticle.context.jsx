import { createContext, useState } from "react";
import React from 'react';
//Get information about the article in the article list screen by clicking on it
export const  CurrentArticlecontext = createContext(
    {
        currentArticle:null,
        setcurrentArticle:()=>null
    }
)


export const CurrentArticleProvider = ({children})=>
{
    const [currentArticle,setcurrentArticle]=useState(null)
    const value= { currentArticle,setcurrentArticle}
    return <CurrentArticlecontext.Provider value={value}>{children}</CurrentArticlecontext.Provider>
}