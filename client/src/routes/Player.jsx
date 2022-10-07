import React,{useContext} from 'react';
import JoLPlayer from "jol-player";
import '../Player.css';

import { Rating } from 'semantic-ui-react'
import{ PlayContext} from '../context/play.context';
import { addCollectionAndDocument } from "../utils/firebase";
import { useState } from 'react';
import { UserContext} from '../context/user.context';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { db2 } from "../utils/firebase.js";
import { set, ref, onValue, remove, update } from "firebase/database";
//When the user clicks on the video they will be
//redirected to this page to see more information about the video
function Player() {
const {currentUser}=useContext(UserContext)
const [rating, setRating] = useState(0);
const [view, viewtime] = useState(0);
const {currentPlay}=useContext(PlayContext)
const[click,setClick] = useState(0);
const [postinfo, setpostinfo] = useState("");
//Determine if the user clicked on one video of the article before jumping to this page
  if(currentPlay!=null)
  {
    //Update the database with the number of times the video has been played when it is finished
  function onEndEd()
  {
    var x=currentPlay;
    x.view=x.view+1;
    addCollectionAndDocument('video',x)
    viewtime(view+1);
  }
  //Update posted comments to the video author's notification
  function writeUserData(data1) {
    var arr1= new Array()
    onValue(ref(db2,currentPlay.uid), (snapshot) => {
      arr1=[];
      if(snapshot.val()!=null)
      arr1= snapshot.val().context;
    })
			if(arr1!=null)
			 {
        arr1.push(data1)
        update(ref(db2,currentPlay.uid), {
          context:arr1,
        });
        }
       else{
        set(ref(db2,currentPlay.uid), {
          context:arr1,
        });
       }
    }
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
  <Link to='/Upload'><li><a href="#about">Upload</a></li></Link>
        </ul>
<div class="box1">
    <p class="title1">{currentPlay.title}</p>
    <i class="large youtube play icon" id="icon2">{currentPlay.view} </i>
    <i class="large clock icon" id="icon2">{new Date(currentPlay.time.seconds*1000).toLocaleDateString() + ' at ' + new Date(currentPlay.time.seconds*1000).toLocaleTimeString()}</i> 
    <i class="large star icon" id="icon2">{currentPlay.rating}</i> 
        <JoLPlayer
        onEndEd={onEndEd}
        option={{
          videoSrc:currentPlay.video,
          width: 750,
          height: 420,
          language:"en"
        }}
      />
      <div class="ui divider" id="box2"></div>
             Please rating for this video <Rating maxRating={5} clearable  onRate={handleChangeOnRate} value={rating}/>
      <div class="ui divider" id="box2"></div>
      <p>Author: {currentPlay.author}</p>
      <p>Description:</p>
      <div id="box3">{currentPlay.context}</div>
       <div class="ui divider"id="box2"></div>
       <p>{currentPlay.comment.length} Comments</p>
       <div class="ui icon input" id="searchbar2"><input type="text" placeholder="Search..." onChange={handleChange2}/></div>
       <button class="ui button" onClick={ Postcomment }>Post</button>
       <p></p>
       {currentPlay.comment.map(Search2)}
     </div>
            </div>);
            //Update the rating of the video
            function handleChangeOnRate(e, { rating }) {
              setClick(1)
              e.preventDefault();
              setRating(rating);
              var x=currentPlay;
              x.rating=Math.floor((x.ratetime*x.rating+rating)/(x.ratetime+1) * 10) / 10;
              x.ratetime=x.ratetime+1;
              addCollectionAndDocument('video',x)
            }
           //Get the current time
            function getmyDate() {
              var date = new Date();
              var year = date.getFullYear().toString();
              var month = (date.getMonth()+1).toString();
              var day = date.getDate().toString();
              var hour =  date.getHours().toString();
              var minute = date.getMinutes().toString();
              return year+'/'+month+'/'+day+''+' '+hour+':'+minute;
          };
          //Post comments and update the database
          function Postcomment(){
           var x=currentPlay;
           if(currentUser!=null)
           {
            x.comment.push(currentUser.email+"///"+postinfo)
            viewtime(view+1);
            addCollectionAndDocument('video',x)
             writeUserData(currentUser.email+"///"+postinfo+"///"+getmyDate())
            }
          else{
            alert("Please Login first")
          }
       }
     }
      else{
         const nav = useNavigate();
         nav("/Videolist");
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

export default Player;