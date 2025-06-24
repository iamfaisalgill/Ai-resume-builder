import React, { createContext, useContext, useEffect, useState } from 'react';

export const ResumeInfoContext = createContext();

export const ResumeInfoProvider = ({ children }) => {
    // Load state from localStorage on initial render
  const [resumeInfo, setResumeInfo] = useState(()=>{
    const savedData = localStorage.getItem('resumeInfo')
    return savedData ? JSON.parse(savedData) : {
      contactInfo: {
        firstName: "",
        lastName: "",
        email: "",
        city: "",
        country: "",
        phoneNumber: "",
        linkedIn: "",
        role: ""
      },
      summary: "",
      aiGeneratedSummaries: [],
      skills: [],
    
      experience: [
        {
          jobTitle: "",
          company: "",
          startYear: "",
          startMonth: "",
          endYear: "",
          endMonth: "",
          present: false,
          description: "",
        },
      ],
      education: [
        {
          institution: "",
          degree: "",
          graduationMonth: "",
          graduationYear: "",
          fieldOfStudy: "",
        },
      ],
    };
  });

    // Save state to localStorage whenever it changes
    useEffect(()=>{
        localStorage.setItem('resumeInfo', JSON.stringify(resumeInfo))
    },[resumeInfo])

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      {children}
    </ResumeInfoContext.Provider>
  );
};

export function useResume() {
  return useContext(ResumeInfoContext);
}


export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}