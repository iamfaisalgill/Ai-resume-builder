import { useResume } from "@/context/ResumeInfoContext";

const ApexTemplate = () => {
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
    <div className="font-sans bg-white text-gray-800 max-w-4xl mx-auto p-8 shadow-lg">
      {/* Header */}
      <header className="bg-[#2b6cb0] text-white p-6 rounded-lg mb-6">
        <h1 className="text-4xl font-bold">
          {contactInfo.firstName}{" "}
          <span className="text-blue-200">{contactInfo.lastName}</span>
        </h1>
        <h2 className="text-xl text-blue-100 mt-1">Data Scientist</h2>
        <div className="flex flex-wrap gap-4 mt-4 text-sm">
          <div className="flex items-center">
            {contactInfo.email}
          </div>
          <div className="flex items-center">
            {contactInfo.phoneNumber}
          </div>
          <div className="flex items-center">
            {contactInfo.city}, {contactInfo.country}
          </div>
          <div className="flex items-center">
            {contactInfo.linkedIn}
          </div>
        </div>
      </header>

      {/* Summary */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-[#2b6cb0] border-b-2 border-blue-200 pb-2 mb-4">
          Summary
        </h2>
        <p className="text-gray-700 leading-relaxed">{summary}</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {/* Experience */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#2b6cb0] border-b-2 border-blue-200 pb-2 mb-4">
              Experience
            </h2>
            {experience.map((exp, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xl font-semibold">{exp.jobTitle}</h3>
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
                <h4 className="text-lg text-[#2b6cb0] mb-2">{exp.company}</h4>
                <div
                  className="text-gray-700 ml-4"
                  dangerouslySetInnerHTML={renderHTML(exp.description)}
                />
              </div>
            ))}
          </section>

          {/* Projects */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#2b6cb0] border-b-2 border-blue-200 pb-2 mb-4">
              Projects
            </h2>
            {projects.map((project, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <p className="text-gray-700 mb-1">{project.description}</p>
                <a
                  href={`https://${project.url}`}
                  className="text-[#2b6cb0] hover:underline text-sm"
                >
                  {project.url}
                </a>
              </div>
            ))}
          </section>
        </div>

        <div>
          {/* Skills */}
          <section className="mb-8">
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
          </section>

          {/* Education */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#2b6cb0] border-b-2 border-blue-200 pb-2 mb-4">
              Education
            </h2>
            {education.map((edu, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold">{edu.degree}</h3>
                <p className="text-gray-800">{edu.institution}</p>
                <p className="text-gray-600 text-sm">{edu.fieldOfStudy}</p>
                <p className="text-[#2b6cb0] text-sm">
                  {formatEducationDate(edu.graduationMonth, edu.graduationYear)}
                </p>
              </div>
            ))}
          </section>

          {/* Certifications */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#2b6cb0] border-b-2 border-blue-200 pb-2 mb-4">
              Certifications
            </h2>
            {certifications.map((cert, index) => (
              <div key={index} className="mb-3">
                <h3 className="font-semibold">{cert.name}</h3>
                <p className="text-gray-600 text-sm">{cert.organization}</p>
                <p className="text-[#2b6cb0] text-xs">
                  {cert.issueMonth} {cert.issueYear}
                </p>
              </div>
            ))}
          </section>

          {/* Languages */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#2b6cb0] border-b-2 border-blue-200 pb-2 mb-4">
              Languages
            </h2>
            {languages.map((lang, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{lang.language}</span>

                  <span className="text-gray-600">{lang.proficiency}</span>
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
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ApexTemplate;
