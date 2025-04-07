import React from "react";
import { ChevronRight, FilePen, User } from "lucide-react";
import { Link, useMatch } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import Logo from '/logo.svg'

const Header = ({pageIndex, setPageIndex}) => {
  const isResumeBuildPath = useMatch("/resumebuild");
  const isContactInfoPath = pageIndex == 1;
  const isExperiencePath = pageIndex == 2;
  const isEducationPath = pageIndex == 3;
  const isSkillsPath = pageIndex == 4;
  const isSummaryPath = pageIndex == 5;

  return (
    <header
      className={`flex items-center gap-4 ${
        isResumeBuildPath ? "justify-between" : ""
      } p-4 bg-card shadow-md`}
    >
      {/* Left side - Logo */}
      <div className="flex-1">

      <div className="w-fit">
        <Link to='/'>
          <div className="flex items-center gap-2 text-primary">
            <img src={Logo} className="w-[150px]"/>
          </div>
        </Link>
      </div>
      </div>
      

      {isResumeBuildPath ? (
        <div className="flex flex-wrap items-center text-sm space-x-2">
          <span className={isContactInfoPath ? "font-normal text-primary":"text-muted-foreground"}>
            Contact Info
          </span>
          <span className="text-gray-400">
            <ChevronRight className="size-3" />
          </span>
          <span className={isExperiencePath ? "font-normal text-primary":"text-muted-foreground"}>
            Work Experience
          </span>
          <span className="text-gray-400">
            <ChevronRight className="size-3" />
          </span>
          <span className={isEducationPath ? "font-normal text-primary":"text-muted-foreground"}>
            Education
          </span>
          <span className="text-gray-400">
            <ChevronRight className="size-3" />
          </span>
          <span className={isSkillsPath ? "font-normal text-primary":"text-muted-foreground"}>
            Skills
          </span>
          <span className="text-gray-400">
            <ChevronRight className="size-3" />
          </span>
          <span className={isSummaryPath ? "font-normal text-primary":"text-muted-foreground"}>
            Summary
          </span>
          <span className="text-gray-400">
            <ChevronRight className="size-3" />
          </span>
          <span class="text-muted-foreground">
            Certifications
          </span>
          <span className="text-gray-400">
            <ChevronRight className="size-3" />
          </span>
          <span class="text-muted-foreground">
            Projects
          </span> 
          <span className="text-gray-400">
            <ChevronRight className="size-3" />
          </span>
          <span class="text-muted-foreground">
            Language
          </span>
         
        </div>
      ) : (
        <div className="flex items-center">
          <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-[#07963b] rounded-md hover:bg-[#07963bce] focus:outline-none focus:ring-2 focus:ring-blue-500">
            <User className="w-5 h-5 mr-2" /> {/* User icon */}
            Login
          </button>
        </div>
      )}
        <ModeToggle/>
    </header>
  );
};

export default Header;
