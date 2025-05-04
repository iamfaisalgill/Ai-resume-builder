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
import { Input } from "../ui/input"
import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"
import { useEffect, useState } from "react"

const MoreSectionsDialog = ({ isOpen, onClose, sections, setSections }) => {

  const updatedSec = [...sections]

  const [checkbox, setCheckbox] = useState(false)

  useEffect(()=>{
    console.log(updatedSec);
    console.log(updatedSec.filter((s, i)=>s!==sections[i]));
    
  },[])

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-[400px]">

          <DialogHeader>
            <DialogTitle>Add Sections</DialogTitle>
            <DialogDescription>Add more sections</DialogDescription>
          </DialogHeader>

          <div className="py-3 space-y-2 !text-lg">
             {updatedSec.filter((s, i)=>s!==sections[i]).map((item,index)=>(
              <Label className={'text-base'} key={index}><Checkbox name={item} onCheckedChange={v=>setCheckbox(v)} className={'size-5'}/> {item}</Label>
             )) }
              {/* <Label className={'text-base'}><Checkbox className={'size-5'}/> Certifications</Label>
              <Label className={'text-base'}><Checkbox className={'size-5'}/> Projects</Label>
              <Label className={'text-base'}><Checkbox className={'size-5'}/> Volunteer Work</Label> */}
          </div>

          <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
            <Button>Continue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  )
}

export default MoreSectionsDialog
