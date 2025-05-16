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
import { Plus, Trash2, TrashIcon } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { toast } from "sonner";
import { Separator } from "../ui/separator";

const formField = {
  language: "",
  proficiency: "",
};

const proficiencyLevels = [
    "Native",
    "Fluent",
    "Advanced",
    "Intermediate",
    "Basic",
    "Elementary"
  ];

export default function LanguageDialog({ isOpen, onClose }) {
  const { resumeInfo, setResumeInfo } = useResume();

  // Initialize safely
  const [languageList, setLanguageList] = useState(
    resumeInfo.languages ? resumeInfo.languages : [formField]
  );

  // Ensure resumeInfo.languages exists
  /*useEffect(() => {
    if (!Array.isArray(resumeInfo.languages)) {
      setResumeInfo((prev) => ({ ...prev, languages: [formField] }));
    }
  }, []);*/

  const addMore = () => {
    setLanguageList([
      ...languageList,
      {
        language: "",
        proficiency: "",
      },
    ]);
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
        updatedList[index] = { ...updatedList[index], [name]: value };
      } else if (fieldName) {
        updatedList[index] = { ...updatedList[index], [fieldName]: eOrValue };
      }
      return updatedList;
    });
  };

  const hasChanges = () => {
    if (languageList.length !== resumeInfo.languages.length) {
      return true;
    }

    return languageList.some((lang, index) => {
      const originalLang = resumeInfo.languages[index];
      if (!originalLang) return true;

      return (
        lang.language !== originalLang.language ||
        lang.proficiency !== originalLang.proficiency
      );
    });
  };

  const handleSave = () => {
    setResumeInfo((prev) => ({
      ...prev,
      languages: [...languageList],
    }));

    toast.info("Language Updated");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] p-0 gap-0">
        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle className="text-lg">Language Proficiency</DialogTitle>
          <DialogDescription>
            List languages you speak and indicate your proficiency level
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[380px] px-6 py-4">
          <div className="space-y-4">
            {languageList.map((item, index) => (
              <div key={index} className="group">
                <div className="flex gap-3 items-end">
                  {/* Language Input */}
                  <div className="flex-1 min-w-0">
                    <label className="block text-xs font-medium mb-1 tracking-wider">
                      Language
                    </label>
                    <Input
                      name="language"
                      placeholder="e.g., Spanish"
                      value={item.language}
                      onChange={(e) => handleChange(index, e)}
                      className="!h-9 text-sm"
                    />
                  </div>

                  {/* Proficiency Select */}
                  <div className="flex-1 min-w-0">
                    <label className="block text-xs font-medium mb-1 tracking-wider">
                      Proficiency
                    </label>
                    <Select
                      value={item.proficiency}
                      onValueChange={(value) => handleChange(index, value, "proficiency")}
                    >
                      <SelectTrigger className="!h-9 text-sm">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        {proficiencyLevels.map((level) => (
                          <SelectItem key={level} value={level} className="text-sm">
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Delete Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 w-9 p-0 text-muted-foreground hover:text-destructive"
                    onClick={() => deleteThis(index)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>

                {index < languageList.length - 1 && (
                  <Separator className="mt-4" />
                )}
              </div>
            ))}
          </div>

          <Button
            variant="ghost"
            onClick={addMore}
            className="mt-4"
            size="sm"
          >
            <Plus size={16} className="mr-2" />
            Add Language
          </Button>
        </ScrollArea>

        <DialogFooter className="border-t px-6 py-3">
          <DialogClose asChild>
            <Button variant="secondary" size="sm">
              Cancel
            </Button>
          </DialogClose>
          <Button 
            onClick={handleSave} 
            disabled={!hasChanges()}
            size="sm"
            className="min-w-[100px]"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
