import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import Header from '@/components/Header'

const Home = () => {
  
  return (
    <>
    <Header />
      <div>
      
      <Button>  
        <Link to='/resumebuild'>Start</Link>
      </Button>
      </div>
    </>
  )
}

export default Home
