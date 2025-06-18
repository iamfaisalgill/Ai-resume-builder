import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import SelectTheme from "./pages/SelectTheme";
import DownloadFile from "./pages/[selectedTheme]/download/DownloadFile";
import { ThemeProvider } from "@/components/theme-provider";
import { ResumeInfoProvider } from "./context/ResumeInfoContext";
import ResumeBuild from "./pages/ResumeBuild";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import { X } from "lucide-react";

function App() {
  const [pageIndex, setPageIndex] = useState(1);
  return (
    <AutoScrollToTop>
      <Toaster>
        {(t) => (
          <ToastBar toast={t} style={{ backgroundColor: 'var(--toast-bg)', color: 'var(--text-foreground)' }}>
            {({ icon, message }) => (
              <>
                {icon}
                {message}
                {t.type !== "loading" && (
                  <button onClick={() => toast.dismiss(t.id)}>
                    <X size={14} />
                  </button>
                )}
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
      <ResumeInfoProvider>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/resumebuild"
              element={
                <>
                  <Header pageIndex={pageIndex} setPageIndex={setPageIndex} />
                  <ResumeBuild
                    pageIndex={pageIndex}
                    setPageIndex={setPageIndex}
                  />
                </>
              }
            />
            <Route
              path="/select-template"
              element={
                <>
                  <Header pageIndex={pageIndex} setPageIndex={setPageIndex} />
                  <SelectTheme />
                </>
              }
            />
            <Route path="/:selectedTheme/download" element={<DownloadFile />} />
          </Routes>
          {/* <Toaster richColors /> */}
        </ThemeProvider>
      </ResumeInfoProvider>
    </AutoScrollToTop>
  );
}

export default App;

function AutoScrollToTop({ children }) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return children;
}
