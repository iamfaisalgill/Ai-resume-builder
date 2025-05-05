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

const formField = {
  language: "",
  proficiency: "",
};

export default function LanguageDialog({ isOpen, onClose }) {
  const { resumeInfo, setResumeInfo } = useResume();

  // Initialize safely
  const [languageList, setLanguageList] = useState(() => {
    return Array.isArray(resumeInfo.languages)
      ? [...resumeInfo.languages]
      : [formField];
  });

  const [isEditing, setIsEditing] = useState(true);

  // Ensure resumeInfo.languages exists
  /*useEffect(() => {
    if (!Array.isArray(resumeInfo.languages)) {
      setResumeInfo((prev) => ({ ...prev, languages: [formField] }));
    }
  }, []);*/

  const addMore = () => {
    setLanguageList([...languageList, { language: "",
  proficiency: "", }]);
    setIsEditing(false);
  };

  const deleteThis = (index) => {
    const newList = languageList.filter((_, i) => i !== index);
    setLanguageList(newList);
    setIsEditing(false);
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
        updatedList[index][name] = value;
      } else if (fieldName) {
        updatedList[index][fieldName] = eOrValue;
      }
      return updatedList;
    });
    setIsEditing(false);
  };

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

    setIsEditing(true);
  };

  const deleteSec = () => {
    alert("Hello kitty")
  }
  

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] sm:min-w-[700px] sm:min-h-[550px] p-0 gap-0">
        <DialogHeader className="border-b px-6 pt-6 pb-3">
          <DialogTitle>Languages</DialogTitle>
          <DialogDescription>Add or edit your Languages.</DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[450px] p-6">
          {languageList.map((item, index) => (
            <div key={index} className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium tracking-wider">
                  Language
                </label>
                <Input
                  className="mt-2"
                  name="language"
                  placeholder="e.g., Spanish"
                  value={item.language}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>

              <div className="flex gap-4 items-center">
                <div className="flex-1">
                  <label className="text-sm font-medium tracking-wider">
                    Proficiency Level
                  </label>
                  <Select
                    value={item.proficiency}
                    onValueChange={(value) =>
                      handleChange(index, value, "proficiency")
                    }
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

                <button
                  className="mr-4 mt-5 cursor-pointer text-primary hover:text-primary/70"
                  onClick={() => deleteThis(index)}
                >
                  <TrashIcon size={20} />
                </button>
              </div>
            </div>
          ))}
          <Button variant="ghost" onClick={addMore} className="mt-2">
            + Add Language
          </Button>
        </ScrollArea>

        <DialogFooter className="px-6 pb-6 sm:justify-between">
        <Button variant={'ghost'} className='self-start' onClick={deleteSec}>Delete</Button>
          <div className="flex flex-col-reverse gap-2 sm:flex-row">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button onClick={handleSave} disabled={isEditing}>
              Save changes
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
