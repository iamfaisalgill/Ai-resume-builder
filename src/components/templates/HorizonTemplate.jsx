import { useResume } from "@/context/ResumeInfoContext";
import {
  Edit,
  Trash2,
} from "lucide-react";
import React from "react";

const HorizonTemplate = ({ deleteItem, editItem }) => {
  const { resumeInfo } = useResume();
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

  return (
    <div className="max-w-4xl min-h-[1122px] shadow-lg rounded-lg mx-auto my-8 bg-white">
      {/* Clean Header */}
      <div className="c-info relative bg-gray-800 text-white p-8 rounded-t-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold">
              <span
                className={!contactInfo.firstName && "text-gray-400 italic"}
              >
                {contactInfo.firstName || "First Name"}
              </span>{" "}
              <span
                className={`text-gray-300 ${
                  !contactInfo.lastName && "text-gray-400 italic"
                }`}
              >
                {contactInfo.lastName || "Last Name"}
              </span>
            </h1>
            {/* Optional: Title field
    <h2 className={`text-gray-300 mt-1 text-lg ${!contactInfo.title && 'text-gray-400 italic'}`}>
      {contactInfo.title || 'Your Profession'}
    </h2>
    */}
          </div>
          <div className="mt-4 md:mt-0 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
              <span className={!contactInfo.email && "text-gray-400 italic"}>
                {contactInfo.email || "email@example.com"}
              </span>
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
              <span
                className={!contactInfo.phoneNumber && "text-gray-400 italic"}
              >
                {contactInfo.phoneNumber || "+1 (123) 456-7890"}
              </span>
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
              <span
                className={
                  !contactInfo.city && !contactInfo.country
                    ? "text-gray-400 italic"
                    : ""
                }
              >
                {contactInfo.city || (contactInfo.country ? "" : "City")}
                {contactInfo.city && contactInfo.country ? ", " : ""}
                {contactInfo.country || (contactInfo.city ? "" : ", Country")}
              </span>
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
              {contactInfo.linkedIn ? (
                <p>{contactInfo.linkedIn}</p>
              ) : (
                <span className="text-gray-400 italic">
                  linkedin.com/in/your-profile
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="edit hidden absolute -right-1 -top-1 p-1">
          <div className="flex gap-1.5 sm:gap-3 bg-gray-900">
            <button
              className="text-white p-0.5 sm:p-1 text-[8px] sm:text-xs flex justify-center items-center gap-1 sm:gap-2 cursor-pointer hover:text-primary"
              onClick={() => editItem("Contact information")}
            >
              <Edit className="size-2 sm:size-4" /> Edit
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row">
        {/* Left Column - 35% width */}
        <div className="lg:w-[35%] p-6 border-r border-gray-200">
          {/* Summary */}
          {(summary || summary === "") && (
            <section className="c-info relative mb-8">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-3">
                Professional Summary
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">{summary}</p>
              <div className="edit hidden absolute -right-1 -top-1 p-1">
                <div className="flex gap-1.5 sm:gap-3 bg-gray-900">
                  <button
                    className="text-white p-0.5 sm:p-1 text-[8px] sm:text-xs flex justify-center items-center gap-1 sm:gap-2 cursor-pointer hover:text-primary"
                    onClick={() => editItem("Professional Summary")}
                  >
                    <Edit className="size-2 sm:size-4" /> Edit
                  </button>
                  <button
                    className="text-white p-0.5 sm:p-1 text-[8px] sm:text-xs flex justify-center items-center gap-1 sm:gap-2 cursor-pointer hover:text-red-500"
                    onClick={() => deleteItem("Professional Summary")}
                  >
                    <Trash2 className="size-2 sm:size-4" /> Delete
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* Skills */}
          {skills && (
            <section className="c-info relative mb-8">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-3">
                Skills
              </h3>
              <div className="space-y-2">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-gray-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                    <span className="text-gray-700 text-sm">{skill}</span>
                  </div>
                ))}
              </div>
              <div className="edit hidden absolute -right-1 -top-1 p-1">
                <div className="flex gap-1.5 sm:gap-3 bg-gray-900">
                  <button
                    className="text-white p-0.5 sm:p-1 text-[8px] sm:text-xs flex justify-center items-center gap-1 sm:gap-2 cursor-pointer hover:text-primary"
                    onClick={() => editItem("Skills")}
                  >
                    <Edit className="size-2 sm:size-4" /> Edit
                  </button>
                  <button
                    className="text-white p-0.5 sm:p-1 text-[8px] sm:text-xs flex justify-center items-center gap-1 sm:gap-2 cursor-pointer hover:text-red-500"
                    onClick={() => deleteItem("Skills")}
                  >
                    <Trash2 className="size-2 sm:size-4" /> Delete
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* Education */}
          {education && (
            <section className="c-info relative mb-8">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-3">
                Education
              </h3>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index}>
                    {edu.institution && (
                      <h4 className="font-semibold text-gray-800 text-sm">
                        {edu.institution}
                      </h4>
                    )}
                    {edu.degree && (
                      <p className="text-gray-600 text-sm">{edu.degree}</p>
                    )}
                    {(edu.graduationMonth || edu.graduationYear) && (
                      <p className="text-gray-500 text-xs mt-1">
                        {edu.graduationMonth} {edu.graduationYear}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              <div className="edit hidden absolute -right-1 -top-1 p-1">
                <div className="flex gap-1.5 sm:gap-3 bg-gray-900">
                  <button
                    className="text-white p-0.5 sm:p-1 text-[8px] sm:text-xs flex justify-center items-center gap-1 sm:gap-2 cursor-pointer hover:text-primary"
                    onClick={() => editItem("Education")}
                  >
                    <Edit className="size-2 sm:size-4" /> Edit
                  </button>
                  <button
                    className="text-white p-0.5 sm:p-1 text-[8px] sm:text-xs flex justify-center items-center gap-1 sm:gap-2 cursor-pointer hover:text-red-500"
                    onClick={() => deleteItem("Education")}
                  >
                    <Trash2 className="size-2 sm:size-4" /> Delete
                  </button>
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Right Column - 65% width */}
        <div className="lg:w-[65%] p-6">
          {/* Experience */}
          {experience && (
            <section className="c-info relative mb-8">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-4">
                Experience
              </h3>
              <div className="space-y-6">
                {experience.map(
                  (exp, index) =>
                    (exp.jobTitle ||
                      exp.startMonth ||
                      exp.startYear ||
                      exp.endMonth ||
                      exp.present ||
                      exp.endYear) && (
                      <div
                        key={index}
                        className="pl-4 border-l-2 border-gray-300"
                      >
                        <div className="flex flex-col sm:flex-row justify-between">
                          {exp.jobTitle && (
                            <div>
                              <h4 className="font-bold text-gray-800">
                                {exp.jobTitle}
                              </h4>
                              <p className="text-gray-600 text-sm">
                                {exp.company}
                              </p>
                            </div>
                          )}
                          <p className="text-gray-500 text-sm">
                            {exp.startMonth} {exp.startYear}
                            {(exp.endMonth || exp.present) && " - "}
                            {exp.present
                              ? "Present"
                              : exp.endMonth &&
                                `${exp.endMonth} ${exp.endYear}`}
                          </p>
                        </div>
                        <div
                          className="mt-2 text-gray-700 text-sm space-y-2 pl-2"
                          dangerouslySetInnerHTML={{ __html: exp.description }}
                        />
                      </div>
                    )
                )}
              </div>
              <div className="edit hidden absolute -right-1 -top-1 p-1">
                <div className="flex gap-1.5 sm:gap-3 bg-gray-900">
                  <button
                    className="text-white p-0.5 sm:p-1 text-[8px] sm:text-xs flex justify-center items-center gap-1 sm:gap-2 cursor-pointer hover:text-primary"
                    onClick={() => editItem("Experience")}
                  >
                    <Edit className="size-2 sm:size-4" /> Edit
                  </button>
                  <button
                    className="text-white p-0.5 sm:p-1 text-[8px] sm:text-xs flex justify-center items-center gap-1 sm:gap-2 cursor-pointer hover:text-red-500"
                    onClick={() => deleteItem("Experience")}
                  >
                    <Trash2 className="size-2 sm:size-4" /> Delete
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* Projects - Simple List */}
          {projects && (
            <section className="c-info relative mb-8">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-4">
                Projects
              </h3>
              <div className="space-y-4">
                {projects.map(
                  (project, index) =>
                    (project.title || project.description) && (
                      <div key={index} className="pl-4">
                        {project.title && (
                          <h4 className="font-semibold text-gray-800 text-sm">
                            {project.title}
                          </h4>
                        )}
                        {project.description && (
                          <p className="text-gray-600 text-sm mt-1">
                            {project.description}
                          </p>
                        )}
                        {project.url && (
                          <p className="text-gray-500 text-xs inline-block mt-1">
                            {project.url}
                          </p>
                        )}
                      </div>
                    )
                )}
              </div>
              <div className="edit hidden absolute -right-1 -top-1 p-1">
                <div className="flex gap-1.5 sm:gap-3 bg-gray-900">
                  <button
                    className="text-white p-0.5 sm:p-1 text-[8px] sm:text-xs flex justify-center items-center gap-1 sm:gap-2 cursor-pointer hover:text-primary"
                    onClick={() => editItem("Projects")}
                  >
                    <Edit className="size-2 sm:size-4" /> Edit
                  </button>
                  <button
                    className="text-white p-0.5 sm:p-1 text-[8px] sm:text-xs flex justify-center items-center gap-1 sm:gap-2 cursor-pointer hover:text-red-500"
                    onClick={() => deleteItem("Projects")}
                  >
                    <Trash2 className="size-2 sm:size-4" /> Delete
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* Certifications & Languages Side by Side */}
          <div className="grid md:grid-cols-2 gap-8">
            {certifications && (
              <section className="c-info relative">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-3">
                  Certifications
                </h3>
                <div className="space-y-3">
                  {certifications.map((cert, index) => (
                    <div key={index}>
                      {cert.name && (
                        <h4 className="font-semibold text-gray-800 text-sm">
                          {cert.name}
                        </h4>
                      )}
                      {cert.organization && (
                        <p className="text-gray-600 text-xs">
                          {cert.organization}
                        </p>
                      )}
                      <p className="text-gray-500 text-xs mt-1">
                        {cert.issueMonth || cert.issueYear
                          ? `${cert.issueMonth} ${cert.issueYear}`
                          : ""}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="edit hidden absolute -right-1 -top-1 p-1">
                  <div className="flex gap-1.5 sm:gap-3 bg-gray-900">
                    <button
                      className="text-white p-0.5 sm:p-1 text-[8px] sm:text-xs flex justify-center items-center gap-1 sm:gap-2 cursor-pointer hover:text-primary"
                      onClick={() => editItem("Certifications")}
                    >
                      <Edit className="size-2 sm:size-4" /> Edit
                    </button>
                    <button
                      className="text-white p-0.5 sm:p-1 text-[8px] sm:text-xs flex justify-center items-center gap-1 sm:gap-2 cursor-pointer hover:text-red-500"
                      onClick={() => deleteItem("Certifications")}
                    >
                      <Trash2 className="size-2 sm:size-4" /> Delete
                    </button>
                  </div>
                </div>
              </section>
            )}

            {languages && (
              <section className="c-info relative">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-3">
                  Languages
                </h3>
                <div className="space-y-2">
                  {languages.map(
                    (lang, index) =>
                      lang.language && (
                        <div
                          key={index}
                          className="flex justify-between items-center"
                        >
                          <span className="text-gray-700 text-sm">
                            {lang.language}
                          </span>
                          <span className="text-gray-500 text-xs">
                            {lang.proficiency}
                          </span>
                        </div>
                      )
                  )}
                </div>
                <div className="edit hidden absolute -right-1 -top-1 p-1">
                  <div className="flex gap-1.5 sm:gap-3 bg-gray-900">
                    <button
                      className="text-white p-0.5 sm:p-1 text-[8px] sm:text-xs flex justify-center items-center gap-1 sm:gap-2 cursor-pointer hover:text-primary"
                      onClick={() => editItem("Language")}
                    >
                      <Edit className="size-2 sm:size-4" /> Edit
                    </button>
                    <button
                      className="text-white p-0.5 sm:p-1 text-[8px] sm:text-xs flex justify-center items-center gap-1 sm:gap-2 cursor-pointer hover:text-red-500"
                      onClick={() => deleteItem("Language")}
                    >
                      <Trash2 className="size-2 sm:size-4" /> Delete
                    </button>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizonTemplate;
