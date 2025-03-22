import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Loader2, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Skills = () => {

  const [loading, setLoading] = useState(false)
  const [skills, setSkills] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const navigate = useNavigate()

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
    navigate('/resumebuild/summary')
  }
  

  return (
    <div className='min-w-full p-7'>
      <div className='mt-8 space-y-9 p-6 max-w-[980px] mx-auto bg-card rounded-lg'>
      <h2 className="text-2xl font-bold mb-4">Skills</h2>
      <div className="flex gap-2 mb-4">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter a skill"
        />
        <Button onClick={addSkill} className='h-auto' >Add Skill</Button>
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
            <Button disabled={loading} size="lg" className="cursor-pointer">
            {loading && <Loader2 className="animate-spin" /> }
            Next: Summary <ChevronRight /></Button>
          </div>
      </div>
    </div>
  )
}

export default Skills
