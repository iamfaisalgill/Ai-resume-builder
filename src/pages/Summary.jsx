import LoaderComponent from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMediaQuery, useResume } from "@/context/ResumeInfoContext";
import { generateResumeSummaries } from "@/services/geminiService";
import {
  Brain,
  Check,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Info,
  Loader2,
  RefreshCcw,
  Sparkles,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import toast from "react-hot-toast";

const Summary = ({ setPageIndex }) => {
  const { resumeInfo, setResumeInfo } = useResume();
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [textareaValue, setTextareaValue] = useState("" || resumeInfo.summary);
  const [isUsingAI, setIsUsingAI] = useState(false);
  const [aiGeneratedText, setAiGeneratedText] = useState(
    resumeInfo.aiGeneratedSummaries || []
  );
  const [loader, setLoader] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const navigate = useNavigate();

  const handleSelectOption = () => {
    setTextareaValue(aiGeneratedText[currentIndex]);
    setIsPopoverOpen(false);
  };

  const handleGoBack = () => {
    setPageIndex((prev) => prev - 1);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setTextareaValue(value);
    setIsUsingAI(false);
  };

  const onSave = () => {
    setLoading(true);
    setTimeout(() => {
      setResumeInfo((prevInfo) => ({ ...prevInfo, summary: textareaValue }));
      setLoading(false);
      navigate("/templates");
    }, 1000);
  };

  const handleGenerate = async () => {
    try {
      if (aiGeneratedText.length > 0) {
        setIsPopoverOpen(true);
        return;
      }
      setLoader(true);
      setIsPopoverOpen(true);
      const results = await generateResumeSummaries(resumeInfo);
      setResumeInfo((prev) => ({ ...prev, aiGeneratedSummaries: results }));
      setAiGeneratedText(results);
      setLoader(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to generate Summary. Please try again.");
      setLoader(false);
    }
  };

  const navigateAiOptions = (direction) => {
    setCurrentIndex((prev) => {
      if (direction === "prev")
        return prev === 0 ? aiGeneratedText.length - 1 : prev - 1;
      return prev === aiGeneratedText.length - 1 ? 0 : prev + 1;
    });
  };

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="space-y-6">
      <div className="max-sm:text-center">
        <h2 className="text-xl md:text-2xl font-semibold">Summary</h2>
        <p className="text-sm md:text-base text-muted-foreground">
          Briefly describe the value that you bring through your skills,
          background and experience.
        </p>
      </div>

      <div className="space-y-4 max-sm:mt-12">
        {isUsingAI && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Check className="h-4 w-4 text-green-500" />
            <span>Using AI-generated summary</span>
          </div>
        )}

        <div className="flex justify-end">
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                onClick={handleGenerate}
                size={"sm"}
                type="button"
                className="gap-2 dark:hover:bg-transparent !border-primary hover:brightness-110 hover:scale-102"
              >
                {loader ? (
                  <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                ) : (
                  <Sparkles className="text-blue-500" />
                )}
                {loader ? (
                  <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
                    Generating...
                  </span>
                ) : (
                  <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
                    Generate with AI
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[95vw] sm:w-[480px] p-4" align="end">
              {aiGeneratedText.length > 0 ? (
                <div className="space-y-3">
                  {/* Moved counter to top - now properly aligned */}
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      Option {currentIndex + 1} of {aiGeneratedText.length}
                    </span>

                    {/* Navigation buttons moved up here */}
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        type="button"
                        onClick={() => navigateAiOptions("prev")}
                        disabled={currentIndex === 0}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        type="button"
                        onClick={() => navigateAiOptions("next")}
                        disabled={currentIndex === aiGeneratedText.length - 1}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Content area */}
                  <div className="min-h-[120px] p-3 border rounded-md flex items-center">
                    <p className="text-sm">{aiGeneratedText[currentIndex]}</p>
                  </div>

                  {/* Use this button */}
                  <div className="flex justify-end">
                    <Button
                      onClick={handleSelectOption}
                      size="sm"
                      type="button"
                      variant={'gradient'}
                      className="gap-2"
                    >
                      <Check className="h-4 w-4" /> Use this
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-[120px]">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              )}
            </PopoverContent>
          </Popover>
        </div>

          <Textarea
            value={textareaValue}
            onChange={handleChange}
            placeholder="Write a short summary about yourself..."
            className="min-h-[200px] text-base mt-2"
          />
       
      </div>

      <div className="max-sm:fixed max-sm:bottom-0 max-sm:right-0 max-sm:bg-background max-sm:p-5 max-sm:border-t w-full flex justify-between">
        <Button
          onClick={handleGoBack}
          type="button"
          variant="ghost"
          size={isMobile ? "sm" : "lg"}
          className="cursor-pointer"
        >
          <ChevronLeft /> Back
        </Button>
        <div className="space-x-2">
          <Button variant={'link'}  type="button" size={isMobile?"sm" : "lg"} onClick={()=>navigate('/templates')}>Skip</Button>
        <Button
          onClick={onSave}
          disabled={loading || !textareaValue}
          size={isMobile ? "sm" : "lg"}
          className="cursor-pointer"
        >
          {loading && <Loader2 className="animate-spin" />}
          <span className='max-sm:hidden'>Save & Continue</span> <span className='sm:hidden'>Save</span> <ChevronRight />
        </Button>
        </div>
      </div>
    </div>
  );
};

export default Summary;
