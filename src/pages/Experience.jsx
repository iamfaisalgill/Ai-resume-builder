import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useResume } from "@/context/ResumeInfoContext";
import { ChevronLeft, ChevronRight, Loader2, Trash2 } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/RichTextEditor";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const formField = {
  jobTitle: "",
  company: "",
  startMonth: "",
  startYear: "",
  endMonth: "",
  endYear: "",
  description: "",
};

const years = Array.from(
  { length: 50 },
  (_, i) => new Date().getFullYear() - i
);

const Experience = ({setPageIndex}) => {
  const { resumeInfo, setResumeInfo } = useResume();
   const [experienceList, setExperienceList] = useState(
     resumeInfo.experience?.length? resumeInfo.experience : [formField]
   );
  // const [experienceList, setExperienceList] = useState([...resumeInfo.experience]);
  const [loading, setLoading] = useState(false)

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
  const handleRichTextEditor = (e, name, index) => {
    const newEntries = experienceList.slice()
    newEntries[index][name]=e.target.value
    setExperienceList(newEntries)
  }
  

  const addMoreExperience = () => {
    const newList = [...experienceList, formField]
    setExperienceList(newList)
    // setResumeInfo(prev=>({...prev, experience: newList}))
  };
  const removeExperience = () => {
    if(experienceList.length <=1) return
    const newList = experienceList.slice(0,-1)
    setExperienceList(newList)
    setResumeInfo(prev=>({...prev, experience: newList}))
  };
  

  const handleGoBack = () => {
    setPageIndex(1)
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);
  
     if (hasChanges()) {
    await new Promise(resolve => setTimeout(resolve, 1000));
  } else {
    await new Promise(resolve => resolve());
  }
  const updatedExperience = experienceList.filter(exp=>exp.jobTitle )
  
    setResumeInfo(prev => ({
      ...prev,
      experience: [...updatedExperience],
    }));
  
    setLoading(false);
    setPageIndex(3); // Navigate after saving
  };

  const hasChanges = () => {
    if (experienceList.length !== resumeInfo.experience.length) {
      return true;
    }

    return experienceList.some((exp, index) => {
      const originalExp = resumeInfo.experience[index];
      if (!originalExp) return true;

      return (
        exp.jobTitle !== originalExp.jobTitle ||
        exp.company !== originalExp.company ||
        exp.startMonth !== originalExp.startMonth ||
        exp.startYear !== originalExp.startYear ||
        exp.endMonth !== originalExp.endMonth ||
        exp.endYear !== originalExp.endYear ||
        exp.description !== originalExp.description ||
        exp.present !== originalExp.present
      );
    });
  };


  return (
    <form onSubmit={onSave} className="space-y-9">
      <div>
        <h2 className="text-2xl font-semibold">Work Experience</h2>
        <p className="lead">Let’s start with your most recent job.</p>
      </div>
      {experienceList.map((item, index) => (
        <div className="space-y-4  p-4 border rounded-lg" key={index}>
          <h3 className="text-primary text-sm md:text-base">
            #{index + 1}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Employer & Job Title */}
            <div>
              <div>
                <label className="text-sm font-medium tracking-wider">
                  Job Title
                </label>
                <Input
                  defaultValue={item.jobTitle} 
                  onChange={(e) => handleChange(index, e)}
                  name="jobTitle"
                  placeholder="e.g. Engineer"
                  className="mt-2"
                />
              </div>
              <div>
                <label className="text-sm font-medium tracking-wider">
                  Company
                </label>
                <Input
                  defaultValue={item.company}
                  onChange={(e) => handleChange(index, e)}
                  name="company"
                  placeholder="e.g. IBM"
                  className="mt-2"
                />
              </div>
            </div>

            {/* Start date & End date */}
            <div>
              {/* Start Date */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="mb-2">
                    <label className="text-sm font-medium tracking-wider mb-2">
                      Start date
                    </label>
                  </p>
                  <Select
                    defaultValue={item.startMonth}
                    onValueChange={(value) =>
                      handleChange(index, value, "startMonth")
                    }
                    name="startMonth"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem key={month} value={month}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <p className="mb-2">
                    <label className="text-sm font-medium tracking-wider mb-2">
                      &nbsp;
                    </label>
                  </p>
                  <Select
                    defaultValue={item.startYear}
                    onValueChange={(value) =>
                      handleChange(index, value, "startYear")
                    }
                    name="startYear"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* End Date */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="mb-2">
                    <label className="text-sm font-medium tracking-wider">
                      End date
                    </label>
                  </p>
                  <Select
                    defaultValue={item.endMonth}
                    onValueChange={(value) =>
                      handleChange(index, value, "endMonth")
                    }
                    name="endMonth"
                    disabled={item.present}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem key={month} value={month}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <p className="mb-2">
                    <label className="text-sm font-medium tracking-wider">
                      &nbsp;
                    </label>
                  </p>
                  <Select
                    defaultValue={item.endYear}
                    onValueChange={(value) =>
                      handleChange(index, value, "endYear")
                    }
                    name="endYear"
                    disabled={item.present}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Label className="text-sm mt-3">
                <Checkbox
                  checked={item.present}
                  onCheckedChange={(value) => handleChange(index, value, "present")}
                  className="h-4 w-4"
                /> I currently work here
              </Label>
            </div>
          </div>

          {/* Checkbox */}
          {/* <div className="flex items-center space-x-2">
            <Checkbox name="presentWork" checked={presentWork} onCheckedChange={setPresentWork}  onChange={(e)=>handleCheckChange(index,e)} />
            <label className="text-sm">I Presently work here</label>
          </div> */}

          <div>
          <label className="text-sm font-medium tracking-wider">
                 Description
                 </label>
            {/* <Textarea defaultValue={item.description}
                  onChange={(e) => handleChange(index, e)}
                  name="description"
                  placeholder="Enter description"
                  className='mt-2'
                  id="description"
                  /> */}
            <RichTextEditor
            onRichTextEditorChange={(e) =>
              handleRichTextEditor(e, "description", index )
            }
            defaultValue={item.description}
          />
          </div>
          
        </div>
      ))}

      <div className="flex items-center gap-4">
        <Button type="button" onClick={addMoreExperience}>
          + Add More Experience
        </Button>
        <Button type="button" variant={'secondary'} onClick={removeExperience}>
          - Remove Experience
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
  );
};

export default Experience;
