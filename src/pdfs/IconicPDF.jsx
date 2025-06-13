import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { Children } from "react";
import Html from "react-pdf-html";

// Updated styles with better spacing and consistency
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 0,
    fontFamily: "Helvetica",
  },
  header: {
    backgroundColor: "#1E3A5F",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    color: "white",
    alignItems: "flex-start", // Align items to top
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 4, // Added for better spacing
  },
  contactInfo: {
    fontSize: 10,
    marginBottom: 3, // Reduced from 4 for tighter spacing
    textAlign: "right", // Right align contact info
  },
  content: {
    padding: 20,
    color: "#000000",
  },
  section: {
    marginBottom: 12, // Reduced from 15 for tighter sections
    flexDirection: "row",
  },
  sectionTitle: {
    width: "25%", // Reduced from 30% for better balance
    fontSize: 12,
    fontWeight: "bold",
    color: "#1E3A5F",
    paddingTop: 2, // Align text with content
  },
  sectionContent: {
    width: "75%", // Increased from 70% to match title change
  },
  splitTitle: {
    fontSize: 12, // Reduced from 13 for consistency
    fontWeight: "bold",
    color: "#1E3A5F",
    marginBottom: 2,
    lineHeight: 1.3, // Better line spacing
  },
  jobTitle: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 1, // Reduced from 2 for tighter spacing
  },
  jobDetails: {
    fontSize: 10,
    marginBottom: 4, // Adjusted from 5
    color: "#555555", // Slightly muted color
  },
  bulletItem: {
    fontSize: 10,
    marginBottom: 2, // Reduced from 3
    marginLeft: 8,
    lineHeight: 1.3, // Better readability
  },
  skillGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: -3, // Compensate for item margin
  },
  skillItem: {
    width: "33.33%", // More precise than '33%'
    fontSize: 10,
    marginBottom: 3, // Reduced from 5
    paddingRight: 5, // Prevent text overflow
  },
  projectTitle: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 1, // Reduced from 2
  },
  projectDesc: {
    fontSize: 10,
    lineHeight: 1.3, // Better readability
    marginBottom: 2, // Added spacing
  },
  projectUrl: {
    fontSize: 9, // Slightly smaller than 10
    marginTop: 2, // Reduced from 5
    color: "#5F6A8A",
  },
  educationItem: {
    marginBottom: 6, // Reduced from 8
  },
  educationDegree: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 1, // Added for spacing
  },
  educationDetails: {
    fontSize: 10,
    color: "#555555", // Slightly muted color
  },
  certifications: {
    fontSize: 10,
    lineHeight: 1.3,
    marginBottom: 3, // Added spacing between certs
  },
  languageItem: {
    width: "33.33%", // More precise than '33%'
    marginBottom: 4, // Reduced from 5
  },
  languageName: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 1, // Reduced from 2
  },
  languageLevel: {
    fontSize: 10,
    color: "#555555", // Slightly muted color
  },
  summaryText: {
    fontSize: 10,
    lineHeight: 1.4,
    textAlign: "justify", // Better paragraph alignment
  },
});

