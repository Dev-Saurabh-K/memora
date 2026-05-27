import { Routes, Route } from "react-router-dom";

import Login from "./Pages/Authentication/Login"
import Dashboard from "./dashboard";
import Page2 from './Pages/Page2/page2'
import Page3 from "./Pages/Page3/page3";
import Chat from './Pages/chat/chatLayout'
import Home from './Pages/homePage/home'
import Signup from "./Pages/Authentication/Signup";

function App() {

  return (
    <Routes> 
    <Route path="/" element={<Login/>}/>
    <Route path="/dashboard" element={<Dashboard/>} />
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/page3" element={<Page3/>}/>
    <Route path="/page2" element={<Page2 />} />
    <Route path="/chat" element={<Chat />} />
    <Route path="/home" element={<Home />} />

    </Routes>
  )
}

export default App;
