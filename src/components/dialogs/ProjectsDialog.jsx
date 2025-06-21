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
import { Button } from "@/components/ui/button";
import { useResume } from "@/context/ResumeInfoContext";
import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

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

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    setProjectList((prev) => {
      let newEntries = [...prev];
      newEntries[index] = { ...newEntries[index], [name]: value };
      return newEntries;
    });
  };

  const addMore = () => {
    setProjectList([...projectList, formField]);
  };

  const handleSave = () => {
    
    setResumeInfo((prev) => ({ ...prev, projects: [...projectList] }));
    toast.success("Projects Updated");
    onClose();
  };

  const haschanges = () => {
    if (projectList.length !== resumeInfo.projects.length) {
      return true;
    }
    return projectList.some((project, index) => {
      const originalProject = resumeInfo.projects[index];
      if (!originalProject) return true;

      return (
        project.title !== originalProject.title ||
        project.description !== originalProject.description ||
        project.url !== originalProject.url
      );
    });
  };

  const deleteThis = (index) => {
    const newList = projectList.filter((_, i) => i !== index);
    setProjectList(newList);
    setResumeInfo((prev) => ({
      ...prev,
      projects: newList,
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] sm:min-w-[700px] sm:min-h-[550px] p-0 gap-0">
        <DialogHeader className="border-b px-6 pt-6 pb-3">
          <DialogTitle>Projects</DialogTitle>
          <DialogDescription>Add or edit your projects</DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[450px]">
          <div className="space-y-3 md:space-y-4 p-3 md:p-6">
            {projectList?.map((item, index) => (
              <div
                className="space-y-3 md:space-y-4 p-3 md:p-4 border rounded-lg relative"
                key={index}
              >
               <div className="flex gap-2 justify-between items-center">
              <h3 className="text-primary" >#{index+1}</h3>
                {/* Delete button */}
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 w-9 p-0 cursor-pointer text-muted-foreground hover:text-destructive"
                    onClick={() => deleteThis(index)}
                  >
                    <Trash2 size={16} />
                  </Button>
              </div>

                {/* Project Title */}
                <div>
                  <Label className="text-xs md:text-sm">
                    Project Title
                  </Label>
                  <Input
                    onChange={(e) => handleChange(index, e)}
                    className="mt-1 md:mt-2 text-sm h-9"
                    defaultValue={item.title}
                    placeholder="Enter project title"
                    name="title"
                    required
                  />
                </div>

                {/* Project Description */}
                <div>
                  <Label className="text-xs md:text-sm">
                    Description
                  </Label>
                  <Textarea
                    onChange={(e) => handleChange(index, e)}
                    value={item.description}
                    name="description"
                    className="mt-1 md:mt-2 text-sm min-h-[80px] md:min-h-[100px]"
                    placeholder="Describe the project, your role, technologies used, and any notable achievements"
                    required
                  />
                </div>

                {/* Project URL */}
                <div className="grid grid-cols-1 gap-2">
                  <div className="col-span-1">
                    <Label className="text-xs md:text-sm">
                      Project URL (optional)
                    </Label>
                    <Input
                      onChange={(e) => handleChange(index, e)}
                      value={item.url}
                      className="mt-1 md:mt-2 text-sm h-9"
                      placeholder="https://example.com"
                      type="url"
                      name="url"
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Add Project Button */}
            <Button
              variant={"ghost"}
              className={"mb-1 md:mb-2 text-sm"}
              onClick={addMore} size="sm"
            >
              + Add more projects
            </Button>
          </div>
        </ScrollArea>

        <DialogFooter className="border-t px-6 py-3">
          <DialogClose asChild>
            <Button type="button" variant="secondary" size="sm">
              Cancel
            </Button>
          </DialogClose>
          <Button size="sm" onClick={handleSave} disabled={!haschanges()}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
