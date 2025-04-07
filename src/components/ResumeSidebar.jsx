import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Palette, Pencil, Plus } from "lucide-react"
import Logo from '/logo.svg'


export default function ResumeSidebar() {
  return (
    <div className="w-64 bg-card border-r h-screen flex flex-col fixed top-0 left-0 no-print">
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
        <Button variant="outline" className="w-full flex items-center justify-center gap-2">
          <Plus className="h-4 w-4" />
          Add new Sections
        </Button>
      </div>
      <ScrollArea className="h-48 flex-1">
          <div className="space-y-2 text-sm divide-y">
              <SidebarItem label="Contact information" onClick={()=>console.log('Contact information')} />
              <SidebarItem label="Experience" onClick={()=>console.log('Experience')} />
              <SidebarItem label="Skills" />
              <SidebarItem label="Language" />
              <SidebarItem label="Education" />
              <SidebarItem label="Professional Summary" />
          </div>
      </ScrollArea>
    </div>
  )
}

function SidebarItem({ label }) {
  return (
    <div className="flex items-center justify-between px-4 py-2 hover:bg-accent cursor-pointer">
      <span>{label}</span>
      <button className="text-xs text-muted-foreground hover:text-primary"><Pencil size={15}/></button>
    </div>
  )
}