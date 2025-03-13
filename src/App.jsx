import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ContactDetails from './pages/ContactDetails'
import Experience from './pages/experience'
import Education from './pages/Education'
import Skills from './pages/Skills'
import Summary from './pages/Summary'
import SelectTheme from './pages/SelectTheme'
import DownloadFile from './pages/DownloadFile'
import { ThemeProvider } from "@/components/theme-provider"
import {ResumeInfoContext} from '@/context/ResumeInfoContext'

function App() {
  const [resumeInfo,setResumeInfo]=useState();

  return (
    <>
     <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Header/>
      <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/resumebuild/contact' element={<ContactDetails/>} />
          <Route path='/resumebuild/experience' element={<Experience/>} />
          <Route path='/resumebuild/education' element={<Education/>} />
          <Route path='/resumebuild/skills' element={<Skills/>} />
          <Route path='/resumebuild/summary' element={<Summary/>} />
          <Route path='/resumebuild/select-theme' element={<SelectTheme/>} />
          <Route path='/:selectedTheme/download' element={<DownloadFile/>} />
        </Routes>
      </ResumeInfoContext.Provider>
      </ThemeProvider>
    </>
  )
}

export default App
