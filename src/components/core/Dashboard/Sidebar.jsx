import React, { useState } from "react";
import SidebarLink from "./SidebarLink";
import { VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../services/operations/authAPI";

const sidebarLinks = [
  {
    id: 1,
    name: "All Papers",
    path: "/getAllPapers",
    icon: "MdOutlineAddToQueue",
  },
  {
    id: 2,
    name: "Upload Paper",
    path: "/uploadPaper",
    icon: "MdFileUpload",
  },
  {
    id: 3,
    name: "Search Paper",
    path: "/getCoursePaper",
    icon: "MdOutlineSearch",
  },
  {
    id: 4,
    name: "Add Course",
    path: "/addCourse",
    icon: "MdAddCircle",
  },
];
const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  const logoutHandler = () => {
    dispatch(logout(navigate));
  };
  return (
    <div>
      <div className="flex h-[100vh] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
        <div className="flex flex-col">
          {sidebarLinks.map((link, index) => {
            return (
              <SidebarLink key={link.id} link={link} iconName={link.icon} />
            );
          })}
        </div>

        <button
          onClick={logoutHandler}
          className="cursor-pointer rounded-md bg-richblack-200 py-[8px] px-[20px] font-semibold text-pure-greys-900 mt-4"
        >
          <div className="flex gap-x-2 items-center">
            <VscSignOut className="text-lg" />
            <span>Logout</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
