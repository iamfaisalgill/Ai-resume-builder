import { Document, Page, View, Text, StyleSheet, Link } from '@react-pdf/renderer';
import { Children } from 'react';
import Html from 'react-pdf-html';

// Create styles
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    padding: 20,
    color: '#1a365d',
  },
  header: {
    backgroundColor: '#2b6cb0',
    color: '#ffffff',
    padding: 16,
    borderRadius: 4,
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  lastName: {
    color: '#bee3f8',
  },
  title: {
    fontSize: 12,
    color: '#ebf8ff',
    marginBottom: 10,
  },
  contactInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    fontSize: 9,
    marginBottom: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2b6cb0',
    borderBottomWidth: 1,
    borderBottomColor: '#bee3f8',
    paddingBottom: 2,
    marginBottom: 8,
  },
  summary: {
    fontSize: 9,
    lineHeight: 1.4,
    marginBottom: 16,
  },
  twoColumns: {
    flexDirection: 'row',
    gap: 16,
  },
  mainColumn: {
    width: '65%',
  },
  sideColumn: {
    width: '35%',
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 1,
  },
  company: {
    fontSize: 10,
    color: '#2b6cb0',
    marginBottom: 2,
  },
  date: {
    fontSize: 9,
    color: '#2b6cb0',
  },
  jobDescription: {
    fontSize: 9,
    lineHeight: 1.3,
    marginLeft: 8,
    marginTop: 4,
  },
  projectTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 1,
  },
  projectDescription: {
    fontSize: 9,
    lineHeight: 1.3,
    marginBottom: 3,
  },
  projectLink: {
    fontSize: 8,
    color: '#3182ce',
  },
  skillTag: {
    backgroundColor: '#ebf8ff',
    color: '#2b6cb0',
    fontSize: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginRight: 4,
    marginBottom: 4,
  },
  educationDegree: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 1,
  },
  educationInstitution: {
    fontSize: 9,
    marginBottom: 1,
  },
  educationField: {
    fontSize: 8,
    color: '#4a5568',
    marginBottom: 1,
  },
  educationDate: {
    fontSize: 8,
    color: '#3182ce',
  },
  certificationName: {
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 1,
  },
  certificationOrg: {
    fontSize: 8,
    color: '#4a5568',
    marginBottom: 1,
  },
  certificationDate: {
    fontSize: 8,
    color: '#3182ce',
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  languageName: {
    fontSize: 9,
    fontWeight: 'bold',
  },
  languageProficiency: {
    fontSize: 8,
    color: '#4a5568',
  },
});


