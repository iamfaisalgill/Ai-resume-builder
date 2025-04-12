import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import { Button } from "@/components/ui/button"


export default function SkillsDialog({ isOpen, onClose }) {
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Skills</DialogTitle>
            <DialogDescription>
              Add or edit your skills.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="skills" className="text-right">
                Skills
              </Label>
              <Input id="skills" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save skills</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }