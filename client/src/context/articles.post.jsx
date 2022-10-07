import { createContext, useState } from "react";
import React from 'react';

//Get the value of the posting page, article section
export const  ArticleContextpost = createContext(
    {
        currentArticle:null,
        setCurrentArticle:()=>null
    }
)

export const ArticlepostProvider = ({children})=>
{
    const [currentArticle,setCurrentArticle]=useState(null)
    const value= { currentArticle,setCurrentArticle}
    return <ArticleContextpost.Provider value={value}>{children}</ArticleContextpost.Provider>
}