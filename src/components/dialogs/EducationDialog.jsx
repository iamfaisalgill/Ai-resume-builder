import {
  Dialog,
  DialogClose,
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
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "sonner"
import { useResume } from "@/context/ResumeInfoContext";
import { PlusCircle, TrashIcon } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useEffect, useState } from "react";
import clsx from "clsx";


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

const years = Array.from(
  { length: 50 },
  (_, i) => new Date().getFullYear() - i
);

const formField = {
  institution: "",
  degree: "",
  graduationMonth: "",
  graduationYear: "",
  fieldOfStudy: "",
  isNew: true
}

const EducationDialog = ({ isOpen, onClose }) => {

  const { resumeInfo, setResumeInfo } = useResume();
  const [EducationList, setEducationList] = useState(
    resumeInfo?.education?.length ? [...resumeInfo.education] : []
  );
  const [openItem, setOpenItem] = useState("");
  const [isEditing, setIsEditing] = useState(true)
  const [isAccordionOpen, setIsAccordionOpen] = useState(false)
  const [date, setDate] = useState(new Date())

  const addMore = () => {
    const newIndex = EducationList.length + 1;
    setEducationList([...EducationList, { ...formField, isNew: true }]);
    setOpenItem(`item-${newIndex}`);
  };

  useEffect(() => {
    if (openItem === "") {
      setIsAccordionOpen(false)
    } else {
      setIsAccordionOpen(true)
    }
  }, [openItem])

  const handleChange = (index, eOrValue, fieldName = null) => {
    setEducationList(prevList => {
      const newEntries = [...prevList];
      if (typeof eOrValue === 'object' && eOrValue.target) {
        const { name, value } = eOrValue.target;
        newEntries[index] = { ...newEntries[index], [name]: value, isNew: false };
      } else if (fieldName) {
        newEntries[index] = { ...newEntries[index], [fieldName]: eOrValue, isNew: false };
      }
      return newEntries;
    });
    setIsEditing(false);
  }

  const hasChanges = () => {
    if (EducationList.length !== resumeInfo.education.length) {
      return true;
    }

    return EducationList.some((edu, index) => {
      const originalEdu = resumeInfo.education[index];
      if (!originalEdu) return true;

      return (
        edu.institution !== originalEdu.institution ||
        edu.degree !== originalEdu.degree ||
        edu.fieldOfStudy !== originalEdu.fieldOfStudy ||
        edu.graduationMonth !== originalEdu.graduationMonth ||
        edu.graduationYear !== originalEdu.graduationYear
      );
    });
  };

  // institution: "",
  // degree: "",
  // graduationMonth: "",
  // graduationYear: "",
  // fieldOfStudy: "",

  const handleSave = () => {
    setResumeInfo(prev => ({
      ...prev,
      education: [...EducationList],
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
    setIsEditing(true)
  }

  const deleteThis = (index) => {
    const newList = EducationList.filter((_, i) => i !== index);

    // Handle openItem state
    if (openItem === `item-${index + 1}`) {
      // If we're deleting the currently open item, close it
      setOpenItem("");
    } else if (openItem) {
      // If we're deleting an item before the open one, adjust the openItem index
      const openIndex = parseInt(openItem.split('-')[1]);
      if (index < openIndex - 1) {
        setOpenItem(`item-${openIndex - 1}`);
      }
    }

    setEducationList(newList);
    setResumeInfo(prev => ({
      ...prev,
      education: newList,
    }));
    setIsEditing(false);
  }

  useEffect(() => {
    if (EducationList.length > 0 && (!EducationList[0].institution && !EducationList[0].degree)) {
      setOpenItem("item-1");
    }
  }, []);


  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] sm:min-w-[700px] sm:min-h-[550px] p-0 gap-0">
        <DialogHeader className='border-b px-6 pt-6 pb-3'>
          <DialogTitle>Education</DialogTitle>
          <DialogDescription>
            Add or edit your education.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[450px] pl-3 md:pl-6 py-3 md:py-6">
          <div className="space-y-3 md:space-y-4">
            <Accordion
              type="single"
              collapsible
              className="w-full"
              value={openItem}
              onValueChange={(value) => {
                // If collapsing an item (value is empty) and it's a new empty item
                if (!value && openItem) {
                  const index = parseInt(openItem.split('-')[1]) - 1;
                  const item = EducationList[index];

                  // Check if the item is empty (new and not modified)
                  if (item.isNew && !item.jobTitle && !item.company) {
                    deleteThis(index); // Remove the empty item
                    return;
                  }
                }
                setOpenItem(value);
              }}
            >
              {EducationList.map((item, index) => (
                <div className="flex gap-1 md:gap-2 space-y-2 md:space-y-3" key={index}>
                  <AccordionItem value={`item-${index + 1}`} className='flex-1 border-0 AccordionItem rounded-lg'>
                    <AccordionTrigger className="AccordionTrigger px-3 md:px-5 items-center">
                      <div className={clsx(item.institution ? "visible" : "invisible")}>
                        <h4 className="text-sm md:text-base font-semibold">
                          {item.institution}
                        </h4>
                        <p className="text-xs md:text-sm text-muted-foreground font-normal">
                          {item.degree}{item.graduationMonth && ","} {item.graduationMonth} {item.graduationYear}
                        </p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className='p-3 md:p-5 border-0 outline-0'>
                      <div className="mt-2 md:mt-3 space-y-3 md:space-y-4">
                        <div className="grid grid-cols-1 gap-3 md:gap-4">
                          {/* School name*/}
                          <div className="grid grid-cols-2 gap-2">
                            <div className="col-span-2">
                              <Label className="text-sm md:text-base">
                                School name
                              </Label>
                              <Input
                                defaultValue={item.institution}
                                onChange={(e) => handleChange(index, e)}
                                name="institution"
                                placeholder="E.g. Harvard University"
                                className="mt-1 md:mt-2 bg-card text-sm md:text-base"
                              />
                            </div>
                          </div>

                          {/* Field of study & graduation */}
                          <div className="space-y-2 md:space-y-3">
                            {/* Field of study & degree  */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              <div>
                                <Label className="text-sm md:text-base">
                                  Degree
                                </Label>
                                <Input
                                  defaultValue={item.degree}
                                  onChange={(e) => handleChange(index, e)}
                                  name="degree"
                                  placeholder="E.g. Master of Science (M.S)"
                                  className="mt-1 md:mt-2 bg-card text-sm md:text-base"
                                />
                              </div>

                              <div>
                                <Label className="text-sm md:text-base">
                                  Field of study
                                </Label>
                                <Input
                                  defaultValue={item.fieldOfStudy}
                                  onChange={(e) => handleChange(index, e)}
                                  name="fieldOfStudy"
                                  placeholder="E.g. Computer Science"
                                  className="mt-1 md:mt-2 bg-card text-sm md:text-base"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Graduation date */}
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <p className="mb-1 md:mb-2">
                                <Label className="text-sm md:text-base">
                                  Graduation date
                                </Label>
                              </p>
                              <Select
                                defaultValue={item.graduationMonth}
                                onValueChange={(value) =>
                                  handleChange(index, value, "graduationMonth")
                                }
                                name="graduationMonth">
                                <SelectTrigger className='bg-card text-sm md:text-base'>
                                  <SelectValue placeholder="Month" />
                                </SelectTrigger>
                                <SelectContent>
                                  {months.map((month) => (
                                    <SelectItem key={month} value={month} className="text-sm md:text-base">
                                      {month}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <p className="mb-1 md:mb-2">
                                <Label className="text-sm md:text-base">
                                  &nbsp;
                                </Label>
                              </p>
                              <Select
                                defaultValue={item.graduationYear}
                                onValueChange={(value) =>
                                  handleChange(index, value, "graduationYear")
                                }
                                name="graduationYear">
                                <SelectTrigger className='bg-card text-sm md:text-base'>
                                  <SelectValue placeholder="Year" />
                                </SelectTrigger>
                                <SelectContent>
                                  {years.map((year) => (
                                    <SelectItem
                                      key={year}
                                      value={year.toString()}
                                      className="text-sm md:text-base"
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
                    </AccordionContent>
                  </AccordionItem>
                  <button
                    className="self-start mr-2 md:mr-4 mt-3 md:mt-5 cursor-pointer text-primary hover:text-primary/70"
                    onClick={() => deleteThis(index)}
                  >
                    <TrashIcon size={18} />
                  </button>
                </div>
              ))}
            </Accordion>
            <Button
              variant={"ghost"}
              onClick={addMore}
              disabled={isAccordionOpen}
              className="text-sm md:text-base"
            >
              + Add another position
            </Button>
          </div>
        </ScrollArea>
        <DialogFooter className='px-6 pb-6'>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button onClick={handleSave} disabled={!hasChanges()}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EducationDialog
