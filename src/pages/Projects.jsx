import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useResume } from "@/context/ResumeInfoContext";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  MinusCircle,
  PlusCircle,
} from "lucide-react";
import React, { useEffect, useState } from "react";

const formField = {
  title: "",
  description: "",
  url: "",
};

const Projects = () => {
  const { resumeInfo, setResumeInfo } = useResume();
  const [projectList, setProjectList] = useState(
    resumeInfo.projects ? resumeInfo.projects : [formField]
  );
  const [loading, setLoading] = useState(false);

  const addMoreProjects = () => {
    setResumeInfo((prev) => {
      const newProjects = [...prev.projects];
      if (newProjects.length > 0) {
        newProjects.push(formField);
      }
      return { ...prev, projects: newProjects };
    });
    setProjectList([...projectList, formField]);
  };

  const removeProjects = () => {
    setResumeInfo((prev) => {
      const newProjects = [...prev.projects];
      if (newProjects.length > 1) {
        newProjects.pop();
      }
      return { ...prev, projects: newProjects };
    });
    if (projectList.length > 1) {
      setProjectList(projectList.slice(0, -1));
    }
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    setProjectList((prev) => {
      let newEntries = [...prev];
      newEntries[index] = { ...newEntries[index], [name]: value };
      return newEntries;
    });
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setResumeInfo((prev) => ({ ...prev, projects: [...projectList] }));
    setLoading(false);
  };

  return (
    <form className="space-y-4" onSubmit={onSave}>
      <div>
        <h2 className="text-2xl font-semibold">Projects</h2>
        <p className="lead">
          Add relevant projects you've worked on, including personal, academic,
          or professional projects. Include project title and a brief
          description.
        </p>
      </div>

      <div className="space-y-6">
        {/* Project Entry */}
        {resumeInfo.projects.map((item, index) => (
          <div className="space-y-4 p-4 border rounded-lg" key={index}>
            <div>
              <label className="text-sm font-medium tracking-wider">
                Project Title
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
      </div>

      <div className="flex items-center gap-4">
        <Button type="button" variant="default" onClick={addMoreProjects}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Another Project
        </Button>
        <Button variant={"outline"} type="button" onClick={removeProjects}>
          <MinusCircle className="mr-2 h-4 w-4" /> Remove This Project
        </Button>
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="link" size="lg">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button disabled={loading} type="submit" size="lg">
          {loading && <Loader2 className="animate-spin" />}
          Next: Work Experience <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};

export default Projects;
