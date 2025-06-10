import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMediaQuery, useResume } from "@/context/ResumeInfoContext";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  MinusCircle,
  PlusCircle,
  Trash2,
} from "lucide-react";
import React, { useEffect, useState } from "react";

const formField = {
  institution: "",
  degree: "",
  graduationMonth: "",
  graduationYear: "",
};

const Education = ({ setPageIndex }) => {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useResume();
  const [educationList, setEducationList] = useState(
    resumeInfo.education?.length ? resumeInfo.education : [formField]
  );
   const isMobile = useMediaQuery('(max-width: 768px)');

  const handleGoBack = () => {
    setPageIndex(2);
  };

  const handleChange = (index, eOrValue, fieldName = null) => {
    setEducationList((prevInfo) => {
      const newEntries = [...prevInfo];
      if (typeof eOrValue === "object" && eOrValue.target) {
        const { name, value } = eOrValue.target;
        newEntries[index] = { ...newEntries[index], [name]: value };
      } else if (fieldName) {
        newEntries[index] = { ...newEntries[index], [fieldName]: eOrValue };
      }
      return newEntries;
    });
  };

  const addMoreEducation = () => {
    setEducationList([...educationList, formField]);
  };

  const deleteThis = (index) => {
    const newList = educationList.filter((_, i) => i !== index);
    setEducationList(newList);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (hasChanges()) {
    await new Promise(resolve => setTimeout(resolve, 1000));
  } else {
    await new Promise(resolve => resolve());
  }

    setResumeInfo({ ...resumeInfo, education: [...educationList] });

    setLoading(false);
    setPageIndex(prev=>prev+1);
  };

   const hasChanges = () => {
    if (educationList.length !== resumeInfo.education?.length) {
      return true;
    }

    return educationList.some((exp, index) => {
      const originalEdu = resumeInfo.education[index];
      if (!originalEdu) return true;

      return (
        exp.institution !== originalEdu.institution ||
        exp.degree !== originalEdu.degree ||
        exp.graduationMonth !== originalEdu.graduationMonth ||
        exp.graduation !== originalEdu.graduation 
        
      );
    });
  };

  return (
    <form onSubmit={handleSave} className="space-y-4 md:space-y-9">
      <div className="max-sm:text-center">
        <h2 className="text-xl md:text-2xl font-semibold">Education</h2>
        <p className="text-sm md:text-base text-muted-foreground">
          Add information about your educational background.
        </p>
      </div>
      {educationList.map((item, index) => (
        <div className="space-y-4 p-3 md:p-4 border rounded-lg" key={index}>
          <div className="flex justify-between items-center">
            <h3 className="text-primary text-sm md:text-base">#{index + 1}</h3>
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
          <div>
            <div className="grid grid-cols-2 gap-4">
              <div className="">
                <Label>
                  School Name
                </Label>
                <Input
                  onChange={(e) => handleChange(index, e)}
                  value={item.institution}
                  name="institution"
                  className="mt-2 max-sm:text-sm max-sm:h-9"
                  placeholder="Enter school name"
                />
              </div>
              <div className="mb-4">
                <Label>
                  Degree
                </Label>
                <Input
                  onChange={(e) => handleChange(index, e)}
                  value={item.degree}
                  name="degree"
                  className="mt-2 max-sm:text-sm max-sm:h-9"
                  placeholder="Enter degree"
                />
              </div>
            </div>
  
            <div>
              <Label>
                Graduation Date
              </Label>
              <div className="grid grid-cols-2 gap-4 my-2">
                <Select
                  onValueChange={(value) =>
                    handleChange(index, value, "graduationMonth")
                  }
                  value={item.graduationMonth}
                  
                >
                  <SelectTrigger className="max-sm:text-sm max-sm:!h-9">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
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
                    ].map((month) => (
                      <SelectItem key={month} value={month}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  onValueChange={(value) =>
                    handleChange(index, value, "graduationYear")
                  }
                  value={item.graduationYear}
                >
                  <SelectTrigger className="max-sm:text-sm max-sm:!h-9">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from(
                      { length: 50 },
                      (_, i) => new Date().getFullYear() - i
                    ).map((year) => (
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
      ))}
      <Button
        type="button"
        variant={"outline"}
        onClick={addMoreEducation}
        className="w-full border-2 border-dashed max-sm:mb-18"
      >
        + Add More Education
      </Button>
      <div className='max-sm:fixed max-sm:bottom-0 max-sm:right-0 max-sm:bg-background max-sm:p-5 max-sm:border-t w-full flex justify-between'>
                    <Button onClick={handleGoBack} type="button" variant="ghost" size={isMobile?"sm" : "lg"} className="cursor-pointer"><ChevronLeft /> Back</Button>
                    <Button disabled={loading} type="submit" size={isMobile?"sm" : "lg"} className="cursor-pointer">
                      {loading && <Loader2 className="animate-spin" />}
                      Next: Skills <ChevronRight /></Button>
                  </div>
    </form>
  );
};

export default Education;
