import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ContactDetails = () => {

  const { resumeInfo ,setResumeInfo } = useContext(ResumeInfoContext);
  const [formData, setFormData] = useState({
    fullName: resumeInfo.fullName || '',
    city: resumeInfo.city || '',
    email: resumeInfo.email || '',
    country: resumeInfo.country || ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value });
    
  }
  const navigate = useNavigate()

   const onSave = (e) => {
    e.preventDefault()
    setResumeInfo({ ...resumeInfo, ...formData }); // Merge new data with existing data
    navigate('/resumebuild/experience')
  }

 
  

  return (
    <div className='min-w-full p-7'>
        <div className='mt-8 space-y-9 p-6 max-w-[980px] mx-auto bg-card rounded-lg'>
          <div>
            <h2 className='text-2xl font-semibold'>How can employers get in touch with you?</h2>
            <p className='lead'>For your resume header, include (at minimum) your name and email so employers can contact you.</p>
          </div>
          <div className=" p-8 rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-foreground">

              <div className='col-span-1'>
                <label htmlFor="fullName" className='text-sm font-medium tracking-wider'>Full Name</label>
                <Input required value={resumeInfo?.fullName} onChange={handleChange} id="fullName" name="fullName" type='text' className=' mt-2' placeholder="Full Name" />
              </div>

              <div className='col-span-1'>
              <label htmlFor="city" className='text-sm font-medium tracking-wider'>City</label>
                <Input required value={resumeInfo?.city} onChange={handleChange} id="city" name="city" type='text' className='mt-2' placeholder="City" />
              </div>
              <div className=' col-span-1'>
              <label htmlFor="email" className='text-sm font-medium tracking-wider'>Email</label>
                <Input required value={resumeInfo?.email} onChange={handleChange} id="email" name="email" type='email' className='mt-2' placeholder="Email" />
              </div>
              <div className='col-span-1'>
              <label htmlFor="country" className='text-sm font-medium tracking-wider'>Country</label>
                <Input required value={resumeInfo?.country} onChange={handleChange} id="country" name="country" type='text' className='mt-2' placeholder="Country" />
              </div>

              <div className='col-span-1'>
              <label htmlFor="phoneNumber" className='text-sm font-medium tracking-wider'>Phone Number</label>
                <Input required value={resumeInfo?.phoneNumber} onChange={handleChange} id="phoneNumber" name="phoneNumber" type='number' className='mt-2' placeholder="Phone Number" />
  
              </div>

            </div>
          </div>
          <div className='flex justify-between'>
            <Button type="button" variant="link" size="lg" className="cursor-pointer"><ChevronLeft /> Back</Button>
            <Button onClick={onSave} size="lg" className="cursor-pointer">Next: Work Experience <ChevronRight /></Button>
          </div>
        </div>
    </div>
  )
}

export default ContactDetails
