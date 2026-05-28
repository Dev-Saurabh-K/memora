import { useState } from "react";
import {
  Home,
  MessageCircle,
  LayoutGrid,
  FileText,
  Archive,
  List,
  Settings,
  FileX,
} from "lucide-react";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";


const SideBarButtons = () => {
  // const [value, setValue] = useState("one");
  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };
  const location = useLocation();
  console.log(location.pathname)
  return (
    <div className="h-screen text-stone-100 flex flex-col items-center justify-around ">
      <Logo classname={"text-4xl"} />
      <div className="h-fit flex flex-col items-center justify-center gap-2">
        <Link to="/dashboard" className={`cursor-pointer rounded-md ${location.pathname=="/dashboard"? "bg-[rgba(84,192,111,0.25)]":"bg-stone-950"}`}>
        <div>
          <Home className={`${location.pathname=="/dashboard"? "text-green-400":"text-stone-100"} m-4`}/>
        </div>
        </Link>
        <Link to="/subtopics" className={`cursor-pointer rounded-md ${location.pathname=="/subtopics"? "bg-[rgba(84,192,111,0.25)] ":"bg-stone-950"}`}>
        <div >
          <LayoutGrid className={`${location.pathname=="/subtopics"? "text-green-400":"text-stone-100"} m-4`}/>
        </div>
        </Link>
        <Link to="/chat" className={`cursor-pointer rounded-md ${location.pathname=="/chat"? "bg-[rgba(84,192,111,0.25)] ":"bg-stone-950"}`}>
        <div >
          <MessageCircle className={`${location.pathname=="/chat"? "text-green-400":"text-stone-100"} m-4`}/>
        </div>
        </Link>
        <Link to="/study-notes" className={`cursor-pointer rounded-md ${location.pathname=="/study-notes"? "bg-[rgba(84,192,111,0.25)] ":"bg-stone-950"}`}>
        <div >
          <FileText className={`${location.pathname=="/study-notes"? "text-green-400":"text-stone-100"} m-4`}/>
        </div>
        </Link>
        <Link to="/history" className={`cursor-pointer rounded-md ${location.pathname=="/history"? "bg-[rgba(84,192,111,0.25)] ":"bg-stone-950"}`}>
        <div >
          <List className={`${location.pathname=="/history"? "text-green-400":"text-stone-100"} m-4`}/>
        </div>
        </Link>
      </div>
      <div className="fixed bottom-6">
        <Settings/>
      </div>
    </div>
  );
};

export default SideBarButtons;
