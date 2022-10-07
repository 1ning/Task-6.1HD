import React,{useContext} from 'react';
import { Accordion, Icon } from 'semantic-ui-react'
import { useState } from "react";
import { useEffect } from 'react';
import '../Videolist.css';
import {  VideoContext } from '../context/videos.context';
import{ PlayContext} from '../context/play.context';
import { Link } from 'react-router-dom';

//Videolist page
function Videolist(){
  const {staff2} = useContext(VideoContext)
  const {setcurrentPlay}=useContext(PlayContext)
  const [a, b] = useState(0);
  const [h, f] = useState(0);
  const [commentShown, setCommentShown] = useState({});
  const [filteredStaff3,c]=useState(staff2)
  const [searchstate, setsearchstate] = useState("title");
  const [searchinfo, setsearchinfo] = useState("");
  useEffect(
    ()=>{
        c(staff2);
    },
    [staff2]
  );


  //Get the value entered in the search box
  const handleChange=(event)=>
  {
    setsearchinfo(event.target.value);
  } 
  //Filter by the content of the search box
  const filtersearch=async(event)=>
   {
     event.preventDefault();
     if(searchinfo===null)
     searchinfo=""
     b(a+1);
      if(searchstate==="title"){
      var d= staff2.filter((staff2)=>{
      return staff2.title.toLowerCase().includes(searchinfo.toLowerCase())
       })
       c(d);
      }
        if(searchstate==="discription"){
          var d= staff2.filter((staff2)=>{
          return staff2.context.toLowerCase().includes(searchinfo.toLowerCase())
           })
           c(d);
          }
          if(searchstate==="time"){
            var d= staff2.filter((staff2)=>{
            var T=new Date(staff2.time.seconds*1000).toLocaleDateString() + new Date(staff2.time.seconds*1000).toLocaleTimeString()
            return T.includes(searchinfo)
             })
             c(d);
            }
     return 
   }
  return(
    <div>
        <div id="box4">
   <input type="text" id="search" placeholder="Search .." required="required"  onChange={handleChange}/>
        <select id="selection" value={searchstate} 
              onChange={(e) => setsearchstate(e.target.value)}
              >
        <option value="title">title</option>
        <option value="discription">discription</option>
        <option value="time">time</option>
      </select>
      <button onClick={filtersearch}>search</button>
      </div>
      <div class="big">
    <div class="ui four cards" id="sadasd">
      {filteredStaff3.map(Search2)}   
    </div>       </div>   
    </div>   
    );
function Search2(item,i){
  //Passing the value of the video clicked
    const handleMore = () => {
        setcurrentPlay(item)
      };
    if(!commentShown[item.title])
    {
      return(
        <div class="light"  onClick={handleMore}> 
          <Link to="/Player">
          <img src={item.img} alt="HTML5 Logo" class="photo" id="photo1"/>
          <div class="tip">
        <strong>{item.title}</strong>
          <p>
            {item.author}
          </p>
        </div>
        <div>
          </div>
          </Link>
        </div>
     );
    }
 };

};



 export default Videolist