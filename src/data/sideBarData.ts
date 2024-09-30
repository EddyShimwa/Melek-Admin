import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";


interface SidebarItem {
  title: string;
  path: string;
  icon: React.ComponentType; 
}

export const SidebarData: SidebarItem[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: FaIcons.FaHome, 
  },
  {
    title: "Values",
    path: "/dashboard/values",
    icon: AiIcons.AiFillGold, 
  },
  {
    title: "Why Us",
    path: "/dashboard/why-us",
    icon: AiIcons.AiFillHeart, 
  },
  {
    title: "Offers",
    path: "/dashboard/offers",
    icon: FaIcons.FaTags, 
  },
  {
    title: "Company-profile",
    path: "/dashboard/company-profile",
    icon: FaIcons.FaBuilding, 
  },
];