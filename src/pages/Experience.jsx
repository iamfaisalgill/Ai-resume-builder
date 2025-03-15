import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'
import { Textarea } from '@/components/ui/textarea';
import RichTextEditor from '@/components/RichTextEditor';

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const formField = {
  jobTitle: "",
  company: "",
  startMonth: "",
  startYear: "",
  endMonth: "",
  endYear: "",
  description: "",
  presentWork: ""
}

const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i);

const Experience = () => {
  const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
  const [presentWork, setPresentWork] = useState(false);
  const [experienceList, setExperienceList] = useState([formField])
     const onSave = () =>{

     }
     /*
     const handleChange = (index,e) => {
        const newEntries = experienceList.slice()
        const {name, value} = e.target
        newEntries[index] [name] = value
        setExperienceList(newEntries)
     }*/

        const handleChange = (index, eOrValue, fieldName = null) => {
          const newEntries = [...experienceList];
      
          if (typeof eOrValue === "object" && eOrValue.target) {
              // Handling input fields
              const { name, value } = eOrValue.target;
              newEntries[index][name] = value;
          } else {
              // Handling Select dropdown
              newEntries[index][fieldName] = eOrValue;
          }
      
          setExperienceList(newEntries);
      };

      const handleRichTextEditor = (e,name,index) => {
        const newEntries = [...experienceList];
        newEntries[index][name] = e.target.value;
        setExperienceList(newEntries)
      }
      
      
  
     useEffect(() => {
       console.log(experienceList);
      
     }, [experienceList])
     
     

     const addMoreExperience = () => {
       setExperienceList([...experienceList, formField])
       
     }
     const removeExperience = () => {
      setExperienceList(experienceList.slice(0,-1))
     }
     


     return (
      <div className='min-w-full p-7'>
      <div className="mt-8 space-y-9 p-6 max-w-[980px] mx-auto bg-card rounded-lg">
        <div>
            <h2 className='text-2xl font-semibold'>Work Experience</h2>
            <p className='lead'>Let’s start with your most recent job.</p>
        </div>
        {experienceList.map((Item,index)=>(
           <div className='space-y-4' key={index}>
          
          {/* Employer & Job Title */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Job Title</label>
              <Input onChange={(e)=>handleChange(index,e)} name="jobTitle" placeholder="e.g. Engineer" />
            </div>
            {/* Start Date */}
            <div className="grid grid-cols-2 gap-2">
              <div className="w-full">
                <label className="block text-sm font-medium">Start date</label>
                <Select onValueChange={(value) => handleChange(index, value,"startMonth")} name="startMonth">
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
                <Select onValueChange={(value) => handleChange(index, value, "startYear")} name="startYear">
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
          </div>
          
    
          {/* Start Date & End Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
              <label className="block text-sm font-medium">Company</label>
              <Input onChange={(e)=>handleChange(index,e)} name="company" placeholder="e.g. IBM" />
            </div>
            
    
            {/* End Date */}
            {!presentWork && (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium">End date</label>
                  <Select onValueChange={(value) => handleChange(index, value, "endMonth")} name="endMonth">
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
                  <Select onValueChange={(value) => handleChange(index, value, "endYear")} name="endYear">
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
            <Checkbox onChange={(e)=>handleChange(Item,e)} name="presentWork" checked={presentWork} onCheckedChange={setPresentWork} />
            <label className="text-sm">I Presently work here</label>
          </div>
         <RichTextEditor onRichTextEditorChange={(e)=>handleRichTextEditor(e, "description", index)}  />
        </div>
        ))}

        <div className='flex items-center gap-4'>
          <Button onClick={addMoreExperience}> Add More Experience</Button>
          <Button onClick={removeExperience}> Remove Experience</Button>
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