import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, MinusCircle, PlusCircle } from 'lucide-react';
import React from 'react';

const Languages = () => {
  return (
    <form className='space-y-4'>
      <div>
        <h2 className="text-2xl font-semibold">Languages</h2>
        <p className="lead">List the languages you speak and indicate your proficiency level for each.</p>
      </div>
      
      <div className="space-y-6">
        {/* Language Entry */}
        <div className="space-y-4 p-4 border rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium tracking-wider">Language</label>
              <Input className="mt-2" placeholder="e.g., Spanish" />
            </div>
            <div>
              <label className="text-sm font-medium tracking-wider">Proficiency Level</label>
              <Select>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select proficiency" />
                </SelectTrigger>
                <SelectContent>
                  {["Native", "Fluent", "Advanced", "Intermediate", "Basic", "Elementary"].map((level) => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label className="text-sm font-medium tracking-wider">Certification (Optional)</label>
              <Input className="mt-2" placeholder="e.g., DELE B2" />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium tracking-wider">Years of Experience (Optional)</label>
              <Input className="mt-2" type="number" placeholder="e.g., 5" min="0" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button type="button" variant="default">
          <PlusCircle className="mr-2 h-4 w-4"/> Add Another Language
        </Button>
        <Button variant={'outline'} type="button">
          <MinusCircle className="mr-2 h-4 w-4"/> Remove This Language
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
          Next: References <ChevronRight className="ml-2 h-4 w-4"/>
        </Button>
      </div>
    </form>
  )
}

export default Languages;