import { useResume } from "@/context/ResumeInfoContext";
import { Edit, Trash2 } from "lucide-react";

const ApexTemplate = ({ deleteItem, editItem }) => {
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

  const formatDateRange = (
    startMonth,
    startYear,
    endMonth,
    endYear,
    present
  ) => {
    const start = `${startMonth} ${startYear}`;
    const end = present ? "Present" : `${endMonth} ${endYear}`;
    return `${start} - ${end}`;
  };

  const formatEducationDate = (month, year) => {
    return `${month} ${year}`;
  };

  const renderHTML = (html) => {
    return { __html: html };
  };

  return (
    <div className="font-sans bg-white text-gray-800 max-w-4xl min-h-[1122px] shadow-lg rounded-lg mx-auto p-8 shadow-lg">
      {/* Header */}
      <header className="c-info relative bg-[#2b6cb0] text-white p-6 rounded-lg mb-6">
        <h1 className="text-4xl font-bold">
          <span className={!contactInfo.firstName ? "text-blue-100 italic" : ""}>
            {contactInfo.firstName || "Your"}
          </span>{" "}
          <span
            className={`text-blue-200 ${!contactInfo.lastName && "italic"}`}
          >
            {contactInfo.lastName || "Name"}
          </span>
        </h1>
        {/* <h2 className={`text-xl text-blue-100 mt-1 ${!contactInfo.title && 'italic'}`}>
          {contactInfo.title || 'Your Profession'}
        </h2> */}
        <div className="flex flex-wrap gap-4 mt-4 text-sm">
          <div className="flex items-center">
            <span className={!contactInfo.email ? "text-blue-100 italic": ""}>
              {contactInfo.email || "email@example.com"}
            </span>
          </div>
          <div className="flex items-center">
            <span
              className={!contactInfo.phoneNumber ? "text-blue-100 italic": ""}
            >
              {contactInfo.phoneNumber || "+1 (123) 456-7890"}
            </span>
          </div>
          <div className="flex items-center">
            <span
              className={
                !contactInfo.city && !contactInfo.country
                  ? "text-blue-100 italic"
                  : ""
              }
            >
              {contactInfo.city || ""}
              {contactInfo.city && contactInfo.country && ", "}
              {contactInfo.country || (!contactInfo.city ? "Location" : "")}
            </span>
          </div>
          <div className="flex items-center">
            {contactInfo.linkedIn ? (
              <p>
                {contactInfo.linkedIn}
              </p>
            ) : (
              <span className="text-blue-100 italic">
                linkedin.com/in/your-profile
              </span>
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

      {/* Summary */}
      {(summary || summary === "") && (
        <section className="c-info relative mb-8">
          <h2 className="text-2xl font-bold text-[#2b6cb0] border-b-2 border-blue-200 pb-2 mb-4">
            Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{summary}</p>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {/* Experience */}
          {experience && (
            <section className="c-info relative mb-8">
              <h2 className="text-2xl font-bold text-[#2b6cb0] border-b-2 border-blue-200 pb-2 mb-4">
                Experience
              </h2>
              {experience.map(
                (exp, index) =>
                  (exp.jobTitle ||
                    exp.startMonth ||
                    exp.startYear ||
                    exp.endMonth ||
                    exp.present ||
                    exp.endYear) && (
                    <div key={index} className="mb-6">
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-xl font-semibold">
                          {exp.jobTitle}
                        </h3>
                        <span className="text-[#2b6cb0] text-sm">
                          {formatDateRange(
                            exp.startMonth,
                            exp.startYear,
                            exp.endMonth,
                            exp.endYear,
                            exp.present
                          )}
                        </span>
                      </div>
                      {exp.company && (
                        <h4 className="text-lg text-[#2b6cb0] mb-2">
                          {exp.company}
                        </h4>
                      )}
                      {exp.description && (
                        <div
                          className="text-gray-700 ml-4"
                          dangerouslySetInnerHTML={renderHTML(exp.description)}
                        />
                      )}
                    </div>
                  )
              )}
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

          {/* Projects */}
          {projects && (
            <section className="c-info relative mb-8">
              <h2 className="text-2xl font-bold text-[#2b6cb0] border-b-2 border-blue-200 pb-2 mb-4">
                Projects
              </h2>
              {projects.map(
                (project, index) =>
                  (project.title || project.description) && (
                    <div key={index} className="mb-4">
                      {project.title && (
                        <h3 className="text-lg font-semibold">
                          {project.title}
                        </h3>
                      )}
                      {project.description && (
                        <p className="text-gray-700 mb-1">
                          {project.description}
                        </p>
                      )}
                      <p className="text-[#2b6cb0] text-sm">{project.url}</p>
                    </div>
                  )
              )}
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
        </div>

        <div>
          {/* Skills */}
          {skills && (
            <section className="c-info relative mb-8">
              <h2 className="text-2xl font-bold text-[#2b6cb0] border-b-2 border-blue-200 pb-2 mb-4">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-[#ebf8ff] text-[#2b6cb0] px-3 py-1 rounded-full text-sm"
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

          {/* Education */}
          {education && (
            <section className="c-info relative mb-8">
              <h2 className="text-2xl font-bold text-[#2b6cb0] border-b-2 border-blue-200 pb-2 mb-4">
                Education
              </h2>
              {education.map((edu, index) => (
                <div key={index} className="mb-4">
                  {edu.degree && (
                    <h3 className="text-lg font-semibold">{edu.degree}</h3>
                  )}
                  {edu.institution && (
                    <p className="text-gray-800">{edu.institution}</p>
                  )}
                  {edu.fieldOfStudy && (
                    <p className="text-gray-600 text-sm">{edu.fieldOfStudy}</p>
                  )}
                  {(edu.graduationMonth || edu.graduationYear) && (
                    <p className="text-[#2b6cb0] text-sm">
                      {formatEducationDate(
                        edu.graduationMonth,
                        edu.graduationYear
                      )}
                    </p>
                  )}
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

          {/* Certifications */}
          {certifications && (
            <section className="c-info relative mb-8">
              <h2 className="text-2xl font-bold text-[#2b6cb0] border-b-2 border-blue-200 pb-2 mb-4">
                Certifications
              </h2>
              {certifications.map(
                (cert, index) =>
                  (cert.name || cert.organization) && (
                    <div key={index} className="mb-3">
                      <h3 className="font-semibold">{cert.name}</h3>
                      <p className="text-gray-600 text-sm">
                        {cert.organization}
                      </p>
                      <p className="text-[#2b6cb0] text-xs">
                        {cert.issueMonth} {cert.issueYear}
                      </p>
                    </div>
                  )
              )}
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

          {/* Languages */}
          {languages && (
            <section className="c-info relative mb-8">
              <h2 className="text-2xl font-bold text-[#2b6cb0] border-b-2 border-blue-200 pb-2 mb-4">
                Languages
              </h2>
              {languages.map(
                (lang, index) =>
                  lang.language && (
                    <div key={index} className="mb-3">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{lang.language}</span>

                        <span className="text-gray-600">
                          {lang.proficiency}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div
                          className="bg-[#2b6cb0] h-1 rounded-full"
                          style={{
                            width:
                              lang.proficiency === "Native"
                                ? "100%"
                                : lang.proficiency === "Fluent"
                                ? "85%"
                                : lang.proficiency === "Advanced"
                                ? "75%"
                                : lang.proficiency === "Intermediate"
                                ? "60%"
                                : lang.proficiency === "Basic"
                                ? "40%"
                                : "20%",
                          }}
                        ></div>
                      </div>
                    </div>
                  )
              )}
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
  );
};

export default ApexTemplate;