const IconicPDF = ({ resumeInfo }) => {
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
          <View>
            <Text style={styles.name}>
              {contactInfo.firstName}{" "}
              {contactInfo.lastName}
            </Text>
          </View>
          <View>
            <Text style={styles.contactInfo}>
              {contactInfo.phoneNumber}
            </Text>
            <Text style={styles.contactInfo}>
              {contactInfo.email}
            </Text>
            <Text style={styles.contactInfo}>
              {contactInfo.linkedIn}
            </Text>
            {(contactInfo.city ||
              contactInfo.country) && (
              <Text style={styles.contactInfo}>
                {[contactInfo.city, contactInfo.country]
                  .filter(Boolean)
                  .join(", ")}
              </Text>
            )}
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Professional Summary */}
          {(summary || summary === "") && (
            <View style={styles.section}>
              <View style={styles.sectionTitle}>
                <Text style={styles.splitTitle}>PROFESSIONAL</Text>
                <Text style={styles.splitTitle}>SUMMARY</Text>
              </View>
              <View style={styles.sectionContent}>
                <Text style={styles.summaryText}>{summary}</Text>
              </View>
            </View>
          )}

          {/* Technical Skills */}
          {skills && (
            <View style={styles.section}>
              <View style={styles.sectionTitle}>
                <Text>TECHNICAL SKILLS</Text>
              </View>
              <View style={[styles.sectionContent, styles.skillGrid]}>
                {skills.map((skill, index) => (
                  <Text key={index} style={styles.skillItem}>
                    • {skill}
                  </Text>
                ))}
              </View>
            </View>
          )}

          {/* Experience */}
          {experience && (
            <View style={styles.section}>
              <View style={styles.sectionTitle}>
                <Text>EXPERIENCE</Text>
              </View>
              <View style={styles.sectionContent}>
                {experience.map((exp, index) => (
                  <View key={index} style={{ marginBottom: 8 }}>
                    <Text style={styles.jobTitle}>{exp.jobTitle}</Text>
                    <Text style={styles.jobDetails}>
                      {exp.company}, {exp.startMonth} {exp.startYear} -{" "}
                      {exp.present
                        ? "Present"
                        : `${exp.endMonth} ${exp.endYear}`}
                    </Text>

                    <Html
                      style={{ fontFamily: "Helvetica", fontSize: 10 }}
                      renderers={customRenderers}
                    >
                      {exp.description}
                    </Html>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Projects */}
          {projects && (
            <View style={styles.section}>
              <View style={styles.sectionTitle}>
                <Text>PROJECTS</Text>
              </View>
              <View style={styles.sectionContent}>
                {projects.map((project, index) => (
                  <View key={index} style={{ marginBottom: 8 }}>
                    <Text style={styles.projectTitle}>{project.title}</Text>
                    <Text style={styles.projectDesc}>
                      {project.description}
                    </Text>
                    {project.url && (
                      <Text style={styles.projectUrl}>
                        {project.url.replace(/^https?:\/\//, "")}{" "}
                        {/* Remove http(s):// */}
                      </Text>
                    )}
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Education */}
          {education && (
            <View style={styles.section}>
              <View style={styles.sectionTitle}>
                <Text>EDUCATION</Text>
              </View>
              <View style={styles.sectionContent}>
                {education.map((edu, index) => (
                  <View key={index} style={styles.educationItem}>
                    <Text style={styles.educationDegree}>
                      {edu.degree} in {edu.fieldOfStudy}
                    </Text>
                    <Text style={styles.educationDetails}>
                      {edu.institution}, {edu.graduationMonth}{" "}
                      {edu.graduationYear}
                      {edu.gpa && `, GPA: ${edu.gpa}`}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Certifications */}
          {certifications && (
            <View style={styles.section}>
              <View style={styles.sectionTitle}>
                <Text>CERTIFICATIONS</Text>
              </View>
              <View style={styles.sectionContent}>
                {certifications.map((cert, index) => (
                  <Text key={index} style={styles.certifications}>
                    • {cert.name} ({cert.issueYear})
                    {cert.issuer && ` • ${cert.issuer}`}
                  </Text>
                ))}
              </View>
            </View>
          )}

          {/* Languages */}
          {languages && (
            <View style={styles.section}>
              <View style={styles.sectionTitle}>
                <Text>LANGUAGES</Text>
              </View>
              <View style={[styles.sectionContent, styles.skillGrid]}>
                {" "}
                {/* Reused skillGrid styles */}
                {languages.map((lang, index) => (
                  <View key={index} style={styles.languageItem}>
                    <Text style={styles.languageName}>{lang.language}</Text>
                    <Text style={styles.languageLevel}>{lang.proficiency}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default IconicPDF;
