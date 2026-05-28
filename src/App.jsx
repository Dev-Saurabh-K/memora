import { Routes, Route } from "react-router-dom";

import Login from "./Pages/Authentication/Login"
import Dashboard from "./dashboard";
import Page2 from './Pages/Page2/page2'
import Page3 from "./Pages/Page3/page3";
import Chat from './Pages/chat/chatLayout'
import Home from './Pages/homePage/home'
import StudyNotes from "./Pages/StudyNotes/studyNotes";
import Signup from "./Pages/Authentication/Signup";

function App() {

  return (
    <Routes> 
    <Route path="/" element={<Login/>}/>
    <Route path="/info" element={<Dashboard/>} />
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/dashboard" element={<Page2 />} />
    <Route path="/page3" element={<Page3/>}/>
    <Route path="/chat" element={<Chat />} />
    <Route path="/home" element={<Home />} />
    <Route path="/study-notes" element={<StudyNotes />} />
    </Routes>
  )
}

export default App;
