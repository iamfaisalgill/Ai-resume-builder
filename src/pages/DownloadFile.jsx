import React from 'react'
import { useParams } from 'react-router-dom'

const DownloadFile = () => {
    const params = useParams()
    
  return (
    <div className='font-bold mt-[30px]'>
      Selected theme is {params.selectedTheme}
    </div>
  )
}

export default DownloadFile
