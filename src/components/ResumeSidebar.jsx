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
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

import { Ellipsis, MoreHorizontal, Palette, Pencil, PencilLine, Plus, Trash2 } from "lucide-react"
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
import ProjectsDialog from "./dialogs/ProjectsDialog";
import CertificationsDialog from "./dialogs/CertificationsDialog";
import TemplatesColorsDialog from "./dialogs/TemplatesColorsDialog";


export default function ResumeSidebar({ activeDialog, setActiveDialog, activeSec, setActiveSec, isAlertDialogOpen, setIsAlertDialogOpen, deleteItem, editItem }) {

  const { resumeInfo, setResumeInfo } = useResume();
  
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
  

  const closeDialog = () => setActiveDialog(null)

  return (
    <div className="w-64 max-md:hidden bg-card border-r h-screen flex flex-col fixed top-0 left-0 no-print">
      <div className="w-full p-7 flex items-center gap-2 text-primary border-b">
        <img src={Logo} className="w-[150px]" />
      </div>
      <span className="py-2 px-4 font-bold border-b">Customize</span>
      <div className="my-4 px-4">
        <Button variant="outline" className="w-full flex items-center justify-center gap-2" onClick={() => setActiveDialog("Templates Colors")}>
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
              "flex items-center justify-between px-4 py-2 cursor-pointer",
              activeDialog === "Contact information" ? "bg-accent font-medium" : "hover:bg-accent/40"
            )}
          >
            <span>Contact information</span>
            <Popover>
              <PopoverTrigger asChild>
                <button className="hover:bg-accent dark:hover:bg-background p-1 rounded-md">
                  <Ellipsis size={16} />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-40 p-1" align="start">
                <button
                  className="w-full flex items-center gap-2 p-2 text-sm hover:bg-accent rounded-sm"
                  onClick={() => editItem("Contact information")}
                >
                  <PencilLine size={16} /> Edit
                </button>
                <button
                  className="w-full flex items-center gap-2 p-2 text-sm rounded-sm text-destructive opacity-50"
                  disabled={true}
                >
                  <Trash2 size={16} /> Delete
                </button>
              </PopoverContent>
            </Popover>
          </div>

          {/* Summary */}
          {(resumeInfo.summary || resumeInfo.summary === "") && (
            <div
              className={clsx(
                "flex items-center justify-between px-4 py-3",
                activeDialog === "Professional Summary" ? "bg-accent font-medium" : "hover:bg-accent/40"
              )}
            >
              <span>Professional Summary</span>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="hover:bg-accent dark:hover:bg-background p-1 rounded-md">
                    <Ellipsis size={16} />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-40 p-1" align="start">
                  <button
                    className="w-full flex items-center gap-2 p-2 text-sm hover:bg-accent rounded-sm"
                    onClick={() => editItem("Professional Summary")}
                  >
                    <PencilLine size={16} /> Edit
                  </button>
                  <button
                    className="w-full flex items-center gap-2 p-2 text-sm hover:bg-accent rounded-sm text-destructive"
                    onClick={() => deleteItem("Professional Summary")}
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </PopoverContent>
              </Popover>
            </div>
          ) }
          

          {/* Skills */}
          {resumeInfo.skills && (
            <div
              className={clsx(
                "flex items-center justify-between px-4 py-3",
                activeDialog === "Skills" ? "bg-accent font-medium" : "hover:bg-accent/40"
              )}
            >
              <span>Skills</span>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="hover:bg-accent dark:hover:bg-background p-1 rounded-md">
                    <Ellipsis size={16} />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-40 p-1" align="start">
                  <button
                    className="w-full flex items-center gap-2 p-2 text-sm hover:bg-accent rounded-sm"
                    onClick={() => editItem("Skills")}
                  >
                    <PencilLine size={16} /> Edit
                  </button>
                  <button
                    className="w-full flex items-center gap-2 p-2 text-sm hover:bg-accent rounded-sm text-destructive"
                    onClick={() => deleteItem("Skills")}
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </PopoverContent>
              </Popover>
            </div>
          )}

          {/* Experience */}
          {resumeInfo.experience && (
            <div
              className={clsx(
                "flex items-center justify-between px-4 py-3",
                activeDialog === "Experience" ? "bg-accent font-medium" : "hover:bg-accent/40"
              )}
            >
              <span>Experience</span>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="hover:bg-accent dark:hover:bg-background p-1 rounded-md">
                    <Ellipsis size={16} />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-40 p-1" align="start">
                  <button
                    className="w-full flex items-center gap-2 p-2 text-sm hover:bg-accent rounded-sm"
                    onClick={() => editItem("Experience")}
                  >
                    <PencilLine size={16} /> Edit
                  </button>
                  <button
                    className="w-full flex items-center gap-2 p-2 text-sm hover:bg-accent rounded-sm text-destructive"
                    onClick={() => deleteItem("Experience")}
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </PopoverContent>
              </Popover>
            </div>
          )}

          {/* Education */}
          {resumeInfo.education && (
            <div
              className={clsx(
                "flex items-center justify-between px-4 py-3",
                activeDialog === "Education" ? "bg-accent font-medium" : "hover:bg-accent/40"
              )}
            >
              <span>Education</span>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="hover:bg-accent dark:hover:bg-background p-1 rounded-md">
                    <Ellipsis size={16} />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-40 p-1" align="start">
                  <button
                    className="w-full flex items-center gap-2 p-2 text-sm hover:bg-accent rounded-sm"
                    onClick={() => editItem("Education")}
                  >
                    <PencilLine size={16} /> Edit
                  </button>
                  <button
                    className="w-full flex items-center gap-2 p-2 text-sm hover:bg-accent rounded-sm text-destructive"
                    onClick={() => deleteItem("Education")}
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </PopoverContent>
              </Popover>
            </div>
          )}

          {/* Language */}
          {resumeInfo.languages && (
            <div
              className={clsx(
                "flex items-center justify-between px-4 py-3",
                activeDialog === "Language" ? "bg-accent font-medium" : "hover:bg-accent/40"
              )}
            >
              <span>Language</span>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="hover:bg-accent dark:hover:bg-background p-1 rounded-md">
                    <Ellipsis size={16} />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-40 p-1" align="start">
                  <button
                    className="w-full flex items-center gap-2 p-2 text-sm hover:bg-accent rounded-sm"
                    onClick={() => editItem("Language")}
                  >
                    <PencilLine size={16} /> Edit
                  </button>
                  <button
                    className="w-full flex items-center gap-2 p-2 text-sm hover:bg-accent rounded-sm text-destructive"
                    onClick={() => deleteItem("Language")}
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </PopoverContent>
              </Popover>
            </div>
          )}

          {/* Projects */}
          {resumeInfo.projects && (
            <div
              className={clsx(
                "flex items-center justify-between px-4 py-3",
                activeDialog === "Projects" ? "bg-accent font-medium" : "hover:bg-accent/40"
              )}
            >
              <span>Projects</span>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="hover:bg-accent dark:hover:bg-background p-1 rounded-md">
                    <Ellipsis size={16} />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-40 p-1" align="start">
                  <button
                    className="w-full flex items-center gap-2 p-2 text-sm hover:bg-accent rounded-sm"
                    onClick={() => editItem("Projects")}
                  >
                    <PencilLine size={16} /> Edit
                  </button>
                  <button
                    className="w-full flex items-center gap-2 p-2 text-sm hover:bg-accent rounded-sm text-destructive"
                    onClick={() => deleteItem("Projects")}
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </PopoverContent>
              </Popover>
            </div>
          )}

          {/* Certifications */}
          {resumeInfo.certifications && (
            <div
              className={clsx(
                "flex items-center justify-between px-4 py-3",
                activeDialog === "Certifications" ? "bg-accent font-medium" : "hover:bg-accent/40"
              )}
            >
              <span>Certifications</span>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="hover:bg-accent dark:hover:bg-background p-1 rounded-md">
                    <Ellipsis size={16} />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-40 p-1" align="start">
                  <button
                    className="w-full flex items-center gap-2 p-2 text-sm hover:bg-accent rounded-sm"
                    onClick={() => editItem("Certifications")}
                  >
                    <PencilLine size={16} /> Edit
                  </button>
                  <button
                    className="w-full flex items-center gap-2 p-2 text-sm hover:bg-accent rounded-sm text-destructive"
                    onClick={() => deleteItem("Certifications")}
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </PopoverContent>
              </Popover>
            </div>
          )}
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
       {activeDialog === "Projects" && (
        <ProjectsDialog isOpen={true} onClose={closeDialog} />
      )}
      {activeDialog === "Certifications" && (
        <CertificationsDialog isOpen={true} onClose={closeDialog} />
      )}
      {activeDialog === "More Sections" && (
        <MoreSectionsDialog isOpen={true} onClose={closeDialog} />
      )}
      {activeDialog === "Templates Colors" && (
        <TemplatesColorsDialog isOpen={true} onClose={closeDialog} />
      )}
      {/* Add more dialogs for other sections as needed */}

    </div>
  )
}
