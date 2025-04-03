import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, MinusCircle, PlusCircle } from 'lucide-react';
import React from 'react';

const Certifications = () => {
  return (
    <form className='space-y-4'>
      <div>
        <h2 className="text-2xl font-semibold">Certifications</h2>
        <p className="lead">List your professional certifications, including the certifying organization, certification name, and date earned.</p>
      </div>
      
      <div className="space-y-6">
        {/* Certification Entry */}
        <div className="space-y-4 p-4 border rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium tracking-wider">Certification Name</label>
              <Input className="mt-2" placeholder="e.g., AWS Certified Solutions Architect" />
            </div>
            <div>
              <label className="text-sm font-medium tracking-wider">Issuing Organization</label>
              <Input className="mt-2" placeholder="e.g., Amazon Web Services" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium tracking-wider">Credential ID (Optional)</label>
            <Input className="mt-2" placeholder="Enter your certification ID or license number" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium tracking-wider">Issue Date</label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {["January", "February", "March", "April", "May", "June", 
                      "July", "August", "September", "October", "November", "December"].map((month) => (
                      <SelectItem key={month} value={month}>{month}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                      <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium tracking-wider">Expiration Date (If applicable)</label>
              <Input className="mt-2" type="month" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium tracking-wider">Credential URL (Optional)</label>
            <Input className="mt-2" placeholder="https://example.com/verify" type="url" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button type="button" variant="default">
          <PlusCircle className="mr-2 h-4 w-4"/> Add Another Certification
        </Button>
        <Button variant={'outline'} type="button">
          <MinusCircle className="mr-2 h-4 w-4"/> Remove This Certification
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
          Next: Skills <ChevronRight className="ml-2 h-4 w-4"/>
        </Button>
      </div>
    </form>
  )
}

export default Certifications;