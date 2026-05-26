import { Routes, Route } from "react-router-dom";
import './App.css'
import Dashboard from "./dashboard";
import Page2 from './Pages/Page2/page2'
import Chat from './Pages/chat/chatLayout'
function App() {

  return (
    <Routes> 
    <Route path="/" element={<Dashboard />} />
    <Route path="/page2" element={<Page2 />} />
    <Route path="/chat" element={<Chat />} />
    </Routes>
  )
}

export default App;
