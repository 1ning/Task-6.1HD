import React from 'react';
import './App.css';
import articles from './featuredarticles';
import { Link } from 'react-router-dom';
function Articles(){
    return(
     <div class="head">
      <p class="title"><strong>Featured Articles</strong></p>
      <div>
      {articles.map(CommentItem)}
      </div>
      <Link to="/Articlelist"><button class="ui button" id="button1">
        See all articles
      </button></Link>
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
<div class="extracontent">
    <i class="star icon" id="star">{item.star}</i>
   <span class="box3">{item.author} </span>
</div>

</div>
)
}
 export default  Articles