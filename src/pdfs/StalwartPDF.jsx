import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
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
      marginTop: 8,
    },
    sectionText: {
      fontSize: 10, 
      marginBottom: 12,
      lineHeight: 1.4,
    },
    skillGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: 12,
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
      marginBottom: 4,
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
      marginBottom: 4,
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
      marginBottom: 8,
    },
    certGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: 12,
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
      marginBottom: 2,
    },
    projectDesc: {
      fontSize: 10, 
      marginBottom: 8,
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
      marginTop: 8,
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

  const skills = Array.isArray(resumeInfo.skills) ? resumeInfo.skills : [];
  const experience = Array.isArray(resumeInfo.experience)
    ? resumeInfo.experience
    : [];
  const education = Array.isArray(resumeInfo.education)
    ? resumeInfo.education
    : [];
  const projects = Array.isArray(resumeInfo.projects)
    ? resumeInfo.projects
    : [];
  const languages = Array.isArray(resumeInfo.languages)
    ? resumeInfo.languages
    : [];
  const certifications = Array.isArray(resumeInfo.certifications)
    ? resumeInfo.certifications
    : [];
  

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
          {resumeInfo.contactInfo.firstName} {resumeInfo.contactInfo.lastName}
        </Text>
        <Text style={styles.contactInfo}>
          {resumeInfo.contactInfo.city}, {resumeInfo.contactInfo.country} •{" "}
          {resumeInfo.contactInfo.phoneNumber} • {resumeInfo.contactInfo.email}{" "}
          • {resumeInfo.contactInfo.linkedIn}
        </Text>

        {/* Professional Summary */}
        {resumeInfo.summary && (
          <>
            <Text style={styles.sectionHeader}>PROFESSIONAL SUMMARY</Text>
            <Text style={styles.sectionText}>{resumeInfo.summary}</Text>
          </>
        )}

        {/* Technical Skills */}
        {skills.length > 0 && (
          <>
            <Text style={styles.sectionHeader}>TECHNICAL SKILLS</Text>
            <View style={styles.skillGrid}>
              {resumeInfo.skills.map((skill, index) => (
                <Text key={index} style={styles.skillItem}>
                  • {skill}
                </Text>
              ))}
            </View>
          </>
        )}

        {/* Professional Experience */}
        {experience.length > 0 && (
          <>
            <Text style={styles.sectionHeader}>PROFESSIONAL EXPERIENCE</Text>
            {resumeInfo.experience.map((exp, index) => (
              <View key={index}>
                <View style={styles.jobHeader}>
                  <Text style={styles.jobTitle}>{exp.jobTitle}</Text>
                  {/* <Text style={styles.jobDate}>{exp.startDate} - {exp.endDate}</Text> */}
                  <Text style={styles.jobDate}>
                    {exp.company}, {exp.startMonth} {exp.startYear} -{" "}
                    {exp.present ? "Present" : `${exp.endMonth} ${exp.endYear}`}{" "}
                  </Text>
                </View>
                <Text style={styles.companyInfo}>{exp.company}</Text>
                <Html
                  style={{ fontFamily: 'Segeo', fontSize: 10 }}
                  renderers={customRenderers}
                >
                  {exp.description}
                </Html>
              </View>
            ))}
          </>
        )}

        {/* Education */}
        {education.length > 0 && (
          <>
            <Text style={styles.sectionHeader}>EDUCATION</Text>
            {resumeInfo.education.map((edu, index) => (
              <View key={index}>
                <View style={styles.educationItem}>
                  <Text style={styles.educationTitle}>
                    {edu.degree} in {edu.fieldOfStudy}
                  </Text>
                  <Text style={styles.educationDate}>
                    {edu.graduationMonth} {edu.graduationYear}
                  </Text>
                </View>
                <Text style={styles.educationSchool}>{edu.institution}</Text>
              </View>
            ))}
          </>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <>
            <Text style={styles.sectionHeader}>CERTIFICATIONS</Text>
            <View style={styles.certGrid}>
              {resumeInfo.certifications.map((cert, index) => (
                <Text key={index} style={styles.certItem}>
                  {cert.name} ({cert.issueYear})
                </Text>
              ))}
            </View>
          </>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <>
            <Text style={styles.sectionHeader}>PROJECTS</Text>
            {resumeInfo.projects.map((project, index) => (
              <View key={index}>
                <Text style={styles.projectTitle}>{project.title}</Text>
                <Text style={styles.projectDesc}>{project.description}</Text>
                {/* {project.url && <Text style={styles.projectUrl}>URL: {project.url}</Text>} */}
              </View>
            ))}
          </>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <>
            <Text style={styles.sectionHeader}>LANGUAGES</Text>
            <View style={styles.languageGrid}>
              {resumeInfo.languages.map((lang, index) => (
                <Text key={index} style={styles.languageTitle}>
                  {lang.language} ({lang.proficiency})
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
