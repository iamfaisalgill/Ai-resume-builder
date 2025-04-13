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

function ContactInfoDialog({ isOpen, onClose }) {
  const {resumeInfo, setResumeInfo} = useResume()
  const [isEditing, setIsEditing] = useState(true)

  const [formData, setFormData] = useState({
    fullName: resumeInfo.fullName || '',
    email: resumeInfo.email || "",
    city: resumeInfo.city || "",
    country: resumeInfo.country|| "",
    phoneNumber: resumeInfo.phoneNumber||"",
  })

  const handleChange = (e) => {
    setIsEditing(false)
    const {name, value} = e.target
    setFormData({ ...formData, [name]: value });
  }

  const handleSave = () => {
    setResumeInfo(prev=>({...prev, ...formData}))
    setIsEditing(true)
    
    toast.success(
      <div className="flex items-center gap-2">
        <span>Details Updated</span>
      </div>,
      {
        style: {
          background: "#f0fdf4", // Light green background
          border: "1px solid #bbf7d0", // Light green border
          color: "#166534", // Dark green text
        },
        duration: 2000,
      }
    );
  }
  

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()} >
      <DialogContent className="sm:max-w-[600px]"> 
        <DialogHeader>
          <DialogTitle>Contact Information</DialogTitle>
          <DialogDescription>
            Update your contact details here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 text-foreground">
              
          <div className='col-span-1'>
            <Label htmlFor="fullName">Full Name</Label>
            <Input required onChange={e=>handleChange(e)} defaultValue={resumeInfo.fullName} id="fullName" name="fullName" type='text' className=' mt-2' placeholder="Full Name" />
          </div>

          <div className='col-span-1'>
          <Label htmlFor="city">City</Label>
            <Input required onChange={e=>handleChange(e)} defaultValue={resumeInfo.city} id="city" name="city" type='text' className='mt-2' placeholder="City" />
          </div>
          <div className=' col-span-1'>
          <Label htmlFor="email">Email</Label>
            <Input required onChange={e=>handleChange(e)} defaultValue={resumeInfo.email} id="email" name="email" type='email' className='mt-2' placeholder="Email" />
          </div>
          <div className='col-span-1'>
          <Label htmlFor="country">Country</Label>
            <Input required onChange={e=>handleChange(e)} defaultValue={resumeInfo.country} id="country" name="country" type='text' className='mt-2' placeholder="Country" />
          </div>

          <div className='col-span-1'>
          <label htmlFor="phoneNumber" className='text-sm font-medium tracking-wider'>Phone Number</label>
            <Input required onChange={e=>handleChange(e)} defaultValue={resumeInfo.phoneNumber} id="phoneNumber" name="phoneNumber" type='text' className='mt-2' placeholder="Phone Number" />

          </div>

        </div>
        <DialogFooter>
        <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button onClick={handleSave} disabled={isEditing}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ContactInfoDialog
