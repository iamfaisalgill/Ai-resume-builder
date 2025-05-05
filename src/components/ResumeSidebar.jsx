import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Palette, Pencil, Plus, Trash2 } from "lucide-react"
import Logo from '/logo.svg'
import clsx from "clsx"
import { useEffect, useState } from "react"
import ContactInfoDialog from "./dialogs/ContactInfoDialog"
import ExperienceDialog from "./dialogs/ExperienceDialog"
import SkillsDialog from "./dialogs/SkillsDialog"
import SummaryDialog from "./dialogs/SummaryDialog"
import EducationDialog from "./dialogs/EducationDialog"
import LanguageDialog from "./dialogs/LanguageDialog"
import MoreSectionsDialog from "./dialogs/MoreSectionsDialog"
import { useResume } from "@/context/ResumeInfoContext"


export default function ResumeSidebar({ activeDialog, setActiveDialog }) {

  const { resumeInfo, setResumeInfo } = useResume();

  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [activeSec, setActiveSec] = useState("")

  const confirmDelete = () => {
    setActiveSec("");
    setResumeInfo(prevInfo => {
      const newInfo = { ...prevInfo };
      if (activeSec === "Professional Summary") {
        delete newInfo.summary
      }
       else if (activeSec === "Experience") {
        delete newInfo.experience
      }
       else if (activeSec === "Education") {
        delete newInfo.education
      }
       else if (activeSec === "Skills") {
        delete newInfo.skills
      }
      else if (activeSec === "Language") {
        delete newInfo.languages
      }
       else if (activeSec === "Certifications") {
        delete newInfo.certifications
      }
       else if (activeSec === "Projects") {
        delete newInfo.projects
      };
      return newInfo;
    })
    setIsAlertDialogOpen(false);
  }

  const deleteItem = (label) => {
    setActiveSec(label)
    setIsAlertDialogOpen(true);
  }

  const editItem = (label) => {
    setActiveDialog(label)
    setActiveSec(label)
  }

  const closeDialog = () => setActiveDialog(null)

  return (
    <div className="w-64 max-md:hidden bg-card border-r h-screen flex flex-col fixed top-0 left-0 no-print">
      <div className="w-full p-7 flex items-center gap-2 text-primary border-b">
        <img src={Logo} className="w-[150px]" />
      </div>
      <span className="py-2 px-4 font-bold border-b">Customize</span>
      <div className="my-4 px-4">
        <Button variant="outline" className="w-full flex items-center justify-center gap-2">
          <Palette className="h-4 w-4" />
          Templates & Colors
        </Button>
      </div>
      <span className="py-2 px-4 font-bold border-y">Sections</span>
      <div className="my-4 px-4">
        <Button variant="outline" className="w-full flex items-center justify-center gap-2" onClick={() => setActiveDialog("More Sections")}>
          <Plus className="h-4 w-4" />
          Add new Sections
        </Button>
      </div>
      <ScrollArea className="h-48 flex-1">
        <div className="text-sm divide-y">
          {/* Contact information */}
          <div
            className={clsx(
              "flex items-center justify-between px-4 py-3",
              activeDialog === "Contact information" ? "bg-accent font-medium" : "hover:bg-accent"
            )}
          >
            <span>Contact information</span>
            <div className="space-x-1">

              <button className="text-xs text-muted-foreground cursor-pointer hover:text-primary" onClick={() => editItem("Contact information")}>
                <Pencil size={15} />
              </button>
            </div>
          </div>

          {/* Summary */}
          {resumeInfo.summary && (<div
            className={clsx(
              "flex items-center justify-between px-4 py-3",
              activeDialog === "Professional Summary" ? "bg-accent font-medium" : "hover:bg-accent"
            )}
          >
            <span>Professional Summary</span>
            <div className="space-x-1">
              <button className="text-xs text-muted-foreground cursor-pointer hover:text-primary" onClick={() => deleteItem("Professional Summary")}>
                <Trash2 size={15} />
              </button>
              <button className="text-xs text-muted-foreground cursor-pointer hover:text-primary" onClick={() => editItem("Professional Summary")}>
                <Pencil size={15} />
              </button>
            </div>
          </div>)}

          {/* Skills */}
          {resumeInfo.skills && (<div
            className={clsx(
              "flex items-center justify-between px-4 py-3",
              activeDialog === "Skills" ? "bg-accent font-medium" : "hover:bg-accent"
            )}
          >
            <span>Skills</span>
            <div className="space-x-1">
              <button className="text-xs text-muted-foreground cursor-pointer hover:text-primary" onClick={() => deleteItem("Skills")}>
                <Trash2 size={15} />
              </button>
              <button className="text-xs text-muted-foreground cursor-pointer hover:text-primary" onClick={() => editItem("Skills")}>
                <Pencil size={15} />
              </button>
            </div>
          </div>)}

          {/* Experience */}
          {resumeInfo.experience && (<div
            className={clsx(
              "flex items-center justify-between px-4 py-3",
              activeDialog === "Experience" ? "bg-accent font-medium" : "hover:bg-accent"
            )}
          >
            <span>Experience</span>
            <div className="space-x-1">
              <button className="text-xs text-muted-foreground cursor-pointer hover:text-primary" onClick={() => deleteItem("Experience")}>
                <Trash2 size={15} />
              </button>
              <button className="text-xs text-muted-foreground cursor-pointer hover:text-primary" onClick={() => editItem("Experience")}>
                <Pencil size={15} />
              </button>
            </div>
          </div>)}

          {/* Education */}
          {resumeInfo.education && (<div
            className={clsx(
              "flex items-center justify-between px-4 py-3",
              activeDialog === "Education" ? "bg-accent font-medium" : "hover:bg-accent"
            )}
          >
            <span>Education</span>
            <div className="space-x-1">
              <button className="text-xs text-muted-foreground cursor-pointer hover:text-primary" onClick={() => deleteItem("Education")}>
                <Trash2 size={15} />
              </button>
              <button className="text-xs text-muted-foreground cursor-pointer hover:text-primary" onClick={() => editItem("Education")}>
                <Pencil size={15} />
              </button>
            </div>
          </div>)}

          {/* Language */}
          {resumeInfo.languages && (<div
            className={clsx(
              "flex items-center justify-between px-4 py-3",
              activeDialog === "Language" ? "bg-accent font-medium" : "hover:bg-accent"
            )}
          >
            <span>Language</span>
            <div className="space-x-1">
              <button className="text-xs text-muted-foreground cursor-pointer hover:text-primary" onClick={() => deleteItem("Language")}>
                <Trash2 size={15} />
              </button>
              <button className="text-xs text-muted-foreground cursor-pointer hover:text-primary" onClick={() => editItem("Language")}>
                <Pencil size={15} />
              </button>
            </div>
          </div>)}

          {/* Projects */}
          {resumeInfo.projects && (<div
            className={clsx(
              "flex items-center justify-between px-4 py-3",
              activeDialog === "Projects" ? "bg-accent font-medium" : "hover:bg-accent"
            )}
          >
            <span>Projects</span>
            <div className="space-x-1">
              <button className="text-xs text-muted-foreground cursor-pointer hover:text-primary" onClick={() => deleteItem("Projects")}>
                <Trash2 size={15} />
              </button>
              <button className="text-xs text-muted-foreground cursor-pointer hover:text-primary" onClick={() => editItem("Projects")}>
                <Pencil size={15} />
              </button>
            </div>
          </div>)}

          {/* Certifications */}
          {resumeInfo.certifications && (<div
            className={clsx(
              "flex items-center justify-between px-4 py-3",
              activeDialog === "Certifications" ? "bg-accent font-medium" : "hover:bg-accent"
            )}
          >
            <span>Certifications</span>
            <div className="space-x-1">
              <button className="text-xs text-muted-foreground cursor-pointer hover:text-primary" onClick={() => deleteItem("Certifications")}>
                <Trash2 size={15} />
              </button>
              <button className="text-xs text-muted-foreground cursor-pointer hover:text-primary" onClick={() => editItem("Certifications")}>
                <Pencil size={15} />
              </button>
            </div>
          </div>)}

        </div>
      </ScrollArea>

      {/* Alert Dialog */}
      <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete "{activeSec}"?</AlertDialogTitle>
            <AlertDialogDescription>
              This can’t be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Yes, Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialogs for each section */}
      {activeDialog === "Contact information" && (
        <ContactInfoDialog isOpen={true} onClose={closeDialog} />
      )}
      {activeDialog === "Experience" && (
        <ExperienceDialog isOpen={true} onClose={closeDialog} />
      )}
      {activeDialog === "Skills" && (
        <SkillsDialog isOpen={true} onClose={closeDialog} />
      )}
      {activeDialog === "Professional Summary" && (
        <SummaryDialog isOpen={true} onClose={closeDialog} />
      )}
      {activeDialog === "Education" && (
        <EducationDialog isOpen={true} onClose={closeDialog} />
      )}
      {activeDialog === "Language" && (
        <LanguageDialog isOpen={true} onClose={closeDialog} />
      )}
      {activeDialog === "More Sections" && (
        <MoreSectionsDialog isOpen={true} onClose={closeDialog} activeDialog={activeDialog} setActiveDialog={setActiveDialog} />
      )}
      {/* Add more dialogs for other sections as needed */}

    </div>
  )
}
