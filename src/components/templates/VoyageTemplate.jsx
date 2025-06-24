import { useResume } from "@/context/ResumeInfoContext";
import React from "react";

const VoyageTemplate = () => {
    const {resumeInfo} = useResume()
    const {
        contactInfo,
        summary,
        skills,
        experience,
        education,
        projects,
        certifications,
        languages,
      } = resumeInfo;

      const formatDateRange = (startMonth, startYear, endMonth, endYear, present) => {
        const start = `${startMonth} ${startYear}`;
        const end = present ? "Present" : `${endMonth} ${endYear}`;
        return `${start} - ${end}`;
      };
    
      const renderHTML = (html) => {
        return { __html: html };
      };
  
    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-yellow-400 p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                  {contactInfo.firstName}{" "}
                  <span className="text-yellow-700">
                    {contactInfo.lastName}
                  </span>
                </h1>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mt-1">
                  {contactInfo.role}
                </h2>
              </div>
              <div className="mt-4 md:mt-0 bg-yellow-300 rounded-lg p-3 shadow-inner">
                <ul className="text-sm text-gray-800 space-y-1">
                  <li>
                    <span className="font-medium">Location:</span>{" "}
                    {contactInfo.city}, {contactInfo.country}
                  </li>
                  <li>
                    <span className="font-medium">Phone:</span>{" "}
                    {contactInfo.phoneNumber}
                  </li>
                  <li>
                    <span className="font-medium">Email:</span>{" "}
                    {contactInfo.email}
                  </li>
                  <li>
                    <span className="font-medium">LinkedIn:</span>{" "}
                    {contactInfo.linkedIn}
                  </li>
                </ul>
              </div>
            </div>
          </div>
  
          {/* Main Content */}
          <div className="p-6 md:p-8 space-y-8">
            {/* Summary */}
            <section>
              <h3 className="text-xl font-bold text-yellow-700 border-b-2 border-yellow-200 pb-1 mb-3">
                Summary
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {summary}
              </p>
            </section>
  
            {/* Skills */}
            <section>
              <h3 className="text-xl font-bold text-yellow-700 border-b-2 border-yellow-200 pb-1 mb-3">
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
  
            {/* Experience */}
            <section>
              <h3 className="text-xl font-bold text-yellow-700 border-b-2 border-yellow-200 pb-1 mb-3">
                Experience
              </h3>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div key={index} className="border-l-4 border-yellow-300 pl-4">
                    <div className="flex flex-col md:flex-row md:justify-between">
                      <h4 className="text-lg font-bold text-gray-800">
                        {exp.jobTitle} at {exp.company}
                      </h4>
                      <span className="text-gray-600 font-medium">
                        {formatDateRange(
                          exp.startMonth,
                          exp.startYear,
                          exp.endMonth,
                          exp.endYear,
                          exp.present
                        )}
                      </span>
                    </div>
                    <div
                      className="mt-2 text-gray-700 list-disc pl-5 space-y-1"
                      dangerouslySetInnerHTML={renderHTML(exp.description)}
                    />
                  </div>
                ))}
              </div>
            </section>
  
            {/* Education */}
            <section>
              <h3 className="text-xl font-bold text-yellow-700 border-b-2 border-yellow-200 pb-1 mb-3">
                Education
              </h3>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="flex flex-col md:flex-row md:justify-between">
                    <div>
                      <h4 className="font-bold text-gray-800">
                        {edu.institution}
                      </h4>
                      <p className="text-gray-700">
                        {edu.degree} in {edu.fieldOfStudy}
                      </p>
                    </div>
                    <p className="text-gray-600 font-medium">
                      {edu.graduationMonth} {edu.graduationYear}
                    </p>
                  </div>
                ))}
              </div>
            </section>
  
            {/* Projects */}
            <section>
              <h3 className="text-xl font-bold text-yellow-700 border-b-2 border-yellow-200 pb-1 mb-3">
                Projects
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {projects.map((project, index) => (
                  <div
                    key={index}
                    className="bg-yellow-50 p-4 rounded-lg border border-yellow-100"
                  >
                    <h4 className="font-bold text-gray-800">{project.title}</h4>
                    <p className="text-gray-700 mt-1 mb-2">{project.description}</p>
                    <a
                      href={`https://${project.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-yellow-600 hover:text-yellow-700 text-sm font-medium"
                    >
                      View Project
                    </a>
                  </div>
                ))}
              </div>
            </section>
  
            {/* Certifications */}
            <section>
              <h3 className="text-xl font-bold text-yellow-700 border-b-2 border-yellow-200 pb-1 mb-3">
                Certifications
              </h3>
              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex justify-between">
                    <div>
                      <h4 className="font-bold text-gray-800">{cert.name}</h4>
                      <p className="text-gray-600">{cert.organization}</p>
                    </div>
                    <p className="text-gray-600 font-medium">
                      {cert.issueMonth} {cert.issueYear}
                    </p>
                  </div>
                ))}
              </div>
            </section>
  
            {/* Languages */}
            <section>
              <h3 className="text-xl font-bold text-yellow-700 border-b-2 border-yellow-200 pb-1 mb-3">
                Languages
              </h3>
              <div className="flex flex-wrap gap-4">
                {languages.map((lang, index) => (
                  <div key={index} className="bg-yellow-100 px-3 py-1 rounded-full">
                    <span className="font-medium text-gray-800">
                      {lang.language}:
                    </span>{" "}
                    <span className="text-gray-700">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    );
};

export default VoyageTemplate;