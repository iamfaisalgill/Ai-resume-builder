import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { useEffect, useState } from "react"
import { useResume } from "@/context/ResumeInfoContext"
import toast from "react-hot-toast"


const formFields = {
  exp: {
    jobTitle: "",
    company: "",
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
    description: "",
  },
  education: {
    institution: "",
    degree: "",
    graduationMonth: "",
    graduationYear: "",
  },
  lang: {
    language: "",
    proficiency: "",
  },
  cert: {
    name: "",
    organization: "",
    issueMonth: "",
    issueYear: "",
  },
  projects: {
    title: "",
    description: "",
    url: "",
  }
}

const MoreSectionsDialog = ({ isOpen, onClose }) => {

  const { resumeInfo, setResumeInfo } = useResume();
  const [selectedValue, setSelectedValue] = useState("");

  const handleValueChange = (value) => {
    setSelectedValue(value);
  };


  const handleContinue = () => {

    if (selectedValue === "Professional Summary") {
      setResumeInfo(prev => ({
        ...prev,
        summary: ""
      }))

    }
    else if (selectedValue === "Experience") {
      setResumeInfo(prev => ({
        ...prev,
        experience: [formFields.exp]
      }))
    }
    else if (selectedValue === "Education") {
      setResumeInfo(prev => ({
        ...prev,
        education: [formFields.education]
      }))
    }
    else if (selectedValue === "Skills") {
      setResumeInfo(prev => ({
        ...prev,
        skills: []
      }))
    }
    else if (selectedValue === "Languages") {
      setResumeInfo(prev => ({
        ...prev,
        languages: [formFields.lang]
      }))
    }
    else if (selectedValue === "Certifications") {
      setResumeInfo(prev => ({
        ...prev,
        certifications: [formFields.cert]
      }))
    }
    else if (selectedValue === "Projects") {
      setResumeInfo(prev => ({
        ...prev,
        projects: [formFields.projects]
      }))
    }
    toast.success(`${selectedValue} Added`);
      onClose();
    
  }


  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
    <DialogContent className="sm:max-w-[400px]">
      <DialogHeader>
        <DialogTitle>Add Sections</DialogTitle>
        <DialogDescription>
          {resumeInfo.summary && 
           resumeInfo.experience && 
           resumeInfo.skills && 
           resumeInfo.education && 
           resumeInfo.languages && 
           resumeInfo.certifications && 
           resumeInfo.projects
            ? "All available sections have already been added to your resume."
            : "Select one section to add"}
        </DialogDescription>
      </DialogHeader>
  
      <div className="py-3">
        {(resumeInfo.summary || resumeInfo.summary === "") && 
         resumeInfo.experience && 
         resumeInfo.skills && 
         resumeInfo.education && 
         resumeInfo.languages && 
         resumeInfo.certifications && 
         resumeInfo.projects ? (
          <div className="text-center py-4 text-gray-500">
            There are no more sections available to add.
          </div>
        ) : (
          <RadioGroup onValueChange={handleValueChange}>
            {!Object.keys(resumeInfo).includes('summary') && (
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Professional Summary" id="Professional Summary" />
                <Label className="text-base" htmlFor="Professional Summary">Professional Summary</Label>
              </div>
            )}
            {!resumeInfo.experience && (
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Experience" id="Experience" />
                <Label className="text-base" htmlFor="Experience">Experience</Label>
              </div>
            )}
            {!resumeInfo.skills && (
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Skills" id="Skills" />
                <Label className="text-base" htmlFor="Skills">Skills</Label>
              </div>
            )}
            {!resumeInfo.education && (
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Education" id="Education" />
                <Label className="text-base" htmlFor="Education">Education</Label>
              </div>
            )}
            {!resumeInfo.languages && (
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Languages" id="Language" />
                <Label className="text-base" htmlFor="Language">Language</Label>
              </div>
            )}
            {!resumeInfo.certifications && (
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Certifications" id="Certifications" />
                <Label className="text-base" htmlFor="Certifications">Certifications</Label>
              </div>
            )}
            {!resumeInfo.projects && (
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Projects" id="Projects" />
                <Label className="text-base" htmlFor="Projects">Projects</Label>
              </div>
            )}
          </RadioGroup>
        )}
      </div>
  
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            {resumeInfo.summary && 
             resumeInfo.experience && 
             resumeInfo.skills && 
             resumeInfo.education && 
             resumeInfo.languages && 
             resumeInfo.certifications && 
             resumeInfo.projects ? "Close" : "Cancel"}
          </Button>
        </DialogClose>
        {!(resumeInfo.summary && 
           resumeInfo.experience && 
           resumeInfo.skills && 
           resumeInfo.education && 
           resumeInfo.languages && 
           resumeInfo.certifications && 
           resumeInfo.projects) && (
          <Button
            onClick={handleContinue}
            disabled={!selectedValue}
          >
            Continue
          </Button>
        )}
      </DialogFooter>
    </DialogContent>
      </Dialog>
    </>
  )
}

export default MoreSectionsDialog