const ApexPDF = ({ resumeInfo }) => {

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

  const formatDateRange = (startMonth, startYear, endMonth, endYear, present) => {
    const start = `${startMonth} ${startYear}`;
    const end = present ? "Present" : `${endMonth} ${endYear}`;
    return `${start} - ${end}`;
  };

  const formatEducationDate = (month, year) => {
    return `${month} ${year}`;
  };

  const CustomUl = ({ children }) => (
      <View style={{ margin: 0, padding: 0 }}>
        {Children.map(children, (child, index) => (
          <View style={{ flexDirection: "row", marginBottom: 2 }}>
            <Text style={{ marginRight: 5 }}>•</Text>
            {child}
          </View>
        ))}
      </View>
    );
  
    const CustomOl = ({ children }) => (
      <View style={{ margin: 0, padding: 0, counterReset: "item" }}>
        {Children.map(children, (child, index) => (
          <View style={{ flexDirection: "row", marginBottom: 2 }}>
            <Text style={{ marginRight: 5 }}>{index + 1}.</Text>
            {child}
          </View>
        ))}
      </View>
    );
  
    const customRenderers = {
      ul: CustomUl,
      ol: CustomOl,
      li: ({ children }) => <Text>{children}</Text>,
    };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>
            {contactInfo.firstName || 'John'}{' '}
            <Text style={styles.lastName}>{contactInfo.lastName || 'Doe'}</Text>
          </Text>
          {/* <Text style={styles.title}>{contactInfo.title || 'Your Profession'}</Text> */}
          <View style={styles.contactInfo}>
            <View style={styles.contactItem}>
              <Text>{contactInfo.email}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text>{contactInfo.phoneNumber}</Text>
            </View>
            <View style={styles.contactItem}>
              {contactInfo.city || contactInfo.country && <Text>{contactInfo.city}
              {contactInfo.city &&
                contactInfo.country &&
                ", "}
              {contactInfo.country}</Text>}
            </View>
            <View style={styles.contactItem}>
              <Text>{contactInfo.linkedIn}</Text>
            </View>
          </View>
        </View>

        {/* Summary */}
        {(summary || summary === "") && <View>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.summary}>{summary}</Text>
        </View>}

        <View style={styles.twoColumns}>
          <View style={styles.mainColumn}>
            {/* Experience */}
            {experience && <View>
              <Text style={styles.sectionTitle}>Experience</Text>
              {experience.map((exp, index) => (
                (exp.jobTitle ||
                    exp.startMonth ||
                    exp.startYear ||
                    exp.endMonth ||
                    exp.present ||
                    exp.endYear) && <View key={index} style={{ marginBottom: 16 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    {exp.jobTitle && <Text style={styles.jobTitle}>{exp.jobTitle}</Text>}
                    <Text style={styles.date}>
                      {formatDateRange(exp.startMonth, exp.startYear, exp.endMonth, exp.endYear, exp.present)}
                    </Text>
                  </View>
                  {exp.company && <Text style={styles.company}>{exp.company}</Text>}
                  {exp.description && <Html
                        style={{ fontFamily: "Helvetica", fontSize: 9 }}
                        renderers={customRenderers}
                      >
                        {exp.description}
                      </Html>}
                </View>
              ))}
            </View>}

            {/* Projects */}
            {projects && <View>
              <Text style={styles.sectionTitle}>Projects</Text>
              {projects.map((project, index) => (
                (project.title || project.description || project.url) && <View key={index} style={{ marginBottom: 12 }}>
                  {project.title && <Text style={styles.projectTitle}>{project.title}</Text>}
                  {project.description &&<Text style={styles.projectDescription}>{project.description}</Text>}
                  {project.url &&<Link src={project.url.startsWith("http") ? p.url : `https://${project.url}`} style={styles.projectLink}>
                    {project.url}
                  </Link>}
                </View>
              ))}
            </View>}
          </View>

          <View style={styles.sideColumn}>
            {/* Skills */}
            {skills && <View>
              <Text style={styles.sectionTitle}>Skills</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {skills.map((skill, index) => (
                  <Text key={index} style={styles.skillTag}>
                    {skill}
                  </Text>
                ))}
              </View>
            </View>}

            {/* Education */}
            {education && <View style={{ marginTop: 20 }}>
              <Text style={styles.sectionTitle}>Education</Text>
              {education?.map((edu, index) => (
                (edu.degree ||
                edu.fieldOfStudy ||
                edu.graduationMonth ||
                edu.graduationYear) && (<View key={index} style={{ marginBottom: 12 }}>
                  {edu.degree && <Text style={styles.educationDegree}>{edu.degree}</Text>}
                  {edu.institution && <Text style={styles.educationInstitution}>{edu.institution}</Text>}
                  {edu.fieldOfStudy && <Text style={styles.educationField}>{edu.fieldOfStudy}</Text>}
                  <Text style={styles.educationDate}>
                    {formatEducationDate(edu.graduationMonth, edu.graduationYear)}
                  </Text>
                </View>)
              ))}
            </View>}

            {/* Certifications */}
            {certifications && <View style={{ marginTop: 20 }}>
              <Text style={styles.sectionTitle}>Certifications</Text>
              {certifications.map((cert, index) => (
                (cert.name || cert.issueYear) && <View key={index} style={{ marginBottom: 8 }}>
                  <Text style={styles.certificationName}>{cert.name}</Text>
                  {cert.organization && <Text style={styles.certificationOrg}>{cert.organization}</Text>}
                  <Text style={styles.certificationDate}>
                    {cert.issueMonth} {cert.issueYear}
                  </Text>
                </View>
              ))}
            </View>}

            {/* Languages */}
            {languages && <View style={{ marginTop: 20 }}>
              <Text style={styles.sectionTitle}>Languages</Text>
              {languages.map((lang, index) => (
                lang.language && <View key={index} style={styles.languageItem}>
                  <Text style={styles.languageName}>{lang.language}</Text>
                  <Text style={styles.languageProficiency}>{lang.proficiency}</Text>
                </View>
              ))}
            </View>}
          </View>
        </View>
      </Page>
    </Document>
  );
};


export default ApexPDF;