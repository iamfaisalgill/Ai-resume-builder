import React from 'react'
import {
    Dialog,
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

function ContactInfoDialog({ isOpen, onClose }) {

  const handleChange = () => {
    
  }
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
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
            <Input required onChange={handleChange} id="fullName" name="fullName" type='text' className=' mt-2' placeholder="Full Name" />
          </div>

          <div className='col-span-1'>
          <Label htmlFor="city">City</Label>
            <Input required onChange={handleChange} id="city" name="city" type='text' className='mt-2' placeholder="City" />
          </div>
          <div className=' col-span-1'>
          <Label htmlFor="email">Email</Label>
            <Input required onChange={handleChange} id="email" name="email" type='email' className='mt-2' placeholder="Email" />
          </div>
          <div className='col-span-1'>
          <Label htmlFor="country">Country</Label>
            <Input required onChange={handleChange} id="country" name="country" type='text' className='mt-2' placeholder="Country" />
          </div>

          <div className='col-span-1'>
          <label htmlFor="phoneNumber" className='text-sm font-medium tracking-wider'>Phone Number</label>
            <Input required onChange={handleChange} id="phoneNumber" name="phoneNumber" type='text' className='mt-2' placeholder="Phone Number" />

          </div>

        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ContactInfoDialog
