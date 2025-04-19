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


export default function SkillsDialog({ isOpen, onClose }) {

   const {resumeInfo, setResumeInfo} = useResume()  
    const [skills, setSkills] = useState(
      resumeInfo.skills.length>0? resumeInfo.skills : []
    );
    const [inputValue, setInputValue] = useState("");
    const [isEditing, setIsEditing] = useState(true)

    const inputRef = useRef(null)

    const addSkill = () => {
      if (inputValue.trim() !== "" && !skills.includes(inputValue)) {
        setSkills([...skills, inputValue]);
        setInputValue("");
      }
      setIsEditing(false)
    };
    
  
    const removeSkill = (skill) => {
      setSkills(skills.filter((s) => s !== skill));
      setIsEditing(false)
    };
  
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        addSkill();
      }
    }

    const editSkill = (skill) => {
      setInputValue(skill)
      setSkills(skills.filter((s) => s !== skill));
      inputRef.current.focus()
      setIsEditing(false)
    }

    const handleSave = () =>{
      setResumeInfo((prev)=>({
        ...prev,
        skills: skills
      }))
      setIsEditing(true)
      toast.success("Details updated", {
        className: "custom-success-toast",
      });
    }
    

    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-[640px]">
          <DialogHeader>
            <DialogTitle>Skills</DialogTitle>
            <DialogDescription>
              Add or edit your skills.
            </DialogDescription>
          </DialogHeader>
          <div className='space-y-9'>
            <div className="flex gap-2 mb-4 text-lg">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter a skill"
                className='!text-lg'
                onKeyDown={handleKeyDown}
              />
              <Button onClick={addSkill} type="button" className='h-auto !text-lg' >Add Skill</Button>
            </div>
            <ScrollArea className='h-[275px]'>
            <Card>
              <CardContent className="p-4 flex flex-wrap gap-2">
                {skills.length > 0 ? (
                  skills.map((skill, index) => (
                    <Badge variant={'secondary'} key={index} className="flex items-center gap-2 p-2">
                      {skill}
                      <div
                          className="cursor-pointer text-green-500"
                          onClick={() => editSkill(skill)}
                        >
                          <Pencil size={16} />
                        </div> <div
                          className="cursor-pointer text-red-500"
                          onClick={() => removeSkill(skill)}
                        >
                          <Trash size={16} />
                        </div>
                    </Badge>
                  ))
                ) : (
                  <p className="text-gray-500">No skills added yet.</p>
                )}
              </CardContent>
            </Card>
            </ScrollArea>
          </div>
          <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
            <Button type="submit" onClick={handleSave} disabled={isEditing}>Save skills</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }