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

const sections = [
  "Contact information",
  "Experience",
  "Skills",
  "Language",
  "Education",
  "Professional Summary",
]

export default function ResumeSidebar({activeDialog, setActiveDialog}) {

   const { resumeInfo, setResumeInfo } = useResume();
   const [sections,setSections] = useState([
    "Contact information",
    "Professional Summary",
    "Experience",
    "Skills",
    "Education",
    "Language"
  ])

  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [activeSec, setActiveSec] = useState("")

  const confirmDelete = () => {
    setSections(sections.filter((item) => item !== activeSec));
    setActiveSec("");
    setIsAlertDialogOpen(false);
  }
  
  

  const closeDialog = () => setActiveDialog(null)

  return (
    <div className="w-64 max-md:hidden bg-card border-r h-screen flex flex-col fixed top-0 left-0 no-print">
      <div className="w-full p-7 flex items-center gap-2 text-primary border-b">
        <img src={Logo} className="w-[150px]"/>
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
        <Button variant="outline" className="w-full flex items-center justify-center gap-2" onClick={()=>setActiveDialog("More Sections")}>
          <Plus className="h-4 w-4" />
          Add new Sections
        </Button>
      </div>
      <ScrollArea className="h-48 flex-1">
        <div className="space-y-2 text-sm divide-y">
          {sections.filter((label)=>label!=="").map((label) => (
            <SidebarItem
              key={label}
              label={label}
              active={activeDialog === label}
              setActiveDialog={setActiveDialog}
              activeSec={activeSec}
              setActiveSec={setActiveSec}
              setIsAlertDialogOpen={setIsAlertDialogOpen}
            />
          ))}
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
        <SummaryDialog isOpen={true} onClose={closeDialog}/>
      )}
      {activeDialog === "Education" && (
        <EducationDialog isOpen={true} onClose={closeDialog}/>
      )}
      {activeDialog === "Language" && (
        <LanguageDialog isOpen={true} onClose={closeDialog} setSections={setSections}/>
      )}
      {activeDialog === "More Sections" && (
        <MoreSectionsDialog isOpen={true} onClose={closeDialog} sections={sections} setSections={setSections} />
      )}
      {/* Add more dialogs for other sections as needed */}
      
    </div>
  )
}

function SidebarItem({
  label,
  active,
  onClick,
  setActiveDialog,
  setActiveSec,
  activeSec,
  setIsAlertDialogOpen
}) {

  const deleteItem = () => {
    setActiveSec(label)
    setIsAlertDialogOpen(true);
  }

  const editItem = () => {
    setActiveDialog(label)
    setActiveSec(label)
  }


  return (
    <div
      className={clsx(
        "flex items-center justify-between px-2 py-2 rounded-md cursor-pointer",
        active ? "bg-accent font-medium" : "hover:bg-accent"
      )}
      onClick={onClick}
    >
      <span>{label}</span>
      <div className="space-x-1">
        <button className="text-xs text-muted-foreground hover:text-primary" onClick={deleteItem}>
          <Trash2 size={15} />
        </button>
        <button className="text-xs text-muted-foreground hover:text-primary" onClick={editItem}>
          <Pencil size={15} />
        </button>
      </div>
    </div>
  )
}
