import React, { createContext, useContext, useEffect, useState } from 'react';

export const ResumeInfoContext = createContext();

export const ResumeInfoProvider = ({ children }) => {
    // Load state from localStorage on initial render
  const [resumeInfo, setResumeInfo] = useState(()=>{
    const savedData = localStorage.getItem('resumeInfo')
    return savedData ? JSON.parse(savedData) : {
      "contactInfo": {
        "firstName": "Michael",
        "lastName": "Chen",
        "email": "michael.chen@example.com",
        "city": "Toronto",
        "country": "Canada",
        "phoneNumber": "+1 (416) 987-6543",
        "linkedIn": "linkedin.com/in/michaelchen",
      },
      "summary": "Innovative data scientist with 5+ years of experience in machine learning and big data analytics. Specialized in developing predictive models and data-driven solutions for business challenges. Strong communicator with proven ability to translate complex technical concepts for non-technical stakeholders.",
      aiGeneratedSummaries: [],
      "skills": [
        "Python",
        "TensorFlow",
        "PyTorch",
        "SQL",
        "Big Data",
        "Data Visualization",
        "Cloud Computing",
        "Statistical Modeling"
      ],
      
      "experience": [
        {
          "jobTitle": "Lead Data Scientist",
          "company": "DataInsights Corp.",
          "startYear": "2019",
          "startMonth": "April",
          "endYear": "",
          "endMonth": "",
          "present": true,
          "description": "<ul><li><b>Lead a team</b> developing machine learning models for customer behavior prediction.</li><li>Implemented <b>new algorithms</b> that improved prediction accuracy by <u>35%</u>.</li></ul>"

        },
        {
          "jobTitle": "Data Analyst",
          "company": "Analytics Pro",
          "startYear": "2017",
          "startMonth": "January",
          "endYear": "2019",
          "endMonth": "March",
          "present": false,
          "description": "Performed data mining and analysis for client projects. Created automated reporting systems that reduced manual work by 60%."
        }
      ],
      "education": [
        {
          "institution": "University of Toronto",
          "degree": "Master of Science",
          "graduationMonth": "November",
          "graduationYear": "2016",
          "fieldOfStudy": "Data Science"
        },
        {
          "institution": "McGill University",
          "degree": "Bachelor of Science",
          "graduationMonth": "May",
          "graduationYear": "2014",
          "fieldOfStudy": "Statistics"
        }
      ],
      "projects": [
        {
          "title": "Sentiment Analysis Tool",
          "description": "Built a natural language processing system to analyze customer feedback sentiment across multiple channels.",
          "url": "github.com/michaelc/sentiment-analysis"
        },
        {
          "title": "Fraud Detection System",
          "description": "Developed a machine learning model to identify fraudulent transactions with 92% accuracy.",
          "url": "github.com/michaelc/fraud-detection"
        }
      ],
      "certifications": [
        {
          "name": "TensorFlow Developer Certificate",
          "organization": "Google",
          "issueMonth": "September",
          "issueYear": "2021"
        },
        {
          "name": "Microsoft Certified: Azure Data Scientist",
          "organization": "Microsoft",
          "issueMonth": "July",
          "issueYear": "2020"
        }
      ],
      "languages": [
        {
          "language": "English",
          "proficiency": "Native",
        },
        {
          "language": "Mandarin",
          "proficiency": "Fluent",
        },
        {
          "language": "French",
          "proficiency": "Intermediate",
        }
      ]
    }
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