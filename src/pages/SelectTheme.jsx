import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Check, CheckCircle } from "lucide-react";
import halley_template from '../assets/halley.png'
import iconic_template from '../assets/iconic.png'
import stalwart_template from '../assets/stalwart.png'
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";


const templates = [
  { id: 1, name: "Halley", src: halley_template },
  { id: 2, name: "Iconic", src: iconic_template },
  { id: 3, name: "Stalwart", src: stalwart_template },
];


export default function SelectTheme() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const navigate = useNavigate()
  
  useEffect(()=>{
    console.log(selectedTemplate);
    
  },[selectedTemplate])

  const handleSave = ()=>{
    //working on it
  }
  return (
    <div className="min-w-full p-7">
      <div className="mt-8 space-y-9 p-6 max-w-[1020px] mx-auto bg-card rounded-lg">
      <h1 className="text-4xl text-center">Select a template</h1>
        <div className="grid grid-cols-3 gap-4 p-6">
          {templates.map((template) => (
            <div key={template.id}>
              <Card
                className={`relative flex items-center justify-center cursor-pointer outline-3 rounded-md transition-all p-0 ${
                  selectedTemplate === template.name ? "outline-primary" : "outline-none"
                }`}
                onClick={() => setSelectedTemplate(template.name)}
              >
                <CardContent className="flex flex-col items-center justify-center p-0 h-full text-center">
                  <img src={template.src} alt="" className="rounded-md" />
                </CardContent>
                {selectedTemplate === template.id && (
                  <div className="flex items-center justify-center rounded-full absolute top-2 right-2 text-white bg-gray-800 size-7">
                  <Check size={20}  />
                  </div>
                )}
              </Card>
              <p className="text-center">{template.name}</p>
            </div>
          ))}
        </div>
                <div className="flex justify-between">
                <Button>Back</Button>
                  <Button onClick={handleSave} >Save & Next</Button>
                </div>

      </div>
    </div>
  );
}
