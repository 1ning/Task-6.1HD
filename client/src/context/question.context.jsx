import { createContext, useState } from "react";
import React from 'react';
import { useEffect } from "react";
import { fetchQuestionsAndDocuments } from "../utils/firebase";


//Get all questions in the database
export const  QuestionContext = createContext(
    {
        staff: [],
    }
)

export const  QuestionProvider = ({children})=>
{
    const [staff, setStaff] = useState([])
    useEffect(()=>{
        const fetchStaffMap = async() =>{
            const staffMap = await fetchQuestionsAndDocuments();
            setStaff(staffMap)
        }
        fetchStaffMap();
    }, [])

    const value = {staff}
    return <QuestionContext.Provider value={value}>    
   {children}</QuestionContext.Provider>
}