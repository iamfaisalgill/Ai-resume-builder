import { useResume } from "@/context/ResumeInfoContext";
import { Edit, Trash2 } from "lucide-react";
import React, { useEffect } from "react";

// Template name: stalwart
const StalwartTheme = ({ deleteItem, editItem }) => {
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
    <div className="bg-white max-w-4xl min-h-[1122px] shadow-lg rounded-lg text-black p-4 sm:p-6 md:p-8 mx-auto font-sans text-[8px] sm:text-sm">
      <div className="c-info relative ">
        <h1 className="text-[15px] sm:text-2xl md:text-3xl font-bold uppercase">
          {contactInfo.firstName ||
          contactInfo.lastName ? (
            `${contactInfo.firstName || ""} ${
              contactInfo.lastName || ""
            }`.trim()
          ) : (
            <span className="text-gray-400">Your Name</span>
          )}
        </h1>
        <p className="text-gray-600">
          {/* City & Country */}
          {contactInfo.city || contactInfo.country ? (
            <>
              {contactInfo.city}
              {contactInfo.city &&
                contactInfo.country &&
                ", "}
              {contactInfo.country}
            </>
          ) : (
            <span className="italic text-gray-400">Location</span>
          )}

          {/* Phone */}
          {contactInfo.phoneNumber && " • "}
          {contactInfo.phoneNumber || (
            <span className="italic text-gray-400"> • Phone</span>
          )}

          {/* Email */}
          {contactInfo.email && " • "}
          {contactInfo.email || (
            <span className="italic text-gray-400"> • Email</span>
          )}

          {/* LinkedIn */}
          {contactInfo.linkedIn && " • "}
          {contactInfo.linkedIn || (
            <span className="italic text-gray-400"> • LinkedIn/Portfolio</span>
          )}
        </p>
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

      {(summary || summary === "") && (
        <div className="c-info relative mt-4 sm:mt-6 md:mt-8">
          <h2 className="text-[10px] sm:text-base font-bold bg-[#EEEEEE] sm:px-2 px-1">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="mt-1 sm:mt-2 ">{summary}</p>
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
        </div>
      )}

      {/* Skills */}
      {skills && (
        <div className="c-info relative mt-4 sm:mt-6 md:mt-8">
          <h2 className="text-[10px] sm:text-base font-bold bg-[#EEEEEE] sm:px-2 px-1">
            TECHNICAL SKILLS
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 sm:gap-2  mt-1 sm:mt-2">
            {skills.map((skill, index) => (
              <p key={index}>• {skill}</p>
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
        </div>
      )}

      {/* Experience */}
      {experience && (
        <div className="c-info relative mt-4 sm:mt-6 md:mt-8">
          <h2 className="text-[10px] sm:text-base font-bold bg-[#EEEEEE] sm:px-2 px-1">
            PROFESSIONAL EXPERIENCE
          </h2>

          <div className="space-y-1 sm:space-y-2">
            {experience.map((exp, index) => (
              <div key={index}>
                {(exp.jobTitle ||
                  exp.startMonth ||
                  exp.startYear ||
                  exp.endMonth ||
                  exp.present ||
                  exp.endYear) && (
                  <div className="flex flex-col sm:flex-row sm:justify-between font-bold mt-1 sm:mt-2">
                    {exp.jobTitle && <p>{exp.jobTitle}</p>}
                    {(exp.startMonth ||
                      exp.startYear ||
                      exp.endMonth ||
                      exp.present ||
                      exp.endYear) && (
                      <p>
                        {exp.startMonth} {exp.startYear}
                        {(exp.endMonth || exp.present) && " - "}
                        {exp.present
                          ? "Present"
                          : exp.endMonth && `${exp.endMonth} ${exp.endYear}`}
                      </p>
                    )}
                  </div>
                )}
                {exp.company && <p>{exp.company}</p>}
                {exp.description && (
                  <span dangerouslySetInnerHTML={{ __html: exp.description }} />
                )}
              </div>
            ))}
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
        </div>
      )}

      {/* Education */}
      {education && (
        <div className="c-info relative mt-4 sm:mt-6 md:mt-8">
          <h2 className="text-[10px] sm:text-base font-bold bg-[#EEEEEE] sm:px-2 px-1">
            EDUCATION
          </h2>
          {education.map((edu, index) => (
            <React.Fragment key={index}>
              {(edu.degree ||
                edu.fieldOfStudy ||
                edu.graduationMonth ||
                edu.graduationYear) && (
                <div className="flex flex-col sm:flex-row sm:justify-between font-bold mt-1 sm:mt-2">
                  {(edu.degree || edu.fieldOfStudy) && (
                    <p>
                      {edu.degree}
                      {edu.degree && edu.fieldOfStudy && " in "}
                      {edu.fieldOfStudy}
                    </p>
                  )}
                  {(edu.graduationMonth || edu.graduationYear) && (
                    <p>
                      {edu.graduationMonth} {edu.graduationYear}
                    </p>
                  )}
                </div>
              )}
              {edu.institution && <p>{edu.institution}</p>}
            </React.Fragment>
          ))}
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
        </div>
      )}

      {/* Certifications */}
      {certifications && (
        <div className="c-info relative mt-4 sm:mt-6 md:mt-8">
          <h2 className="text-[10px] sm:text-base font-bold bg-[#EEEEEE] sm:px-2 px-1">
            CERTIFICATIONS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2  mt-1 sm:mt-2">
            {certifications.map(
              (cert, index) =>
                (cert.name || cert.issueYear) && (
                  <p key={index}>
                    {cert.name}
                    {cert.issueYear && ` (${cert.issueYear})`}
                  </p>
                )
            )}
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
        </div>
      )}

      {/* Projects */}
      {projects && (
        <div className="c-info relative mt-4 sm:mt-6 md:mt-8">
          <h2 className="text-[10px] sm:text-base font-bold bg-[#EEEEEE] sm:px-2 px-1">
            PROJECTS
          </h2>
          <div className=" mt-1 sm:mt-2">
            {projects.map(
              (project, index) =>
                (project.title || project.description) && (
                  <div className="mt-1 sm:mt-2" key={index}>
                    {project.title && (
                      <p className="font-bold">{project.title}</p>
                    )}
                    {project.description && <p>{project.description}</p>}
                    {project.url && <p className="text-[#1E3A5F]">{project.url}</p>}
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
        </div>
      )}

      {/* Languages */}
      {languages && (
        <div className="c-info relative mt-4 sm:mt-6 md:mt-8">
          <h2 className="text-[10px] sm:text-base font-bold bg-[#EEEEEE] sm:px-2 px-1">
            LANGUAGES
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 sm:gap-2 mt-1 sm:mt-2">
            {languages.map(
              (lang, index) =>
                lang.language && (
                  <p key={index} className="font-bold mt-1 sm:mt-2">
                    {lang.language}
                    {lang.proficiency && ` (${lang.proficiency})`}
                  </p>
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
        </div>
      )}
    </div>
  );
};

export default StalwartTheme;
