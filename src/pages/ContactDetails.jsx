import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ResumeInfoContext, useResume } from '@/context/ResumeInfoContext'
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ContactDetails = ({setPageIndex}) => {

  const { resumeInfo ,setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false)
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
    setLoading(true); // Set loading state to true
  
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (formData) {
          resolve(formData); // Resolve with formData if it exists
        } else {
          reject(new Error("Failed to save data")); // Reject if formData is missing
        }
      }, 1000);
    })
      .then(data => {
        setResumeInfo(prevState => ({ ...prevState, ...data })); // Save data when promise is fulfilled
      })
      .catch(error => {
        console.error(error.message); // Handle error (you can show a message to the user)
      })
      .finally(() => {
        setPageIndex(2)
        setLoading(false); // Stop loading after operation completes
      });
  };

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };
  

 
  

  return (
        <form onSubmit={onSave}>
          <div>
            <h2 className='text-2xl font-semibold'>How can employers get in touch with you?</h2>
            <p className='lead'>For your resume header, include (at minimum) your name and email so employers can contact you.</p>
          </div>
          <div className=" p-8 rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-foreground">

              <div className='col-span-1'>
                <label htmlFor="fullName" className='text-sm font-medium tracking-wider'>Full Name</label>
                <Input required defaultValue={resumeInfo?.fullName} onChange={handleChange} id="fullName" name="fullName" type='text' className=' mt-2' placeholder="Full Name" />
              </div>

              <div className='col-span-1'>
              <label htmlFor="city" className='text-sm font-medium tracking-wider'>City</label>
                <Input required defaultValue={resumeInfo?.city} onChange={handleChange} id="city" name="city" type='text' className='mt-2' placeholder="City" />
              </div>
              <div className=' col-span-1'>
              <label htmlFor="email" className='text-sm font-medium tracking-wider'>Email</label>
                <Input required defaultValue={resumeInfo?.email} onChange={handleChange} id="email" name="email" type='email' className='mt-2' placeholder="Email" />
              </div>
              <div className='col-span-1'>
              <label htmlFor="country" className='text-sm font-medium tracking-wider'>Country</label>
                <Input required defaultValue={resumeInfo?.country} onChange={handleChange} id="country" name="country" type='text' className='mt-2' placeholder="Country" />
              </div>

              <div className='col-span-1'>
              <label htmlFor="phoneNumber" className='text-sm font-medium tracking-wider'>Phone Number</label>
                <Input required defaultValue={resumeInfo?.phoneNumber} onChange={handleChange} id="phoneNumber" name="phoneNumber" type='number' className='mt-2' placeholder="Phone Number" />
  
              </div>

            </div>
          </div>
          <div className='flex justify-between'>
            <Button onClick={handleGoBack} type="button" variant="link" size="lg" className="cursor-pointer"><ChevronLeft /> Back</Button>
            <Button disabled={loading} type="submit" size="lg" className="cursor-pointer">
            {loading && <Loader2 className="animate-spin" /> }
            Next: Work Experience <ChevronRight /></Button>
          </div>
        </form>
  )
}

export default ContactDetails
