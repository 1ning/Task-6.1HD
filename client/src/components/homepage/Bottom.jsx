import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
function Bottom(){
    return(
 <div class="bottompage">
  <div class="item1">
    <div class="header"><strong>Explore</strong></div>
    <div class="menu">
      <a class="item">Home</a>
      <Link to='/Questionlist'><a class="item">Question</a></Link>
      <Link to='/Articlelist'><a class="item">Articles</a></Link>
      <Link to='/Videolist'><a class="item">Tutorials</a></Link>
    </div>
    </div>
    <div class="item2">
    <div class="header"><strong>Support</strong></div>
    <div class="menu">
      <a class="item">FAQs</a>
      <a class="item">Help</a>
      <Link to='/Chatbox'><a class="item">Contact us</a></Link>
    </div>
    </div>
    <div class="item2">
    <div class="header"><strong>Stay connected</strong></div>
    <div class="menu">
    <img class="icon" src="/photo/ins.jpg" alt="ins"/>
    <img class="icon" src="/photo/facebook.png" alt="facebook"/>
    <img class="icon" src="/photo/twitter.png" alt="twitter"/>
    </div>
    </div>
    <div class="head">
    <strong>DEV@Deakin &nbsp; 2022</strong>
    </div>
    <div class="head">
    <a class="item3">Privacy policy</a> 
    <a class="item3">Terms </a>
    <a class="item3">Code of Conduct </a>
    </div>
  </div>
     );
 }
 export default Bottom