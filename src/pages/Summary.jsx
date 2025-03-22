import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import React from "react";

const Summary = () => {
  return (
    <div className="min-w-full p-7">
      <div className="mt-8 space-y-9 p-6 max-w-[980px] mx-auto bg-card rounded-lg">
        <div>
          <h2 className="text-2xl font-semibold">Summary</h2>
          <p className="lead">
            Briefly describe the value that you bring through your skills,
            background and experience.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <RichTextEditor/>
          </div>
          <div className="flex justify-center items-center bg-card">
  <div className="relative p-[1px] rounded-lg bg-gradient-to-r from-red-500 via-yellow-500 to-green-500">
    <div className="p-4 bg-card rounded-lg">
      <div className="flex items-center">
        <h3 className="text-sm font-bold bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 bg-clip-text text-transparent">
          AI Generated Summary
        </h3>
      </div>
      <p className="mt-6 text-sm">
        Accomplished Backend Developer at Netflix, adept at designing scalable architectures and enhancing application security through encryption protocols. Proficient in CI/CD pipeline configuration and mentoring teams on best practices. Strong debugging skills complement expertise in programming languages, driving efficient project delivery and robust system performance.
      </p>
      <div className="flex justify-between mt-6">
        <Button variant={'outline'}>Regenerate</Button>
        <Button>Use This</Button>
      </div>
    </div>
  </div>
</div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
