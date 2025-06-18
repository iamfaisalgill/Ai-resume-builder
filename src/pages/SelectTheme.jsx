import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Check, CheckCircle } from "lucide-react";
import halley_template from "../assets/halley.webp";
import iconic_template from "../assets/iconic.webp";
import stalwart_template from "../assets/stalwart.webp";
import vanguard_template from "../assets/vanguard.webp";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useResume, useMediaQuery } from "@/context/ResumeInfoContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const templates = [
  { id: 1, name: "Halley", src: halley_template },
  { id: 2, name: "Iconic", src: iconic_template },
  { id: 3, name: "Stalwart", src: stalwart_template },
  { id: 4, name: "Vanguard", src: vanguard_template },
];

export default function SelectTheme() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleSelect = (templateName) => {
    setSelectedTemplate(templateName);
    navigate(`/template-${templateName.toLowerCase()}/download`);
  };

  return (
    <div className="min-w-full p-4">
      <div className="max-w-3xl sm:max-w-5xl mx-auto">
        <div className="text-center my-8">
          <h1 className="text-2xl font-medium">Choose Your Design</h1>
          <p className="text-muted-foreground mt-2">Select a template to continue</p>
        </div>

        {isMobile ? (
          <div className="p-2 relative">
    <Carousel className="w-full max-w-xs mx-auto">
      <CarouselContent>
        {templates.map((template) => (
          <CarouselItem key={template.id}>
            <div className="p-1">
              <Card
                className={`relative flex items-center justify-center cursor-pointer rounded-md transition-all p-0 ${
                  selectedTemplate === template.name
                    ? "ring-2 ring-primary"
                    : ""
                }`}
                onClick={() => handleSelect(template.name)}
              >
                <CardContent className="flex flex-col items-center justify-center p-0 h-full text-center">
                  <img
                    src={template.src}
                    alt={template.name}
                    className="rounded-md w-full"
                  />
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
      <CarouselPrevious 
        variant="secondary"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8" 
      />
      <CarouselNext 
        variant="secondary"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8" 
      />
    </Carousel>
  </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {templates.map((template) => (
              <div 
                key={template.id} 
                className={`relative rounded-lg overflow-hidden transition-all group`}
              >
                <img
                  src={template.src}
                  alt={template.name}
                  className="w-full h-auto object-cover border rounded-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
                  <Button
                    onClick={() => handleSelect(template.name)}
                    variant={'success'}
                    size={'lg'}
                    className={'w-[calc(100%-30px)]'}
                  >
                    Use Template
                  </Button>
                </div>
                <p className="text-center text-lg font-medium mt-2">{template.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
