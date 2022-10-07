import React,{useContext} from 'react';
import './App.css';
import { useState } from "react";
import { Form, TextArea } from 'semantic-ui-react'
import {  ArticleContextpost } from '../../context/articles.post';
import {  QuestionContextpost } from '../../context/question.post';
import CodeMirror from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
function Question(){
  //Take two contexts to use, one to save the parameters 
  //and the other to clear all the data of the other parameter when one is used
  const {setCurrentArticle}=useContext(ArticleContextpost)
  const {setCurrentQuestion}=useContext(QuestionContextpost)
  const[contact,setContact]=useState({
    title:'',
    context:'',
    tags:'',
    time:'',
    code:'',
    comment:[]
  })
  //clear data
  setCurrentArticle(null);
  const {title, context, tags, time, code} = contact;
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
//Get the value entered in Codemirror
  const handleChange2=(value)=>
  {  
    var x=contact;
    x.code=value;
    setContact(x)
  }
  //updata data that need upload
  setCurrentQuestion(contact);
   return(
    <div  class="postRadio">
    <div class="postRadio2">
      <span class="postRadio1">Title</span> 
     <input name="title" type="text" placeholder='Enter a title' class="posttextbox"  onChange={handleChange} value={contact.title}/> </div>
   <span class='postRadio1'>Describe your problem</span> 
   <div class="postboxl">
   <Form>
    <TextArea  class='postbox2' style={{ minHeight: 200 }}  placeholder='Start with your question with how,what, why, etc.' name="context" onChange={handleChange} value={contact.context}/>
  </Form>
  <CodeMirror
  onChange={handleChange2}
  value={contact.code}
  height="200px"
  extensions={[markdown({ base: markdownLanguage, codeLanguages: languages })]}/>
  </div>
  <div class="postRadio"><span class="postRadio1">Tags</span>  <input name="tags" type="text" placeholder='Please add up to 3 tags to describe what your question is about e.g., Java ' class="posttextbox2"  onChange={handleChange} value={contact.tags}/> </div>
    </div>
    );
}
export default Question