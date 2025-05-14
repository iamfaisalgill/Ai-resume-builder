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
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Trash2 } from "lucide-react";

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
    toast.success("Details Updated", {
      style: {
        background: "#f0fdf4",
        border: "1px solid #bbf7d0",
        color: "#166534",
      },
      duration: 2000,
    });
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
              <button
                  className="cursor-pointer text-primary hover:text-primary/70"
                  onClick={() => deleteThis(index)}
                >
                  <Trash2 size={18} className="md:w-5 md:h-5 w-4 h-4" />
                </button>
              </div>

                {/* Project Title */}
                <div>
                  <label className="text-xs md:text-sm font-medium tracking-wider">
                    Project Title
                  </label>
                  <Input
                    onChange={(e) => handleChange(index, e)}
                    className="mt-1 md:mt-2 text-sm md:text-base"
                    defaultValue={item.title}
                    placeholder="Enter project title"
                    name="title"
                    required
                  />
                </div>

                {/* Project Description */}
                <div>
                  <label className="text-xs md:text-sm font-medium tracking-wider">
                    Description
                  </label>
                  <Textarea
                    onChange={(e) => handleChange(index, e)}
                    value={item.description}
                    name="description"
                    className="mt-1 md:mt-2 text-sm md:text-base min-h-[80px] md:min-h-[100px]"
                    placeholder="Describe the project, your role, technologies used, and any notable achievements"
                    required
                  />
                </div>

                {/* Project URL */}
                <div className="grid grid-cols-1 gap-2">
                  <div className="col-span-1">
                    <label className="text-xs md:text-sm font-medium tracking-wider">
                      Project URL (optional)
                    </label>
                    <Input
                      onChange={(e) => handleChange(index, e)}
                      value={item.url}
                      className="mt-1 md:mt-2 text-sm md:text-base"
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
              className={"mb-1 md:mb-2 text-sm md:text-base"}
              onClick={addMore}
            >
              + Add more projects
            </Button>
          </div>
        </ScrollArea>

        <DialogFooter className="px-6 py-6">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
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
