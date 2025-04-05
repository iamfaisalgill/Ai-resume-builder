import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Loader2, Trash } from "lucide-react";
import { useResume } from "@/context/ResumeInfoContext";
import { generateResumeSummaries } from "@/services/geminiService";

const Skills = ({setPageIndex}) => {

  const {resumeInfo, setResumeInfo} = useResume()
  

  const [loading, setLoading] = useState(false)
  const [skills, setSkills] = useState(
    resumeInfo.skills.length>0? resumeInfo.skills : []
  );
  const [inputValue, setInputValue] = useState("");


  const addSkill = () => {
    if (inputValue.trim() !== "" && !skills.includes(inputValue)) {
      setSkills([...skills, inputValue]);
      setInputValue("");
    }
  };

  useEffect(() => {
    
  console.log({skills: skills})
   
  }, [skills])
  

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addSkill();
    }
  }

  const handleGoBack = () => {
    setPageIndex(prev=>prev-1)
  }

  const onSave = async (e) =>{
    e.preventDefault()
    setLoading(true)

    await new Promise(resolve=>setTimeout(resolve, 1000))
   
    setResumeInfo((prev)=>({
      ...prev,
      skills: skills
    }))
    /*if (resumeInfo.aiGeneratedSummaries.length == 0) {
      const results = await generateResumeSummaries(resumeInfo);
      setResumeInfo(prev=>({...prev, aiGeneratedSummaries: results}))
    }
    await new Promise(resolve=>setTimeout(resolve, 1000))*/
    setLoading(false)
    setPageIndex(prev=>prev+1)
  }
  

  return (
    <div className='space-y-9'>
      <div>
        <h2 className="text-2xl font-semibold">Skills</h2>
        <p className="lead">Add a few skills to show employers you’re good in your field.</p>
      </div>
      <div className="flex gap-2 mb-4 text-lg">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a skill"
          className='!text-lg'
          onKeyDown={handleKeyDown}
        />
        <Button onClick={addSkill} type="button" className='h-auto !text-lg' >Add Skill</Button>
      </div>
      <Card>
        <CardContent className="p-4 flex flex-wrap gap-2">
          {skills.length > 0 ? (
            skills.map((skill) => (
              <Badge variant={'secondary'} key={skill} className="flex items-center gap-2 p-2">
                {skill}
                <div
                    className="cursor-pointer text-red-500"
                    onClick={() => removeSkill(skill)}
                  >
                    <Trash size={16} />
                  </div>
              </Badge>
            ))
          ) : (
            <p className="text-gray-500">No skills added yet.</p>
          )}
        </CardContent>
      </Card>
      <div className='flex justify-between'>
            <Button onClick={handleGoBack} type="button" variant="link" size="lg" className="cursor-pointer"><ChevronLeft /> Back</Button>
            <Button onClick={onSave} disabled={loading} type="submit" size="lg" className="cursor-pointer">
            {loading && <Loader2 className="animate-spin" /> }
            Next: Summary <ChevronRight /></Button>
          </div>
    </div>
  )
}

export default Skills
