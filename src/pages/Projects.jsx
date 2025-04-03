import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft, ChevronRight, MinusCircle, PlusCircle } from 'lucide-react';
import React from 'react';

const Projects = () => {
  return (
    <form className='space-y-4'>
      <div>
        <h2 className="text-2xl font-semibold">Projects</h2>
        <p className="lead">Add relevant projects you've worked on, including personal, academic, or professional projects. Include project title and a brief description.</p>
      </div>
      
      <div className="space-y-6">
        {/* Project Entry */}
        <div className="space-y-4 p-4 border rounded-lg">
          <div>
            <label className="text-sm font-medium tracking-wider">Project Title</label>
            <Input className="mt-2" placeholder="Enter project title" />
          </div>
          
          <div>
            <label className="text-sm font-medium tracking-wider">Description</label>
            <Textarea 
              className="mt-2 min-h-[100px]" 
              placeholder="Describe the project, your role, technologies used, and any notable achievements" 
            />
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <label className="text-sm font-medium tracking-wider">Project URL (optional)</label>
              <Input className="mt-2" placeholder="https://example.com" type="url" />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium tracking-wider">Date Completed (optional)</label>
              <Input className="mt-2" type="month" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button type="button" variant="default">
          <PlusCircle className="mr-2 h-4 w-4"/> Add Another Project
        </Button>
        <Button variant={'outline'} type="button">
          <MinusCircle className="mr-2 h-4 w-4"/> Remove This Project
        </Button>
      </div>

      <div className="flex justify-between">
        <Button
          type="button"
          variant="link"
          size="lg"
        >
          <ChevronLeft className="mr-2 h-4 w-4"/> Back
        </Button>
        <Button type="submit" size="lg">
          Next: Work Experience <ChevronRight className="ml-2 h-4 w-4"/>
        </Button>
      </div>
    </form>
  )
}

export default Projects;