import Header from "@/components/Header";
import { ModeToggle } from "@/components/mode-toggle";
import ResumeSidebar from "@/components/ResumeSidebar";
import HalleyTheme from "@/components/templates/HalleyTheme";
import IconicTheme from "@/components/templates/IconicTheme";
import StalwartTheme from "@/components/templates/StalwartTheme";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine } from "lucide-react";
import React from "react";
import { useMatch, useParams } from "react-router-dom";

const DownloadFile = () => {
  const { selectedTheme } = useParams();
  const isIconic = useMatch("/theme-iconic/download");
  const isStalwart = useMatch("/theme-stalwart/download");
  const isHalley = useMatch("/theme-halley/download");

  const downloadPdf = () =>{
    window.print()
  }
  return (
    <>
    <div>
    <ResumeSidebar/>
      <div className="ml-64  print:ml-0">
      <div className="bg-card border-b p-6 flex items-center justify-between no-print">
        <div className=" flex items-center">
          <h3 className="text-xl font-bold">Your resume is ready!</h3>
          <div className="h-10 border-r mx-4"></div>
          <Button size={'lg'} onClick={downloadPdf}> <ArrowDownToLine /> Download</Button>
        </div>
        <ModeToggle/>
      </div>
          <div className="print-area mt-5">
            {isHalley ? (
              <HalleyTheme />
            ) : isIconic ? (
              <IconicTheme />
            ) : isStalwart ? (
              <StalwartTheme />
            ) : null}
          </div>
      </div>
    </div>
    </>
  );
};

export default DownloadFile;
