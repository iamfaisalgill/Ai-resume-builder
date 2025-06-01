import { useResume } from "@/context/ResumeInfoContext";
import { Edit, Trash2 } from "lucide-react";
import React from "react";

// Template name: iconic
const IconicTheme = ({ deleteItem, editItem }) => {

  const { resumeInfo } = useResume()

  return (
    <div className="text-white max-w-4xl mx-auto text-[10px] sm:text-base ">
    <div className="c-info relative bg-[#1E3A5F] p-3 sm:p-6 flex justify-between">
      {resumeInfo.contactInfo && (
        <>
          <h1 className="text-[15px] sm:text-3xl font-bold uppercase">{`${resumeInfo.contactInfo.firstName} ${resumeInfo.contactInfo.lastName}`}</h1>
          <div>
            {resumeInfo.contactInfo.phoneNumber && <p className="mt-1 sm:mt-2 text-[8px] sm:text-sm">{resumeInfo.contactInfo.phoneNumber}</p>}
            {resumeInfo.contactInfo.email && <p className="text-[8px] sm:text-sm">{resumeInfo.contactInfo.email}</p>}
            {(resumeInfo.contactInfo.city || resumeInfo.contactInfo.country) && (
              <p className="text-[8px] sm:text-sm">{`${resumeInfo.contactInfo.city || ''}${resumeInfo.contactInfo.city && resumeInfo.contactInfo.country ? ', ' : ''}${resumeInfo.contactInfo.country || ''}`}</p>
            )}
            {resumeInfo.contactInfo.linkedIn && <p className="text-[8px] sm:text-sm">{resumeInfo.contactInfo.linkedIn}</p>}
          </div>
          <div className="edit hidden absolute -right-1 -top-1 p-1">
            <div className="flex gap-1.5 sm:gap-3 bg-gray-900">
              <button className="text-white p-0.5 sm:p-1 text-[8px] sm:text-xs flex justify-center items-center gap-1 sm:gap-2 cursor-pointer hover:text-primary" onClick={() => editItem("Contact information")}>
                <Edit className="size-2 sm:size-4" /> Edit
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  
    <div className="bg-white text-black p-3 sm:p-6 space-y-3 sm:space-y-6">
      {/* PROFESSIONAL SUMMARY */}
      {(resumeInfo.summary || resumeInfo.summary === "") && (
        <div className="c-info relative grid grid-cols-3 gap-2 sm:gap-4">
          <h2 className="text-[10px] sm:text-xl font-bold text-[#1E3A5F]">
            PROFESSIONAL <br /> SUMMARY
          </h2>
          <p className="col-span-2 text-[8px] sm:text-sm">{resumeInfo.summary}</p>
          <div className="edit hidden absolute -right-1 -top-1 p-1">
            <div className="flex gap-1.5 sm:gap-3 bg-gray-900">
              <button className="text-white p-0.5 sm:p-1 text-[8px] sm:text-xs flex justify-center items-center gap-1 sm:gap-2 cursor-pointer hover:text-primary" onClick={() => editItem("Professional Summary")}>
                <Edit className="size-2 sm:size-4" /> Edit
              </button>
              <button className="text-white p-0.5 sm:p-1 text-[8px] sm:text-xs flex justify-center items-center gap-1 sm:gap-2 cursor-pointer hover:text-red-500" onClick={() => deleteItem("Professional Summary")}>
                <Trash2 className="size-2 sm:size-4" /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
  
      {/* TECHNICAL SKILLS */}
      {resumeInfo.skills && (
        <div className="c-info relative grid grid-cols-3 gap-2 sm:gap-4">
          <h2 className="text-[10px] sm:text-xl font-bold text-[#1E3A5F]">SKILLS</h2>
          <div className="col-span-2 grid grid-cols-3 gap-1 sm:gap-2 text-[8px] sm:text-sm mt-1 sm:mt-2">
            {resumeInfo.skills.map((skill, index) => (
              <p key={index}>{skill}</p>
            ))}
          </div>
          <div className="edit hidden absolute -right-1 -top-1 p-1">
            <div className="flex gap-1.5 sm:gap-3 bg-gray-900">
              <button className="text-white p-0.5 sm:p-1 text-[8px] sm:text-xs flex justify-center items-center gap-1 sm:gap-2 cursor-pointer hover:text-primary" onClick={() => editItem("Skills")}>
                <Edit className="size-2 sm:size-4" /> Edit
              </button>
              <button className="text-white p-0.5 sm:p-1 text-[8px] sm:text-xs flex justify-center items-center gap-1 sm:gap-2 cursor-pointer hover:text-red-500" onClick={() => deleteItem("Skills")}>
                <Trash2 className="size-2 sm:size-4" /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
  
      {/* EXPERIENCE */}
      {resumeInfo.experience && (
        <div className="c-info relative grid grid-cols-3 gap-2 sm:gap-4">
          <h2 className="text-[10px] sm:text-xl font-bold text-[#1E3A5F]">EXPERIENCE</h2>
          <div className="col-span-2 space-y-3">
            {resumeInfo.experience.map((exp, index) => (
              <div key={index}>
                <p className="font-bold mt-1 sm:mt-2 text-[8px] sm:text-sm">{exp.jobTitle}</p>
                <p className="text-[8px] sm:text-sm">
                  {exp.company}, {exp.startMonth} {exp.startYear} - {exp.present ? 'Present' : `${exp.endMonth} ${exp.endYear}`}
                </p>
                <span className="text-[8px] sm:text-sm" dangerouslySetInnerHTML={{__html: exp.description}}/>
              </div>
            ))}
          </div>
          <div className="edit hidden absolute -right-1 -top-1 p-1">
            <div className="flex gap-1.5 sm:gap-3 bg-gray-900">
              <button className="text-white p-0.5 sm:p-1 text-[8px] sm:text-xs flex justify-center items-center gap-1 sm:gap-2 cursor-pointer hover:text-primary" onClick={() => editItem("Experience")}>
                <Edit className="size-2 sm:size-4" /> Edit
              </button>
              <button className="text-white p-0.5 sm:p-1 text-[8px] sm:text-xs flex justify-center items-center gap-1 sm:gap-2 cursor-pointer hover:text-red-500" onClick={() => deleteItem("Experience")}>
                <Trash2 className="size-2 sm:size-4" /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
  
      {/* PROJECTS */}
      {resumeInfo.projects && (
        <div className="c-info relative grid grid-cols-3 gap-2 sm:gap-4">
          <h2 className="text-[10px] sm:text-xl font-bold text-[#1E3A5F]">PROJECTS</h2>
          <div className="col-span-2 space-y-2 sm:space-y-4">
            {resumeInfo.projects.map((project, index) => (
              <div key={index}>
                <p className="font-bold text-[8px] sm:text-sm">{project.title}</p>
                {project.description && <p className="text-[8px] sm:text-sm">{project.description}</p>}
                {project.url && <p className="text-[8px] sm:text-sm text-[#5F6A8A]">{project.url.replace(/^https?:\/\//, '')}</p>}
              </div>
            ))}
          </div>
          <div className="edit hidden absolute -right-1 -top-1 p-1">
            <div className="flex gap-1.5 sm:gap-3 bg-gray-900">
              <button className="text-white p-0.5 sm:p-1 text-[8px] sm:text-xs flex justify-center items-center gap-1 sm:gap-2 cursor-pointer hover:text-primary" onClick={() => editItem("Projects")}>
                <Edit className="size-2 sm:size-4" /> Edit
              </button>
              <button className="text-white p-0.5 sm:p-1 text-[8px] sm:text-xs flex justify-center items-center gap-1 sm:gap-2 cursor-pointer hover:text-red-500" onClick={() => deleteItem("Projects")}>
                <Trash2 className="size-2 sm:size-4" /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
  
      {/* EDUCATION */}
      {resumeInfo.education && (
        <div className="c-info relative grid grid-cols-3 gap-2 sm:gap-4">
          <h2 className="text-[10px] sm:text-xl font-bold text-[#1E3A5F]">EDUCATION</h2>
          <div className="col-span-2 space-y-1 sm:space-y-2">
            {resumeInfo.education.map((edu, index) => (
              <div key={index}>
                <p className="font-bold text-[8px] sm:text-sm">
                  {edu.degree}: {edu.fieldOfStudy}
                </p>
                <p className="text-[8px] sm:text-sm">
                  {edu.institution}, {edu.graduationMonth} {edu.graduationYear}
                </p>
              </div>
            ))}
          </div>
          <div className="edit hidden absolute -right-1 -top-1 p-1">
            <div className="flex gap-1.5 sm:gap-3 bg-gray-900">
              <button className="text-white p-0.5 sm:p-1 text-[8px] sm:text-xs flex justify-center items-center gap-1 sm:gap-2 cursor-pointer hover:text-primary" onClick={() => editItem("Education")}>
                <Edit className="size-2 sm:size-4" /> Edit
              </button>
              <button className="text-white p-0.5 sm:p-1 text-[8px] sm:text-xs flex justify-center items-center gap-1 sm:gap-2 cursor-pointer hover:text-red-500" onClick={() => deleteItem("Education")}>
                <Trash2 className="size-2 sm:size-4" /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
  
      {/* CERTIFICATIONS */}
      {resumeInfo.certifications && (
        <div className="c-info relative grid grid-cols-3 gap-2 sm:gap-4">
          <h2 className="text-[10px] sm:text-xl font-bold text-[#1E3A5F]">CERTIFICATIONS</h2>
          <div className="col-span-2 space-y-1 sm:space-y-2">
            {resumeInfo.certifications.map((cert, index) => (
              <p key={index} className="text-[8px] sm:text-sm">
                {cert.name} {(cert.organization || cert.issueYear) && `(${cert.organization}${!cert.organization || !cert.issueYear ? '': ' '}${cert.issueYear})`}
              </p>
            ))}
          </div>
          <div className="edit hidden absolute -right-1 -top-1 p-1">
            <div className="flex gap-1.5 sm:gap-3 bg-gray-900">
              <button className="text-white p-0.5 sm:p-1 text-[8px] sm:text-xs flex justify-center items-center gap-1 sm:gap-2 cursor-pointer hover:text-primary" onClick={() => editItem("Certifications")}>
                <Edit className="size-2 sm:size-4" /> Edit
              </button>
              <button className="text-white p-0.5 sm:p-1 text-[8px] sm:text-xs flex justify-center items-center gap-1 sm:gap-2 cursor-pointer hover:text-red-500" onClick={() => deleteItem("Certifications")}>
                <Trash2 className="size-2 sm:size-4" /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
  
      {/* LANGUAGES */}
      {resumeInfo.languages && (
        <div className="c-info relative grid grid-cols-3 gap-2 sm:gap-4">
          <h2 className="text-[10px] sm:text-xl font-bold text-[#1E3A5F]">LANGUAGES</h2>
          <div className="col-span-2 grid grid-cols-3 gap-2 sm:gap-4">
            {resumeInfo.languages.map((lang, index) => (
              <div key={index}>
                <p className="font-bold text-[8px] sm:text-sm">{lang.language}</p>
                <p className="text-[8px] sm:text-sm">{lang.proficiency}</p>
              </div>
            ))}
          </div>
          <div className="edit hidden absolute -right-1 -top-1 p-1">
            <div className="flex gap-1.5 sm:gap-3 bg-gray-900">
              <button className="text-white p-0.5 sm:p-1 text-[8px] sm:text-xs flex justify-center items-center gap-1 sm:gap-2 cursor-pointer hover:text-primary" onClick={() => editItem("Language")}>
                <Edit className="size-2 sm:size-4" /> Edit
              </button>
              <button className="text-white p-0.5 sm:p-1 text-[8px] sm:text-xs flex justify-center items-center gap-1 sm:gap-2 cursor-pointer hover:text-red-500" onClick={() => deleteItem("Language")}>
                <Trash2 className="size-2 sm:size-4" /> Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VOLUNTEER WORK */}
        {resumeInfo.volunteer && <div className="grid grid-cols-3 gap-2 sm:gap-4">
          <h2 className="text-[10px] sm:text-xl font-bold text-[#1E3A5F]">VOLUNTEER WORK</h2>
          <div className="col-span-2">
            <p className="font-bold text-[8px] sm:text-sm">Code for America</p>
            <p className="text-[8px] sm:text-sm">Developed open-source tools for local government (2018-Present)</p>
          </div>
        </div>}
    </div>
    </div>
  );
};

export default IconicTheme;