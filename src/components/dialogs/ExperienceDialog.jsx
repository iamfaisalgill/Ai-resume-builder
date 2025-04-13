import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { useResume } from "@/context/ResumeInfoContext";
import { PlusCircle } from "lucide-react";
import { Textarea } from "../ui/textarea";

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
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className='p-3 AccordionItem'>
                <AccordionTrigger className="AccordionTrigger">
                  <div>
                    <h4 className="font-semibold">
                      Backend Developer at Netflix
                    </h4>
                    <p className="text-muted-foreground font-normal">
                      January 2025
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="mt-3 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Employer & Job Title */}
                      <div>
                        <div>
                          <label className="text-sm font-medium tracking-wider">
                            Job Title
                          </label>
                          <Input placeholder="e.g. Engineer" className="mt-2" />
                        </div>
                        <div>
                          <label className="text-sm font-medium tracking-wider">
                            Company
                          </label>
                          <Input placeholder="e.g. IBM" className="mt-2" />
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
                            <Select name="startMonth">
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
                            <Select name="startYear">
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
                              <label className="text-sm font-medium tracking-wider">
                                End date
                              </label>
                            </p>
                            <Select name="endMonth">
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
                            <Select name="endYear">
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
                      <label className="text-sm font-medium tracking-wider">
                        Description (Optional)
                      </label>
                      <Textarea
                        placeholder="Enter description"
                        className="mt-2"
                        id="description"
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Button variant={"outline"}>
              <PlusCircle /> Add another position
            </Button>
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button type="submit">Save experience</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
