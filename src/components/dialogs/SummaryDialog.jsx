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
import { useResume } from "@/context/ResumeInfoContext"
import { useState } from "react"
import { Textarea } from "../ui/textarea";
import toast from "react-hot-toast";

const SummaryDialog = ({ isOpen, onClose }) => {

  const {resumeInfo,setResumeInfo} = useResume()
  const [textareaValue, setTextareaValue] = useState("" || resumeInfo.summary);

  const handleChange = (e) => {
    const {value} = e.target
    setTextareaValue(value)
  }

  const handleSave = () => {
    setResumeInfo(prev=>({
      ...prev,
      summary: textareaValue
    }))
    toast.success("Summary Updated");
    onClose()
  }

  const hasChanges = () => {
    if (textareaValue !== resumeInfo.summary) {
      return true
    }

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
            <Button type="button" variant="secondary" size="sm">
              Close
            </Button>
          </DialogClose>
            <Button size="sm" disabled={!hasChanges()} onClick={handleSave}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  )
}

export default SummaryDialog
