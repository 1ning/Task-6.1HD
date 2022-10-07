import { createContext, useState } from "react";
import React from 'react';
import { useEffect } from "react";
import { fetchArticlesAndDocuments } from "../utils/firebase";


//Get all articles in the database
export const  ArticleContext = createContext(
    {
        staff2: [],
    }
)

export const  ArticleProvider = ({children})=>
{
    const [staff2, setStaff] = useState([])
    useEffect(()=>{
        const fetchStaffMap = async() =>{
            const staffMap = await fetchArticlesAndDocuments();
            setStaff(staffMap)
        }
        fetchStaffMap();
    }, [])

    const value = {staff2}
    return <ArticleContext.Provider value={value}>    
   {children}</ArticleContext.Provider>
}