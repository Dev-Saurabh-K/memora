
import {
  Home,
  MessageCircle,
  LayoutGrid,
  FileText,
  Archive,
  List,
  Settings,
} from "lucide-react";
import Logo from "./Logo";
import { Link } from "react-router-dom";
const SideBarButtons = (props) => {
  return (
    <div className=" h-screen flex flex-col justify-between">
      <div>
        <div className="mt-4 px-2 ">
          <Logo />
        </div>

        <div className="lg:mt-20 mt-15 mb-8 flex flex-col px-2 gap-8">
          <Link to="/home">
            <button className="cursor-pointer hover:scale-120 transition duration-300">
              <Home size={23} color="gray" className="lg:w-8 lg:h-7" />
            </button>
          </Link>

          <Link to="/chat">
            <button className="cursor-pointer hover:scale-120 transition duration-300">
              <MessageCircle size={23} color="gray" className="lg:w-8 lg:h-7" />
            </button>
          </Link>

          <button className="cursor-pointer hover:scale-120 transition duration-300">
            <LayoutGrid size={23} color="gray" className="lg:w-8 lg:h-7" />
          </button>
        

        
          <button className="cursor-pointer hover:scale-120 transition duration-300">
            <FileText size={23} color="gray" className="lg:w-8 lg:h-7" />
          </button>
          <button className="cursor-pointer hover:scale-120 transition duration-300">
            <Archive size={23} color="gray" className="lg:w-8 lg:h-7" />
          </button>
          <button className="cursor-pointer hover:scale-120 transition duration-300">
            <List size={23} color="gray" className="lg:w-8 lg:h-7" />
          </button>
        </div>
      </div>

      <div className=" mb-4 lg:mb-7 flex flex-col px-2">
        <button className="cursor-pointer hover:scale-110 transition duration-320">
          <Settings size={25} color="gray" className="lg:w-9 lg:h-8" />
        </button>
      </div>
    </div>
  );
};

export default SideBarButtons;
