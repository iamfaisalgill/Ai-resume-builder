import { useResume } from "@/context/ResumeInfoContext";
import { Edit, Trash2 } from "lucide-react";
import React, { useEffect } from "react";

// Template name: stalwart
const StalwartTheme = ({ deleteItem, editItem }) => {
  const { resumeInfo } = useResume();

  return (
    <div className="bg-white max-w-4xl text-black p-4 sm:p-6 md:p-8 mx-auto font-sans text-[8px] sm:text-sm">
      <div className="c-info relative ">
        <h1 className="text-[15px] sm:text-2xl md:text-3xl font-bold uppercase">
          {resumeInfo.contactInfo.firstName} {resumeInfo.contactInfo.lastName}
        </h1>
        <p className=" text-gray-600">
          {resumeInfo.contactInfo.city}, {resumeInfo.contactInfo.country} •{" "}
          {resumeInfo.contactInfo.phoneNumber} • {resumeInfo.contactInfo.email}{" "}
          {resumeInfo.contactInfo.linkedIn &&
            `• ${resumeInfo.contactInfo.linkedIn}`}
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

      {(resumeInfo.summary || resumeInfo.summary === "") && (
        <div className="c-info relative mt-4 sm:mt-6 md:mt-8">
          <h2 className="text-[10px] sm:text-base font-bold bg-[#EEEEEE] sm:px-2 px-1">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="mt-1 sm:mt-2 ">
            {resumeInfo.summary}
          </p>
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
      {resumeInfo.skills && (
        <div className="c-info relative mt-4 sm:mt-6 md:mt-8">
          <h2 className="text-[10px] sm:text-base font-bold bg-[#EEEEEE] sm:px-2 px-1">
            TECHNICAL SKILLS
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 sm:gap-2  mt-1 sm:mt-2">
            {resumeInfo.skills.map((skill, index) => (
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
      {resumeInfo.experience && (
        <div className="c-info relative mt-4 sm:mt-6 md:mt-8">
          <h2 className="text-[10px] sm:text-base font-bold bg-[#EEEEEE] sm:px-2 px-1">
            PROFESSIONAL EXPERIENCE
          </h2>

          <div className="space-y-1 sm:space-y-2">
            {resumeInfo.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex flex-col sm:flex-row sm:justify-between  font-bold mt-1 sm:mt-2">
                  <p>{exp.jobTitle}</p>
                  <p>
                    {exp.startMonth} {exp.startYear} -{" "}
                    {exp.present ? "Present" : `${exp.endMonth} ${exp.endYear}`}
                  </p>
                </div>
                <p>{exp.company}</p>
                {/* {exp.description.split('. ').map((desc,i)=>(
                  desc && <p key={i}>• {desc.trim()}{!desc.endsWith('.') && '.'}</p>
                  ))} */}
                <span dangerouslySetInnerHTML={{__html: exp.description}}/>
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
      {resumeInfo.education && (
        <div className="c-info relative mt-4 sm:mt-6 md:mt-8">
          <h2 className="text-[10px] sm:text-base font-bold bg-[#EEEEEE] sm:px-2 px-1">
            EDUCATION
          </h2>
          {resumeInfo.education.map((edu, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col sm:flex-row sm:justify-between  font-bold mt-1 sm:mt-2">
                <p>
                  {edu.degree} in {edu.fieldOfStudy}
                </p>
                <p>
                  {edu.graduationMonth} {edu.graduationYear}
                </p>
              </div>
              <p>{edu.institution}</p>
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
      {resumeInfo.certifications && (
        <div className="c-info relative mt-4 sm:mt-6 md:mt-8">
          <h2 className="text-[10px] sm:text-base font-bold bg-[#EEEEEE] sm:px-2 px-1">
            CERTIFICATIONS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2  mt-1 sm:mt-2">
            {resumeInfo.certifications.map((cert, index) => (
              <p key={index}>
                • {cert.name} ({cert.issueYear})
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

      {/* Projects */}
      {resumeInfo.projects && (
        <div className="c-info relative mt-4 sm:mt-6 md:mt-8">
          <h2 className="text-[10px] sm:text-base font-bold bg-[#EEEEEE] sm:px-2 px-1">
            PROJECTS
          </h2>
          <div className=" mt-1 sm:mt-2">
            {resumeInfo.projects.map((project, index) => (
              <div className="mt-1 sm:mt-2" key={index}>
                <p className="font-bold">{project.title}</p>
                <p>{project.description}</p>
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

      {/* Languages */}
      {resumeInfo.languages && (
        <div className="c-info relative mt-4 sm:mt-6 md:mt-8">
          <h2 className="text-[10px] sm:text-base font-bold bg-[#EEEEEE] sm:px-2 px-1">
            LANGUAGES
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 sm:gap-2 mt-1 sm:mt-2">
            {resumeInfo.languages.map((lang, index) => (
              <p
                key={index}
                className="font-bold mt-1 sm:mt-2 "
              >
                {lang.language} {lang.proficiency && `(${lang.proficiency})`}
              </p>
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
    </div>
  );
};

export default StalwartTheme;
