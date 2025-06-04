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
import { toast } from "sonner";
import { useResume } from "@/context/ResumeInfoContext";
import { BrainCircuit, Loader2, Pencil, Trash2, TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Checkbox } from "../ui/checkbox";
import RichTextEditor from "../RichTextEditor";
import { generateExperienceDescriptions } from "@/services/geminiService";

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
  present: false,
  isNew: true, // Add this flag
};

const years = Array.from(
  { length: 50 },
  (_, i) => new Date().getFullYear() - i
);

export default function ExperienceDialog({ isOpen, onClose }) {
  const { resumeInfo, setResumeInfo } = useResume();
  const [experienceList, setExperienceList] = useState([
    ...resumeInfo.experience,
  ]);
  const [openItem, setOpenItem] = useState("");
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  // const [isEditing, setIsEditing] = useState(true)
  const [isPresent, setIsPresent] = useState(false);

  const addMore = () => {
    const newIndex = experienceList.length + 1;
    setExperienceList([...experienceList, { ...formField, isNew: true }]);
    setOpenItem(`item-${newIndex}`);
  };

  useEffect(() => {
    if (openItem === "") {
      setIsAccordionOpen(false);
    } else {
      setIsAccordionOpen(true);
    }
  }, [openItem]);

  const hasChanges = () => {
    if (experienceList.length !== resumeInfo.experience.length) {
      return true;
    }

    // fix changes now updating in description

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
        // Add any other fields you want to compare
      );
    });
  };

  const handleChange = (index, eOrValue, fieldName = null) => {
    setExperienceList((prevList) => {
      const newEntries = [...prevList];
      if (typeof eOrValue === "object" && eOrValue.target) {
        const { name, value } = eOrValue.target;
        newEntries[index] = {
          ...newEntries[index],
          [name]: value,
          isNew: false,
        };
      } else if (fieldName) {
        newEntries[index] = {
          ...newEntries[index],
          [fieldName]: eOrValue,
          isNew: false,
        };
      }
      return newEntries;
    });
    // setIsEditing(false);
  };

  const handleRichTextEditor = (e, name, index) => {
    setExperienceList((prevList) => {
      const newEntries = [...prevList];
      newEntries[index] = { ...newEntries[index], [name]: e.target.value };
      return newEntries;
    });
  };

  const handleSave = () => {
    setResumeInfo((prev) => ({
      ...prev,
      experience: [...experienceList],
    }));
    toast.info("Experience Updated");
    onClose();
  };

  const deleteThis = (index) => {
    const newList = experienceList.filter((_, i) => i !== index);

    // Handle openItem state
    if (openItem === `item-${index + 1}`) {
      // If we're deleting the currently open item, close it
      setOpenItem("");
    } else if (openItem) {
      // If we're deleting an item before the open one, adjust the openItem index
      const openIndex = parseInt(openItem.split("-")[1]);
      if (index < openIndex - 1) {
        setOpenItem(`item-${openIndex - 1}`);
      }
    }

    setExperienceList(newList);
    /*setResumeInfo(prev => ({
      ...prev,
      experience: newList,
    }));*/
  };

  useEffect(() => {
    if (
      experienceList.length > 0 &&
      !experienceList[0].jobTitle &&
      !experienceList[0].company
    ) {
      setOpenItem("item-1");
    }
  }, []);

  // Generate Experience bulletpoints from AI
  const [loader, setLoader] = useState(false);
  const generateDesc = async (title, index) => {
    try {
      if (!title) {
        toast.error("Please enter jobtitle");
        return;
      }
      setLoader(true);
      const results = await generateExperienceDescriptions(title);
      setLoader(false);
      console.log(results);
      setExperienceList((prevList) => {
        const newEntries = [...prevList];
        newEntries[index] = {
          ...newEntries[index],
          description: results.trim(),
        };
        return newEntries;
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] sm:min-w-[700px] sm:min-h-[550px] p-0 gap-0">
        <DialogHeader className="border-b px-6 pt-6 pb-3">
          <DialogTitle>Experience</DialogTitle>
          <DialogDescription>
            Add or edit your work experience.
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
                // If collapsing an item (value is empty)
                if (!value && openItem) {
                  const index = parseInt(openItem.split("-")[1]) - 1;
                  const item = experienceList[index];

                  // Check if the item is empty (either new or with no data)
                  const isEmpty = !item.jobTitle && !item.company;

                  if (isEmpty) {
                    deleteThis(index); // Remove the empty item
                    return;
                  }
                }
                setOpenItem(value);
              }}
            >
              {experienceList.map((item, index) => (
                <div
                  className="flex gap-1 md:gap-2 space-y-2 md:space-y-3"
                  key={index}
                >
                  <AccordionItem
                    value={`item-${index + 1}`}
                    className="flex-1 border-0 AccordionItem rounded-lg"
                  >
                    <AccordionTrigger className="AccordionTrigger px-3 md:px-5 items-center">
                      <div
                        className={clsx(
                          item.jobTitle ? "visible" : "invisible"
                        )}
                      >
                        <h4 className="text-sm md:text-base font-semibold">
                          {item.jobTitle} {item.company && "at"} {item.company}
                        </h4>
                        <p className="text-xs md:text-sm text-muted-foreground font-normal">
                          <>
                            {(item.startMonth || item.startYear) && (
                              <>
                                {item.startMonth} {item.startYear}
                              </>
                            )}
                            {item.present && (
                              <>
                                {item.startMonth || item.startYear
                                  ? " - current"
                                  : "current"}
                              </>
                            )}
                            {item.endMonth && (
                              <>
                                {" "}
                                - {item.endMonth} {item.endYear}
                              </>
                            )}
                            {!item.present &&
                              item.endYear &&
                              !item.endMonth && <> - {item.endYear}</>}
                          </>
                        </p>
                      </div>
                      {/* <div className="flex items-center">
                        <Pencil
            className="text-primary pointer-events-none size-[18px] transition-transform duration-200" size={18} />
            <button
                      className="ml-2 cursor-pointer text-destructive hover:text-primary/70"
                      // onClick={() => deleteThis(index)}
                    >
                      <Trash2 size={18} />
                    </button>
                      </div> */}
                    </AccordionTrigger>
                    <AccordionContent className="p-3 md:p-5 border-0 outline-0">
                      <div className="mt-2 md:mt-3 space-y-4 md:space-y-6">
                        <div className="grid grid-cols-1 gap-3 md:gap-4">
                          {/* Employer & Job Title */}
                          <div className="space-y-2 md:space-y-3">
                            <div>
                              <Label className="text-sm md:text-base">
                                Job Title
                              </Label>
                              <Input
                                defaultValue={item.jobTitle}
                                onChange={(e) => handleChange(index, e)}
                                name="jobTitle"
                                placeholder="e.g. Engineer"
                                className="mt-1 md:mt-2 bg-card text-sm md:text-base"
                              />
                            </div>
                            <div>
                              <Label className="text-sm md:text-base">
                                Company
                              </Label>
                              <Input
                                defaultValue={item.company}
                                onChange={(e) => handleChange(index, e)}
                                name="company"
                                placeholder="e.g. IBM"
                                className="mt-1 md:mt-2 bg-card text-sm md:text-base"
                              />
                            </div>
                          </div>

                          {/* Start date & End date */}
                          <div className="space-y-2 md:space-y-3">
                            {/* Start Date */}
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <p className="mb-1 md:mb-2">
                                  <Label className="text-sm md:text-base">
                                    Start date
                                  </Label>
                                </p>
                                <Select
                                  defaultValue={item.startMonth}
                                  onValueChange={(value) =>
                                    handleChange(index, value, "startMonth")
                                  }
                                  name="startMonth"
                                >
                                  <SelectTrigger className="bg-card text-sm md:text-base">
                                    <SelectValue placeholder="Month" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {months.map((month) => (
                                      <SelectItem
                                        key={month}
                                        value={month}
                                        className="text-sm md:text-base"
                                      >
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
                                  defaultValue={item.startYear}
                                  onValueChange={(value) =>
                                    handleChange(index, value, "startYear")
                                  }
                                  name="startYear"
                                >
                                  <SelectTrigger className="bg-card text-sm md:text-base">
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

                            {/* End Date */}
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <p className="mb-1 md:mb-2">
                                  <Label className="text-sm md:text-base">
                                    End date
                                  </Label>
                                </p>
                                <Select
                                  defaultValue={item.endMonth}
                                  onValueChange={(value) =>
                                    handleChange(index, value, "endMonth")
                                  }
                                  name="endMonth"
                                  disabled={item.present}
                                >
                                  <SelectTrigger className="bg-card text-sm md:text-base">
                                    <SelectValue placeholder="Month" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {months.map((month) => (
                                      <SelectItem
                                        key={month}
                                        value={month}
                                        className="text-sm md:text-base"
                                      >
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
                                  defaultValue={item.endYear}
                                  onValueChange={(value) =>
                                    handleChange(index, value, "endYear")
                                  }
                                  name="endYear"
                                  disabled={item.present}
                                >
                                  <SelectTrigger className="bg-card text-sm md:text-base">
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
                            <Label className="text-sm md:text-base">
                              <Checkbox
                                checked={item.present}
                                onCheckedChange={(value) =>
                                  handleChange(index, value, "present")
                                }
                                className="h-4 w-4"
                              />{" "}
                              I currently work here
                            </Label>
                          </div>
                        </div>

                        {/* Description */}
                        <div>
                          <div className="flex justify-between items-center mb-1 md:mb-2">
                            <Label className="text-sm md:text-base">
                              Description (Optional)
                            </Label>
                            <Button
                              variant={"outline"}
                              type="button"
                              size={"sm"}
                              onClick={() => generateDesc(item.jobTitle, index)}
                              disabled={loader}
                            >
                              {loader ? (
                                <Loader2 className="animate-spin" />
                              ) : (
                                <BrainCircuit />
                              )}
                              Generate from AI
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
              className="text-sm"
              size="sm"
            >
              + Add Experience
            </Button>
          </div>
        </ScrollArea>
        <DialogFooter className="border-t px-6 py-3">
          <DialogClose asChild>
            <Button type="button" variant="secondary" size="sm">
              Close
            </Button>
          </DialogClose>
          <Button size="sm" onClick={handleSave} disabled={!hasChanges()}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
