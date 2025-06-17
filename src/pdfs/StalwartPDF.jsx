import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Link,
} from "@react-pdf/renderer";
import segeo from "../assets/fonts/Seogeo/segoeuithis.ttf";
import segeo_bold from "../assets/fonts/Seogeo/segoeuithibd.ttf";
import segeo_italic from "../assets/fonts/Seogeo/segoeuithisi.ttf";
import segeo_italicb from "../assets/fonts/Seogeo/segoeuithisz.ttf";
import Html from "react-pdf-html";
import { Children } from "react";

Font.register({
  family: "Segeo",
  fonts: [
    {
      src: segeo, // Regular
      fontWeight: "normal",
      fontStyle: "normal",
    },
    {
      src: segeo_bold, // Bold
      fontWeight: "bold",
    },
    {
      src: segeo_italic, // Italic
      fontStyle: "italic",
    },
    {
      src: segeo_italicb, // Bold Italic
      fontWeight: "bold",
      fontStyle: "italic",
    },
  ],
});

const StalwartPDF = ({ resumeInfo }) => {
  // Create styles
  const styles = StyleSheet.create({
    page: {
      padding: 15,
      fontFamily: "Segeo",
    },
    name: {
      fontSize: 18,
      fontFamily: "Segeo",
      fontWeight: "bold",
      textTransform: "uppercase",
      marginBottom: 4,
    },
    contactInfo: {
      fontSize: 10,
      color: "#666666",
      marginBottom: 12,
    },
    sectionHeader: {
      fontSize: 11,
      fontFamily: "Segeo",
      fontWeight: "bold",
      backgroundColor: "#EEEEEE",
      paddingLeft: 5,
      paddingRight: 5,
      marginBottom: 5,
      marginTop: 15,
    },
    sectionText: {
      fontSize: 10,
      lineHeight: 1.4,
    },
    skillGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    skillItem: {
      width: "33%",
      fontSize: 10,
      marginBottom: 4,
    },
    jobHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 2,
    },
    jobTitle: {
      fontSize: 10,
      fontFamily: "Segeo",
      fontWeight: "bold",
    },
    jobDate: {
      fontSize: 10,
      fontFamily: "Segeo",
      fontWeight: "bold",
    },
    companyInfo: {
      fontSize: 10,
      marginBottom: 2,
    },
    bulletList: {
      fontSize: 10,
      marginLeft: 8,
    },
    bulletItem: {
      fontSize: 10,
      marginBottom: 2,
      marginLeft: 8,
      lineHeight: 1.3, // Better readability
    },
    educationItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 2,
    },
    educationTitle: {
      fontSize: 10,
      fontFamily: "Segeo",
      fontWeight: "bold",
    },
    educationDate: {
      fontSize: 10,
      fontFamily: "Segeo",
      fontWeight: "bold",
    },
    educationSchool: {
      fontSize: 10,
    },
    certGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    certItem: {
      width: "50%",
      fontSize: 10,
      marginBottom: 4,
    },
    projectTitle: {
      fontSize: 10,
      fontFamily: "Segeo",
      fontWeight: "bold",
    },
    projectDesc: {
      fontSize: 10,
    },
    projectUrl: {
      fontSize: 10,
      color: "#1E3A5F",
    },
    languageGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: 12,
    },
    languageTitle: {
      width: "33%",
      fontSize: 10,
      fontFamily: "Segeo",
      fontWeight: "bold",
      marginBottom: 2,
    },
    languageLevel: {
      fontSize: 10,
      color: "#666666",
      marginBottom: 4,
    },
    text: {
      fontSize: 10,
      lineHeight: 1.3,
    },
    listItem: {
      marginLeft: 10,
      flexDirection: "row",
    },
    bulletPoint: {
      width: 10,
    },
  });

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
        <Text style={styles.name}>
          {contactInfo.firstName || "John"} {contactInfo.lastName || "Doe"}
        </Text>
        <Text style={styles.contactInfo}>
          {/* City and Country */}
          {contactInfo.city}
          {contactInfo.city && contactInfo.country && ", "}
          {contactInfo.country}

          {/* First Bullet (only if something exists before and after) */}
          {(contactInfo.city || contactInfo.country) &&
            (contactInfo.phoneNumber ||
              contactInfo.email ||
              contactInfo.linkedIn) &&
            " • "}

          {/* Phone Number */}
          {contactInfo.phoneNumber}

          {/* Second Bullet */}
          {contactInfo.phoneNumber &&
            (contactInfo.email || contactInfo.linkedIn) &&
            " • "}

          {/* Email */}
          {contactInfo.email}

          {/* Third Bullet */}
          {contactInfo.email && contactInfo.linkedIn && " • "}

          {/* LinkedIn */}
          {/* {contactInfo.linkedIn} */}
          <Link
                  src={
                    contactInfo.linkedIn.startsWith("http")
                      ? contactInfo.linkedIn
                      : `https://${contactInfo.linkedIn}`
                  }
                  style={{ color: "#666666" }}
                >
                  {contactInfo.linkedIn}
                </Link>
        </Text>

        {/* Professional Summary */}
        {(summary || summary === "") && (
          <>
            <Text style={styles.sectionHeader}>PROFESSIONAL SUMMARY</Text>
            <Text style={styles.sectionText}>{summary}</Text>
          </>
        )}

        {/* Technical Skills */}
        {skills && (
          <>
            <Text style={styles.sectionHeader}>TECHNICAL SKILLS</Text>
            <View style={styles.skillGrid}>
              {skills.map((skill, index) => (
                <Text key={index} style={styles.skillItem}>
                  • {skill}
                </Text>
              ))}
            </View>
          </>
        )}

        {/* Professional Experience */}
        {experience && (
          <>
            <Text style={styles.sectionHeader}>PROFESSIONAL EXPERIENCE</Text>
            {experience.map(
              (exp, index) =>
                (exp.jobTitle ||
                  exp.startMonth ||
                  exp.startYear ||
                  exp.endMonth ||
                  exp.present ||
                  exp.endYear) && (
                  <View key={index}>
                    <View
                      style={[styles.jobHeader, index > 0 && { marginTop: 8 }]}
                    >
                      <Text style={styles.jobTitle}>{exp.jobTitle}</Text>
                      <Text style={styles.jobDate}>
                        {/* Start Date */}
                        {exp.startMonth && `${exp.startMonth} `}
                        {exp.startYear}

                        {(exp.startMonth || exp.startYear) &&
                          (exp.endMonth || exp.endYear || exp.present) &&
                          " - "}

                        {/* End Date */}
                        {exp.present
                          ? "Present"
                          : exp.endMonth && `${exp.endMonth} `}
                        {!exp.present && exp.endYear}
                      </Text>
                    </View>
                    <Text style={styles.companyInfo}>{exp.company}</Text>
                    <Html
                      style={{ fontFamily: "Segeo", fontSize: 10 }}
                      renderers={customRenderers}
                    >
                      {exp.description}
                    </Html>
                  </View>
                )
            )}
          </>
        )}

        {/* Education */}
        {education && (
          <>
            <Text style={styles.sectionHeader}>EDUCATION</Text>
            {education.map(
              (edu, index) =>
                (edu.degree ||
                  edu.fieldOfStudy ||
                  edu.graduationMonth ||
                  edu.graduationYear) && (
                  <View key={index} style={index > 0 && { marginTop: 8 }}>
                    <View style={styles.educationItem}>
                      <Text style={styles.educationTitle}>
                        {edu.degree}
                        {edu.degree && edu.fieldOfStudy && " in "}
                        {edu.fieldOfStudy}
                      </Text>
                      <Text style={styles.educationDate}>
                        {edu.graduationMonth} {edu.graduationYear}
                      </Text>
                    </View>
                    <Text style={styles.educationSchool}>
                      {edu.institution}
                    </Text>
                  </View>
                )
            )}
          </>
        )}

        {/* Certifications */}
        {certifications && (
          <>
            <Text style={styles.sectionHeader}>CERTIFICATIONS</Text>
            <View style={styles.certGrid}>
              {certifications.map(
                (cert, index) =>
                  (cert.name || cert.issueYear) && (
                    <Text key={index} style={styles.certItem}>
                      {cert.name} {cert.issueYear && ` (${cert.issueYear})`}
                    </Text>
                  )
              )}
            </View>
          </>
        )}

        {/* Projects */}
        {projects && (
          <>
            <Text style={styles.sectionHeader}>PROJECTS</Text>
            {projects.map(
              (project, index) =>
                (project.title || project.description) && (
                  <View key={index} style={index > 0 && { marginTop: 8 }}>
                    <Text style={styles.projectTitle}>{project.title}</Text>
                    <Text style={styles.projectDesc}>
                      {project.description}
                    </Text>

                    <Link
                      src={
                        project.url.startsWith("http")
                          ? project.url
                          : `https://${project.url}`
                      }
                      style={styles.projectUrl}
                    >
                      {project.url}
                    </Link>
                  </View>
                )
            )}
          </>
        )}

        {/* Languages */}
        {languages && (
          <>
            <Text style={styles.sectionHeader}>LANGUAGES</Text>
            <View style={styles.languageGrid}>
              {languages.map((lang, index) => (
                lang.language && <Text key={index} style={styles.languageTitle}>
                  {lang.language} {lang.proficiency && ` (${lang.proficiency})`}
                </Text>
              ))}
              {/* {lang.certification && <Text style={styles.languageCert}>Certification: {lang.certification}</Text>}
            {lang.yearsOfExperience && <Text style={styles.languageExp}>Years of Experience: {lang.yearsOfExperience}</Text>} */}
            </View>
          </>
        )}
      </Page>
    </Document>
  );
};

export default StalwartPDF;
