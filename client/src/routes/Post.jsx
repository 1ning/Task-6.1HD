import React,{useContext} from 'react';
import Top from '../components/postquestion/Top';
import Bottom  from '../components/postquestion/Bottom';
import Post from '../components/postquestion/Post';
function Postcard() {
    return(
            <div>
            <Post/>
            <Top/>
            <Bottom/>
            </div>);
}
 
export default Postcard;