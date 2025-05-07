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
import { ArrowDownToLine, FileDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useMatch, useParams } from "react-router-dom";

// pdf related
import { pdf, usePDF } from '@react-pdf/renderer';
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
  const [activeDialog, setActiveDialog] = useState(null)
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [activeSec, setActiveSec] = useState("")

  const deleteItem = (label) => {
    setActiveSec(label)
    setIsAlertDialogOpen(true);
  }

  const editItem = (label) => {
    setActiveDialog(label)
    setActiveSec(label)
  }


  const getPdfComponent = () => {
    const Component = () => {
      if (isHalley) return <HalleyPDF resumeInfo={resumeInfo} />;
      if (isIconic) return <IconicPDF resumeInfo={resumeInfo} />;
      if (isStalwart) return <StalwartPDF resumeInfo={resumeInfo} />;
      return <div>No template selected</div>;
    };
    return <Component />;
  };

  const PDFGenerator = ({ onGenerated }) => {
    useEffect(() => {
      const generatePdf = async () => {
        try {
          const blob = await pdf(getPdfComponent()).toBlob();
          const url = URL.createObjectURL(blob);
          onGenerated(url);
        } catch (err) {
          console.error("Error generating PDF:", err);
        }
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

  const handleDownload = async () => {
    try {
      // Generate PDF blob
      const blob = await pdf(getPdfComponent()).toBlob();
      
      // Create download link
      const url = URL.createObjectURL(blob);
      console.log(url);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'resume.pdf';
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  

  /*const downloadPdf = () =>{
    window.print()
  } ----> previous method   */
  return (
    <>
    <ResumeSidebar activeDialog={activeDialog} setActiveDialog={setActiveDialog} activeSec={activeSec} setActiveSec={setActiveSec} isAlertDialogOpen={isAlertDialogOpen} setIsAlertDialogOpen={setIsAlertDialogOpen} editItem={editItem} deleteItem={deleteItem} />
      <div className="md:ml-64">
      <div className="bg-card border-b p-6 flex items-center justify-between">
        <div className=" flex items-center">
          <h3 className="md:text-xl sm:text-lg text-sm font-bold">Your resume is ready!</h3>
          <div className="h-10 border-r mx-4"></div>
          <Button 
            onClick={handleDownload}
            className="cursor-pointer"
            disabled={!resumeInfo} // Disable if no data
          >
          <FileDown />
            Download PDF
          </Button>
        </div>
        <ModeToggle/>
      </div>
          <div className="mt-5 p-4">
            {isHalley ? (
              <HalleyTheme activeDialog={activeDialog} setActiveDialog={setActiveDialog} editItem={editItem} deleteItem={deleteItem} />
            ) : isIconic ? (
              <IconicTheme activeDialog={activeDialog} setActiveDialog={setActiveDialog} />
            ) : isStalwart ? (
              <StalwartTheme activeDialog={activeDialog} setActiveDialog={setActiveDialog} />
            ) : null}
            {/* <div className="flex justify-center"><MyPDFViewer/></div> */}
          </div>


      </div>
    </>
  );
};

export default DownloadFile;
