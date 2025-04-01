import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import Template2 from '@/components/templates/Template2'
import Template1 from '@/components/templates/Template1'
import Template3 from '@/components/templates/Template3'

const Home = () => {
  
  return (
    <div>
    <div className='space-y-6'>
      <Template1/>
      <Template2/>
      <Template3/>
    </div>
    <Button>  
      <Link to='/resumebuild'>Start</Link>
    </Button>
    </div>
  )
}

export default Home
