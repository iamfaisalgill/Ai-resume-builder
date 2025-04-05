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
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";

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
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [experienceList, setExperienceList] = useState(
    resumeInfo.experience.length > 0 ? resumeInfo.experience : [formField]
  );
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

  const addMoreExperience = () => {
    setExperienceList([...experienceList, formField]);
    setResumeInfo((prevInfo) => {
      const newExperience = [...prevInfo.experience];
      if (newExperience.length > 0) {
        newExperience.push(formField);
      }
      return { ...prevInfo, experience: newExperience };
    });
  };
  const removeExperience = () => {
    setResumeInfo((prevInfo) => {
      const expInfo = [...prevInfo.experience]; 
      if (expInfo.length > 1) {
        expInfo.pop();
      }
      return { ...prevInfo, experience: expInfo }; // Return updated state
    });
  };
  

  const handleGoBack = () => {
    setPageIndex(1)
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    await new Promise(resolve => setTimeout(resolve, 1000));
  
    setResumeInfo(prev => ({
      ...prev,
      experience: [...experienceList], // Use current form state
    }));
  
    setLoading(false);
    setPageIndex(3); // Navigate after saving
  };

  useEffect(() => {
    if (resumeInfo.experience.length > 0) {
      setExperienceList(resumeInfo.experience);
    }
  }, [resumeInfo.experience]);

  return (
    <form onSubmit={onSave} className="space-y-9">
      <div>
        <h2 className="text-2xl font-semibold">Work Experience</h2>
        <p className="lead">Let’s start with your most recent job.</p>
      </div>
      {resumeInfo.experience.map((Item, index) => (
        <div className="space-y-4" key={index}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Employer & Job Title */}
            <div>
              <div>
                <label className="text-sm font-medium tracking-wider">
                  Job Title
                </label>
                <Input
                  defaultValue={resumeInfo.experience[index].jobTitle} 
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
                  defaultValue={resumeInfo.experience[index].company}
                  onChange={(e) => handleChange(index, e)}
                  required
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
                    defaultValue={resumeInfo.experience[index].startMonth}
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
                    defaultValue={resumeInfo.experience[index].startYear}
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
                    defaultValue={resumeInfo.experience[index].endMonth}
                    onValueChange={(value) =>
                      handleChange(index, value, "endMonth")
                    }
                    name="endMonth"
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
                    defaultValue={resumeInfo.experience[index].endYear}
                    onValueChange={(value) =>
                      handleChange(index, value, "endYear")
                    }
                    name="endYear"
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
            <Textarea defaultValue={resumeInfo.experience[index].description}
                  onChange={(e) => handleChange(index, e)}
                  name="description"
                  placeholder="Enter description"
                  className='mt-2'
                  id="description"
                  />
            
          </div>
          {/* <RichTextEditor
            onRichTextEditorChange={(e) =>
              handleRichTextEditor(e, "description", index)
            }
          /> */}
        </div>
      ))}

      <div className="flex items-center gap-4">
        <Button type="button" onClick={addMoreExperience}>
          Add More Experience
        </Button>
        <Button type="button" onClick={removeExperience}>
          Remove Experience
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
