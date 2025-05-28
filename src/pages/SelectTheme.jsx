import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Check, CheckCircle } from "lucide-react";
import halley_template from '../assets/halley.png'
import iconic_template from '../assets/iconic.png'
import stalwart_template from '../assets/stalwart.png'
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useResume, useMediaQuery } from "@/context/ResumeInfoContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


const templates = [
  { id: 1, name: "Halley", src: halley_template },
  { id: 2, name: "Iconic", src: iconic_template },
  { id: 3, name: "Stalwart", src: stalwart_template },
];


export default function SelectTheme() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const {resumeInfo} = useResume()
  const navigate = useNavigate()
   const isMobile = useMediaQuery("(max-width: 768px)");
  
  useEffect(()=>{
    function isValueEmpty(value) {
      if (value === "" || value === null || value === undefined) {
        return true;
      }
      if (Array.isArray(value)) {
        return value.length === 0 || value.every(isValueEmpty);
      }
      if (typeof value === "object" && value !== null) {
        return Object.keys(value).length === 0 || Object.values(value).every(isValueEmpty);
      }
      return false;
    }

    if (isValueEmpty(resumeInfo)) {
      navigate('/resumebuild')
    }
  },[])
  
  useEffect(()=>{
    console.log(selectedTemplate);
    
  },[selectedTemplate])

  const handleSave = ()=>{
    navigate(`/theme-${selectedTemplate.toLowerCase()}/download`)
  }
  return (
    <div className="min-w-full p-7">
      <div className="mt-8 space-y-9 p-6 max-w-[1020px] mx-auto bg-card rounded-lg">
      <div>
        <h1 className="sm:text-2xl text-lg font-medium uppercase text-center">Choose your resume template</h1>
        <p className="text-center">Remember, you can always change your template later on.</p>
      </div>
        {isMobile ? (
          <div className="p-2">
            <Carousel className="w-full max-w-xs mx-auto">
              <CarouselContent>
                {templates.map((template) => (
                  <CarouselItem key={template.id}>
                    <div className="p-1">
                      <Card
                        className={`relative flex items-center justify-center cursor-pointer rounded-md transition-all p-0 ${
                          selectedTemplate === template.name ? "ring-2 ring-primary" : ""
                        }`}
                        onClick={() => setSelectedTemplate(template.name)}
                      >
                        <CardContent className="flex flex-col items-center justify-center p-0 h-full text-center">
                          <img src={template.src} alt="" className="rounded-md w-full" />
                        </CardContent>
                        {selectedTemplate === template.name && (
                          <div className="flex items-center justify-center rounded-full absolute top-2 right-2 text-white bg-gray-800 size-7">
                            <Check size={20} />
                          </div>
                        )}
                      </Card>
                      <p className="text-center mt-2">{template.name}</p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        ) : (
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
                {selectedTemplate === template.name && (
                  <div className="flex items-center justify-center rounded-full absolute top-2 right-2 text-white bg-gray-800 size-7">
                  <Check size={20}  />
                  </div>
                )}
              </Card>
              <p className="text-center">{template.name}</p>
            </div>
          ))}
        </div>
        )}
                <div className="flex justify-between">
                <Button>Back</Button>
                  <Button onClick={handleSave} disabled={!selectedTemplate}>Save & Next</Button>
                </div>

      </div>
    </div>
  );
}
