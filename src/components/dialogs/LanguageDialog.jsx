import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import {
  ChevronLeft,
  ChevronRight,
  MinusCircle,
  PlusCircle,
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { Card, CardContent } from "@/components/ui/card";
  import { Badge } from "@/components/ui/badge";
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import { Button } from "@/components/ui/button"
import { useResume } from "@/context/ResumeInfoContext"
import { useEffect, useRef, useState } from "react"
import { Pencil, Trash } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { toast } from "sonner"


const formField = {
    language: "",
    proficiency: "",
    certification: "",
    yearsOfExperience: "",
  };

export default function LanguageDialog({ isOpen, onClose }) {

   const {resumeInfo, setResumeInfo} = useResume()  
    
    const [languageList, setLanguageList] = useState(
        resumeInfo.languages.length>0 ? resumeInfo.languages : [formField]
      );
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
    
      const handleSave = () => {
        setResumeInfo((prev) => ({ ...prev, languages: languageList }));
      };
    

    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-[640px]">
          <DialogHeader>
            <DialogTitle>Languages</DialogTitle>
            <DialogDescription>
              Add or edit your Languages.
            </DialogDescription>
          </DialogHeader>
          <div className='space-y-9'>
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
          </div>
          <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
            <Button type="submit" onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }