import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  Pencil,
  Plus,
  Trash,
} from "lucide-react";
import { useMediaQuery, useResume } from "@/context/ResumeInfoContext";
import { generateResumeSummaries } from "@/services/geminiService";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const Skills = ({ setPageIndex }) => {
  const { resumeInfo, setResumeInfo } = useResume();

  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState(
    resumeInfo.skills?.length > 0 ? resumeInfo.skills : []
  );
  const [inputValue, setInputValue] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const inputRef = useRef(null);

  const addSkill = () => {
    if (inputValue.trim() !== "" && !skills.includes(inputValue)) {
      setSkills([...skills, inputValue]);
      setInputValue("");
    }
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const editSkill = (skill) => {
    setInputValue(skill);
    setSkills(skills.filter((s) => s !== skill));
    inputRef.current.focus();
    setIsEditing(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addSkill();
    }
  };

  const handleGoBack = () => {
    setPageIndex((prev) => prev - 1);
  };

  const onSave = async () => {
    setLoading(true);

    if (hasChanges()) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } else {
      await new Promise((resolve) => resolve());
    }

    setResumeInfo((prev) => ({
      ...prev,
      skills: skills,
    }));
    setLoading(false);
    setPageIndex((prev) => prev + 1);
  };

  const hasChanges = () => {
    if (skills.length !== resumeInfo.skills?.length) {
      return true;
    }

    return skills.some((skill, index) => {
      const originalSkill = resumeInfo.skills[index];
      if (!originalSkill) return true;

      return skill !== originalSkill;
    });
  };

  return (
    <div className="space-y-9 min-h-[440px] flex flex-col">
      <div className="max-sm:text-center">
        <h2 className="text-xl md:text-2xl font-semibold">Skills</h2>
        <p className="text-sm md:text-base text-muted-foreground">
          Add a few skills to show employers you’re good in your field.
        </p>
      </div>
      <div className="space-y-4">
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
          {skills.length > 0 ? (
            <div className="flex flex-wrap gap-2 max-sm:mb-18">
              {skills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="px-3 py-1.5 text-sm font-normal"
                >
                  <span className="max-w-[120px] truncate">{skill}</span>
                  <div className="ml-2 flex gap-1">
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
        </div>
      </div>

      <div className="max-sm:fixed max-sm:bottom-0 max-sm:right-0 max-sm:bg-background max-sm:p-5 max-sm:border-t mt-auto w-full flex justify-between">
        <Button
          onClick={handleGoBack}
          type="button"
          variant="ghost"
          size={isMobile ? "sm" : "lg"}
          className="cursor-pointer"
        >
          <ChevronLeft /> Back
        </Button>
        <div className="space-x-2">
          <Button variant={'link'}  type="button" size={isMobile?"sm" : "lg"} onClick={()=>setPageIndex(prev=>prev+1)}>Skip</Button>
          <Button
            onClick={onSave}
            disabled={loading}
            type="submit"
            size={isMobile ? "sm" : "lg"}
            className="cursor-pointer"
          >
            {loading && <Loader2 className="animate-spin" />}
            <span className='max-sm:hidden'>Next: Summary</span> <span className='sm:hidden'>Save</span> <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Skills;
