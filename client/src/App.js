import React from 'react';
import HomePage from './routes/HomePage';
import Login from './routes/Login';
import Postcard from './routes/Post';
import Reset from './routes/Reset';
import { Route, Routes } from "react-router-dom"
import Signup from './routes/Signup';
import Questionlist from './routes/Questionlist';
import Articlelist from './routes/Articlelist';
import Pay from './routes/Pay';
import Plan from './routes/Plan';
import Player from './routes/Player';
import Upload from './routes/Upload';
import Videolist from './routes/Videolist';
import Chatbox from './routes/Chatbox';
import Notification from './routes/Notification';
import Questionpage from './routes/Questionpage'
import Articlepage from './routes/Articlepage ';
function App() {
    return(
    <Routes>
    <Route path='/' element={ <HomePage />}/>
    <Route path='/Articlepage' element={ <Articlepage />}/>
    <Route path='/Questionpage' element={ <Questionpage />}/>
    <Route path='/Notification' element={ <Notification />}/>
    <Route path='/Upload' element={ <Upload />}/>
    <Route path='/Chatbox' element={ <Chatbox />}/>
    <Route path='/Player' element={ <Player />}/>
    <Route path='Videolist' element={ <Videolist />}/>
    <Route path='/HomePage' element={ <HomePage  />}/>
    <Route path='/Login' element={ <Login />}/>
    <Route path='/QuestionList' element={ <Questionlist />}/>
    <Route path='/Articlelist' element={ <Articlelist />}/>
    <Route path='/Post' element={ <Postcard />}/>
    <Route path='/Signup' element={ <Signup />}/>
    <Route path='/Plan' element={ <Plan />}/>
    <Route path='/Pay' element={ <Pay />}/>
    <Route path='/Reset' element={ <Reset />}/>
    </Routes>
    )     
}
 
export default App;