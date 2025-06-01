import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useResume } from '@/context/ResumeInfoContext';
import { ChevronLeft, ChevronRight, Loader2, MinusCircle, PlusCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react'


const formField = {
  institution: "",
  degree: "",
  graduationMonth: "",
  graduationYear: "",
}

const Education = ({setPageIndex}) => {
  const [loading, setLoading] = useState(false)
  const {resumeInfo, setResumeInfo} = useResume()
  const [educationList, setEducationList] = useState(
    resumeInfo.education?.length? resumeInfo.education: [formField]
  )

  const handleGoBack = () => {
    setPageIndex(2)
  };

  const handleChange = (index, eOrValue, fieldName = null) => {
    setEducationList((prevInfo)=>{
      const newEntries = [...prevInfo]
      if (typeof eOrValue === "object" && eOrValue.target) {
        const {name, value} = eOrValue.target
        newEntries[index] = {...newEntries[index], [name]: value}
      }else if(fieldName){
          newEntries[index] = {...newEntries[index], [fieldName]: eOrValue}
      }
      return newEntries
    })
  }
  

  const addMoreEducation = () => {
    /*setResumeInfo((prevInfo)=>{
      const newEducation = [...prevInfo.education]
      if (newEducation.length>0) {
        newEducation.push(formField)
      }
      return {...prevInfo, education: newEducation}
    })*/
    setEducationList([...educationList, formField])
  }
  
  const removeEducation = () => {
    setResumeInfo((prevInfo)=>{
      const newEducation = [...prevInfo.education]
      if (newEducation.length>1) {
        newEducation.pop()
      }
      return {...prevInfo, education: newEducation}
    })
  }
  
  const handleSave = async (e) => {
    e.preventDefault()
    setLoading(true)

    await new Promise(resolve=>setTimeout(resolve, 1000))

    setResumeInfo({...resumeInfo, education: [...educationList]})

    setLoading(false);
    setPageIndex(4);
  }
  

  return (
    <form onSubmit={handleSave} className='space-y-4'>
      <div>
        <h2 className="text-2xl font-semibold">Education</h2>
        <p className="lead">Start with your most recent education and work backwards, including the degree/certification, institution's name and location, and year of completion.</p>
      </div>
      { educationList.map((item, index)=>(
          <div key={index}>
        <div className="grid grid-cols-2 gap-4">
            <div className='my-4 mt-8'>
            <label className="text-sm font-medium tracking-wider">School Name</label>
              <Input onChange={(e)=>handleChange(index,e)} defaultValue={item.institution} name="institution" className="mt-2" placeholder="Enter school name" />
            </div>
            <div className='mb-4 mt-8'>
            <label className="text-sm font-medium tracking-wider">Degree</label>
              <Input onChange={(e)=>handleChange(index, e) } defaultValue={item.degree} name="degree" className="mt-2" placeholder="Enter degree" />
            </div>
          </div>
  
          <div >
            <label className="text-sm font-medium tracking-wider">Graduation Date</label>
            <div className="grid grid-cols-2 gap-4 my-2">
              <Select onValueChange={(value)=>handleChange(index, value, "graduationMonth")} defaultValue={item.graduationMonth}>
                <SelectTrigger>
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
                    <SelectItem key={month} value={month}>{month}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select onValueChange={(value)=>handleChange(index, value, "graduationYear")} defaultValue={item.graduationYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                    <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
      </div>
        ))
        }
      <div className="flex items-center gap-4">
              <Button type="button" onClick={addMoreEducation}>
                <PlusCircle/> Add More
              </Button>
              <Button variant={'outline'} type="button" onClick={removeEducation}>
                <MinusCircle/> Remove
              </Button>
            </div>
      <div className="flex justify-between">
        <Button
          onClick={handleGoBack}
          type="button"
          variant="link"
          size="lg"
          className="cursor-pointer"
        >
          <ChevronLeft /> Back
        </Button>
        <Button disabled={loading} type="submit" size="lg" className="cursor-pointer">
        {loading && <Loader2 className="animate-spin" /> }
          Next: Education <ChevronRight />
        </Button>
      </div>
    </form>
  )
}

export default Education
