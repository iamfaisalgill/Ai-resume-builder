import React, { useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useResume } from '@/context/ResumeInfoContext'
import { Check, CheckCircleIcon } from 'lucide-react'
import { ScrollArea } from '../ui/scroll-area'

function ContactInfoDialog({ isOpen, onClose }) {
  const { resumeInfo, setResumeInfo } = useResume()
  const [isEditing, setIsEditing] = useState(true)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: resumeInfo.contactInfo.email || "",
    city: resumeInfo.contactInfo.city || "",
    country: resumeInfo.contactInfo.country || "",
    phoneNumber: resumeInfo.contactInfo.phoneNumber || "",
    linkedIn: resumeInfo.contactInfo.linkedIn || ''
  })

  const handleChange = (e) => {
    setIsEditing(false)
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value });
  }

  const handleSave = () => {
    setResumeInfo(prev => ({ ...prev, contactInfo: formData }))
    setIsEditing(true)

    toast.info("Contact Information Updated");
    onClose()
  }

  const hasChanges = () => {
    if (
      formData.firstName !== resumeInfo.firstName
    ){
      return true
    }
  }
  


  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()} >
      <DialogContent className="sm:max-w-[600px] p-0">
        <DialogHeader className="border-b px-6 pt-6 pb-3">
          <DialogTitle>Contact Information</DialogTitle>
          <DialogDescription>
            Update your contact details here.
            

            
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='h-[400px] p-3 md:p-6'>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 text-foreground">
            {/* First Name */}
            <div className='col-span-1'>
              <Label htmlFor="firstName" className="text-xs md:text-sm">First Name</Label>
              <Input
                required
                onChange={e => handleChange(e)}
                defaultValue={resumeInfo.contactInfo.firstName}
                id="firstName"
                name="firstName"
                type='text'
                className='mt-1 md:mt-2 text-sm h-10'
                placeholder="e.g. Jason"
              />
            </div>
  
            {/* Last Name */}
            <div className='col-span-1'>
              <Label htmlFor="lastName" className="text-xs md:text-sm">Last Name</Label>
              <Input
                required
                onChange={e => handleChange(e)}
                defaultValue={resumeInfo.contactInfo.lastName}
                id="lastName"
                name="lastName"
                type='text'
                className='mt-1 md:mt-2 text-sm h-10'
                placeholder="e.g. Carter"
              />
            </div>
  
            {/* City */}
            <div className='col-span-1'>
              <Label htmlFor="city" className="text-xs md:text-sm">City</Label>
              <Input
                required
                onChange={e => handleChange(e)}
                defaultValue={resumeInfo.contactInfo.city}
                id="city"
                name="city"
                type='text'
                className='mt-1 md:mt-2 text-sm h-10'
                placeholder="City"
              />
            </div>
  
            {/* Email */}
            <div className='col-span-1'>
              <Label htmlFor="email" className="text-xs md:text-sm">Email</Label>
              <Input
                required
                onChange={e => handleChange(e)}
                defaultValue={resumeInfo.contactInfo.email}
                id="email"
                name="email"
                type='email'
                className='mt-1 md:mt-2 text-sm h-10'
                placeholder="Email"
              />
            </div>
  
            {/* Country */}
            <div className='col-span-1'>
              <Label htmlFor="country" className="text-xs md:text-sm">Country</Label>
              <Input
                required
                onChange={e => handleChange(e)}
                defaultValue={resumeInfo.contactInfo.country}
                id="country"
                name="country"
                type='text'
                className='mt-1 md:mt-2 text-sm h-10'
                placeholder="Country"
              />
            </div>
  
            {/* Phone Number */}
            <div className='col-span-1'>
              <Label htmlFor="phoneNumber" className="text-xs md:text-sm">Phone Number</Label>
              <Input
                required
                onChange={e => handleChange(e)}
                defaultValue={resumeInfo.contactInfo.phoneNumber}
                id="phoneNumber"
                name="phoneNumber"
                type='text'
                className='mt-1 md:mt-2 text-sm h-10'
                placeholder="Phone Number"
              />
            </div>
  
            {/* LinkedIn */}
            <div className='sm:col-span-2'>
              <Label htmlFor="linkedIn" className="text-xs md:text-sm">LinkedIn</Label>
              <Input
                required
                onChange={e => handleChange(e)}
                defaultValue={resumeInfo.contactInfo.linkedIn}
                id="linkedIn"
                name="linkedIn"
                type='text'
                className='mt-1 md:mt-2 text-sm h-10'
                placeholder="e.g. linkedin.com/in/jasoncarter"
              />
            </div>
          </div>
        </ScrollArea>
        <DialogFooter className="border-t px-6 py-3">
          <DialogClose asChild>
            <Button type="button" variant="secondary" size="sm">
              Close
            </Button>
          </DialogClose>
          <Button size="sm" onClick={handleSave} disabled={!hasChanges()}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ContactInfoDialog
