import React,{useContext} from 'react';
import { Accordion, Icon, Image, Item, Label,Button , Dropdown, Input } from 'semantic-ui-react'
import '../question.css';
import { useState } from "react";
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import {  QuestionContext } from '../context/question.context';
import {  CurrentQuestioncontext } from '../context/currentquestion.context';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useNavigate } from "react-router-dom";

//Questionlist page
function Questionlist(){
  const {staff} = useContext(QuestionContext)
  const {currentQuestion} = useContext(CurrentQuestioncontext)
  const {setcurrentQuestion} = useContext(CurrentQuestioncontext)
  const [h, f] = useState(0);
  const [commentShown, setCommentShown] = useState({});
  //Function to hide the items whose buttons are hidden by clicking on them
  const toggleComment = (id) => {
    setCommentShown(prev => Boolean(!prev[id]) ? {...prev, [id]: true} : {...prev, [id]: false});
  };
  const [filteredStaff3,c]=useState(staff)
  const [searchstate, setsearchstate] = useState("title");
  const [searchinfo, setsearchinfo] = useState("");
  useEffect(
    ()=>{
        c(staff);
    },
    [staff]
  );

   //Get the value entered in the search box
  const handleChange=(event)=>
  {
    setsearchinfo(event.target.value);
  } 
   //Functions for filtering searches
  const filtersearch=async(event)=>
   {
     event.preventDefault();
     if(searchstate=="title"){
      var d= staff.filter((staff)=>{
      return staff.title.toLowerCase().includes(searchinfo.toLowerCase())
       })
       c(d);
      }
      if(searchstate=="tags"){
        var d= staff.filter((staff)=>{
        return staff.tags.toLowerCase().includes(searchinfo.toLowerCase())
         })
         c(d);
        }
        if(searchstate=="discription"){
          var d= staff.filter((staff)=>{
          return staff.context.toLowerCase().includes(searchinfo.toLowerCase())
           })
           c(d);
          }
          if(searchstate=="time"){
            var d= staff.filter((staff)=>{
            var T=new Date(staff.time.seconds*1000).toLocaleDateString() + new Date(staff.time.seconds*1000).toLocaleTimeString()
            return T.includes(searchinfo)
             })
             c(d);
            }
     return 
   }
   //Functions that allow the user to drag and drop cards
  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(filteredStaff3);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    c(items);
  }
  return(
    <div >
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
      <DragDropContext onDragEnd={handleOnDragEnd} >
          <Droppable droppableId="characters">
      {(provided) => ( 
    <div className="characters" {...provided.droppableProps} ref={provided.innerRef}>
    {filteredStaff3.map(Search2)}
    {provided.placeholder}
    </div>
    )}
    </Droppable>
        </DragDropContext>
    </div>
    );
function Search2(item,i){
    //Passing the value of the currently clicked question
function handlemore()
{
 setcurrentQuestion(item)

}
//The function is to click the hide button to hide the current item
  const handlehandleClick2 = (e) => {
    toggleComment(item.title)
    }
      //Clicking on the card will expand
  const handlehandleClick = (e) => {
    if(h==i)
    {f(-1)}
    else 
    f(i);
    }
    if(!commentShown[item.title])
    {return(
      <Draggable key={item.title} draggableId={item.title} index={i}>
  {(provided) => (
      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
      <div class="headbox1">  
      <Accordion>
      <Accordion.Title
        active={h === i}
        index={i}
        onClick={handlehandleClick}
      >   
        <strong>{item.title}</strong>
        <div><span className='cinema'>{new Date(item.time.seconds*1000).toLocaleDateString() + ' at ' + new Date(item.time.seconds*1000).toLocaleTimeString() }</span></div>
   </Accordion.Title>  
        <Accordion.Content active={h === i}>
          <p>
            {item.context}
          </p>
        </Accordion.Content>
        </Accordion>
        <span className='fw'>{item.tags}</span>
        <div>
        <Link to="/Questionpage">
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

 export default Questionlist