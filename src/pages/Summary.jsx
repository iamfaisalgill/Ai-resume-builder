import LoaderComponent from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useResume } from "@/context/ResumeInfoContext";
import { generateResumeSummaries } from "@/services/geminiService";
import {
  Brain,
  Check,
  ChevronLeft,
  ChevronRight,
  Info,
  Loader2,
  RefreshCcw,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Summary = ({ setPageIndex }) => {
  const { resumeInfo, setResumeInfo } = useResume();
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [textareaValue, setTextareaValue] = useState("" || resumeInfo.summary);
  const [isUsingAI, setIsUsingAI] = useState(false);
  const [aiGeneratedText, setAiGeneratedText] = useState(
    resumeInfo.aiGeneratedSummaries || []
  );
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate()

  const useThis = () => {
    setTextareaValue(aiGeneratedText[currentIndex]);
    setIsUsingAI(true);
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
      navigate('/select-theme')
    }, 1000);
  };

  const handleGenerate = async () => {
    try {
      setLoader(true)
      const results = await generateResumeSummaries(resumeInfo);
      setResumeInfo((prev) => ({ ...prev, aiGeneratedSummaries: results }));
      setAiGeneratedText(results);
      setLoader(false)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    if (resumeInfo.aiGeneratedSummaries.length==0) {
      handleGenerate()  
    }
  }, [])

  return (
    <div className="space-y-">
      <div>
        <h2 className="text-2xl font-semibold">Summary</h2>
        <p className="lead">
          Briefly describe the value that you bring through your skills,
          background and experience.
        </p>
      </div>
      <div className="mt-9">
        {isUsingAI && (
          <p className="text-sm text-muted-foreground my-2">
            Using AI-generated summary #{currentIndex + 1}
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Textarea
            value={textareaValue}
            onChange={handleChange}
            name="summary"
            placeholder="Write a short summary telling more about yourself, your strengths and experience."
            className="!text-[16px] resize-none min-h-64"
          />

          <div className="flex justify-center items-center bg-card min-h-64">
            <div className="min-h-64 relative p-[1px] rounded-lg bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 w-full">
              <div className="flex flex-col p-4 bg-card rounded-lg h-full min-h-80">
                <div className="flex items-center">
                  <h3 className="text-lg font-bold bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 bg-clip-text text-transparent">
                    AI Generated Summary
                  </h3>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="ml-1.5 size-4 self-center text-green-500" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-lg text-sm shadow font-medium">
                        <p>Our <span className="text-primary">AI Builder</span> can generate your <span className="text-primary">Professional Summary</span> text based on your work history and skills. You can regenerate up to 3 personalized summaries.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className={loader? "flex items-center justify-center mb-6 mt-3 flex-1 min-h-44 max-h-48" : "mb-6 mt-3 flex-1 min-h-44 max-h-48 overflow-y-auto"}>
                {
                  loader?<LoaderComponent/> : aiGeneratedText[currentIndex]
                }
                   
                {/* { aiGeneratedText[currentIndex]} */}
                </div>
                <div className=" flex justify-between">
                  <Button disabled={loader} variant="outline" onClick={handleGenerate}>
                    <Brain /> Regenerate
                  </Button>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="size-7 !p-2 rounded-full cursor-pointer"
                      onClick={handlePrevious}
                      disabled={currentIndex === 0 || loader}
                    >
                      <ChevronLeft />
                    </Button>
                    <span className="text-sm">
                      {currentIndex + 1}/{aiGeneratedText.length}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="size-7 !p-2 rounded-full cursor-pointer"
                      onClick={handleNext}
                      disabled={currentIndex === aiGeneratedText.length - 1 || loader}
                    >
                      <ChevronRight />
                    </Button>
                  </div>
                  <Button onClick={useThis}>
                    <Check className="h-4 w-4" /> Use This
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-9 flex justify-between">
        <Button
          onClick={handleGoBack}
          type="button"
          variant="link"
          size="lg"
          className="cursor-pointer"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button
          onClick={onSave}
          disabled={loading || !textareaValue}
          type="submit"
          size="lg"
          className="cursor-pointer"
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save & Next <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Summary;
