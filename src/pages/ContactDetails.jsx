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

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (hasChanges()) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } else {
      await new Promise((resolve) => resolve());
    }

    setResumeInfo(prevState => ({ ...prevState, contactInfo: formData }));

    setLoading(false);
    setPageIndex((prev) => prev + 1);
  };

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const hasChanges = () => {
    if (
      formData.firstName !== resumeInfo.contactInfo.firstName ||
      formData.lastName !== resumeInfo.contactInfo.lastName ||
      formData.email !== resumeInfo.contactInfo.email ||
      formData.city !== resumeInfo.contactInfo.city ||
      formData.country !== resumeInfo.contactInfo.country ||
      formData.phoneNumber !== resumeInfo.contactInfo.phoneNumber ||
      formData.linkedIn !== resumeInfo.contactInfo.linkedIn
    ){
      return true
    }
  }

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
            <Label htmlFor="linkedIn">LinkedIn/Portfolio</Label>
            <Input onChange={e => handleChange(e)} defaultValue={resumeInfo.contactInfo?.linkedIn} id="linkedIn" name="linkedIn" type='text' className='mt-2 max-sm:h-9 max-sm:text-sm' placeholder="e.g. linkedin.com/in/jasoncarter" />
          </div>

        </div>
      </div>
      <div className='max-sm:fixed max-sm:bottom-0 max-sm:right-0 max-sm:bg-background max-sm:p-5 max-sm:border-t w-full flex justify-between'>
        <Button onClick={handleGoBack} type="button" variant="ghost" size={isMobile?"sm" : "lg"} className="cursor-pointer"><ChevronLeft /> Back</Button>
        <div className='space-x-2'>
          <Button variant={'link'}  type="button" size={isMobile?"sm" : "lg"} onClick={()=>setPageIndex(prev=>prev+1)}>Skip</Button>
          <Button disabled={loading} type="submit" size={isMobile?"sm" : "lg"} className="cursor-pointer">
            {loading && <Loader2 className="animate-spin" />}
            <span className='max-sm:hidden'>Next: Work Experience</span> <span className='sm:hidden'>Save</span> <ChevronRight /></Button>
        </div>
      </div>
    </form>
  )
}

export default ContactDetails
