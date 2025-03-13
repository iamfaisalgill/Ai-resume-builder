import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'

const ContactDetails = () => {

  const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
  const [formData, setFormData] = useState()

  const handleChange = (e) => {
   const {name, value} = e.target
   setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
   setResumeInfo({
    ...resumeInfo,
    [name]: value
   })
  }
  
  
  const onSave = (e) => {
    e.preventDefault()
    
  console.log(formData);

  }

  return (
    <div className='min-w-full p-7'>
      <div className='mt-8 space-y-9 p-6 max-w-[980px] mx-auto bg-card'>
        <form onSubmit={onSave}>
          <div>
            <h2 className='text-2xl font-semibold'>How can employers get in touch with you?</h2>
            <p className='lead'>For your resume header, include (at minimum) your name and email so employers can contact you.</p>
          </div>
          <div className="bg-background p-8 rounded-lg">
            <div className="grid grid-cols-2 gap-4">
            
                <Input onChange={handleChange} name="fullName" type='text' id='fname' className='bg-card col-span-1' placeholder="Full Name" />
                <Input onChange={handleChange} name="city" type='text' className='bg-card col-span-1' placeholder="City" />
                <Input onChange={handleChange} name="email" type='email' className='bg-card col-span-1' placeholder="Email" />
                <Input onChange={handleChange} name="country" type='text' className='bg-card col-span-1' placeholder="Country" />
                <Input onChange={handleChange} name="phoneNumber" type='number' className='bg-card col-span-2' placeholder="Phone Number" />
            
        
            </div>
          </div>
          <div className='flex justify-between'>
            <Button type="button" variant="link" size="lg" className="cursor-pointer"><ChevronLeft/> Back</Button>
            <Button type="submit" size="lg" className="cursor-pointer">Next: Work Experience <ChevronRight/></Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ContactDetails
