import { useResume } from "@/context/ResumeInfoContext";
import clsx from "clsx";
import { Edit, Trash2 } from "lucide-react";

export default function VanguardTemplate({ deleteItem, editItem }) {
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
    <div className="max-w-4xl min-h-[850px] mx-auto p-8 bg-white shadow-lg rounded-lg">
      {/* Header Section - Always shown as it's essential */}
      <header className="c-info relative border-b-2 border-emerald-500 pb-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1
              className={
                "text-3xl font-bold uppercase text-gray-800 font-serif"
              }
            >
              {/* {contactInfo.firstName} {contactInfo.lastName} */}
              {!(contactInfo.firstName || contactInfo.lastName) ? (
                <span className="text-gray-500">Your Name</span>
              ) : (
                `${contactInfo.firstName} ${contactInfo.lastName}`
              )}
            </h1>
          </div>
          <div className="mt-4 md:mt-0 text-right">
            {contactInfo.email ? (
              <p className="text-gray-600">{contactInfo.email}</p>
            ) : (
              <p className="text-gray-300">Email</p>
            )}

            {contactInfo.phoneNumber ? (
              <p className="text-gray-600">{contactInfo.phoneNumber}</p>
            ) : (
              <p className="text-gray-300">Phone</p>
            )}

            {contactInfo.linkedIn ? (
              <p className="text-emerald-600">{contactInfo.linkedIn}</p>
            ) : (
              <p className="text-gray-300">LinkedIn/Portfolio</p>
            )}

            {contactInfo.city || contactInfo.country ? (
              <p className="text-gray-600">
                {contactInfo.city && `${contactInfo.city}`}
                {contactInfo.city && contactInfo.country && ", "}
                {contactInfo.country && `${contactInfo.country}`}
              </p>
            ) : (
              <p className="text-gray-300">Location</p>
            )}
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
      </header>

      {/* Summary Section */}
      {(summary || summary === "") && (
        <section className="c-info relative mb-8">
          <h2 className="text-xl font-bold text-emerald-600 border-b-2 border-emerald-100 pb-2 mb-4">
            SUMMARY
          </h2>
          <p className="text-gray-700">{summary}</p>
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

      {/* Skills Section */}
      {skills && (
        <section className="c-info relative mb-8">
          <h2 className="text-xl font-bold text-emerald-600 border-b-2 border-emerald-100 pb-2 mb-4">
            TECHNICAL SKILLS
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
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

      {/* Experience Section */}
      {experience && (
        <section className="c-info relative mb-8">
          <h2 className="text-xl font-bold text-emerald-600 border-b-2 border-emerald-100 pb-2 mb-4">
            PROFESSIONAL EXPERIENCE
          </h2>
          {experience?.map((exp, index) => (
            <div key={index} className="mb-6">
              {(exp.jobTitle ||
                  exp.startMonth ||
                  exp.startYear ||
                  exp.endMonth ||
                  exp.present ||
                  exp.endYear) &&(<div className="flex justify-between items-start">
                <div>
                  {exp.jobTitle && (
                    <h3 className="text-lg font-semibold text-gray-800">
                      {exp.jobTitle}
                    </h3>
                  )}
                  {exp.company && (
                    <h4 className="text-md text-gray-600">{exp.company}</h4>
                  )}
                </div>
                {(exp.startMonth ||
                  exp.startYear ||
                  exp.endMonth ||
                  exp.present ||
                  exp.endYear) && (
                  <div className="text-gray-500">
                    {exp.startMonth} {exp.startYear}
                    {(exp.endMonth || exp.present) && " - "}
                    {exp.present
                      ? "Present"
                      : exp.endMonth && `${exp.endMonth} ${exp.endYear}`}
                  </div>
                )}
              </div>)}
              {exp.description && (
                <div
                  className="mt-2 text-gray-700 pl-4"
                  dangerouslySetInnerHTML={{ __html: exp.description }}
                />
              )}
            </div>
          ))}
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

      {/* Education Section */}
      {education && (
        <section className="c-info relative mb-8">
          <h2 className="text-xl font-bold text-emerald-600 border-b-2 border-emerald-100 pb-2 mb-4">
            EDUCATION
          </h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-4">
              {(edu.degree ||
                edu.fieldOfStudy ||
                edu.graduationMonth ||
                edu.graduationYear) &&(<div className="flex justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {edu.institution}
                  </h3>
                  <p className="text-gray-600">
                    {edu.degree && `${edu.degree}`}
                    {edu.degree && edu.fieldOfStudy && " in "}
                    {edu.fieldOfStudy && `${edu.fieldOfStudy}`}
                  </p>
                </div>
                {edu.graduationMonth && edu.graduationYear && (
                  <p className="text-gray-500">
                    {edu.graduationMonth} {edu.graduationYear}
                  </p>
                )}
              </div>)}
            </div>
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
        </section>
      )}

      {/* Projects Section */}
      {projects && (
        <section className="c-info relative mb-8">
          <h2 className="text-xl font-bold text-emerald-600 border-b-2 border-emerald-100 pb-2 mb-4">
            PROJECTS
          </h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-4">
              {project.title && (
                <h3 className="text-lg font-semibold text-gray-800">
                  {project.title}
                </h3>
              )}
              {project.description && (
                <p className="text-gray-700 mb-1">{project.description}</p>
              )}
              {project.url && (
                <a
                  href={`https://${project.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:underline"
                >
                  {project.url}
                </a>
              )}
            </div>
          ))}
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

      {/* Certifications Section */}
      {certifications && (
        <section className="c-info relative mb-8">
          <h2 className="text-xl font-bold text-emerald-600 border-b-2 border-emerald-100 pb-2 mb-4">
            CERTIFICATIONS
          </h2>
         {certifications?.map((cert, index) => (
  <div key={index} className="mb-3">
    <div className="flex justify-between">
      {cert.name || cert.organization &&(<div>
        {cert.name && <h3 className="font-semibold text-gray-800">{cert.name}</h3>}
        {cert.organization && <p className="text-gray-600">{cert.organization}</p>}
      </div>)}
      {(cert.issueMonth || cert.issueYear) && (
        <p className="text-gray-500">
          {cert.issueMonth} {cert.issueYear}
        </p>
      )}
    </div>
  </div>
))}
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

      {/* Languages Section */}
      {languages && (
        <section className="c-info relative ">
          <h2 className="text-xl font-bold text-emerald-600 border-b-2 border-emerald-100 pb-2 mb-4">
            LANGUAGES
          </h2>
          <div className="flex flex-wrap gap-4">
            {languages.map((lang, index) => (
              <div key={index}>
                <span className="font-semibold text-gray-800">
                  {lang.language}:
                </span>{" "}
                <span className="text-gray-600">{lang.proficiency}</span>
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
        </section>
      )}
    </div>
  );
}
