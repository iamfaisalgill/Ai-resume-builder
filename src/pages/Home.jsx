import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const Home = () => {
  
  return (
    <div>
    <Button>  
      <Link to='/resumebuild'>Start</Link>
    </Button>
    </div>
  )
}

export default Home
