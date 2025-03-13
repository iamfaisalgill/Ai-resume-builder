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

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
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
    </>
  )
}

export default App
