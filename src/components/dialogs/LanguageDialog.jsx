import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useResume } from "@/context/ResumeInfoContext";
import { useEffect, useState } from "react";
import { TrashIcon } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { toast } from "sonner";
import { Separator } from "../ui/separator";

const formField = {
  language: "",
  proficiency: "",
};

export default function LanguageDialog({ isOpen, onClose }) {
  const { resumeInfo, setResumeInfo } = useResume();

  // Initialize safely
  const [languageList, setLanguageList] = useState(resumeInfo.languages? resumeInfo.languages: [formField]);

  // Ensure resumeInfo.languages exists
  /*useEffect(() => {
    if (!Array.isArray(resumeInfo.languages)) {
      setResumeInfo((prev) => ({ ...prev, languages: [formField] }));
    }
  }, []);*/

  const addMore = () => {
    setLanguageList([...languageList, {
      language: "",
      proficiency: "",
    }]);
  };

  const deleteThis = (index) => {
    const newList = languageList.filter((_, i) => i !== index);
    setLanguageList(newList);
    setResumeInfo((prev) => ({
      ...prev,
      languages: newList,
    }));
  };

  const handleChange = (index, eOrValue, fieldName = null) => {
    setLanguageList((prevList) => {
      const updatedList = [...prevList];
      if (typeof eOrValue === "object" && eOrValue.target) {
        const { name, value } = eOrValue.target;
        updatedList[index] = {...updatedList[index], [name]: value }
      } else if (fieldName) {
        updatedList[index] = {...updatedList[index], [fieldName]: eOrValue }
      }
      return updatedList;
    });
  };

  const haschanges = () => {
    if (languageList.length !== resumeInfo.languages.length){
      return true
    }

      return languageList.some((lang,index)=>{
        const originalLang = resumeInfo.languages[index]
        if (!originalLang) return true;

        return (
          lang.language !== originalLang.language ||
          lang.proficiency !== originalLang.proficiency
      )
      })
  }


  const handleSave = () => {
    setResumeInfo((prev) => ({
      ...prev,
      languages: [...languageList],
    }));

    toast.success("Details Updated", {
      style: {
        background: "#f0fdf4",
        border: "1px solid #bbf7d0",
        color: "#166534",
      },
      duration: 2000,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] sm:min-w-[700px] sm:min-h-[550px] p-0 gap-0">
        <DialogHeader className="border-b px-6 pt-6 pb-3">
          <DialogTitle>Languages</DialogTitle>
          <DialogDescription>Add or edit your Languages.</DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[450px] p-3 md:p-6">
  {languageList.map((item, index) => (
    <div key={index}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
        <div>
          <label className="text-xs md:text-sm font-medium tracking-wider">
            Language
          </label>
          <Input
            className="mt-1 md:mt-2 text-sm md:text-base"
            name="language"
            placeholder="e.g., Spanish"
            value={item.language}
            onChange={(e) => handleChange(index, e)}
          />
        </div>

        <div className="flex gap-2 md:gap-4 items-center">
          <div className="flex-1">
            <label className="text-xs md:text-sm font-medium tracking-wider">
              Proficiency Level
            </label>
            <Select
              value={item.proficiency}
              onValueChange={(value) =>
                handleChange(index, value, "proficiency")
              }
            >
              <SelectTrigger className="mt-1 md:mt-2 text-sm md:text-base">
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
                  <SelectItem key={level} value={level} className="text-sm md:text-base">
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <button
            className="mr-2 md:mr-4 mt-5 cursor-pointer text-primary hover:text-primary/70"
            onClick={() => deleteThis(index)}
          >
            <TrashIcon size={18} />
          </button>
        </div>
      </div>
      
      {/* Separator - only show between items, not after last one */}
      {index < languageList.length - 1 && (
        <Separator className="my-3 md:my-4 bg-border" />
      )}
    </div>
  ))}
  <Button 
    variant="ghost" 
    onClick={addMore} 
    className="mt-1 md:mt-2 text-sm md:text-base"
  >
    + Add Language
  </Button>
</ScrollArea>

        <DialogFooter className="px-6 pb-6">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button onClick={handleSave} disabled={!haschanges()}>
              Save changes
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
