import React,{useContext} from 'react';
import { useState } from "react";
import '../Upload.css';
import {ref,uploadBytes,getDownloadURL} from "firebase/storage";
import { storage } from "../utils/firebase";
import { v4 } from "uuid";
import { Form, TextArea } from 'semantic-ui-react'
import { useNavigate } from "react-router-dom";
import { addCollectionAndDocument } from "../utils/firebase";
import { UserContext} from '../context/user.context';

//Page for uploading videos
function Upload(){
  const {currentUser}=useContext(UserContext)
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUpload2, setImageUpload2] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const[contact,setContact]=useState({
    title:'',
    context:'',
    time:'',
    img:'https://i.imgur.com/pHVAgyI.png',
    video:'',
    view:0,
    rating:5,
    ratetime:1,
    author:"",
    comment:[],
    uid:""
  })
   
  const nav = useNavigate();
  //Upload img
  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log(url)
        alert(url)
        setContact((prev) => ({ ...prev, img: url }));
      });
    });
  };
  //Upload video cover
  const uploadFile2 = () => {
    if (imageUpload2 == null) return;
    const imageRef = ref(storage, `images/${imageUpload2.name + v4()}`);
    uploadBytes(imageRef, imageUpload2).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        alert("Upload successful")
        setContact((prev) => ({ ...prev, video: url }));
      });
    });
  };
  //Upload this information and the user needs to be logged in to do so
  const handleSubmit1=async(event)=>
  {
    if(currentUser!=null)
    {
    event.preventDefault();
    try{
        {
        contact.time=new Date()
        contact.author=currentUser.email;
        contact.uid=currentUser.uid
        }
        addCollectionAndDocument('video',contact)
        alert("upload successfully")
        nav("/");
    }
    catch(error){
      console.log('error in uploading ',error.message)
      alert(error.message)
  }
}
   else{
  alert("Please Login first")
  nav("/Login");
   }
}

 
  const {title, context, img, time} = contact;
  //Get the individual values of the input box
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


   return(
    <div  class="UploadRadio">
     Please upload a video
     <div class="UploadRadio2"><span class="UploadRadio1">Title</span>          
     <input type="text" placeholder='Enter a descriptive title.' class="Uploadtextbox" name="title" onChange={handleChange} value={contact.title}/> </div>
     <div class="UploadRadio2"><span class="UploadRadio1">Add a Video</span> 
       {(() => {
          if (imageUpload2===null) {
            return<input type="text" readOnly  class="Uploadtextbox2" /> 
          }
           else
            return<input type="text" readOnly  class="Uploadtextbox2" value={imageUpload2.name} /> 
            })()}

              <div class="upload">   
              <button class="uploadbox1"> 
              <label htmlFor="file-input" >Browse</label>
              </button>              
              <input type="file"  
               id="file-input"          
              onChange={(event) => {
               setImageUpload2(event.target.files[0]); }} 
               hidden
      />
      <button onClick={uploadFile2} class="uploadbox1"> Upload</button>
             </div> </div>


             <div class="Radio2"><span class="UploadRadio1">Add a Video Cover</span> 
       {(() => {
          if (imageUpload===null) {
            return<input type="text" readOnly  class="Uploadtextbox2" /> 
          }
           else
            return<input type="text" readOnly  class="Uploadtextbox2" value={imageUpload.name} /> 
            })()}
              <div class="upload">   
              <button class="uploadbox1"> 
              <label htmlFor="file-input2" >Browse</label>
              </button>              
              <input type="file"  
              id="file-input2"          
              onChange={(event) => {
               setImageUpload(event.target.files[0]); }} 
               hidden
      />
      <button onClick={uploadFile} class="uploadbox1"> Upload</button>
             </div> </div>
   <div class="Uploadboxl">
  <span class='UploadRadio1'>Video description</span> 
   <Form>
    <TextArea  class='Uploadbox2' placeholder="Enter a 1-paragraph description" style={{ minHeight: 200 }} name="context" onChange={handleChange} value={contact.context}/>
  </Form>
  </div>
  <div>
    <button class="button1" onClick={handleSubmit1} >Post</button>
    </div>
    </div>
    );
}

export default Upload