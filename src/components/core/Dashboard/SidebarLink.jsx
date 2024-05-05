import React from "react";
import * as Icons from "react-icons/md";
import { NavLink, matchPath, useLocation } from "react-router-dom";
const SidebarLink = ({ link, iconName }) => {
  const Icon = Icons[iconName];

  const location = useLocation();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  return (
    <div>
      <NavLink
        to={link.path}
        className={`relative px-8 py-2 text-sm font-medium ${
          matchRoute(link.path)
            ? "text-yellow-50"
            : "bg-opacity-0 text-richblack-300"
        } transition-all duration-200`}
      >
        <div className="flex items-center gap-x-2 ml-4">
          <Icon className="text-lg" />
          <span>{link.name}</span>
        </div>
      </NavLink>
    </div>
  );
};

export default SidebarLink;
