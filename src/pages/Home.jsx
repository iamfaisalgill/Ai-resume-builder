import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const Home = () => {
  return (
    <div>
    <Header/>
    <Button>  
      <Link to='/resumebuild/contact'>Start</Link>
    </Button>
    </div>
  )
}

export default Home
