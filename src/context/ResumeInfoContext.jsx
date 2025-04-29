import React, { createContext, useContext, useEffect, useState } from 'react';

export const ResumeInfoContext = createContext();

export const ResumeInfoProvider = ({ children }) => {
    // Load state from localStorage on initial render
  const [resumeInfo, setResumeInfo] = useState(()=>{
    const savedData = localStorage.getItem('resumeInfo')
    return savedData ? JSON.parse(savedData) : {
      "firstName": "",
      "lastName": "",
      "email": "",
      "city": "",
      "country": "",
      "phoneNumber": "",
      "linkedIn": "",
      "experience": [
        {
          "jobTitle": "",
          "company": "",
          "startYear": "",
          "startMonth": "",
          "endYear": "",
          "endMonth": "",
          "present": true,
          "description": ""
        },
        {
          "jobTitle": "",
          "company": "",
          "startYear": "",
          "startMonth": "",
          "endYear": "",
          "endMonth": "",
          "present": false,
          "description": ""
        }
      ],
      "education": [
        {
          "institution": "",
          "degree": "",
          "graduationMonth": "",
          "graduationYear": "",
          "fieldOfStudy": ""
        },
        {
          "institution": "",
          "degree": "",
          "graduationMonth": "",
          "graduationYear": "",
          "fieldOfStudy": ""
        }
      ],
      "skills": [],
      "summary": "",
      aiGeneratedSummaries: []
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