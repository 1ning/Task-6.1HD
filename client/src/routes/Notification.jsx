import React,{useContext} from 'react';
import { Accordion, Icon, Image, Item, Label,Button , Dropdown, Input } from 'semantic-ui-react'
import { useState } from "react";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {  NotificationContext } from '../context/notification.context';
import { UserContext} from '../context/user.context';
import '../notification.css';
import { db2 } from "../utils/firebase.js";
import { set, ref, onValue, remove, update } from "firebase/database";
//Notification page to display new messages received by the user, 
//which can be deleted by the user after clicking the read button
function Notification(){
  const {currentNotification} = useContext(NotificationContext)
  const {setcurrentNotification} = useContext(NotificationContext)
  const {currentUser}=useContext(UserContext)
  if(currentUser==null)
  {
    alert("please login first")
  }
 else{
  return(
    <div >
    <div class="Nheadbox2">  
    <p>Welcome to your feed page</p>
   Here are some new notifications <button class="SD" onClick={removeall}>Read All</button></div>
    {currentNotification!=null?currentNotification.map(maptip):null}
    </div>
    );
  }
  //Delete all notifications at once
  function removeall(){
    setcurrentNotification([])
    var arr= new Array()
    setcurrentNotification(arr)
    update(ref(db2, currentUser.uid), {
        context:arr,
      });
  }



  function maptip(item,i)
  {
    var arr=item.split("///")
    //Delete the current clicked message
    function removenotification()
    {
        if(currentNotification.length>1)
       { var arr= new Array()
        arr=currentNotification;
        arr.splice(arr.indexOf(item), 1)
        update(ref(db2, currentUser.uid), {
            context:arr,
          });
        } 
        else if(currentNotification.length==1){
          removeall()
        }
    }
    if(arr!=[]){
    return(
        <div class="Nheadbox2">  
          <strong>{arr[0]}</strong>
          <div><p><strong id="posttime"> {arr[2]}</strong></p>
          </div>
            <strong><p>{arr[1]}</p></strong>  
          <button class="SD"
            onClick={removenotification}>
              Read
            </button>

            </div>
    )
    }
  }
}

 export default Notification