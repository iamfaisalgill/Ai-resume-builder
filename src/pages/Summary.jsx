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
import { useResume } from "@/context/ResumeInfoContext";
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

const Summary = ({ setPageIndex }) => {
  const { resumeInfo, setResumeInfo } = useResume();
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [textareaValue, setTextareaValue] = useState("" || resumeInfo.summary);
  const [isUsingAI, setIsUsingAI] = useState(false);
  const [aiGeneratedText, setAiGeneratedText] = useState(
    resumeInfo.aiGeneratedSummaries || []
  );
  const [aigeneratedSummary, setAigeneratedSummary] = useState(
    resumeInfo.aiGeneratedSummaries || []
  );
  const [loader, setLoader] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const navigate = useNavigate();

  const useThis = () => {
    setTextareaValue(aiGeneratedText[currentIndex]);
    setIsUsingAI(true);
  };

  const handleSelectOption = () => {
    setTextareaValue(aiGeneratedText[currentIndex]);
    setIsPopoverOpen(false);
  };

  const handleGoBack = () => {
    setPageIndex((prev) => prev - 1);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev < aiGeneratedText.length - 1 ? prev + 1 : prev
    );
  };

  const regenerateText = () => {
    // You would typically call an API here to regenerate texthji
    // For now, we'll just cycle through the existing options
    setCurrentIndex((prev) => (prev + 1) % aiGeneratedText.length);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTextareaValue(value);
    setIsUsingAI(false);
  };

  const onSave = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResumeInfo((prevInfo) => ({ ...prevInfo, summary: textareaValue }));
      setLoading(false);
      navigate("/select-theme");
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
    }
  };

  useEffect(() => {
    if (aigeneratedSummary.length == 0) {
      handleGenerate();
    }
  }, []);

  const navigateAiOptions = (direction) => {
    setCurrentIndex((prev) => {
      if (direction === "prev")
        return prev === 0 ? aiGeneratedText.length - 1 : prev - 1;
      return prev === aiGeneratedText.length - 1 ? 0 : prev + 1;
    });
  };

  return (
    <div className="space-y-6">
      {/* Header remains the same */}
      <div>
        <h2 className="text-2xl font-semibold">Summary</h2>
        <p className="text-muted-foreground">
          Briefly describe the value that you bring through your skills,
          background and experience.
        </p>
      </div>

      <div className="space-y-4">
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
                size={'sm'}
                type="button"
                className="gap-2 dark:hover:bg-transparent !border-primary hover:brightness-110 hover:scale-102"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                ) : (
                  <Sparkles className="text-blue-500" />
                )}
                {loading ? (
                  <span class="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
                    Generating...
                  </span>
                ) : (
                  <span class="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
                    Generate with AI
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[480px] p-4" align="end">
              {aiGeneratedText.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigateAiOptions("prev")}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <div className="flex-1 px-4 min-h-[120px] flex items-center">
                      <p className="text-sm">{aiGeneratedText[currentIndex]}</p>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigateAiOptions("next")}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      Option {currentIndex + 1} of {aiGeneratedText.length}
                    </span>
                    <Button onClick={handleSelectOption}>
                      Use this version
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
          className="min-h-[200px] text-base"
        />
      </div>

      {/* Footer buttons remain the same */}
      <div className="flex justify-between">
        <Button variant="ghost" onClick={handleGoBack}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={onSave} disabled={loading || !textareaValue}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save & Continue
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Summary;
