import React from "react";
import SideBarButtons from "./SideBarButtons";

const Sidebar = () => {
  return (
    <>
      <div className="h-full w-10  lg:w-15 flex justify-center fixed">
        <SideBarButtons />
      </div>
    </>
  );
};

export default Sidebar;
