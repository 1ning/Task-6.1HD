import React from 'react';
import { useState } from "react";
import './App.css';
import { Form } from 'semantic-ui-react'
import Article from './Articles';
import Question from './questions';


//Radio at the top
function Top(){
    var [Name, setname] = useState('question');
    const handleChange = ()=>{
    if(Name==='question')
        Name='article';
     else
        Name='question';
        setname(Name)
    }
      return(
      <div>
        <div class="postRadio">
            <Form>
            <Form.Group inline>
            <span class="Radio1">Select Post Type:</span> 
            <Form.Radio
                label='Question'
                name='radioGroup'
                value='question'
                checked={Name==='question'}
                onChange={handleChange}
              />
            <Form.Radio
                label='Article'
                name='radioGroup'
                value='article'
                checked={Name==='article'}
                onChange={handleChange}
              />
               </Form.Group>
          </Form>
        </div> 
        <div class="top" >
            <strong >Wha do you want to share or ask</strong>
        </div>
        {/*Conditional rendering based on Radio selection */}
         {(() => {
          if (Name==="question") {
            return <div><Question/></div>;
          }
           else
            return <div><Article/></div>;
        })()}
        </div>
        );
    }
export default Top