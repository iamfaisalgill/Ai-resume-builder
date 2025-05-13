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
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import clsx from "clsx";

const formField = {
  title: "",
  description: "",
  url: "",
};

export default function LanguageDialog({ isOpen, onClose }) {
  const { resumeInfo, setResumeInfo } = useResume();
  const [projectList, setProjectList] = useState(
    resumeInfo.projects ? resumeInfo.projects : [formField]
  );

  const handleChange = (index,e) => {
    const {name, value} = e.target
    setProjectList((prev)=>{
      let newEntries = [...prev]
      newEntries[index] = {...newEntries[index], [name]: value}
      return newEntries
      })
  }
  

  const addMore = () => {
    setProjectList([...projectList, formField])
  }
  

  const handleSave = () => {
    setResumeInfo((prev) => ({ ...prev, projects: [...projectList] }));
    toast.success("Details Updated", {
      style: {
        background: "#f0fdf4",
        border: "1px solid #bbf7d0",
        color: "#166534",
      },
      duration: 2000,
    });
    onClose()
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] sm:min-w-[700px] sm:min-h-[550px] p-0 gap-0">
        <DialogHeader className="border-b px-6 pt-6 pb-3">
          <DialogTitle>Projects</DialogTitle>
          <DialogDescription>
            Add or edit your projects
          </DialogDescription>
        </DialogHeader>

         <ScrollArea className="h-[450px]">
          <div className="space-y-4 p-3 md:p-6" > 
            {projectList.map((item, index) => (
                <div className="space-y-4 p-4 border rounded-lg flex-1">
                  <div>
                    <label className="text-sm font-medium tracking-wider">
                      Project #{index + 1} Title
                    </label>
                    <Input
                      onChange={(e) => handleChange(index, e)}
                      className="mt-2"
                      defaultValue={item.title}
                      placeholder="Enter project title"
                      name="title"
                      required
                    />
                  </div>
  
                  <div>
                    <label className="text-sm font-medium tracking-wider">
                      Description
                    </label>
                    <Textarea
                      onChange={(e) => handleChange(index, e)}
                      defaultValue={item.description}
                      name="description"
                      className="mt-2 min-h-[100px]"
                      placeholder="Describe the project, your role, technologies used, and any notable achievements"
                      required
                    />
                  </div>
  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="col-span-1">
                      <label className="text-sm font-medium tracking-wider">
                        Project URL (optional)
                      </label>
                      <Input
                        onChange={(e) => handleChange(index, e)}
                        defaultValue={item.url}
                        className="mt-2"
                        placeholder="https://example.com"
                        type="url"
                        name="url"
                      />
                    </div>
                    {/* <div className="flex-1">
                  <label className="text-sm font-medium tracking-wider">Date Completed (optional)</label>
                  <Input className="mt-2" type="month" />
                  </div> */}
                  </div>
                </div>
            ))}

          <Button variant={'ghost'} className={'mb-2'} onClick={addMore}>+ Add more projects</Button>
          </div>
        </ScrollArea>

        <DialogFooter className="px-6 pb-6">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
