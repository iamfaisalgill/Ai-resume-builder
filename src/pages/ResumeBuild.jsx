import React from "react";
import ContactDetails from "./ContactDetails";
import Experience from "./Experience";
import Education from "./Education";
import Skills from "./Skills";
import Summary from "./Summary";

const ResumeBuild = ({ pageIndex, setPageIndex }) => {
  return (
    <div className="min-w-full p-7">
      <div className="mt-8 space-y-9 p-6 max-w-[1020px] mx-auto bg-card rounded-lg">
        {pageIndex == 1 ? (
          <ContactDetails setPageIndex={setPageIndex} />
        ) : pageIndex == 2 ? (
          <Experience setPageIndex={setPageIndex} />
        ) : pageIndex == 3 ? (
          <Education setPageIndex={setPageIndex} />
        ) : pageIndex == 4 ? (
          <Skills setPageIndex={setPageIndex} />
        ) : pageIndex == 5 ? (
          <Summary setPageIndex={setPageIndex} />
        ) : null}
      </div>
    </div>
  );
};

export default ResumeBuild;
