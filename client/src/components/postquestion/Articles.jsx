import React,{useContext} from 'react';
import { useState } from "react";
import './App.css';
import {ref,uploadBytes,getDownloadURL} from "firebase/storage";
import { storage } from "../../utils/firebase";
import { v4 } from "uuid";
import { Form, TextArea } from 'semantic-ui-react'
import {  ArticleContextpost } from '../../context/articles.post';
import {  QuestionContextpost } from '../../context/question.post';
function Article(){
  //upload photo
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const[contact,setContact]=useState({
    title:'',
    abstract:'',
    context:'',
    tags:'',
    time:'',
    img:'',
    comment:[]
  })
  const imagesListRef = ref(storage, "images/");
  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        alert("Upload successful")
        setContact((prev) => ({ ...prev, img: url }));
      });
    });
  };
  //Take two contexts to use, one to save the parameters 
  //and the other to clear all the data of the other parameter when one is used
  const {setCurrentQuestion}=useContext(QuestionContextpost)
  const {setCurrentArticle}=useContext(ArticleContextpost)
 

  const {title, abstract, context, tags} = contact;
  //clear data
  setCurrentQuestion(null);
  //update data that need upload
  const handleChange=(event)=>
  {
  const {name,value}=event.target
  setContact((preValue)=>{
   return{
    ...preValue,
    [name]:value
   }
  })
  }
  setCurrentArticle(contact);

   return(
    <div  class="postRadio">
              <div class="postRadio2"><span class="postRadio1">Title</span>          
               <input type="text" placeholder='Enter a descriptive title.' class="posttextbox" name="title" onChange={handleChange} value={contact.title}/> </div>
              <div class="postRadio2"><span class="postRadio1">Add a image</span> 
              {(() => {
          if (imageUpload===null) {
            return<input type="text" readOnly  class="posttextbox2" /> 
          }
           else
            return<input type="text" readOnly  class="posttextbox2" value={imageUpload.name} /> 
            })()}

              <div class="upload">   
              <button class="uploadbox1"> 
              <label htmlFor="file-input" >Browse</label>
              </button>              
              <input type="file"  
              id="file-input"          
              onChange={(event) => {
               setImageUpload(event.target.files[0]); }} 
               hidden
      />
      <button onClick={uploadFile} class="uploadbox1"> Upload</button>
             </div> </div>
   <span class='postRadio1'>Abstract</span> 
   <div class="postboxl">
   <Form>
    <TextArea  class='postbox2' placeholder="Enter a descriptive title" style={{ minHeight: 50 }} name="abstract"onChange={handleChange} value={contact.abstract}/>
  </Form>
  <span class='Radio1'>Article Text</span> 
   <Form>
    <TextArea  class='postbox2' placeholder="Enter a 1-paragraph abstract" style={{ minHeight: 200 }} name="context" onChange={handleChange} value={contact.context}/>
  </Form>
  </div>
  <div class="postRadio">
    <span class="postRadio1">Tags</span> 
     <input type="posttext" placeholder='Please add up to 3 tags to describe what your articles is about e.g., Java ' class="posttextbox2" name="tags" onChange={handleChange} value={contact.tags}/> </div>
    </div>
    );
}
export default Article