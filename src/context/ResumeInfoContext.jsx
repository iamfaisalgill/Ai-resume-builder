import React, { createContext, useContext, useEffect, useState } from 'react';

export const ResumeInfoContext = createContext();

export const ResumeInfoProvider = ({ children }) => {
    // Load state from localStorage on initial render
  const [resumeInfo, setResumeInfo] = useState(()=>{
    const savedData = localStorage.getItem('resumeInfo')
    return savedData ? JSON.parse(savedData) : {
      "firstName": "Emily",
      "lastName": "Johnson",
      "email": "emily.johnson@example.com",
      "city": "Seattle",
      "country": "United States",
      "phoneNumber": "+1 (555) 123-4567",
      "experience": [
        {
          "jobTitle": "Senior Software Engineer",
          "company": "TechSolutions Inc.",
          "startYear": "2018",
          "startMonth": "June",
          "endYear": "",
          "endMonth": "",
          "present": true,
          "description": "Lead development team building scalable web applications using React and Node.js. Implemented CI/CD pipelines reducing deployment time by 40%."
        },
        {
          "jobTitle": "Software Developer",
          "company": "Digital Innovations LLC",
          "startYear": "2015",
          "startMonth": "August",
          "endYear": "2018",
          "endMonth": "May",
          "present": false,
          "description": "Developed and maintained e-commerce platforms. Optimized database queries improving system performance by 25%."
        }
      ],
      "education": [
        {
          "institution": "University of Washington",
          "degree": "Master of Science",
          "graduationMonth": "May",
          "graduationYear": "2015",
          "fieldOfStudy": "Computer Science"
        },
        {
          "institution": "Stanford University",
          "degree": "Bachelor of Science",
          "graduationMonth": "June",
          "graduationYear": "2013",
          "fieldOfStudy": "Software Engineering"
        }
      ],
      "projects": [
        {
          "title": "Task Management App",
          "description": "Developed a full-stack task management application with user authentication and real-time updates.",
          "url": "github.com/emilyj/task-manager"
        },
        {
          "title": "Health Tracker Dashboard",
          "description": "Created a data visualization dashboard for fitness metrics using D3.js and React.",
          "url": "healthtracker.example.com"
        }
      ],
      "certifications": [
        {
          "name": "AWS Certified Solutions Architect",
          "organization": "Amazon Web Services",
          "issueMonth": "November",
          "issueYear": "2020"
        },
        {
          "name": "Google Professional Data Engineer",
          "organization": "Google Cloud",
          "issueMonth": "March",
          "issueYear": "2019"
        },
        
      ],
      "languages": [
        {
          "language": "English",
          "proficiency": "Native",
          "certification": "",
          "yearsOfExperience": ""
        },
        {
          "language": "Spanish",
          "proficiency": "Intermediate",
          "certification": "DELE B2",
          "yearsOfExperience": "5"
        }
      ],
      "skills": [
        "JavaScript",
        "React",
        "Node.js",
        "Python",
        "AWS",
        "Docker",
        "SQL",
        "Agile Methodologies"
      ],
      "summary": "Results-driven software engineer with 7+ years of experience in full-stack development. Passionate about building scalable, efficient systems and mentoring junior developers. Strong problem-solving skills with expertise in cloud technologies and modern web frameworks.",
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