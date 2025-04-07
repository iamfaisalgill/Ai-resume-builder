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
  MinusCircle,
  PlusCircle,
} from "lucide-react";
import React, { useEffect, useState } from "react";

const formField = {
  language: "",
  proficiency: "",
  certification: "",
  yearsOfExperience: "",
};

const Languages = () => {
  const { resumeInfo, setResumeInfo } = useResume();
  const [languageList, setLanguageList] = useState(
    resumeInfo.languages.length>0 ? resumeInfo.languages : [formField]
  );
  const [loading, setLoading] = useState(false)

  const addMore = () => {
    setLanguageList([...languageList, formField]);
    setResumeInfo((prev) => {
      const newLanguages = [...prev.languages];
      if (newLanguages.length > 0) {
        newLanguages.push(formField);
      }
      return { ...prev, languages: newLanguages };
    });
  };

  const removeLang = () => {
    setLanguageList(languageList.slice(0, -1));
    setResumeInfo((prev) => {
      const newLanguages = [...prev.languages];
      if (newLanguages.length > 1) {
        newLanguages.pop();
      }
      return { ...prev, languages: newLanguages };
    });
  };

  const handleChange = (index, eOrValue, fieldName = null) => {
    setLanguageList((prev) => {
      const newEntries = [...prev];
      if (typeof eOrValue === "object" && eOrValue.target) {
        const { name, value } = eOrValue.target;
        newEntries[index] = { ...newEntries[index], [name]: value };
      } else if (fieldName) {
        newEntries[index] = { ...newEntries[index], [fieldName]: eOrValue };
      }
      return newEntries;
    });
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true)
    await new Promise(resolve=>setTimeout(resolve, 1000))

    setResumeInfo((prev) => ({ ...prev, languages: languageList }));
    setLoading(false)
  };

  return (
    <form className="space-y-4" onSubmit={onSave}>
      <div>
        <h2 className="text-2xl font-semibold">Languages</h2>
        <p className="lead">
          List the languages you speak and indicate your proficiency level for
          each.
        </p>
      </div>

      <div className="space-y-6">
        {resumeInfo.languages.map((item, index) => (
          <div className="space-y-4 p-4 border rounded-lg" key={index}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium tracking-wider">
                  Language
                </label>
                <Input
                  className="mt-2"
                  name="language"
                  placeholder="e.g., Spanish"
                  onChange={(e) => handleChange(index, e)}
                  defaultValue={item.language}
                />
              </div>
              <div>
                <label className="text-sm font-medium tracking-wider">
                  Proficiency Level
                </label>
                <Select
                  onValueChange={(value) =>
                    handleChange(index, value, "proficiency")
                  }
                  defaultValue={item.proficiency}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select proficiency" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Native",
                      "Fluent",
                      "Advanced",
                      "Intermediate",
                      "Basic",
                      "Elementary",
                    ].map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="text-sm font-medium tracking-wider">
                  Certification (Optional)
                </label>
                <Input
                  className="mt-2"
                  name="certification"
                  placeholder="e.g., DELE B2"
                  onChange={(e) => handleChange(index, e)}
                  defaultValue={item.certification}
                />
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium tracking-wider">
                  Years of Experience (Optional)
                </label>
                <Input
                  className="mt-2"
                  type="number"
                  placeholder="e.g., 5"
                  min="0"
                  onChange={(e) => handleChange(index, e)}
                  name="yearsOfExperience"
                  defaultValue={item.yearsOfExperience}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <Button type="button" variant="default" onClick={addMore}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Another Language
        </Button>
        <Button variant={"outline"} type="button" onClick={removeLang}>
          <MinusCircle className="mr-2 h-4 w-4" /> Remove This Language
        </Button>
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="link" size="lg">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button type="submit" size="lg">
          Next: References <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};

export default Languages;
