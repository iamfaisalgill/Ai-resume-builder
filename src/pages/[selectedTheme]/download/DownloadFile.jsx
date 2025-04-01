import Header from "@/components/Header";
import HalleyTheme from "@/components/templates/HalleyTheme";
import IconicTheme from "@/components/templates/IconicTheme";
import StalwartTheme from "@/components/templates/StalwartTheme";
import { Button } from "@/components/ui/button";
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
    <div id="no-print">
      <Header/>
      <div className="my-9 flex justify-center gap-6">
        <Button>Edit Data</Button>
        <Button>Change Theme</Button>
        <Button onClick={downloadPdf}>Download</Button>
      </div>
    </div>
      <div id="print-area">
        {isHalley ? (
          <HalleyTheme />
        ) : isIconic ? (
          <IconicTheme />
        ) : isStalwart ? (
          <StalwartTheme />
        ) : null}
      </div>
    </>
  );
};

export default DownloadFile;
