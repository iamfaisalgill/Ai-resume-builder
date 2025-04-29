import { useResume } from "@/context/ResumeInfoContext";
import React from "react";


// Template name: stalwart
const StalwartTheme = () => {

  const { resumeInfo } = useResume()

  return (
    <div className="bg-white max-w-4xl text-black p-4 sm:p-6 md:p-8 mx-auto font-sans">
  <h1 className="text-2xl md:text-3xl font-bold uppercase">{resumeInfo.firstName} {resumeInfo.lastName}</h1>
  <p className="text-xs sm:text-sm text-gray-600">{resumeInfo.city}, {resumeInfo.country} • {resumeInfo.phoneNumber} • {resumeInfo.email} • {resumeInfo.linkedIn}</p>

  <div className="mt-4 sm:mt-6 md:mt-8">
    <h2 className="text-base md:text-lg font-bold bg-gray-200 p-1 sm:p-2">PROFESSIONAL SUMMARY</h2>
    <p className="mt-1 sm:mt-2 text-xs sm:text-sm">
      {resumeInfo.summary}
    </p>
  </div>

  <div className="mt-4 sm:mt-6 md:mt-8">
    <h2 className="text-base md:text-lg font-bold bg-gray-200 p-1 sm:p-2">TECHNICAL SKILLS</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 sm:gap-2 text-xs sm:text-sm mt-1 sm:mt-2">
      {resumeInfo.skills.map((skill, index) => (
        <p key={index}>• {skill}</p>
      ))}
    </div>
  </div>

  <div className="mt-4 sm:mt-6 md:mt-8">
    <h2 className="text-base md:text-lg font-bold bg-gray-200 p-1 sm:p-2">PROFESSIONAL EXPERIENCE</h2>

    {resumeInfo.experience.map((exp, index) => (
      <div key={index} className="mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm font-bold mt-1 sm:mt-2">
          <p>{exp.jobTitle}</p>
          <p>{exp.company}, {exp.startMonth} {exp.startYear} - {exp.present ? "Present" : `${exp.endMonth} ${exp.endYear}`}</p>
        </div>
        <p className="text-xs sm:text-sm">{exp.company}</p>
        <p className="text-xs sm:text-sm">• {exp.description}</p>
      </div>
    ))}
  </div>

  <div className="mt-4 sm:mt-6 md:mt-8">
    <h2 className="text-base md:text-lg font-bold bg-gray-200 p-1 sm:p-2">EDUCATION</h2>
    {resumeInfo.education.map((edu, index) => (
      <React.Fragment key={index}>
        <div className="flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm font-bold mt-1 sm:mt-2">
          <p>{edu.degree} in {edu.fieldOfStudy}</p>
          <p>{edu.graduationMonth} {edu.graduationYear}</p>
        </div>
        <p className="text-xs sm:text-sm">{edu.institution}</p>
      </React.Fragment>
    ))}
  </div>

  <div className="mt-4 sm:mt-6 md:mt-8">
    <h2 className="text-base md:text-lg font-bold bg-gray-200 p-1 sm:p-2">CERTIFICATIONS</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2 text-xs sm:text-sm mt-1 sm:mt-2">
      {resumeInfo.certifications.map((cert, index) => (
        <p key={index}>• {cert.name} ({cert.issueYear})</p>
      ))}
    </div>
  </div>

  <div className="mt-4 sm:mt-6 md:mt-8">
    <h2 className="text-base md:text-lg font-bold bg-gray-200 p-1 sm:p-2">PROJECTS</h2>
    <div className="text-xs sm:text-sm mt-1 sm:mt-2">
      {resumeInfo.projects.map((project, index) => (
        <div className="mt-1 sm:mt-2" key={index}>
          <p className="font-bold">{project.title}</p>
          <p>{project.description}</p>
        </div>
      ))}
    </div>
  </div>

  <div className="mt-4 sm:mt-6 md:mt-8">
    <h2 className="text-base md:text-lg font-bold bg-gray-200 p-1 sm:p-2">LANGUAGES</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 sm:gap-2 text-xs sm:text-sm mt-1 sm:mt-2">
      {resumeInfo.languages.map((lang, index) => (
        <p key={index} className="font-bold mt-1 sm:mt-2 text-xs sm:text-sm">{lang.language} ({lang.proficiency})</p>
      ))}
    </div>
  </div>
</div>
  );
};

export default StalwartTheme;