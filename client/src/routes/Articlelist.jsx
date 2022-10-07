import React,{useContext} from 'react';
import { Accordion, Icon } from 'semantic-ui-react'
import '../question.css';
import { useState } from "react";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {  ArticleContext } from '../context/articles.context';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import{ CurrentArticlecontext} from '../context/currentarticle.context';

//Articlelist page
function Articlelist(){
  const {staff2} = useContext(ArticleContext)
  const [a, b] = useState(0);
  const [h, f] = useState(0);
  const {setcurrentArticle}=useContext(CurrentArticlecontext)
  const [commentShown, setCommentShown] = useState({});
  //Function to hide the items whose buttons are hidden by clicking on them
  const toggleComment = (id) => {
    setCommentShown(prev => Boolean(!prev[id]) ? {...prev, [id]: true} : {...prev, [id]: false});
  };
  const [filteredStaff3,c]=useState(staff2)
  const [searchstate, setsearchstate] = useState("title");
  const [searchinfo, setsearchinfo] = useState("");
  useEffect(
    ()=>{
        c(staff2);
    },
    [staff2]
  );

//Functions that allow the user to drag and drop cards
  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(filteredStaff3);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    c(items);
  }
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
      if(searchstate=="tags"){
        var d= staff2.filter((staff2)=>{
        return staff2.tags.toLowerCase().includes(searchinfo.toLowerCase())
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
   <input type="text" id="search" placeholder="Search .." required="required"  onChange={handleChange}/>
        <select id="selection" value={searchstate} 
              onChange={(e) => setsearchstate(e.target.value)}
              >
        <option value="title">title</option>
        <option value="tags">tags</option>
        <option value="discription">discription</option>
        <option value="time">time</option>
      </select>
      <button onClick={filtersearch}>search</button>
      <DragDropContext onDragEnd={handleOnDragEnd}>
     <Droppable droppableId="characters">
     {(provided) => ( 
    <div className="characters" {...provided.droppableProps} ref={provided.innerRef}>
    {filteredStaff3.map(Search2)}
    </div>   
    )}
    </Droppable>
        </DragDropContext>
    </div>
    );
function Search2(item,i){

  //Passing the value of the currently clicked article
  function handlemore()
{
 setcurrentArticle(item)
}
//The function is to click the hide button to hide the current item
  const handlehandleClick2 = (e) => {
    toggleComment(item.title)
    }
  //Clicking on the card will expand
  const handlehandleClick = (e) => {
    if(h===i)
    {f(-1)}
    else 
    f(i);
    }
    if(!commentShown[item.title])
    {
      return(
        <Draggable key={item.title} draggableId={item.title} index={i}>
        {(provided) => (
            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <div class="headbox1">
        <div class="big1">
          <img src={item.img} alt="HTML5 Logo" class="articlephoto"/>
          </div>
          <div class="big2">
      <Accordion>
      <Accordion.Title
        active={h === i}
        index={i}
        onClick={handlehandleClick}
      >   
        <strong>{item.title}</strong>
        <div><span className='cinema'>{new Date(item.time.seconds*1000).toLocaleDateString() + ' at ' + new Date(item.time.seconds*1000).toLocaleTimeString() }</span></div>
        <div><span className='cinema'>{item.abstract }</span></div>
     </Accordion.Title>  
        <Accordion.Content active={h === i}>
          <p>
            {item.context}
          </p>
        </Accordion.Content>
        </Accordion>
        <span className='fw'>{item.tags}</span>  
        </div>
        <div>      
           <Link to="/Articlepage">
          <button  class='SD'  onClick={handlemore}>
           <Icon name='angle right' />
            Read
          </button></Link>
          <button  class='SD'  onClick={handlehandleClick2}>
          <Icon name='angle right' />
            Hidden
          </button>
          </div>
        </div>
        </div>
       )}
       </Draggable>
     );
    }
 };
};

 export default Articlelist