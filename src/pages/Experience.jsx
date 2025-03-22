import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'
import { Textarea } from '@/components/ui/textarea';
import RichTextEditor from '@/components/RichTextEditor';
import { useNavigate } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

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
  description: ""
}

const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i);

const Experience = () => {
  const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
  const [experienceList, setExperienceList] = useState([formField])
  const navigate = useNavigate()
  

        const handleChange = (index, eOrValue, fieldName = null) => {
          setExperienceList((prevList) => {
              const newEntries = [...prevList]; 
      
              if (typeof eOrValue === "object" && eOrValue.target) {
                  // Handle text input
                  const { name, value } = eOrValue.target;
                  newEntries[index] = { ...newEntries[index], [name]: value };
              } else if (fieldName) {
                  // Handle Select dropdowns
                  newEntries[index] = { ...newEntries[index], [fieldName]: eOrValue };
              }
      
              return newEntries;
          });
      };

    

      const handleRichTextEditor = (e,name,index) => {
        const newEntries = [...experienceList];
        newEntries[index][name] = e.target.value;
        setExperienceList(newEntries)
      }
      
      
  
     useEffect(() => {
       console.log({experience: experienceList});
      
     }, [experienceList])
     
     

     const addMoreExperience = () => {
       setExperienceList([...experienceList, formField])
       
     }
     const removeExperience = () => {
      if (experienceList.length>1) {
        setExperienceList(experienceList.slice(0,-1))
      }
     }

     const handleGoBack = () => {
      navigate(-1); // Navigate back to the previous page
    };
    
    const onSave = (e) =>{
      e.preventDefault()
      setResumeInfo(prevState => ({ ...prevState, experience: [...experienceList] }));  
       // navigate('/resumebuild/education'); // Navigate after saving data
    }

     return (
      <div className='min-w-full p-7'>
      <form onSubmit={onSave} className="mt-8 space-y-9 p-6 max-w-[980px] mx-auto bg-card rounded-lg">
        <div>
            <h2 className='text-2xl font-semibold'>Work Experience</h2>
            <p className='lead'>Let’s start with your most recent job.</p>
        </div>
        {experienceList.map((Item,index)=>(
           <div className='space-y-4' key={index}>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Employer & Job Title */}
            <div>
              <div>
                <label className="text-sm font-medium tracking-wider">Job Title</label>
                <Input defaultValue={resumeInfo[index]?.experience.jobTitle} onChange={(e)=>handleChange(index,e)} name="jobTitle" placeholder="e.g. Engineer"  className="mt-2"/>
              </div>
              <div>
                <label className="text-sm font-medium tracking-wider">Company</label>
                <Input defaultValue={resumeInfo?.experience.company} onChange={(e)=>handleChange(index,e)} name="company" placeholder="e.g. IBM"  className="mt-2"/>
              </div>
            </div>
           
           {/* Start date & End date */}
            <div>
            {/* Start Date */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className='mb-2'><label className="text-sm font-medium tracking-wider mb-2">Start date</label></p>
                  <Select defaultValue={resumeInfo?.experience.startMonth} onValueChange={(value) => handleChange(index, value,"startMonth")} name="startMonth">
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
                  <p className='mb-2'><label className="text-sm font-medium tracking-wider mb-2">&nbsp;</label></p>
                  <Select defaultValue={resumeInfo?.experience.startYear} onValueChange={(value) => handleChange(index, value, "startYear")} name="startYear">
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
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className='mb-2'><label className="text-sm font-medium tracking-wider">End date</label></p>
                  <Select defaultValue={resumeInfo?.experience.endMonth} onValueChange={(value) => handleChange(index, value, "endMonth")} name="endMonth">
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
                  <p className='mb-2'><label className="text-sm font-medium tracking-wider">&nbsp;</label></p>
                  <Select defaultValue={resumeInfo?.experience.endYear} onValueChange={(value) => handleChange(index, value, "endYear")} name="endYear">
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
          </div>
    
          {/* Checkbox */}
          {/* <div className="flex items-center space-x-2">
            <Checkbox name="presentWork" checked={presentWork} onCheckedChange={setPresentWork}  onChange={(e)=>handleCheckChange(index,e)} />
            <label className="text-sm">I Presently work here</label>
          </div> */}
         <RichTextEditor onRichTextEditorChange={(e)=>handleRichTextEditor(e, "description", index)}  />
        </div>
        ))}


        <div className='flex items-center gap-4'>
          <Button type="button" onClick={addMoreExperience}> Add More Experience</Button>
          <Button type="button" onClick={removeExperience}> Remove Experience</Button>
        </div>
        <div className='flex justify-between'>
                    <Button onClick={handleGoBack} type="button" variant="link" size="lg" className="cursor-pointer"><ChevronLeft /> Back</Button>
                    <Button type="submit" size="lg" className="cursor-pointer" >Next: Work Experience <ChevronRight /></Button>
                  </div>
      </form>
      </div>
    );
  }

export default Experience