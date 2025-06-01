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
import { FileDown, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useMatch, useParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// pdf related
import { pdf, usePDF } from '@react-pdf/renderer';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { ScrollArea } from "@/components/ui/scroll-area";
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
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const goToPrevPage = () => 
    setPageNumber(prev => Math.max(prev - 1, 1));
  
  const goToNextPage = () => 
    setPageNumber(prev => Math.min(prev + 1, numPages || 1));

  return (
    <div className="flex flex-col items-center">
      {!fileUrl ? (
        <PDFGenerator onGenerated={setFileUrl} />
      ) : (
        <div className="flex flex-col items-center w-full gap-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="secondary" 
              size="icon"
              onClick={goToPrevPage}
              disabled={pageNumber <= 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <span className="text-sm font-medium">
              Page {pageNumber} of {numPages}
            </span>
            
            <Button
              variant="secondary"
              size="icon"
              onClick={goToNextPage}
              disabled={pageNumber >= (numPages || 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <Document
            file={fileUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={console.error}
            className=""
          >
            <Page 
              pageNumber={pageNumber} 
              width={900} 
              className="border shadow-sm"
            />
          </Document>
        </div>
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
        <div className="flex items-center gap-4">
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
          <Dialog>
            <DialogTrigger asChild><Button variant={'secondary'} className="cursor-pointer"><Eye/></Button>
          </DialogTrigger>
            <DialogContent className="sm:max-w-[900px] p-0">
              <ScrollArea className={'h-[600px]'}><MyPDFViewer/></ScrollArea>
            </DialogContent>
          </Dialog>

        </div>
        <ModeToggle/>
      </div>
          <div className="mt-5 p-4">
            {isHalley ? (
              <HalleyTheme activeDialog={activeDialog} setActiveDialog={setActiveDialog} editItem={editItem} deleteItem={deleteItem} />
            ) : isIconic ? (
              <IconicTheme activeDialog={activeDialog} setActiveDialog={setActiveDialog} editItem={editItem} deleteItem={deleteItem} />
            ) : isStalwart ? (
              <StalwartTheme activeDialog={activeDialog} setActiveDialog={setActiveDialog} editItem={editItem} deleteItem={deleteItem} />
            ) : null}
            {/* <div className="flex justify-center"><MyPDFViewer/></div> */}
          </div>


      </div>
    </>
  );
};

export default DownloadFile;
