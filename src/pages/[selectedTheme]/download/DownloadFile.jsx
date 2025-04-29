import Header from "@/components/Header";
import { ModeToggle } from "@/components/mode-toggle";
import ResumeSidebar from "@/components/ResumeSidebar";
import HalleyTheme from "@/components/templates/HalleyTheme";
import IconicTheme from "@/components/templates/IconicTheme";
import StalwartTheme from "@/components/templates/StalwartTheme";
import { Button } from "@/components/ui/button";
import { useResume } from "@/context/ResumeInfoContext";
import HalleyPDF from "@/pdfs/HalleyPDF";
import IconicPDF from "@/pdfs/IconicPDF";
import StalwartPDF from "@/pdfs/StalwartPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ArrowDownToLine } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useMatch, useParams } from "react-router-dom";

// pdf related
import { pdf } from '@react-pdf/renderer';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'react-pdf/node_modules/pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

const DownloadFile = () => {
  const { resumeInfo, setResumeInfo } = useResume();
  const { selectedTheme } = useParams();
  const isIconic = useMatch("/theme-iconic/download");
  const isStalwart = useMatch("/theme-stalwart/download");
  const isHalley = useMatch("/theme-halley/download");


  const getPdfComponent = () => {
    if (isHalley) return <HalleyPDF resumeInfo={resumeInfo} />;
    if (isIconic) return <IconicPDF resumeInfo={resumeInfo} />;
    if (isStalwart) return <StalwartPDF resumeInfo={resumeInfo} />;
    return <div>No template selected</div>;
  };

  const PDFGenerator = ({ onGenerated }) => {
    useEffect(() => {
      const generatePdf = async () => {
        const blob = await pdf(getPdfComponent()).toBlob();
        const url = URL.createObjectURL(blob);
        onGenerated(url);
      };
  
      generatePdf();
    }, [onGenerated]);
  
    return null; // no UI needed
  };
  
  
  const MyPDFViewer = () => {
    const [fileUrl, setFileUrl] = useState(null);
  
    return (
      <div>
        {!fileUrl ? (
          <PDFGenerator onGenerated={setFileUrl} />
        ) : (
    <Document file={fileUrl} onLoadError={console.error}>
      <Page pageNumber={1} width={900} />
    </Document>
  
        )}
      </div>
    );
  };


  /*const downloadPdf = () =>{
    window.print()
  } ----> previous method   */
  return (
    <>
    <ResumeSidebar/>
      <div className="md:ml-64">
      <div className="bg-card border-b p-6 flex items-center justify-between">
        <div className=" flex items-center">
          <h3 className="text-xl font-bold">Your resume is ready!</h3>
          <div className="h-10 border-r mx-4"></div>
          <PDFDownloadLink
            document={getPdfComponent()}
            fileName="my-newresume.pdf"
          >
            {({ loading }) => (
              <Button disabled={loading} size={'lg'}>
                <ArrowDownToLine /> 
                Download pdf
              </Button>
            )}
          </PDFDownloadLink>
        </div>
        <ModeToggle/>
      </div>
          <div className="mt-5 p-4">
            {isHalley ? (
              <HalleyTheme />
            ) : isIconic ? (
              <IconicTheme />
            ) : isStalwart ? (
              <StalwartTheme />
            ) : null}
            {/* <div className="flex justify-center"><MyPDFViewer/></div> */}
          </div>


      </div>
    </>
  );
};

export default DownloadFile;
