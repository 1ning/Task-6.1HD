import { createContext, useState } from "react";
import React from 'react';
import { useEffect } from "react";
import { fetchVideosAndDocuments } from "../utils/firebase";



//Get all videos in the database
export const  VideoContext = createContext(
    {
        staff2: [],
    }
)

export const  VideoProvider = ({children})=>
{
    const [staff2, setStaff] = useState([])
    useEffect(()=>{
        const fetchStaffMap = async() =>{
            const staffMap = await fetchVideosAndDocuments();
            setStaff(staffMap)
        }
        fetchStaffMap();
    }, [])
    const value = {staff2}
    return <VideoContext.Provider value={value}>    
   {children}</VideoContext.Provider>
}