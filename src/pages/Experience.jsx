import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i);

const Experience = () => {
  const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
  const [form, setform] = useState({
    jobTitle: resumeInfo.jobTitle || '',
    employer: resumeInfo.employer || '',
    city: resumeInfo.city || '',
    country: resumeInfo.country || '',
    startMonth: resumeInfo
  })
     const onSave = () =>{

     }
     const handleChange = () => {

     }

     const [presentWork, setPresentWork] = useState(false);

     return (
      <div className='min-w-full p-7'>
      <div className="mt-8 space-y-9 p-6 max-w-[980px] mx-auto bg-card rounded-lg">
        <div>
            <h2 className='text-2xl font-semibold'>Work Experience</h2>
            <p className='lead'>Let’s start with your most recent job.</p>
        </div>
        <div className=' space-y-4'>
          
          {/* Employer & Job Title */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Employer</label>
              <Input placeholder="e.g. IBM" />
            </div>
            <div>
              <label className="block text-sm font-medium">Job title</label>
              <Input placeholder="e.g. Engineer" />
            </div>
          </div>
    
          {/* City & State */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">City</label>
              <Input placeholder="e.g. San Francisco" />
            </div>
            <div>
              <label className="block text-sm font-medium">State</label>
              <Input placeholder="e.g. California" />
            </div>
          </div>
    
          {/* Start Date & End Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Start Date */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium">Start date</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month} value={month}>{month}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium">&nbsp;</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
    
            {/* End Date */}
            {!presentWork && (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium">End date</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem key={month} value={month}>{month}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium">&nbsp;</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
    
          {/* Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox checked={presentWork} onCheckedChange={setPresentWork} />
            <label className="text-sm">I Presently work here</label>
          </div>
        </div>
        <div className='flex justify-between'>
                    <Button type="button" variant="link" size="lg" className="cursor-pointer"><ChevronLeft /> Back</Button>
                    <Button type="submit" size="lg" className="cursor-pointer" onClick={onSave}>Next: Work Experience <ChevronRight /></Button>
                  </div>
      </div>
      </div>
    );
  }

export default Experience