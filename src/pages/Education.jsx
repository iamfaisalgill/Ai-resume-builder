import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useResume } from "@/context/ResumeInfoContext";
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
    <form onSubmit={handleSave} className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold">Education</h2>
        <p className="lead">
          Start with your most recent education and work backwards, including
          the degree/certification, institution's name and location, and year of
          completion.
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
          <div className="grid grid-cols-2 gap-4">
            <div className="my-4 mt-8">
              <label className="text-sm font-medium tracking-wider">
                School Name
              </label>
              <Input
                onChange={(e) => handleChange(index, e)}
                value={item.institution}
                name="institution"
                className="mt-2"
                placeholder="Enter school name"
              />
            </div>
            <div className="mb-4 mt-8">
              <label className="text-sm font-medium tracking-wider">
                Degree
              </label>
              <Input
                onChange={(e) => handleChange(index, e)}
                value={item.degree}
                name="degree"
                className="mt-2"
                placeholder="Enter degree"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium tracking-wider">
              Graduation Date
            </label>
            <div className="grid grid-cols-2 gap-4 my-2">
              <Select
                onValueChange={(value) =>
                  handleChange(index, value, "graduationMonth")
                }
                value={item.graduationMonth}
              >
                <SelectTrigger>
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
                <SelectTrigger>
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
      ))}
      <Button
        type="button"
        variant={"outline"}
        onClick={addMoreEducation}
        className="w-full border-2 border-dashed"
      >
        + Add More Education
      </Button>
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
        <Button
          disabled={loading}
          type="submit"
          size="lg"
          className="cursor-pointer"
        >
          {loading && <Loader2 className="animate-spin" />}
          Next: Education <ChevronRight />
        </Button>
      </div>
    </form>
  );
};

export default Education;
