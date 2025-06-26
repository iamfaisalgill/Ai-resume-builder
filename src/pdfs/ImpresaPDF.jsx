import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Link,
} from "@react-pdf/renderer";
import Html from "react-pdf-html";
import { Children } from "react";

const ImpresaPDF = ({ resumeInfo }) => {
  // Create styles
  const styles = StyleSheet.create({
    page: {
      padding: 15,
      fontFamily: "Helvetica",
    },
    name: {
      fontSize: 18,
      fontFamily: "Helvetica",
      fontWeight: 500, // make name & heading 500
      textTransform: "uppercase",
      marginBottom: 4,
    },
    container: {
      flexDirection: "row",
      alignItems: "center",
      color: "#000",
      marginBottom: 12,
    },
    logoBox: {
      width: 50,
      height: 50,
      border: "2 solid black",
      position: "relative",
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
    },
    fgWrapper: {
      position: "absolute",
      width: "100%",
      height: "100%",
      padding: 4,
      justifyContent: "space-between",
      flexDirection: "column",
    },
    fgRow: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    letter: {
      fontSize: 18,
      fontWeight: 500,
      textTransform: "uppercase",
    },
    slashLine: {
      position: "absolute",
      left: 0,
      width: "100%",
      height: 2,
      backgroundColor: "#000",
      transform: "rotate(-45deg)",
    },
    nameBlock: {
      marginLeft: 12,
      fontWeight: 500,
      textTransform: "uppercase",
    },
    nameLine: {
      fontSize: 22,
      lineHeight: 1.1,
    },
    contactInfo: {
      fontSize: 10,
      color: "#666666",
      marginBottom: 12,
    },
    sectionHeader: {
      fontSize: 11,
      fontFamily: "Helvetica",
      fontWeight: 600,
      marginBottom: 7,
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
      fontFamily: "Helvetica",
      fontWeight: "bold",
    },
    jobDate: {
      fontSize: 10,
      fontFamily: "Helvetica",
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
      fontFamily: "Helvetica",
      fontWeight: "bold",
    },
    educationDate: {
      fontSize: 10,
      fontFamily: "Helvetica",
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
      fontFamily: "Helvetica",
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
      fontFamily: "Helvetica",
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
        {/* <Text style={styles.name}>
            {contactInfo.firstName || "John"} {contactInfo.lastName || "Doe"}
          </Text> */}
        <View style={styles.container}>
          <View style={styles.logoBox}>
            <View style={styles.fgWrapper}>
              <View style={styles.fgRow}>
                <Text style={styles.letter}>
                  {contactInfo.firstName.charAt(0)}
                </Text>
                <Text></Text>
              </View>
              <View style={styles.fgRow}>
                <Text></Text>
                <Text style={styles.letter}>
                  {contactInfo.lastName.charAt(0)}
                </Text>
              </View>
            </View>
            <View style={styles.slashLine} />
          </View>
          <View style={styles.nameBlock}>
            {contactInfo.firstName || contactInfo.lastName ? (
              <>
                <Text style={styles.nameLine}>{contactInfo.firstName}</Text>
                <Text style={styles.nameLine}>{contactInfo.lastName}</Text>
              </>
            ) : (
              <>
                <Text style={styles.nameLine}>John</Text>
                <Text style={styles.nameLine}>Doe</Text>
              </>
            )}
          </View>
        </View>

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
                      style={{ fontFamily: "Helvetica", fontSize: 10 }}
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
              {languages.map(
                (lang, index) =>
                  lang.language && (
                    <Text key={index} style={styles.languageTitle}>
                      {lang.language}{" "}
                      {lang.proficiency && ` (${lang.proficiency})`}
                    </Text>
                  )
              )}
            </View>
          </>
        )}
      </Page>
    </Document>
  );
};

export default ImpresaPDF;
