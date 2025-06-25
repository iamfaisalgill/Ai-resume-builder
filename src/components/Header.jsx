import React from "react";
import { ChevronRight, FilePen, User } from "lucide-react";
import { Link, useMatch } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import Logo from "/logo-resume.svg";

const Header = ({ pageIndex, setPageIndex }) => {
  const isResumeBuildPath = useMatch("/resume-builder");
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
          <Link to="/">
            <div className="flex items-center gap">
              <img src={Logo} className="sm:w-[40px] w-5 text-primary"/>
              <span className="font-extrabold text-lg sm:text-3xl text-foreground">
                Resu<span className="text-[#8dc63f]">Flex</span>
              </span>
              
            </div>
          </Link>
        </div>
      </div>

      {isResumeBuildPath ? (
        <div className="flex flex-wrap items-center text-sm">
  {/* Desktop View (md and above) - Full breadcrumb with chevrons */}
  <div className="hidden md:flex items-center space-x-2">
    <span className={isContactInfoPath ? "font-normal text-primary" : "text-muted-foreground"}>
      <span>Contact Info</span>
    </span>
    <span className="text-gray-400">
      <ChevronRight className="size-3" />
    </span>
    <span className={isExperiencePath ? "font-normal text-primary" : "text-muted-foreground"}>
      Work Experience
    </span>
    <span className="text-gray-400">
      <ChevronRight className="size-3" />
    </span>
    <span className={isEducationPath ? "font-normal text-primary" : "text-muted-foreground"}>
      Education
    </span>
    <span className="text-gray-400">
      <ChevronRight className="size-3" />
    </span>
    <span className={isSkillsPath ? "font-normal text-primary" : "text-muted-foreground"}>
      Skills
    </span>
    <span className="text-gray-400">
      <ChevronRight className="size-3" />
    </span>
    <span className={isSummaryPath ? "font-normal text-primary" : "text-muted-foreground"}>
      Summary
    </span>
  </div>

  {/* Mobile View (below md) - Circles indicator */}
  <div className="flex md:hidden items-center space-x-2">
    {/* Contact Info Circle */}
    <span className={`inline-block rounded-full size-2 sm:size-3 ${isContactInfoPath ? "bg-[var(--dark)]" : "bg-secondary"}`} />
    
    {/* Work Experience Circle */}
    <span className={`inline-block rounded-full size-2 sm:size-3 ${isExperiencePath ? "bg-[var(--dark)]" : "bg-secondary"}`} />
    
    {/* Education Circle */}
    <span className={`inline-block rounded-full size-2 sm:size-3 ${isEducationPath ? "bg-[var(--dark)]" : "bg-secondary"}`} />
    
    {/* Skills Circle */}
    <span className={`inline-block rounded-full size-2 sm:size-3 ${isSkillsPath ? "bg-[var(--dark)]" : "bg-secondary"}`} />
    
    {/* Summary Circle */}
    <span className={`inline-block rounded-full size-2 sm:size-3 ${isSummaryPath ? "bg-[var(--dark)]" : "bg-secondary"}`} />
    
    {/* Review Circle */}
    {/* <span className={`inline-block rounded-full size-3 ${isReviewPath ? "bg-[var(--dark)]" : "bg-secondary"}`} /> */}
  </div>
</div>
      ) : (
        <div className="flex items-center sm:gap-6 gap-3 text-xs sm:text-base">
          {/* <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-[#07963b] rounded-md hover:bg-[#07963bce] focus:outline-none focus:ring-2 focus:ring-blue-500">
            Login
          </button> */}
          <Link to="/resumebuild" className="hover:underline">
            Get Started
          </Link>
          <a href="https://www.linkedin.com/in/faisal-gill/" className="hover:underline" target="_blank">
            Contact
          </a>
          <a
            href="https://github.com"
            target="_blank"
            className="hover:underline"
          >
            GitHub
          </a>
        </div>
      )}
      <ModeToggle />
    </header>
  );
};

export default Header;
