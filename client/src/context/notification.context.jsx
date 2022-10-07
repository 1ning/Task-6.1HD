import { createContext, useState } from "react";
import React from 'react';

//Get all notification of the currently logged in user in the database
export const  NotificationContext = createContext(
    {
        currentNotification:null,
        setcurrentNotification:()=>null
    }
)


export const NotificationProvider = ({children})=>
{
    const [currentNotification,setcurrentNotification]=useState(null)
    const value= { currentNotification,setcurrentNotification}
    return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}