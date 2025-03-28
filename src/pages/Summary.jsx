import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, ChevronLeft, ChevronRight, Loader2, RefreshCcw } from "lucide-react";
import React, { useState } from "react";

const aiGeneratedText = [
  "Accomplished Backend Developer at Netflix, adept at designing scalable architectures and enhancing application security through encryption protocols. Proficient in CI/CD pipeline configuration and mentoring teams on best practices. Strong debugging skills complement expertise in programming languages, driving efficient project delivery and robust system performance.",
  "Dynamic Backend Developer at Devsinc with a proven track record in optimizing database performance and implementing robust APIs. Skilled in cloud computing and fostering teamwork, I excel in agile environments, driving project success through effective communication and problem-solving. Passionate about delivering high-quality solutions that enhance user experience and system efficiency.",
  "Results-driven Backend Developer at Devsinc with expertise in performance optimization and API implementation. Demonstrated strong problem-solving abilities while enhancing application efficiency and participating in agile processes. Proficient in cloud computing and skilled in fostering teamwork to achieve project goals. Committed to delivering high-quality solutions in fast-paced environments.",
];

const Summary = ({ setPageIndex }) => {
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [textareaValue, setTextareaValue] = useState("");
  const [isUsingAI, setIsUsingAI] = useState(false);

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
    setCurrentIndex((prev) => (prev < aiGeneratedText.length - 1 ? prev + 1 : prev));
  };

  const regenerateText = () => {
    // You would typically call an API here to regenerate texthji
    // For now, we'll just cycle through the existing options
    setCurrentIndex((prev) => (prev + 1) % aiGeneratedText.length);
  };

  const onSave = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setPageIndex((prev) => prev + 1);
    }, 1000);
  };

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
              onChange={(e) => {
                setTextareaValue(e.target.value);
                setIsUsingAI(false);
              }}
              placeholder="Write a short summary telling more about yourself, your strengths and experience."
              className="!text-[16px] resize-none min-h-64"
            />
          
          <div className="flex justify-center items-center bg-card min-h-64">
            <div className="min-h-64 relative p-[1px] rounded-lg bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 w-full">
              <div className="p-4 bg-card rounded-lg h-full">
                <div className="flex items-center">
                  <h3 className="text-lg font-bold bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 bg-clip-text text-transparent">
                    AI Generated Summary
                  </h3>
                </div>
                <p className="mt-6 min-h-32">{aiGeneratedText[currentIndex]}</p>
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={regenerateText}>
                    <RefreshCcw className="mr-2 h-4 w-4" /> Regenerate
                  </Button>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="size-7 !p-2 rounded-full cursor-pointer"
                      onClick={handlePrevious}
                      disabled={currentIndex === 0}
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
                      disabled={currentIndex === aiGeneratedText.length - 1}
                    >
                      <ChevronRight />
                    </Button>
                  </div>
                  <Button onClick={useThis}>
                    <Check className="mr-2 h-4 w-4" /> Use This
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
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <ChevronRight className="mr-2 h-4 w-4" />
          )}
          Save & Next
        </Button>
      </div>
    </div>
  );
};

export default Summary;