import React, { useEffect, useRef,useContext } from 'react';
import '@chatui/core/es/styles/index.less';
import Chat, { Bubble, useMessages } from '@chatui/core';
import '@chatui/core/dist/index.css';
import { db2 } from "../utils/firebase.js";
import { set, ref, onValue, remove, update } from "firebase/database";
import { useState } from "react";
import { UserContext} from '../context/user.context';
import { useNavigate } from "react-router-dom";

//This page is for online communication between users and administrators

const initialMessages = [
	{
	  type: 'text',
	  content: { text: 'Access to new enquirer' },
	}
  ];
  //When a new conversation is opened, the database in which
  //the second conversation was saved is emptied, and create a new
  // data to save the conversation
  function writeUserData() {
	console.log("sad")
    set(ref(db2,"talk"), {
      context:["Hello, what I can help you#"],
	  status:1
    });
  }

  // Default shortcut phrase, optional
  const defaultQuickReplies = [
	{
	  name: 'End of chat',
	  isHighlight: true,
	}
  ];

const Chatbox = () => {
	//This page is only available if the user is logged in to first determine if the user is logged in
	const {currentUser}=useContext(UserContext)
	if(currentUser==null)
	{	
		const nav = useNavigate();
		alert("please login first")
		nav("/")
	}
	else{
	const { messages, appendMsg, setTyping } = useMessages(initialMessages);
	const [data1,setdata]=useState([])
	const [data2,setdata2]=useState([])
	const [status,setstatus]=useState(0)
	const [x,y]=useState(0)
	//Always get the conversation updated in the database
	useEffect(()=>{
		onValue(ref(db2,'talk'), (snapshot) => {
			if(snapshot.val()!=null)
			 setdata(snapshot.val().context);
			 setstatus(snapshot.val().status)
			 console.log(snapshot.val().status)
		  });
    }, [])
	useEffect(()=>{
		setdata2(data1)
		if(currentUser.email!="admin@deakin.edu.au")
		{
		if(x==1)
		data1.map(mapmessage)
		else if(x>1){
			var L=data1.length
			mapmessage(data1[L-1])
		}
	   }
	else{
		if(x==1)
		data1.map(mapmessage2)
		else if(x>1){
			var L=data1.length
			mapmessage2(data1[L-1])
		}
	}
		y(x+1)
    }, [data1])
	
  //Output dialogue to the corresponding location according to user type
	function mapmessage(item)
  {
	if(currentUser.email==status||status==1||currentUser.email=="admin@deakin.edu.au")
	{
	var arr = item.split('#');
	if(arr.length>1)
	{
		appendMsg({
		type: 'text',
		content: { text: arr[0] },
	  });
	}
	else{
		appendMsg({
			type: 'text',
			content: { text: arr[0] },
			position: 'right',
		  });
	}
  }

}
//Output dialogue to the corresponding location according to user type
function mapmessage2(item)
{
	if(currentUser.email==status||status==1||currentUser.email=="admin@deakin.edu.au")
	{
  var arr = item.split('#');
  if(arr.length>1)
  {
	  appendMsg({
	  type: 'text',
	  content: { text: arr[0] },
	  position: 'right',
	});
  }
  else{
	  appendMsg({
		  type: 'text',
		  content: { text: arr[0] },
		});
  }
  }
}
//Sending conversations to the database and adding suffixes
//according to the type of user, distinguishing the position of each conversation
function handleSend(type,val) {
	if(currentUser.email==status||status==1||currentUser.email=="admin@deakin.edu.au")
	{
	if (val.trim()){
	console.log(val)
	var data=new Array();
	const starCountRef = ref(db2, 'talk');
	//If "End of chat" is sent, the conversation will end and the database will be cleared.
	if(val=="End of chat")
	{
		const starCountRef = ref(db2, 'talk');
		var data=new Array();
		writeUserData()
		  y(0)
	}
	else
	{
	onValue(starCountRef, (snapshot) => {
		data = snapshot.val().context;
	  });
	  if(currentUser.email=="admin@deakin.edu.au")
	  {
	  data.push(val+"#")
	  }
	  else
	  { 
		 data.push(val)
	  }
	   var h=currentUser.email
	   if(h!="admin@deakin.edu.au")
	   {
	   update(ref(db2, `/${"talk"}`), {
		context:data,
		status:currentUser.email
	  });
	  }
	  else{
		update(ref(db2, `/${"talk"}`), {
			context:data,
		  });
	  }
	}
}
  }
  else{
	alert("Please wait for customer service ")
  }
}
//Quick Reply
  function handleQuickReplyClick(item) {
	handleSend('text1', item.name);
  }
  
	//Render
	function renderMessageContent(msg) {
	  const { type, content } = msg;
  
	  // Conditional rendering
	  switch (type) {
		case 'text':
		  return <Bubble content={content.text} />;
		case 'image':
		  return (
			<Bubble type="image">
			  <img src={content.picUrl} alt="" />
			</Bubble>
		  );
		default:
		  return null;
	  }
	}
  
	return (
	  <Chat
		navbar={{ title: 'Help' }}
		messages={messages}
		renderMessageContent={renderMessageContent}
		quickReplies={defaultQuickReplies}
		onQuickReplyClick={handleQuickReplyClick}
		onSend={handleSend}
		placeholder="Please input the message"
		locale="en-US"
	  />
	);
}
	

  };
  export default Chatbox;