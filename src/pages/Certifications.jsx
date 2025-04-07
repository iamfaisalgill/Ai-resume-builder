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
  name: "",
  organization: "",
  issueMonth: "",
  issueYear: "",
};

const Certifications = () => {
  const { resumeInfo, setResumeInfo } = useResume();
  const [certificationList, setCertificationList] = useState(
    resumeInfo.certifications?.length ? resumeInfo.certifications : [formField]
  );

  const addMore = () => {
    const newList = [...certificationList, formField];
    setCertificationList(newList);
    setResumeInfo(prev => ({ ...prev, certifications: newList }));
  };

  const removeMore = () => {
    if (certificationList.length <= 1) return;
    const newList = certificationList.slice(0, -1);
    setCertificationList(newList);
    setResumeInfo(prev => ({ ...prev, certifications: newList }));
  };

  const handleChange = (index, eOrValue, fieldName = null) => {
    setCertificationList((prev) => {
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
  useEffect(() => {
    console.log(certificationList);
  }, [certificationList]);

  const onSave = (e) => {
    e.preventDefault();
    setResumeInfo((prev) => ({ ...prev, certifications: certificationList }));
  };

  return (
    <form className="space-y-4" onSubmit={onSave}>
      <div>
        <h2 className="text-2xl font-semibold">Certifications</h2>
        <p className="lead">
          List your professional certifications, including the certifying
          organization and certification name.
        </p>
      </div>

      <div className="space-y-6">
        {/* Certification Entry */}

        {certificationList.map((item, index) => (
          <div className="space-y-4 p-4 border rounded-lg" key={index}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium tracking-wider">
                  Certification Name
                </label>
                <Input
                  onChange={(e) => handleChange(index, e)}
                  defaultValue={item.name}
                  name="name"
                  className="mt-2"
                  placeholder="e.g., AWS Certified Solutions Architect"
                />
              </div>
              <div>
                <label className="text-sm font-medium tracking-wider">
                  Issuing Organization
                </label>
                <Input
                  onChange={(e) => handleChange(index, e)}
                  defaultValue={item.organization}
                  name="organization"
                  className="mt-2"
                  placeholder="e.g., Amazon Web Services"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium tracking-wider">
                  Issue Month
                </label>
                <Select
                  onValueChange={(value) =>
                    handleChange(index, value, "issueMonth")
                  }
                  defaultValue={item.issueMonth}
                >
                  <SelectTrigger className="mt-2">
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
              </div>
              <div>
                <label className="text-sm font-medium tracking-wider">
                  Issue Year
                </label>
                <Select
                  onValueChange={(value) =>
                    handleChange(index, value, "issueYear")
                  }
                  defaultValue={item.issueYear}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from(
                      { length: 20 },
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
      </div>

      <div className="flex items-center gap-4">
        <Button type="button" variant="default" onClick={addMore}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Another Certification
        </Button>
        <Button variant={"outline"} type="button" onClick={removeMore}>
          <MinusCircle className="mr-2 h-4 w-4" /> Remove This Certification
        </Button>
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="link" size="lg">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button type="submit" size="lg">
          Next: Skills <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};

export default Certifications;
