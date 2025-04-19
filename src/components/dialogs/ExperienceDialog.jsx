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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
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

const formField = {
  jobTitle: '',
  company: '',
  startMonth: '',
  startYear: '',
  endMonth: '',
  endYear: '',
  description: '',
  isNew: true // Add this flag
};

const years = Array.from(
  { length: 50 },
  (_, i) => new Date().getFullYear() - i
);

export default function ExperienceDialog({ isOpen, onClose }) {
  const { resumeInfo, setResumeInfo } = useResume();
  const [experienceList, setExperienceList] = useState([...resumeInfo.experience]);
  const [openItem, setOpenItem] = useState("");
  const [isEditing, setIsEditing] = useState(true)
  const [isAccordionOpen, setIsAccordionOpen] = useState(false)


  const addMore = () => {
    const newIndex = experienceList.length + 1;
    setExperienceList([...experienceList, { ...formField, isNew: true }]);
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
    setExperienceList(prevList => {
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
    setIsEditing(true)
  }

  const deleteThis = (index) => {
    const newList = experienceList.filter((_, i) => i !== index);
    
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
  
    setExperienceList(newList);
    setResumeInfo(prev => ({
      ...prev,
      experience: newList,
    }));
    setIsEditing(false);
  }


  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] sm:min-w-[700px] sm:min-h-[550px] p-0 gap-0">
        <DialogHeader className='border-b px-6 pt-6 pb-3'>
          <DialogTitle>Experience</DialogTitle>
          <DialogDescription>
            Add or edit your work experience.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[450px] pl-6 py-6">

          <div className="space-y-4">
          <Accordion 
            type="single" 
            collapsible 
            className="w-full" 
            value={openItem}
            onValueChange={(value) => {
              // If collapsing an item (value is empty) and it's a new empty item
              if (!value && openItem) {
                const index = parseInt(openItem.split('-')[1]) - 1;
                const item = experienceList[index];
                
                // Check if the item is empty (new and not modified)
                if (item.isNew && !item.jobTitle && !item.company) {
                  deleteThis(index); // Remove the empty item
                  return;
                }
              }
              setOpenItem(value);
            }}
          >
              {experienceList.map((item, index) => (
                <div className="flex gap-2 space-y-3" key={index}>
                  <AccordionItem value={`item-${index + 1}`} className='flex-1 border-0 AccordionItem rounded-lg'>
                    <AccordionTrigger className="AccordionTrigger px-5 items-center">
                      <div className={clsx(item.jobTitle ? "visible" : "invisible")}>
                        <h4 className="font-semibold">
                          {item.jobTitle} {item.company && "at"} {item.company}
                        </h4>
                        <p className="text-muted-foreground font-normal">
                          {item.startMonth} {item.startYear} {(!item.endMonth) && (item.startMonth && item.startYear)?"- current": ""} {item.endMonth && "-"} {item.endMonth} {item.endYear}
                        </p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className='p-5 border-0 outline-0'>
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
                                name="jobTitle" placeholder="e.g. Engineer" className="mt-2 bg-card" />
                            </div>
                            <div>
                              <Label>
                                Company
                              </Label>
                              <Input defaultValue={item.company}
                                onChange={(e) => handleChange(index, e)}
                                name="company" placeholder="e.g. IBM" className="mt-2 bg-card" />
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
                                  <SelectTrigger className='bg-card'>
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
                                  <SelectTrigger className='bg-card'>
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
                                  <SelectTrigger className='bg-card'>
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
                                  <SelectTrigger className='bg-card'>
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
                            className="mt-2 bg-card"
                            id="description"
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <button className="self-start mr-4 mt-5 cursor-pointer text-primary hover:text-primary/70" onClick={() => deleteThis(index)}><TrashIcon size={20} /></button>
                </div>
              ))}
            </Accordion>
            <Button variant={"outline"} onClick={addMore} disabled={isAccordionOpen}>
              <PlusCircle /> Add another position
            </Button>
          </div>

        </ScrollArea>
        <DialogFooter className='px-6 pb-6'>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button onClick={handleSave} disabled={isEditing}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
