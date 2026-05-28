
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import TopSec from "./topSec";
import CenterSec from "./centerSec";
import History from "./History";

function page2(props) {
  return (
    <div className="bg-[#000000] flex h-full w-full min-h-screen">
      <Sidebar />
      <div className="w-full flex flex-col items-center pl-10">
        <Navbar />
        <TopSec />
        <div className="flex flex-col lg:flex-row md:flex-row gap-10 text-stone-50 w-full" >
          <CenterSec />
          <History />
          
        </div>
      </div>
    </div>
  );
}

export default page2;
