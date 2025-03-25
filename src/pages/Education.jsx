import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import React, { useState } from 'react'

const Education = ({setPageIndex}) => {
  const [loading, setLoading] = useState(false)


  const handleGoBack = () => {
    setPageIndex(2)
  };
  return (
    <div>
      Education
      <div className="flex justify-between">
        <Button
          onClick={handleGoBack}
          type="button"
          variant="link"
          size="lg"
          className="cursor-pointer"
        >
          <ChevronLeft /> Back
        </Button>
        <Button disabled={loading} type="submit" size="lg" className="cursor-pointer">
        {loading && <Loader2 className="animate-spin" /> }
          Next: Education <ChevronRight />
        </Button>
      </div>
    </div>
  )
}

export default Education
