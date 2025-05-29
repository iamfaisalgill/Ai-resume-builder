import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, LayoutTemplate } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "../ui/scroll-area";
import halley_template from '@/assets/halley.png'
import iconic_template from '@/assets/iconic.png'
import stalwart_template from '@/assets/stalwart.png'
import { Badge } from "../ui/badge";
import { useParams } from "react-router-dom";

const templates = [
  { id: 1, name: "theme-halley", label: "New Template", popular: false, src: halley_template },
  { id: 2, name: "theme-iconic", label: "New Template", popular: false, src: iconic_template },
  { id: 3, name: "theme-stalwart", label: "Most Popular", popular: true, src: stalwart_template },
];

const TemplatesColorsDialog = ({ isOpen, onClose }) => {

  const { selectedTheme } = useParams();
  const [selectedTemplate, setSelectedTemplate] = useState(selectedTheme);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
    <DialogContent className="sm:max-w-[900px]">
      <ScrollArea className={'h-[500px]'}>
        <div className="p-6">
          <div className="text-center text-xl font-semibold mb-6">
            Nice progress! Take a peek at how your resume looks so far.
          </div>
    
          {/* <div className="flex items-center justify-center gap-4 mb-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Eye className="h-4 w-4" /> Full Preview
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <LayoutTemplate className="h-4 w-4" /> Change Template
            </Button>
          </div> */}
    
          <div className="flex justify-center gap-2 mb-6">
            {["#000", "#444", "#800000", "#3b82f6", "#38bdf8", "#0f766e", "#78350f"].map((color, idx) => (
              <div
                key={idx}
                className="w-5 h-5 rounded-full cursor-pointer border-2 border-white shadow"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
    
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {templates.map((template, index) => (
              <div key={template.id} className="relative">
                  <img
                    src={template.src}
                    alt="Resume Template"
                    width={600}
                    height={800}
                    className="rounded border-2 hover:border-primary"
                  />
                  <div className="absolute bottom-2 left-2">
                    {/* <div className="bg-white text-xs px-2 py-1 rounded shadow">
                      
                    </div> */}
                    <Badge className="!text-xs">{template.label}</Badge>
                  </div>
                  {index === 1 && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-black text-white text-xs flex items-center justify-center">
                      ✓
                    </div>
                  )}
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </DialogContent>
    </Dialog>
  );
};

export default TemplatesColorsDialog;
