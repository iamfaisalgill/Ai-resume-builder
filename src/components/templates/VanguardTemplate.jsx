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
    <div className="max-w-4xl sm:min-h-[1122px] min-h-[800px] mx-auto p-3 sm:p-6 bg-white shadow-lg rounded-lg text-[8px] sm:text-sm md:text-base">
      
      <header className="c-info relative sm:border-b-2 border-b-[1.5px] border-emerald-500 pb-3 sm:pb-6 mb-3 sm:mb-6">
        <div className="flex justify-between items-start md:items-center">
            <h1 className="text-[15px] sm:text-3xl font-bold uppercase text-gray-800">
              {/* {contactInfo.firstName} {contactInfo.lastName} */}
              {!(contactInfo.firstName || contactInfo.lastName) ? (
                <span className="text-gray-500">Your Name</span>
              ) : (
                `${contactInfo.firstName} ${contactInfo.lastName}`
              )}
            </h1>
          <div>
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
        <section className="c-info relative mb-3 sm:mb-4 md:mb-8">
          <h2 className="text-[10px] sm:text-xl font-bold text-emerald-600 border-b-1 sm:border-b-2 border-emerald-100 sm:pb-2 pb-1 sm:mb-4 mb-2">
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
        <section className="c-info relative mb-3 sm:mb-4 md:mb-8">
          <h2 className="text-[10px] sm:text-xl font-bold text-emerald-600 border-b-1 sm:border-b-2 border-emerald-100 sm:pb-2 pb-1 sm:mb-4 mb-2">
            TECHNICAL SKILLS
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-emerald-100 text-emerald-800 px-2 sm:px-3 py-[2px] rounded-full"
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
        <section className="c-info relative mb-3 sm:mb-4 md:mb-8">
          <h2 className="text-[10px] sm:text-xl font-bold text-emerald-600 border-b-1 sm:border-b-2 border-emerald-100 sm:pb-2 pb-1 sm:mb-4 mb-2">
            PROFESSIONAL EXPERIENCE
          </h2>
          <div className="space-y-3 sm:space-y-6">
            {experience.map(
              (exp, index) =>
                (exp.jobTitle ||
                  exp.startMonth ||
                  exp.startYear ||
                  exp.endMonth ||
                  exp.present ||
                  exp.endYear) && (
                  <div key={index}>
                    <div className="flex justify-between items-start">
                      <div>
                        {exp.jobTitle && (
                          <h3 className="font-semibold text-gray-800">
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
                    </div>
                    {exp.description && (
                      <span
                        className="mt-2 text-gray-700"
                        dangerouslySetInnerHTML={{ __html: exp.description }}
                      />
                    )}
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

      {/* Education Section */}
      {education && (
        <section className="c-info relative mb-3 sm:mb-4 md:mb-8">
          <h2 className="text-[10px] sm:text-xl font-bold text-emerald-600 border-b-1 sm:border-b-2 border-emerald-100 sm:pb-2 pb-1 sm:mb-4 mb-2">
            EDUCATION
          </h2>
          <div className="space-y-3 sm:space-y-6">
            {education.map(
              (edu, index) =>
                (edu.degree ||
                  edu.fieldOfStudy ||
                  edu.graduationMonth ||
                  edu.graduationYear) && (
                  <div key={index}>
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-800">
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
                    </div>
                  </div>
                )
            )}
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

      {/* Projects Section */}
      {projects && (
        <section className="c-info relative mb-3 sm:mb-4 md:mb-8">
          <h2 className="text-[10px] sm:text-xl font-bold text-emerald-600 border-b-1 sm:border-b-2 border-emerald-100 sm:pb-2 pb-1 sm:mb-4 mb-2">
            PROJECTS
          </h2>
          <div className="space-y-3 sm:space-y-6"> 
            {projects.map((project, index) => (
              (project.title || project.description || project.url) && (<div key={index}>
                {project.title && (
                  <h3 className="font-semibold text-gray-800">
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
              </div>)
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
        </section>
      )}

      {/* Certifications Section */}
      {certifications && (
        <section className="c-info relative mb-3 sm:mb-4 md:mb-8">
          <h2 className="text-[10px] sm:text-xl font-bold text-emerald-600 border-b-1 sm:border-b-2 border-emerald-100 sm:pb-2 pb-1 sm:mb-4 mb-2">
            CERTIFICATIONS
          </h2>
          <div className="space-y-3 sm:space-y-6">
            {certifications?.map((cert, index) => (
              (cert.name || cert.organization || cert.issueMonth || cert.issueYear) &&(<div key={index}>
                <div className="flex justify-between">
                  <div>
                    {cert.name && (
                      <h3 className="font-semibold text-gray-800">{cert.name}</h3>
                    )}
                    {cert.organization && (
                      <p className="text-gray-600">{cert.organization}</p>
                    )}
                  </div>
                  {(cert.issueMonth || cert.issueYear) && (
                    <p className="text-gray-500">
                      {cert.issueMonth} {cert.issueYear}
                    </p>
                  )}
                </div>
              </div>)
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

      {/* Languages Section */}
      {languages && (
        <section className="c-info relative ">
          <h2 className="text-[10px] sm:text-xl font-bold text-emerald-600 border-b-1 sm:border-b-2 border-emerald-100 sm:pb-2 pb-1 sm:mb-4 mb-2">
            LANGUAGES
          </h2>
          <div className="flex flex-wrap gap-4">
            {languages.map((lang, index) => (
              (lang.language || lang.proficiency) && (<div key={index}>
                <span className="font-semibold text-gray-800 capitalize">
                  {lang.language}:
                </span>{" "}
                <span className="text-gray-600">{lang.proficiency}</span>
              </div>)
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
