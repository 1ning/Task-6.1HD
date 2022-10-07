import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { useState } from "react";
import { useContext} from 'react';
import { UserContext} from '../../context/user.context';
import { useEffect } from 'react';
import { db2 } from "../../utils/firebase.js";
import { set, ref, onValue, remove, update } from "firebase/database";
import { Timestamp } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { NotificationContext} from '../../context/notification.context';
function Search(){
    const auth=getAuth()
    const {setCurrentUser}=useContext(UserContext)
    const {currentUser}=useContext(UserContext)
    const {setcurrentNotification}=useContext(NotificationContext)
    const {currentNotification}=useContext(NotificationContext)
    const [tip,settip]=useState([])
    const [tipview,settipview]=useState(0)
    useEffect(()=>{
        setCurrentUser(auth.currentUser)
      },[])
  
        useEffect(()=>{
            if(currentUser!=null)
            {
            onValue(ref(db2,currentUser.uid), (snapshot) => {
                if(snapshot.val()!=null)
                 {console.log(snapshot.val().context)
                 settip(snapshot.val().context)
                 setcurrentNotification(snapshot.val().context)}
              });
            }
        }, [])
        useEffect(()=>{
            if(tip!=null)
          settipview(tip.length)
        }, [tip])
   
   return(
    <div>
    <div class="Subscribe" >
        <strong class="Signup">DEV@Deakin</strong>
     <input type="text" id="Homepagesearch" placeholder="Search .." required="required" />
    <Link to="/Post"> <button class="HomgepageButton">Post</button> </Link>
    <Link to="/Login"> <button class="HomgepageButton">Login</button></Link>
    <Link to="/Questionlist"> <button class="HomgepageButton">Find</button></Link>
    <Link to="/Plan"> <button class="HomgepageButton">Plan</button></Link>
    <Link to="/Notification"><i class="huge bell icon" id="bell">{tipview}</i></Link>
    <div class="ui popup">
  <div class="header">User Rating</div>
  <div class="ui star rating" data-rating="3"></div>
</div>
    </div> 
    </div>
    );
}
export default Search