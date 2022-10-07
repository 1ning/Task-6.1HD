import React from 'react';
import { useContext,useState } from 'react';
import './App.css';
import {  ArticleContextpost } from '../../context/articles.post';
import {  QuestionContextpost } from '../../context/question.post';
import { addCollectionAndDocument } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";


function Bottom(){
   const {currentArticle}=useContext(ArticleContextpost)
   const {currentQuestion}=useContext(QuestionContextpost)
   const nav = useNavigate();
   //Uploading articles or questions to the database
   const handleSubmit1=async(event)=>
   {
     event.preventDefault();
     try{
      if(currentQuestion!=null){
         {currentQuestion.time=new Date()}
         addCollectionAndDocument('questions',currentQuestion)
        alert("upload successfully")
        nav("/");
   }
   else{
      {currentArticle.time=new Date()}
      addCollectionAndDocument('articles',currentArticle)
      console.log(currentArticle.img)
      alert("upload successfully")
      nav("/");
   }
     }
     catch(error){
       console.log('error in uploading ',error.message)
       alert(error.message)
   }
 }

   return(
    <div>
    <button class="button1" onClick={handleSubmit1} >Post</button>
    </div>
    );
   }
   export default Bottom