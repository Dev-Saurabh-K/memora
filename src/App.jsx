import { Routes, Route } from "react-router-dom";
import './App.css'
import Dashboard from "./dashboard";
import Page2 from './Pages/Page2/page2'
import Page3 from "./Pages/Page3/page3";

function App() {

  return (
    // <Routes> 
    // <Route path="/" element={<Dashboard />} />
    // <Route path="/page2" element={<Page2 />} />
    // </Routes>
    <div className='w-screen h-screen bg-black'><h1>kk</h1>
    <Page3/>
    </div>
  )
}

export default App
