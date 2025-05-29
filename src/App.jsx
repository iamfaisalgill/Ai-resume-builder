import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SelectTheme from './pages/SelectTheme'
import DownloadFile from './pages/[selectedTheme]/download/DownloadFile'
import { ThemeProvider } from "@/components/theme-provider"
import { ResumeInfoProvider } from './context/ResumeInfoContext'
import ResumeBuild from './pages/ResumeBuild'
import { Toaster } from './components/ui/sonner'

function App() {
  const [pageIndex, setPageIndex] = useState(1);
  return (
    <>
      <ResumeInfoProvider>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/resumebuild' element={<><Header pageIndex={pageIndex} setPageIndex={setPageIndex} /><ResumeBuild pageIndex={pageIndex} setPageIndex={setPageIndex} /></>} />
              <Route path='/select-theme' element={<><Header pageIndex={pageIndex} setPageIndex={setPageIndex} /><SelectTheme/></>} />
              <Route path='/:selectedTheme/download' element={<DownloadFile/>} />
            </Routes>
            <Toaster richColors />
          </ThemeProvider>
        </ResumeInfoProvider>
    </>
  )
}

export default App
