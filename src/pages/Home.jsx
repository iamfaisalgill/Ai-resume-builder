import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
    <Header/>
      <Link to='/resumebuild/contact'>Start</Link>
    </div>
  )
}

export default Home
