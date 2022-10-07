import React,{useContext} from 'react';
import JoLPlayer from "jol-player";
import '../Player.css';

import { Rating } from 'semantic-ui-react'
import{ CurrentQuestioncontext} from '../context/currentquestion.context';
import { addCollectionAndDocument } from "../utils/firebase";
import { useState } from 'react';
import { UserContext} from '../context/user.context';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import CodeMirror from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';

//When the user clicks on the read button they will be
//redirected to this page to see more information about the question
function Questionpage() {
const {currentUser}=useContext(UserContext)
const [rating, setRating] = useState(0);
const [view, viewtime] = useState(0);
const {currentQuestion}=useContext(CurrentQuestioncontext)
const [postinfo, setpostinfo] = useState("");
//Determine if the user clicked on the read button of the article before jumping to this page
  if(currentQuestion!=null)
  {
 //Get the value of the post comment box
  const handleChange2=(event)=>
{
  setpostinfo(event.target.value);
} 
    return(
   <div>
   <ul>
   <Link to='/Videolist'><li><a class="active" href="#home">Videolist</a></li></Link>
   <Link to='/Homepage'> <li><a href="#news">Homepage</a></li></Link>
   <Link to='/Plan'><li><a href="#contact">Plan</a></li></Link> 
  <div class="ui icon input" id="searchbar"><input type="text" placeholder="Search..."/><i aria-hidden="true" class="big search icon" id="icon1"></i></div>
   <Link to='/Login'><li><a href="#about">{currentUser===null?"Login":"SignOut"}</a></li></Link>
   <Link to='/Chatbox'><li><a href="#about">Contact</a></li></Link>
  <Link to='/Post'><li><a href="#about">Post</a></li></Link>
        </ul>
<div class="box1">
    <p class="title1">{currentQuestion.title}</p>
    <i class="large clock icon" id="icon2">{new Date(currentQuestion.time.seconds*1000).toLocaleDateString()}</i> 
    <p>Description:</p>
      <div id="box3">{currentQuestion.context}</div>
      <p>Code:</p>
      <CodeMirror
      readOnly
  value={currentQuestion.code}
  height="200px"
  extensions={[markdown({ base: markdownLanguage, codeLanguages: languages })]}/>

      <div class="ui divider" id="box2"></div>

       <div class="ui divider"id="box2"></div>
       <p>{currentQuestion.comment.length} Comments</p>
       <div class="ui icon input" id="searchbar2"><input type="text" placeholder="Search..." onChange={handleChange2}/></div>
       <button class="ui button" onClick={ Postcomment }>Post</button>
       <p></p>
       {currentQuestion.comment.map(Search2)}
     </div>
            </div>);
//function to upload comments to the database
function Postcomment(){
  var x=currentQuestion;
    //The comment function must be logged in to post, check if the user is logged in
  if(currentUser!=null)
{
  //The output of each comment is facilitated by combining
  //the commenter and the information posted into a string statement
  x.comment.push(currentUser.email+"///"+postinfo)
  viewtime(view+1);
  addCollectionAndDocument('questions',x)
}
else{
    alert("Please Login first")
    }
}
}
else{
  const nav = useNavigate();
  nav("/Videolist");
  console.log("sad")
}
}

//Iterate through the comments and output the comment statement values as the corresponding messages
function Search2(item,i){
  var arr = item.split('///');
  return(
   <div>
    {arr[0]}
    <div>{arr[1]}</div>
    <div class="ui divider"id="box2"></div>
   </div>
  )
}

export default Questionpage;