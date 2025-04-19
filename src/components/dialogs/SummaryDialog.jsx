import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useResume } from "@/context/ResumeInfoContext"
import { useEffect,useState } from "react"
import { ScrollArea } from "../ui/scroll-area";
import { toast } from "sonner"
import { Textarea } from "../ui/textarea";

const SummaryDialog = ({ isOpen, onClose }) => {

  const {resumeInfo,setResumeInfo} = useResume()
  const [textareaValue, setTextareaValue] = useState("" || resumeInfo.summary);
  const [isEditing, setIsEditing] = useState(true)

  const handleChange = (e) => {
    const {value} = e.target
    setTextareaValue(value)
    setIsEditing(false)
  }

  const handleSave = () => {
    setResumeInfo(prev=>({
      ...prev,
      summary: textareaValue
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
            <DialogTitle>Summary</DialogTitle>
            <DialogDescription>
            Update your proffesional summary here.
            </DialogDescription>
          </DialogHeader>
          <Textarea value={textareaValue} onChange={handleChange} name="summary" placeholder="Write a short summary telling more about yourself, your strengths and experience."
            className="!text-[16px] resize-none min-h-64 max-h-64"></Textarea>
          <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
            <Button disabled={isEditing} onClick={handleSave}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  )
}

export default SummaryDialog
