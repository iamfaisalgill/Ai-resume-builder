import { useResume } from "@/context/ResumeInfoContext";
import { Edit, Trash2 } from "lucide-react";
import React from "react";

// Template name: iconic
const IconicTheme = ({ deleteItem, editItem }) => {
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
  } = resumeInfo || {};

  return (
    <div className="text-white max-w-4xl min-h-[1122px] bg-white shadow-lg rounded-lg mx-auto text-[10px] sm:text-base ">
      <div className="c-info relative bg-[#1E3A5F] p-3 sm:p-6 flex justify-between">
        <h1 className="text-[15px] sm:text-3xl font-bold uppercase">
          {!(contactInfo.firstName || contactInfo.lastName) ? (
            <span className="text-gray-300">Your Name</span>
          ) : (
            `${contactInfo.firstName} ${contactInfo.lastName}`
          )}
        </h1>
        <div>
          {contactInfo.phoneNumber ? (
            <p className="mt-1 sm:mt-2 text-[8px] sm:text-sm">
              {contactInfo.phoneNumber}
            </p>
          ) : (
            <p className="text-gray-400">Phone</p>
          )}
          {contactInfo.email ? (
            <p className="text-[8px] sm:text-sm">{contactInfo.email}</p>
          ) : (
            <p className="text-gray-400">Email</p>
          )}
          {contactInfo.linkedIn ? (
            <p className="text-[8px] sm:text-sm">{contactInfo.linkedIn}</p>
          ) : (
            <p className="text-gray-400">LinkedIn/Portfolio</p>
          )}
          {contactInfo.city || contactInfo.country ? (
            <p className="text-[8px] sm:text-sm">{`${contactInfo.city || ""}${
              contactInfo.city && contactInfo.country ? ", " : ""
            }${contactInfo.country || ""}`}</p>
          ) : (
            <p className="text-gray-400">Location</p>
          )}
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

      <div className=" text-black p-3 sm:p-6 space-y-3 sm:space-y-6">
        {/* PROFESSIONAL SUMMARY */}
        {(summary || summary === "") && (
          <div className="c-info relative grid grid-cols-3 gap-2 sm:gap-4">
            <h2 className="text-[10px] sm:text-xl font-bold text-[#1E3A5F]">
              PROFESSIONAL <br /> SUMMARY
            </h2>
            <p className="col-span-2 text-[8px] sm:text-sm">{summary}</p>
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

        {/* TECHNICAL SKILLS */}
        {skills && (
          <div className="c-info relative grid grid-cols-3 gap-2 sm:gap-4">
            <h2 className="text-[10px] sm:text-xl font-bold text-[#1E3A5F]">
              SKILLS
            </h2>
            <div className="col-span-2 grid grid-cols-3 gap-1 sm:gap-2 text-[8px] sm:text-sm mt-1 sm:mt-2">
              {skills.map((skill, index) => (
                <p key={index}>{skill}</p>
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

        {/* EXPERIENCE */}
        {experience && (
          <div className="c-info relative grid grid-cols-3 gap-2 sm:gap-4">
            <h2 className="text-[10px] sm:text-xl font-bold text-[#1E3A5F]">
              EXPERIENCE
            </h2>
            <div className="col-span-2 space-y-3">
              {experience?.map((exp, index) => (
                (exp.jobTitle ||
                  exp.startMonth ||
                  exp.startYear ||
                  exp.endMonth ||
                  exp.present ||
                  exp.endYear) && <div key={index}>
                  {exp.jobTitle && (
                    <p className="font-bold mt-1 sm:mt-2 text-[8px] sm:text-sm">
                      {exp.jobTitle}
                    </p>
                  )}
                    <p className="text-[8px] sm:text-sm">
                      {exp.company}
                      {exp.company && (exp.startMonth || exp.startYear) && ", "}
                      {exp.startMonth} {exp.startYear}
                      {(exp.endMonth || exp.present) && " - "}
                      {exp.present
                        ? "Present"
                        : `${exp.endMonth || ""} ${exp.endYear || ""}`}
                    </p>
                  {exp.description && (
                    <span
                      className="text-[8px] sm:text-sm"
                      dangerouslySetInnerHTML={{ __html: exp.description }}
                    />
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

        {/* PROJECTS */}
        {projects && (
          <div className="c-info relative grid grid-cols-3 gap-2 sm:gap-4">
            <h2 className="text-[10px] sm:text-xl font-bold text-[#1E3A5F]">
              PROJECTS
            </h2>
            <div className="col-span-2 space-y-2 sm:space-y-4">
              {projects?.map((project, index) => (
                (project.title || project.description || project.url) && <div key={index}>
                  {project.title && (
                    <p className="font-bold text-[8px] sm:text-sm">
                      {project.title}
                    </p>
                  )}
                  {project.description && (
                    <p className="text-[8px] sm:text-sm">
                      {project.description}
                    </p>
                  )}
                  {project.url && (
                    <p className="text-[8px] sm:text-sm text-[#5F6A8A]">
                      {project.url.replace(/^https?:\/\//, "")}
                    </p>
                  )}
                </div>
              ))}
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

        {/* EDUCATION */}
        {education && (
          <div className="c-info relative grid grid-cols-3 gap-2 sm:gap-4">
            <h2 className="text-[10px] sm:text-xl font-bold text-[#1E3A5F]">
              EDUCATION
            </h2>
            <div className="col-span-2 space-y-1 sm:space-y-2">
              {education?.map((edu, index) => (
                <div key={index}>
                  {(edu.degree || edu.fieldOfStudy) && (
                    <p className="font-bold text-[8px] sm:text-sm">
                      {edu.degree}
                      {edu.degree && edu.fieldOfStudy && ": "}
                      {edu.fieldOfStudy}
                    </p>
                  )}
                  {(edu.institution ||
                    edu.graduationMonth ||
                    edu.graduationYear) && (
                    <p className="text-[8px] sm:text-sm">
                      {edu.institution}
                      {edu.institution &&
                        (edu.graduationMonth || edu.graduationYear) &&
                        ", "}
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
          </div>
        )}

        {/* CERTIFICATIONS */}
        {certifications && (
          <div className="c-info relative grid grid-cols-3 gap-2 sm:gap-4">
            <h2 className="text-[10px] sm:text-xl font-bold text-[#1E3A5F]">
              CERTIFICATIONS
            </h2>
            <div className="col-span-2 space-y-1 sm:space-y-2">
              {certifications?.map((cert, index) => (
                <p key={index} className="text-[8px] sm:text-sm">
                  {cert.name}
                  {(cert.organization || cert.issueYear) &&
                    ` (${cert.organization}${
                      cert.organization && cert.issueYear ? " " : ""
                    }${cert.issueYear || ""})`}
                </p>
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
          </div>
        )}

        {/* LANGUAGES */}
        {languages && (
          <div className="c-info relative grid grid-cols-3 gap-2 sm:gap-4">
            <h2 className="text-[10px] sm:text-xl font-bold text-[#1E3A5F]">
              LANGUAGES
            </h2>
            <div className="col-span-2 grid grid-cols-3 gap-2 sm:gap-4">
              {languages?.map((lang, index) => (
                <div key={index}>
                  {lang.language && (
                    <p className="font-bold text-[8px] sm:text-sm capitalize">
                      {lang.language}
                    </p>
                  )}
                  {lang.proficiency && (
                    <p className="text-[8px] sm:text-sm">{lang.proficiency}</p>
                  )}
                </div>
              ))}
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

        {/* VOLUNTEER WORK */}
        {resumeInfo.volunteer && (
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <h2 className="text-[10px] sm:text-xl font-bold text-[#1E3A5F]">
              VOLUNTEER WORK
            </h2>
            <div className="col-span-2">
              <p className="font-bold text-[8px] sm:text-sm">
                Code for America
              </p>
              <p className="text-[8px] sm:text-sm">
                Developed open-source tools for local government (2018-Present)
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IconicTheme;
