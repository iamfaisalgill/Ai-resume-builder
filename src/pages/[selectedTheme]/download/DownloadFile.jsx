import { ModeToggle } from "@/components/mode-toggle";
import ResumeSidebar from "@/components/ResumeSidebar";
import HalleyTheme from "@/components/templates/HalleyTheme";
import IconicTheme from "@/components/templates/IconicTheme";
import StalwartTheme from "@/components/templates/StalwartTheme";
import { Button } from "@/components/ui/button";
import { useMediaQuery, useResume } from "@/context/ResumeInfoContext";
import HalleyPDF from "@/pdfs/HalleyPDF";
import IconicPDF from "@/pdfs/IconicPDF";
import StalwartPDF from "@/pdfs/StalwartPDF";
import {
  ChevronLeft,
  ChevronRight,
  PanelRightOpen,
  PanelRightClose,
  Loader2,
  PencilLineIcon,
  ArrowDownToLine,
  Eye,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useMatch, useParams } from "react-router-dom";

// pdf related
import { pdf } from "@react-pdf/renderer";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import clsx from "clsx";
import { Separator } from "@/components/ui/separator";
import VanguardPDF from "@/pdfs/VanguardPDF";
import VanguardTemplate from "@/components/templates/VanguardTemplate";
import HorizonTemplate from "@/components/templates/HorizonTemplate";
import ApexTemplate from "@/components/templates/ApexTemplate";
import ApexPDF from "@/pdfs/ApexPDF";
import HorizonPDF from "@/pdfs/HorizonPDF";
import ImpresaPDF from "@/pdfs/ImpresaPDF";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import VoyageTemplate from "@/components/templates/VoyageTemplate";
import ImpresaTemplate from "@/components/templates/ImpresaTemplate";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "react-pdf/node_modules/pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const DownloadFile = () => {
  const { resumeInfo, setResumeInfo } = useResume();
  const { selectedTheme } = useParams();
  const isIconic = useMatch("/template-iconic/download");
  const isStalwart = useMatch("/template-stalwart/download");
  const isHalley = useMatch("/template-halley/download");
  const isVanguard = useMatch("/template-vanguard/download");
  const isHorizon = useMatch("/template-horizon/download");
  const isApex = useMatch("/template-apex/download");
  const isImpresa = useMatch("/template-impresa/download");
  const isVoyage = useMatch("/template-voyage/download");
  const [activeDialog, setActiveDialog] = useState(null);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [activeSec, setActiveSec] = useState("");
  const [sidebar, setSidebar] = useState(true);
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState(
    resumeInfo.fileName ? resumeInfo.fileName : "New Resume"
  );
  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState(null);
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    // Initial log
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const deleteItem = (label) => {
    setActiveSec(label);
    setIsAlertDialogOpen(true);
  };

  const editItem = (label) => {
    setActiveDialog(label);
    setActiveSec(label);
  };

  const getPdfComponent = () => {
    const Component = () => {
      if (isHalley) return <HalleyPDF resumeInfo={resumeInfo} />;
      if (isIconic) return <IconicPDF resumeInfo={resumeInfo} />;
      if (isStalwart) return <StalwartPDF resumeInfo={resumeInfo} />;
      if (isVanguard) return <VanguardPDF resumeInfo={resumeInfo} />;
      if (isHorizon) return <HorizonPDF resumeInfo={resumeInfo} />;
      if (isApex) return <ApexPDF resumeInfo={resumeInfo} />;
      if (isImpresa) return <ImpresaPDF resumeInfo={resumeInfo} />;
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
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isLargeScreen = useMediaQuery("(min-width: 1200px)");
    const isMediumScreen = useMediaQuery("(min-width: 768px)");
    const isSmallScreen = useMediaQuery("(max-width: 767px)");

    const getPageWidth = () => {
      if (isLargeScreen) return 900;
      if (isMediumScreen) return 600;
      if (isSmallScreen) return 300; // Small screens
    };

    const onDocumentLoadSuccess = ({ numPages }) => {
      setNumPages(numPages);
      setPageNumber(1);
    };

    const goToPrevPage = () => setPageNumber((prev) => Math.max(prev - 1, 1));

    const goToNextPage = () =>
      setPageNumber((prev) => Math.min(prev + 1, numPages || 1));

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
            >
              <Page
                pageNumber={pageNumber}
                width={getPageWidth()}
                //scale={width > 1200 ? 1.5 : width > 768 ? 1.0 : 0.6}
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
      setLoading(true);
      // Generate PDF blob
      const blob = await pdf(getPdfComponent()).toBlob();

      // Create download link
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${fileName.trim() || "My-Resume"}.pdf`;

      // Trigger download
      document.body.appendChild(link);
      link.click();

      // Clean up
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);
      setLoading(false);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  const saveFileName = () => {
    const trimmedFileName = fileName.trim();
    setResumeInfo((prev) => ({ ...prev, fileName: trimmedFileName }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (fileName === resumeInfo.fileName) {
        inputRef.current.blur();
        return;
      }
      saveFileName();
      inputRef.current.blur();
    }
  };

  /*const downloadPdf = () =>{
    window.print()
  } ----> previous method   */
  return (
    <>
      <ResumeSidebar
        activeDialog={activeDialog}
        setActiveDialog={setActiveDialog}
        activeSec={activeSec}
        setActiveSec={setActiveSec}
        isAlertDialogOpen={isAlertDialogOpen}
        setIsAlertDialogOpen={setIsAlertDialogOpen}
        editItem={editItem}
        deleteItem={deleteItem}
        sidebar={sidebar}
        setSidebar={setSidebar}
      />
      <div className={clsx("transition-all", sidebar ? "md:ml-64" : "")}>
        <div className="bg-card border-b p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {sidebar ? (
              <Button
                variant={"secondary"}
                size="sm"
                onClick={() => setSidebar(false)}
              >
                <PanelRightClose className="rotate-180" />
              </Button>
            ) : (
              <Button
                variant={"secondary"}
                size="sm"
                onClick={() => setSidebar(true)}
                className="max-md:block"
              >
                <PanelRightOpen className="rotate-180" />
              </Button>
            )}
            <Separator
              orientation="vertical"
              className="mx-2 data-[orientation=vertical]:h-10"
            />
            {/* <h3 className="md:text-xl sm:text-lg text-sm font-bold">
              Your resume is ready!
            </h3> */}

            {/* File name */}
            <div className="relative">
              <PencilLineIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                className="border-input bg-background h-10 w-full max-w-[200px] rounded-md text-sm border pl-10 pr-10"
                value={fileName}
                placeholder={"Untitle document"}
                onChange={(e) => setFileName(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={(e) => {
                  if (fileName === resumeInfo.fileName) {
                    return;
                  }
                  saveFileName();
                }}
                ref={inputRef}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                .pdf
              </div>
            </div>
            <Button
              onClick={handleDownload}
              className="cursor-pointer"
              disabled={!resumeInfo || loading}
            >
              {loading ? <Loader2 className="animate-spin" /> : <ArrowDownToLine />}
              <span className="max-sm:hidden">Download PDF</span>
            </Button>
            <div className="max-sm:hidden">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant={"secondary"} className="cursor-pointer">
                    <Eye />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[900px] p-0">
                <DialogHeader>
                  <DialogTitle>Resume Preview</DialogTitle>
                </DialogHeader>
                  <ScrollArea className={"h-[600px]"}>
                    <MyPDFViewer />
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <ModeToggle />
        </div>
        <div className="mt-5 p-4">
          {isHalley ? (
            <HalleyTheme
              editItem={editItem}
              deleteItem={deleteItem}
            />
          ) : isIconic ? (
            <IconicTheme
              editItem={editItem}
              deleteItem={deleteItem}
            />
          ) : isStalwart ? (
            <StalwartTheme
              editItem={editItem}
              deleteItem={deleteItem}
            />
          ) : isVanguard ? (
            <VanguardTemplate
              editItem={editItem}
              deleteItem={deleteItem}
            />
          ) : isHorizon ? (
            <HorizonTemplate
              editItem={editItem}
              deleteItem={deleteItem}
            />
          ) : isApex ? (
            <ApexTemplate
              editItem={editItem}
              deleteItem={deleteItem}
            />
          ) : isImpresa ? (
            <ImpresaTemplate
              editItem={editItem}
              deleteItem={deleteItem}
            />
          ) : isVoyage ? (
            <VoyageTemplate
              editItem={editItem}
              deleteItem={deleteItem}
            />
          ) : null}
          {/* <div className="flex justify-center"><MyPDFViewer/></div> */}
        </div>
      </div>
    </>
  );
};

export default DownloadFile;
