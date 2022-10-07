import React from 'react';
import './App.css';
import tutorials from './featuredtutorials';
import { Link } from 'react-router-dom';
function Tutorials(){
    return(
     <div class="head">
      <p class="title"><strong>Featured Tutorials</strong></p>
      <div>
      {tutorials.map(CommentItem)}
      </div>
      <Link to="/Videolist"> <button class="ui button" id="button2">
        See all Tutorials
      </button>
      </Link>
     </div>
   
     );
 }

 function CommentItem(item,i){
    return(
<div class="ui card" id="uicard">
  <div class="image">
    <img src={item.img} alt="sad"/>
  </div>
  <div class="content">
    <a class="header">{item.name}</a>
    <div class="description">
      {item.context}
    </div>
  </div>
  <div class="box4">
  <div class="extracontent">
      <i class="star icon" id="star1">{item.star}</i>
      <span class="box3">{item.username} </span>
  </div>
  </div>
</div>
)
 }
 export default  Tutorials