import { useResume } from "@/context/ResumeInfoContext";
import React from "react";

// template name: Halley
const HalleyTheme = () => {

  const {resumeInfo} = useResume()
  return (
    <div className="mx-auto bg-white max-w-4xl text-[10px] sm:text-sm md:text-base">
      <div className="flex">
        {/* Main Content (Left 3/4) */}
        <div className="w-3/4 p-4 sm:p-6 md:p-8 lg:p-10">
          {/* Name/Logo Section */}
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 text-[#5F6A8A]">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 flex items-center justify-center border-2 border-[#5F6A8A] rotate-45">
              <div className="absolute w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 border-2 border-[#5F6A8A] -rotate-45"></div>
              <span className="text-base sm:text-xl md:text-2xl lg:text-3xl font-serif font-bold -rotate-45">
                {resumeInfo.firstName.charAt(0)}{resumeInfo.lastName.charAt(0)}
              </span>
            </div>
            <div className="font-serif font-bold text-[#5F6A8A]">
              <p className="text-base sm:text-xl md:text-3xl lg:text-4xl leading-none uppercase">{resumeInfo.firstName}</p>
              <p className="text-base sm:text-xl md:text-3xl lg:text-4xl leading-none uppercase">{resumeInfo.lastName}</p>
            </div>
          </div>
          
          {/* Professional Summary */}
          <div className="mt-5 lg:mt-7">
            <h2 className="text-[11px] sm:text-base md:text-lg font-bold text-[#5F6A8A] pb-1 border-b border-[#5F6A8A]">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-gray-700 mt-1 sm:mt-1.5 md:mt-2">
              {resumeInfo.summary}
            </p>
          </div>
          
          {/* Experience */}
          <div className="mt-3 sm:mt-4 md:mt-5 lg:mt-6">
            <h2 className="text-[11px] sm:text-base md:text-lg font-bold text-[#5F6A8A] pb-1 border-b border-[#5F6A8A]">EXPERIENCE</h2>
            
            {resumeInfo.experience.map((exp, index) => (
              <div key={index} className="mb-2 sm:mb-3 md:mb-4 mt-1 sm:mt-1.5 md:mt-2">
              <p className="font-bold text-gray-900">{exp.jobTitle}</p>
                <p className="text-gray-700">
                  {exp.company} | {exp.startMonth} {exp.startYear} - {exp.present ? "Present" : `${exp.endMonth} ${exp.endYear}`}
                </p>
                {exp.description && <p className="text-gray-700 mt-1">• {exp.description}</p>}
              </div>
            ))}
          </div>
          
          {/* Projects */}
          {resumeInfo.projects && <div className="mt-3 sm:mt-4 md:mt-5 lg:mt-6">
            <h2 className="text-[11px] sm:text-base md:text-lg font-bold text-[#5F6A8A] pb-1 border-b border-[#5F6A8A]">PROJECTS</h2>
            {resumeInfo.projects.map((project, index) => (
              <div key={index} className="mb-2 sm:mb-3 md:mb-4 mt-1 sm:mt-1.5 md:mt-2">
                <p className="font-bold text-gray-900">{project.title}</p>
                <p className="text-gray-700">{project.description}
                </p>
              </div>
            ))}
          </div>}
          
          {/* Education */}
          <div className="mt-3 sm:mt-4 md:mt-5 lg:mt-6">
            <h2 className="text-[11px] sm:text-base md:text-lg font-bold text-[#5F6A8A] pb-1 border-b border-[#5F6A8A]">EDUCATION</h2>
            {resumeInfo.education.map((edu, index) => (
              <div key={index} className="mt-1 sm:mt-1.5 md:mt-2">
                <p className="font-bold text-gray-900">
                  {edu.degree} - {edu.fieldOfStudy}
                </p>
                <p className="text-gray-700">{edu.institution}</p>
                {edu.graduationMonth && <p className="text-gray-500">{edu.graduationMonth} {edu.graduationYear}</p>}
                {index < resumeInfo.education.length - 1 && (
                  <div className="mt-1 sm:mt-1.5 md:mt-2"></div>
                )}
              </div>
            ))}
          </div>
          
          {/* Languages */}
          {resumeInfo.languages && <div className="mt-3 sm:mt-4 md:mt-5 lg:mt-6">
            <h2 className="text-[11px] sm:text-base md:text-lg font-bold text-[#5F6A8A] pb-1 border-b border-[#5F6A8A]">LANGUAGES</h2>
            {resumeInfo.languages.map((lang, index) => (
              <p key={index} className="text-gray-700 mt-1 sm:mt-1.5 md:mt-2">
                {lang.language} - {lang.proficiency}
              </p>
            ))}
          </div>}
        </div>
        
        {/* Sidebar (Right 1/4) */}
        <div className="w-1/4 bg-[#5F6A8A] text-white text-[10px] sm:text-sm p-2 sm:p-3 md:p-5 lg:p-4 overflow-hidden">
        <p className="break-words">{resumeInfo.city}, {resumeInfo.country}</p>
        <p className="mt-1 sm:mt-2 md:mt-3 break-words">{resumeInfo.phoneNumber}</p>
        <p className="mt-1 sm:mt-2 md:mt-3 max-md:break-all">{resumeInfo.email}</p>
        <p className="mt-1 sm:mt-2 md:mt-3 max-md:break-all">{resumeInfo.linkedIn}</p>
        {resumeInfo.github && (
          <p className="mt-1 sm:mt-2 md:mt-3 break-all">{resumeInfo.github}</p>
        )}

          <h2 className="mt-3 sm:mt-4 md:mt-5 lg:mt-6 font-bold">TECHNICAL SKILLS</h2>
          <ul className="mt-1 sm:mt-1.5 md:mt-2 space-y-1">
            {resumeInfo.skills.map((skill, index) => (
              <li key={index}>• {skill}</li>
            ))}
          </ul>

          {resumeInfo.certifications && (
            <>
              <h2 className="mt-3 sm:mt-4 md:mt-5 lg:mt-6 font-bold">CERTIFICATIONS</h2>
              <ul className="mt-1 sm:mt-1.5 md:mt-2 space-y-1">
                {resumeInfo.certifications.map((cert, index) => (
                  <li key={index}>• {cert.name} ({cert.issueYear})</li>
                ))}
              </ul>
            </>
          )}

          {resumeInfo.volunteer && (
            <>
              <h2 className="mt-3 sm:mt-4 md:mt-5 lg:mt-6 font-bold">VOLUNTEER</h2>
              <p className="mt-1 sm:mt-1.5 md:mt-2">{resumeInfo.volunteer.organization}</p>
              <p>{resumeInfo.volunteer.role} ({resumeInfo.volunteer.duration})</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HalleyTheme;