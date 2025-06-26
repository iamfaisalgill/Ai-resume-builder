import { useResume } from "@/context/ResumeInfoContext";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Edit, Edit3, Trash2 } from "lucide-react";

// template name: Halley
const HalleyTheme = ({
  activeDialog,
  setActiveDialog,
  deleteItem,
  editItem,
}) => {
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
    <div className="mx-auto max-w-4xl shadow-lg rounded-lg text-[8px] sm:text-sm md:text-base">
    
      <div className="flex sm:min-h-[1122px] min-h-[600px]">
        {/* Main Content (Left 3/4) */}
        <div className="w-3/4 p-4 sm:p-6 md:p-8 lg:p-10 bg-white rounded-l-lg">
          {/* Name/Logo Section */}
          <div className="c-info relative flex items-center space-x-2 sm:space-x-3 md:space-x-4 text-[#305276]">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 flex items-center justify-center border-2 border-[#305276] rotate-45">
              <div className="absolute w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 border-2 border-[#305276] -rotate-45"></div>
              <span className="uppercase text-base sm:text-xl md:text-2xl lg:text-3xl font-serif font-bold -rotate-45">
                {contactInfo.firstName.charAt(0)}
                {contactInfo.lastName.charAt(0)}
              </span>
            </div>
            <div className="font-serif font-bold text-[#305276]">
              {/* First Name */}
              <p className="text-base sm:text-xl md:text-3xl lg:text-4xl leading-none uppercase">
                {contactInfo.firstName || (
                  <span className="italic text-[#305276]/50 text-base sm:text-2xl">
                    First Name
                  </span>
                )}
              </p>

              {/* Last Name */}
              <p className="text-base sm:text-xl md:text-3xl lg:text-4xl leading-none uppercase">
                {contactInfo.lastName || (
                  <span className="italic text-[#305276]/50 sm:text-2xl">
                    Last Name
                  </span>
                )}
              </p>
            </div>
            <div className="edit hidden absolute -right-1 -top-1 p-1">
              <div className="flex gap-1.5 sm:gap-3 bg-gray-900">
                <button
                  className=" text-white sm:p-1 p-0.5 text-[10px] sm:text-xs flex justify-center items-center sm:gap-2 gap-1 cursor-pointer hover:text-primary"
                  onClick={() => editItem("Contact information")}
                >
                  <Edit className="size-3 sm:size-4" /> Edit
                </button>
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          {(summary || summary === "") && (
            <div className="c-info relative mt-5 lg:mt-7">
              <h2 className="font-serif text-[10px] sm:text-base md:text-lg font-bold text-[#305276] pb-1 border-b-[1.5px] border-[#305276]">
                PROFESSIONAL SUMMARY
              </h2>
              {summary && (
                <p className="text-gray-700 mt-1 sm:mt-1.5 md:mt-2">
                  {summary}
                </p>
              )}
              <div className="edit hidden absolute -right-1 -top-1 p-1">
                <div className="flex gap-1.5 sm:gap-3 bg-gray-900">
                  <button
                    className="text-white sm:p-1 p-0.5 text-[10px] sm:text-xs flex justify-center items-center gap-1 sm:gap-2 cursor-pointer hover:text-primary"
                    onClick={() => editItem("Professional Summary")}
                  >
                    <Edit className="size-3 sm:size-4" /> Edit
                  </button>
                  <button
                    className=" text-white sm:p-1 p-0.5 text-[10px] sm:text-xs flex justify-center items-center gap-1 sm:gap-2 cursor-pointer hover:text-red-500"
                    onClick={() => deleteItem("Professional Summary")}
                  >
                    <Trash2 className="size-3 sm:size-4" /> Delete
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Experience */}
          {experience && (
            <div className="c-info relative mt-3 sm:mt-4 md:mt-5 lg:mt-6">
              <h2 className="font-serif text-[10px] sm:text-base md:text-lg font-bold text-[#305276] pb-1 border-b-[1.5px] border-[#305276]">
                EXPERIENCE
              </h2>

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
                      className="mb-2 sm:mb-3 md:mb-4 mt-1 sm:mt-1.5 md:mt-2"
                    >
                      <div className="flex justify-between">
                        <p className="font-bold text-gray-900">
                          {exp.jobTitle}
                        </p>
                        <p className=" text-gray-700">
                          {exp.startMonth} {exp.startYear}
                          {(exp.endMonth || exp.present) && " - "}
                          {exp.present
                            ? "Present"
                            : exp.endMonth && `${exp.endMonth} ${exp.endYear}`}
                        </p>
                      </div>
                      <p className="text-gray-700 italic">{exp.company}</p>
                      <span
                        className="text-gray-700"
                        dangerouslySetInnerHTML={{ __html: exp.description }}
                      />
                    </div>
                  )
              )}
              <div className="edit hidden absolute -right-1 -top-1 p-1">
                <div className="flex gap-1.5 sm:gap-3 bg-gray-900">
                  <button
                    className=" text-white sm:p-1 p-0.5 text-[10px] sm:text-xs flex justify-center items-center gap-1 sm:gap-2 cursor-pointer hover:text-primary"
                    onClick={() => editItem("Experience")}
                  >
                    <Edit className="size-3 sm:size-4" /> Edit
                  </button>
                  <button
                    className=" text-white sm:p-1 p-0.5 text-[10px] sm:text-xs flex justify-center items-center gap-1 sm:gap-2 cursor-pointer hover:text-red-500"
                    onClick={() => deleteItem("Experience")}
                  >
                    <Trash2 className="size-3 sm:size-4" /> Delete
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Projects */}
          {projects && (
            <div className="c-info relative mt-3 sm:mt-4 md:mt-5 lg:mt-6">
              <h2 className="font-serif text-[10px] sm:text-base md:text-lg font-bold text-[#305276] pb-1 border-b-[1.5px] border-[#305276]">
                PROJECTS
              </h2>
              {projects.map(
                (project, index) =>
                  (project.title || project.description || project.url) && (
                    <div
                      key={index}
                      className="mb-2 sm:mb-3 md:mb-4 mt-1 sm:mt-1.5 md:mt-2"
                    >
                      <p className="font-bold text-gray-900">{project.title}</p>
                      <p className="text-gray-700">{project.description}</p>
                      <p className="text-[#305276]">{project.url}</p>
                    </div>
                  )
              )}
              <div className="edit hidden absolute -right-1 -top-1 p-1">
                <div className="flex gap-1.5 sm:gap-3 bg-gray-900">
                  <button
                    className=" text-white sm:p-1 p-0.5 text-[10px] sm:text-xs flex justify-center items-center gap-1 sm:gap-2 cursor-pointer hover:text-primary"
                    onClick={() => editItem("Projects")}
                  >
                    <Edit className="size-3 sm:size-4" /> Edit
                  </button>
                  <button
                    className=" text-white sm:p-1 p-0.5 text-[10px] sm:text-xs flex justify-center items-center gap-1 sm:gap-2 cursor-pointer hover:text-red-500"
                    onClick={() => deleteItem("Projects")}
                  >
                    <Trash2 className="size-3 sm:size-4" /> Delete
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Education */}
          {education && (
            <div className="c-info relative mt-3 sm:mt-4 md:mt-5 lg:mt-6">
              <h2 className="font-serif text-[10px] sm:text-base md:text-lg font-bold text-[#305276] pb-1 border-b-[1.5px] border-[#305276]">
                EDUCATION
              </h2>
              {education.map((edu, index) => (
                <div key={index} className="mt-1 sm:mt-1.5 md:mt-2">
                  <p className="font-bold text-gray-900">
                    {edu.degree}
                    {edu.degree && edu.fieldOfStudy && " in "}
                    {edu.fieldOfStudy}
                  </p>
                  <p className="text-gray-700">{edu.institution}</p>
                  {edu.graduationMonth && (
                    <p className="text-gray-500">
                      {edu.graduationMonth} {edu.graduationYear}
                    </p>
                  )}
                </div>
              ))}
              <div className="edit hidden absolute -right-1 -top-1 p-1">
                <div className="flex gap-1.5 sm:gap-3 bg-gray-900">
                  <button
                    className=" text-white sm:p-1 p-0.5 text-[10px] sm:text-xs flex justify-center items-center gap-1 sm:gap-2 cursor-pointer hover:text-primary"
                    onClick={() => editItem("Education")}
                  >
                    <Edit className="size-3 sm:size-4" /> Edit
                  </button>
                  <button
                    className=" text-white sm:p-1 p-0.5 text-[10px] sm:text-xs flex justify-center items-center gap-1 sm:gap-2 cursor-pointer hover:text-red-500"
                    onClick={() => deleteItem("Education")}
                  >
                    <Trash2 className="size-3 sm:size-4" /> Delete
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Languages */}
          {languages && (
            <div className="c-info relative mt-3 sm:mt-4 md:mt-5 lg:mt-6">
              <h2 className="font-serif text-[10px] sm:text-base md:text-lg font-bold text-[#305276] pb-1 border-b-[1.5px] border-[#305276]">
                LANGUAGES
              </h2>
              {languages.map((lang, index) => (
                <p key={index} className="text-gray-700 mt-1 sm:mt-1.5 md:mt-2">
                  {lang.language}{" "}
                  {lang.proficiency ? `(${lang.proficiency})` : ""}
                </p>
              ))}
              <div className="edit hidden absolute -right-1 -top-1 p-1">
                <div className="flex gap-1.5 sm:gap-3 bg-gray-900">
                  <button
                    className=" text-white sm:p-1 p-0.5 text-[10px] sm:text-xs flex justify-center items-center gap-1 sm:gap-2 cursor-pointer hover:text-primary"
                    onClick={() => editItem("Language")}
                  >
                    <Edit className="size-3 sm:size-4" /> Edit
                  </button>
                  <button
                    className=" text-white sm:p-1 p-0.5 text-[10px] sm:text-xs flex justify-center items-center gap-1 sm:gap-2 cursor-pointer hover:text-red-500"
                    onClick={() => deleteItem("Language")}
                  >
                    <Trash2 className="size-3 sm:size-4" /> Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar (Right 1/4) */}
        <div className="w-1/4 rounded-r-lg min-h-full bg-[#305276] text-white text-[8px] sm:text-sm p-2 sm:p-3 md:p-5 lg:p-4 overflow-hidden">
          <div className="c-info relative">
            <>
              {/* City & Country */}
              <p className="break-words">
                {contactInfo.city || (
                  <span className="italic text-gray-400">City</span>
                )}
                {contactInfo.city &&
                  contactInfo.country &&
                  ", "}
                {contactInfo.country || (
                  <span className="italic text-gray-400">Country</span>
                )}
                {!contactInfo.city &&
                  !contactInfo.country && (
                    <span className="italic text-gray-400">Location</span>
                  )}
              </p>

              {/* Phone Number */}
              <p className="mt-1 sm:mt-2 md:mt-3 break-words">
                {contactInfo.phoneNumber || (
                  <span className="italic text-gray-400">Phone Number</span>
                )}
              </p>

              {/* Email */}
              <p className="mt-1 sm:mt-2 md:mt-3 max-md:break-all">
                {contactInfo.email || (
                  <span className="italic text-gray-400">Email Address</span>
                )}
              </p>

              {/* LinkedIn */}
              <p className="mt-1 sm:mt-2 md:mt-3 max-md:break-all">
                {contactInfo.linkedIn || (
                  <span className="italic text-gray-400">
                    LinkedIn/Portfolio
                  </span>
                )}
              </p>
            </>
            {/* {contactInfo.github && (
              <p className="mt-1 sm:mt-2 md:mt-3 break-all">
                {github}
              </p>
            )} */}
            <div className="edit hidden absolute -right-1 -top-1">
              <div className="flex gap-2 sm:gap-3 bg-gray-900">
                <button
                  className=" text-white p-1 text-[10px] sm:text-xs flex justify-center items-center gap-1 sm:gap-2 cursor-pointer hover:text-primary"
                  onClick={() => editItem("Contact information")}
                >
                  <Edit className="size-3 sm:size-4" />{" "}
                  <span className="max-sm:hidden">Edit</span>
                </button>
              </div>
            </div>
          </div>

          {skills && (
            <div className="c-info relative">
              <h2 className="mt-3 sm:mt-4 md:mt-5 lg:mt-6 font-bold font-serif">
                SKILLS
              </h2>
              <ul className="mt-1 sm:mt-1.5 md:mt-2 space-y-1">
                {skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
              <div className="edit hidden absolute -right-1 -top-1">
                <div className="flex max-sm:flex-col gap-2 sm:gap-3 bg-gray-900">
                  <button
                    className=" text-white p-1 text-[10px] sm:text-xs flex justify-center items-center gap-1 sm:gap-2 cursor-pointer hover:text-primary"
                    onClick={() => editItem("Skills")}
                  >
                    <Edit className="size-3 sm:size-4" />
                  </button>
                  <button
                    className=" text-white p-1 text-[10px] sm:text-xs flex justify-center items-center gap-1 sm:gap-2 cursor-pointer hover:text-red-500"
                    onClick={() => deleteItem("Skills")}
                  >
                    <Trash2 className="size-3 sm:size-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {certifications && (
            <div className="c-info relative">
              <h2 className="mt-3 sm:mt-4 md:mt-5 lg:mt-6 font-bold font-serif">
                CERTIFICATIONS
              </h2>
              <ul className="mt-1 sm:mt-1.5 md:mt-2 space-y-1">
                {certifications.map(
                  (cert, index) =>
                    (cert.name || cert.issueYear) && (
                      <li key={index}>
                        {cert.name}
                        {cert.issueYear && ` (${cert.issueYear})`}
                      </li>
                    )
                )}
              </ul>
              <div className="edit hidden absolute -right-1 -top-1">
                <div className="flex max-sm:flex-col gap-2 sm:gap-3 bg-gray-900">
                  <button
                    className=" text-white sm:p-1 p-0.5 text-[10px] sm:text-xs flex justify-center items-center gap-1 sm:gap-2 cursor-pointer hover:text-primary"
                    onClick={() => editItem("Certifications")}
                  >
                    <Edit className="size-3 sm:size-4" />
                  </button>
                  <button
                    className=" text-white sm:p-1 p-0.5 text-[10px] sm:text-xs flex justify-center items-center gap-1 sm:gap-2 cursor-pointer hover:text-red-500"
                    onClick={() => deleteItem("Certifications")}
                  >
                    <Trash2 className="size-3 sm:size-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {resumeInfo.volunteer && (
            <>
              <h2 className="mt-3 sm:mt-4 md:mt-5 lg:mt-6 font-bold font-serif">
                VOLUNTEER
              </h2>
              <p className="mt-1 sm:mt-1.5 md:mt-2">
                {volunteer.organization}
              </p>
              <p>
                {volunteer.role} ({volunteer.duration})
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HalleyTheme;
