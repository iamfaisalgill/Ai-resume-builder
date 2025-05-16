import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { Pencil, Trash, Plus, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useResume } from "@/context/ResumeInfoContext";

export default function SkillsDialog({ isOpen, onClose }) {
  const { resumeInfo, setResumeInfo } = useResume();
  const [skills, setSkills] = useState(
    resumeInfo.skills.length > 0 ? resumeInfo.skills : []
  );
  const [inputValue, setInputValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const addSkill = () => {
    if (inputValue.trim() !== "" && !skills.includes(inputValue)) {
      setSkills([...skills, inputValue]);
      setInputValue("");
      setIsEditing(true);
    }
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
    setIsEditing(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addSkill();
    }
  };

  const editSkill = (skill) => {
    setInputValue(skill);
    setSkills(skills.filter((s) => s !== skill));
    inputRef.current.focus();
    setIsEditing(true);
  };

  const handleSave = () => {
    setResumeInfo((prev) => ({
      ...prev,
      skills: skills,
    }));
    setIsEditing(false);
    toast.info("Skills Updated");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[640px] p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="text-xl font-semibold">Manage Skills</DialogTitle>
          <DialogDescription>
            Add, edit, or remove skills from your resume
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 pb-4 space-y-4">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a skill and press Enter"
              className="h-10"
              onKeyDown={handleKeyDown}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
            />
            <Button
              onClick={addSkill}
              size="sm"
              className="h-10 gap-1"
              variant={isInputFocused ? "default" : "outline"}
            >
              <Plus size={16} />
              Add
            </Button>
          </div>

          <Separator />

          <div>
            <h3 className="mb-2 text-sm font-medium text-muted-foreground">
              {skills.length} {skills.length === 1 ? "Skill" : "Skills"} Added
            </h3>
            <ScrollArea className="h-[200px]">
              {skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="px-3 py-1.5 text-sm font-normal group"
                    >
                      <span className="max-w-[120px] truncate">{skill}</span>
                      <div className="ml-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => editSkill(skill)}
                          className="text-muted-foreground hover:text-primary cursor-pointer"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => removeSkill(skill)}
                          className="text-muted-foreground hover:text-destructive cursor-pointer"
                        >
                          <Trash size={14} />
                        </button>
                      </div>
                    </Badge>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[120px] text-muted-foreground text-sm">
                  <p>No skills added yet</p>
                  <p>Start typing above to add your first skill</p>
                </div>
              )}
            </ScrollArea>
          </div>
        </div>

        <DialogFooter className="px-6 py-4 border-t">
          <DialogClose asChild>
            <Button variant="secondary" size="sm">
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={handleSave}
            disabled={!isEditing}
            size="sm"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}