import { confirmPasswordReset, createUseWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { useState } from 'react';
import '../Login.css';
import { useNavigate } from "react-router-dom";
import{createAuthUserWitEmailandnameandpassword,createUserDocFromAuth}from '../utils/firebase.js'

//Registration page
const Signup=(props)=>{
  
    const[contact,setContact]=useState({
      displayName:'',
      email:'',
      password:'',
      confirmPassword:''
    })
    const nav = useNavigate();
    const {displayName, email, password, confirmPassword} = contact;
//Get the value entered in each input box
  const handleChange=(event)=>
    {
    const {name,value}=event.target
    setContact((preValue)=>{
     return{
      ...preValue,
      [name]:value
     }
    })
    }
    //Send a registration request
    const handleSubmit=async(event)=>
    {
      event.preventDefault();
      if(password!=confirmPassword)
      {
        alert('Passwords do not match!')
        return;
      }
      try{
        const {user}=await createAuthUserWitEmailandnameandpassword(email,password)
        await createUserDocFromAuth (user,{displayName});
        nav("/Login");
      }
      catch(error){
        console.log('error in creating user',error.message)
    }
  }
   return<div class="signupbox">
<div class="inputContainer">
<label for="" class="label"></label>
    <a class="tip2">Create a DEV@Deakin Account</a>
    </div>
    <form action="" class="form">       
      <div class="inputContainer">
      <label for="" class="label">Name*</label>
        <input name="displayName" type="text" class="input" onChange={handleChange} value={contact.displayName}/>
      </div>
      <div class="inputContainer">
      <label for="" class="label">Email*</label>
        <input name="email" type="email" class="input" onChange={handleChange} value={contact.email}/>
      </div>
      <div class="inputContainer">
      <label for="" class="label">Password*</label>
        <input name="password" type="password" class="input" onChange={handleChange} value={contact.password}/>
      </div>
      <div class="inputContainer">
      <label for="" class="label">Confirm Password*</label>
        <input name="confirmPassword" type="password" class="input" onChange={handleChange} value={contact.confirmPassword}/>
      </div>
      <div class="inputContainer">
      <label for="" class="label"></label>
       <input type="submit" class="submitBtn1" value="Sign up" onClick={handleSubmit}/>
       </div>
    </form>
  </div>
}
export default Signup;