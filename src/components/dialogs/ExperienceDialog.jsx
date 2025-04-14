import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner"
import { useResume } from "@/context/ResumeInfoContext";
import { PlusCircle, TrashIcon } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useEffect, useState } from "react";

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

export default function ExperienceDialog({ isOpen, onClose }) {
  const { resumeInfo, setResumeInfo } = useResume();
  const [experienceList, setExperienceList] = useState([...resumeInfo.experience]);
  const [openItem, setOpenItem] = useState(null);

  const addMore = () => {
    const newIndex = experienceList.length + 1;
    setExperienceList([...experienceList, formField]);
    setOpenItem(`item-${newIndex}`); // Set the new item as open
  };

  const handleChange = (index, eOrValue, fieldName = null) => {
    setExperienceList(prevList => {
      const newEntries = [...prevList]
      if (typeof eOrValue === 'object' && eOrValue.target) {
        const { name, value } = eOrValue.target
        newEntries[index] = { ...newEntries[index], [name]: value }
      } else if (fieldName) {
        // Handle Select dropdowns
        newEntries[index] = { ...newEntries[index], [fieldName]: eOrValue };
      }

      return newEntries;
    })
  }

  const handleSave = () => {
    setResumeInfo(prev => ({
      ...prev,
      experience: [...experienceList],
    }));
    toast.success(
      <div className="flex items-center gap-2">
        <span>Details Updated</span>
      </div>,
      {
        style: {
          background: "#f0fdf4", // Light green background
          border: "1px solid #bbf7d0", // Light green border
          color: "#166534", // Dark green text
        },
        duration: 2000,
      }
    );
  }


  useEffect(() => {
    console.log(experienceList);
  }, [experienceList])



  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] sm:min-w-[700px] sm:min-h-[550px]">
        <DialogHeader className='border-b pb-3'>
          <DialogTitle>Experience</DialogTitle>
          <DialogDescription>
            Add or edit your work experience.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[400px]">

          <div className="space-y-4">
            <Accordion type="single" collapsible className="w-full" value={openItem}
              onValueChange={setOpenItem}>
              {experienceList.map((item, index) => (
                <AccordionItem value={`item-${index + 1}`} key={index} className='pr-4 py-2 border-0 AccordionItem'>
                  <div className="flex items-center accordion-item-inner">
                    <AccordionTrigger className="AccordionTrigger items-center">
                      <div className="">
                        <h4 className="font-semibold">
                          Backend Developer at Netflix
                        </h4>
                        <p className="text-muted-foreground font-normal">
                          January 2025
                        </p>
                      </div>
                    </AccordionTrigger>
                    <TrashIcon/>
                  </div>
                  <AccordionContent className='pb-0'>
                    <div className="mt-3 space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        {/* Employer & Job Title */}
                        <div className=" space-y-3">
                          <div>
                            <Label>
                              Job Title
                            </Label>
                            <Input defaultValue={item.jobTitle}
                              onChange={(e) => handleChange(index, e)}
                              name="jobTitle" placeholder="e.g. Engineer" className="mt-2" />
                          </div>
                          <div>
                            <Label>
                              Company
                            </Label>
                            <Input defaultValue={item.company}
                              onChange={(e) => handleChange(index, e)}
                              name="company" placeholder="e.g. IBM" className="mt-2" />
                          </div>
                        </div>

                        {/* Start date & End date */}
                        <div className=" space-y-3">
                          {/* Start Date */}
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <p className="mb-2">
                                <Label>
                                  Start date
                                </Label>
                              </p>
                              <Select defaultValue={item.startMonth}
                                onValueChange={(value) =>
                                  handleChange(index, value, "startMonth")
                                }
                                name="startMonth">
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
                                <Label>
                                  &nbsp;
                                </Label>
                              </p>
                              <Select defaultValue={item.startYear}
                                onValueChange={(value) =>
                                  handleChange(index, value, "startYear")
                                } name="startYear">
                                <SelectTrigger>
                                  <SelectValue placeholder="Year" />
                                </SelectTrigger>
                                <SelectContent>
                                  {years.map((year) => (
                                    <SelectItem
                                      key={year}
                                      value={year.toString()}
                                    >
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
                                <Label>
                                  End date
                                </Label>
                              </p>
                              <Select defaultValue={item.endMonth}
                                onValueChange={(value) =>
                                  handleChange(index, value, "endMonth")
                                } name="endMonth">
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
                                <Label>
                                  &nbsp;
                                </Label>
                              </p>
                              <Select defaultValue={item.endYear}
                                onValueChange={(value) =>
                                  handleChange(index, value, "endYear")
                                } name="endYear">
                                <SelectTrigger>
                                  <SelectValue placeholder="Year" />
                                </SelectTrigger>
                                <SelectContent>
                                  {years.map((year) => (
                                    <SelectItem
                                      key={year}
                                      value={year.toString()}
                                    >
                                      {year}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label>
                          Description (Optional)
                        </Label>
                        <Textarea defaultValue={item.description}
                          onChange={(e) => handleChange(index, e)}
                          name="description"
                          placeholder="Add tasks you performed at this job to fill in this section"
                          className="mt-2"
                          id="description"
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <Button variant={"outline"} onClick={addMore} >
              <PlusCircle /> Add another position
            </Button>
          </div>

        </ScrollArea>
        <DialogFooter>
          <Button onClick={handleSave}>Save experience</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
