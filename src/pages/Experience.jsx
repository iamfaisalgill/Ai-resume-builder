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
import { BrainCircuit, ChevronLeft, ChevronRight, Loader2, Sparkles, Trash2 } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/RichTextEditor";
import { generateExperienceDescriptions } from "@/services/geminiService";
import toast from "react-hot-toast";

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
    setExperienceList(prevList => {
      const newEntries = [...prevList];
      newEntries[index] = { ...newEntries[index], [name]: e.target.value};
      return newEntries
    })
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
  };

  const deleteThis = (index) => {
    const newList = experienceList.filter((_, i) => i !== index);
    setExperienceList(newList);
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
    setPageIndex(prev=>prev+1); // Navigate after saving
  };

  const hasChanges = () => {
    if (experienceList.length !== resumeInfo.experience?.length) {
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


  const [loader, setLoader] = useState(false)
  const generateDesc = async (title, index) => {
    try {
      if (!title) {
      toast.error("Please enter jobtitle")
      return
    }
    setLoader(true)
    const results = await generateExperienceDescriptions(title)
    setLoader(false)
    console.log(results);
    setExperienceList(prevList => {
      const newEntries = [...prevList];
      newEntries[index] = { ...newEntries[index], description: results.trim()};
      return newEntries
    })
    
    
    } catch (error) {
      console.log(error);
      
    }
    
  }
  


  return (
    <form onSubmit={onSave} className="space-y-6 md:space-y-9">
  <div>
    <h2 className="text-xl md:text-2xl font-semibold">Work Experience</h2>
    <p className="text-sm md:text-base text-muted-foreground">
      Let's start with your most recent job.
    </p>
  </div>
  
  {experienceList.map((item, index) => (
    <div className="space-y-4 p-3 md:p-4 border rounded-lg" key={index}>
      <div className="flex justify-between items-center">
        <h3 className="text-primary text-sm md:text-base">
          #{index + 1}
        </h3>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 md:h-9 md:w-9 p-0 cursor-pointer text-muted-foreground hover:text-destructive"
          onClick={() => deleteThis(index)}
          type="button"
        >
          <Trash2 size={16} />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {/* Employer & Job Title */}
        <div className="space-y-3 md:space-y-4">
          <div>
            <label className="text-xs md:text-sm font-medium tracking-wider">
              Job Title
            </label>
            <Input
              value={item.jobTitle} 
              onChange={(e) => handleChange(index, e)}
              name="jobTitle"
              placeholder="e.g. Engineer"
              className="mt-1 md:mt-2 text-sm md:text-base"
            />
          </div>
          <div>
            <label className="text-xs md:text-sm font-medium tracking-wider">
              Company
            </label>
            <Input
              value={item.company}
              onChange={(e) => handleChange(index, e)}
              name="company"
              placeholder="e.g. IBM"
              className="mt-1 md:mt-2 text-sm md:text-base"
            />
          </div>
        </div>

        {/* Start date & End date */}
        <div className="space-y-3 md:space-y-4">
          {/* Start Date */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs md:text-sm font-medium tracking-wider">
                Start date
              </label>
              <Select
                value={item.startMonth}
                onValueChange={(value) =>
                  handleChange(index, value, "startMonth")
                }
                name="startMonth"
              >
                <SelectTrigger className="mt-1 md:mt-2 text-sm md:text-base">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month} value={month} className="text-sm">
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs md:text-sm font-medium tracking-wider invisible">
                Year
              </label>
              <Select
                value={item.startYear}
                onValueChange={(value) =>
                  handleChange(index, value, "startYear")
                }
                name="startYear"
              >
                <SelectTrigger className="mt-1 md:mt-2 text-sm md:text-base">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()} className="text-sm">
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
              <label className="text-xs md:text-sm font-medium tracking-wider">
                End date
              </label>
              <Select
                value={item.endMonth}
                onValueChange={(value) =>
                  handleChange(index, value, "endMonth")
                }
                name="endMonth"
                disabled={item.present}
              >
                <SelectTrigger className="mt-1 md:mt-2 text-sm md:text-base">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month} value={month} className="text-sm">
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs md:text-sm font-medium tracking-wider invisible">
                Year
              </label>
              <Select
                value={item.endYear}
                onValueChange={(value) =>
                  handleChange(index, value, "endYear")
                }
                name="endYear"
                disabled={item.present}
              >
                <SelectTrigger className="mt-1 md:mt-2 text-sm md:text-base">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()} className="text-sm">
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 mt-2">
            <Checkbox
              checked={item.present}
              onCheckedChange={(value) => handleChange(index, value, "present")}
              className="h-4 w-4"
            />
            <label className="text-xs md:text-sm">
              I currently work here
            </label>
          </div>
        </div>
      </div>

      <div className="mt-3 md:mt-4">
        <div className="flex justify-between items-center mb-1 md:mb-2">
          <label className="text-xs md:text-sm font-medium tracking-wider">
            Description
          </label>
          <Button variant={'outline'} type="button" size={'sm'} className={'dark:hover:bg-transparent !border-primary hover:brightness-110 hover:scale-102'} onClick={()=>generateDesc(item.jobTitle, index)} disabled={loader}>
          {loader ? <Loader2 className="animate-spin text-blue-500"/> : <Sparkles className="text-blue-500"/>}
          {loader ? (
                  <span class="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
                    Generating...
                  </span>
                ) : (
                  <span class="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
                    Generate with AI
                  </span>
                )}
          </Button>
        </div>
        <RichTextEditor
          onRichTextEditorChange={(e) =>
            handleRichTextEditor(e, "description", index) 
          }
          defaultValue={item.description}
        />
      </div>
    </div>
  ))}

    <Button 
      type="button" 
      variant={'outline'}
      onClick={addMoreExperience}
      className="w-full border-2 border-dashed"
    >
      + Add More Experience
    </Button>
  
  <div className="flex flex-col-reverse sm:flex-row justify-between gap-4">
    <Button
      onClick={handleGoBack}
      type="button"
      variant="link"
      size="lg"
      className="cursor-pointer px-0"
    >
      <ChevronLeft className="h-5 w-5" /> Back
    </Button>
    <Button 
      disabled={loading} 
      type="submit" 
      size="lg" 
      className="cursor-pointer w-full sm:w-auto"
    >
      {loading && <Loader2 className="animate-spin mr-2" />}
      Next: Education <ChevronRight className="h-5 w-5 ml-1" />
    </Button>
  </div>
</form>
  );
};

export default Experience;
