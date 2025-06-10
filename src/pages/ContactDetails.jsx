import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from "@/components/ui/label"
import { ResumeInfoContext, useMediaQuery, useResume } from '@/context/ResumeInfoContext'
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ContactDetails = ({ setPageIndex }) => {

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: resumeInfo.contactInfo?.firstName || '',
    lastName: resumeInfo.contactInfo?.lastName || '',
    email: resumeInfo.contactInfo?.email || "",
    city: resumeInfo.contactInfo?.city || "",
    country: resumeInfo.contactInfo?.country || "",
    phoneNumber: resumeInfo.contactInfo?.phoneNumber || "",
    linkedIn: resumeInfo.contactInfo?.linkedIn || ''
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
        setResumeInfo(prevState => ({ ...prevState, contactInfo: data })); // Save data when promise is fulfilled
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


  const isMobile = useMediaQuery('(max-width: 768px)');


  return (
    <form onSubmit={onSave}>
      <div className="max-sm:text-center">
        <h2 className='text-2xl font-semibold'>Contact Info</h2>
        <p className='lead'>This information will be on your resume header. Include at least your name and email address.</p>
      </div>
      <div className="sm:p-8 max-sm:mt-7 max-sm:mb-18 rounded-lg">
        <div className="grid sm:grid-cols-2 gap-4 text-foreground">

          <div className='col-span-1'>
            <Label htmlFor="firstName">First Name</Label>
            <Input required onChange={e => handleChange(e)} defaultValue={resumeInfo.contactInfo?.firstName} id="firstName" name="firstName" type='text' className=' mt-2 max-sm:h-9 max-sm:text-sm' placeholder="e.g. Json" />
          </div>

          <div className='col-span-1'>
            <Label htmlFor="lastName">Last Name</Label>
            <Input required onChange={e => handleChange(e)} defaultValue={resumeInfo.contactInfo?.lastName} id="lastName" name="lastName" type='text' className=' mt-2 max-sm:h-9 max-sm:text-sm' placeholder="e.g. Carter" />
          </div>

          <div className='col-span-1'>
            <Label htmlFor="city">City</Label>
            <Input required onChange={e => handleChange(e)} defaultValue={resumeInfo.contactInfo?.city} id="city" name="city" type='text' className='mt-2 max-sm:h-9 max-sm:text-sm' placeholder="City" />
          </div>

          <div className='col-span-1'>
            <Label htmlFor="country">Country</Label>
            <Input required onChange={e => handleChange(e)} defaultValue={resumeInfo.contactInfo?.country} id="country" name="country" type='text' className='mt-2 max-sm:h-9 max-sm:text-sm' placeholder="Country" />
          </div>

          <div className=' col-span-1'>
            <Label required htmlFor="email">Email</Label>
            <Input required onChange={e => handleChange(e)} defaultValue={resumeInfo.contactInfo?.email} id="email" name="email" type='email' className='mt-2 max-sm:h-9 max-sm:text-sm' placeholder="Email" />
          </div>

          <div className='col-span-1'>
            <Label htmlFor="country">Phone Number</Label>
            <Input onChange={e => handleChange(e)} defaultValue={resumeInfo.contactInfo?.phoneNumber} id="phoneNumber" name="phoneNumber" type='text' className='mt-2 max-sm:h-9 max-sm:text-sm' placeholder="Phone Number" />
          </div>

          <div className='col-span-1'>
            <Label htmlFor="linkedIn">LinkedIn</Label>
            <Input onChange={e => handleChange(e)} defaultValue={resumeInfo.contactInfo?.linkedIn} id="linkedIn" name="linkedIn" type='text' className='mt-2 max-sm:h-9 max-sm:text-sm' placeholder="e.g. linkedin.com/in/jasoncarter" />
          </div>

        </div>
      </div>
      <div className='max-sm:fixed max-sm:bottom-0 max-sm:right-0 max-sm:bg-background max-sm:p-5 max-sm:border-t w-full flex justify-between'>
        <Button onClick={handleGoBack} type="button" variant="link" size={isMobile?"sm" : "lg"} className="cursor-pointer"><ChevronLeft /> Back</Button>
        <Button disabled={loading} type="submit" size={isMobile?"sm" : "lg"} className="cursor-pointer">
          {loading && <Loader2 className="animate-spin" />}
          Next: Work Experience <ChevronRight /></Button>
      </div>
    </form>
  )
}

export default ContactDetails
