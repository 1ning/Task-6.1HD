import { createContext, useState } from "react";
import React from 'react';
import { useEffect } from "react";
import { db2 } from "../utils/firebase";
import { set, ref, onValue, remove, update } from "firebase/database";



//Get the conversation between the two parties saved in the database
export const  TalkContext = createContext(
    {
        staff2: [],
    }
)

export const  TalkProvider = ({children})=>
{
    const [staff2, setStaff] = useState([])
    useEffect(()=>{
        onValue(ref(db2), (snapshot) => {
            setStaff([]);
            const data = snapshot.val();
            if (data !== null) {
              Object.values(data).map(
                (todo) => {
                setStaff((oldArray) => [...oldArray, todo]);
              });
            }
          });
    }, [])

    const value = {staff2}
    return <TalkContext.Provider value={value}>    
   {children}</TalkContext.Provider>
}