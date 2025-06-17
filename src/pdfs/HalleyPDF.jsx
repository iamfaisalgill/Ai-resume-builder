import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Link,
} from "@react-pdf/renderer";
import georgia from "../assets/fonts/Georgia/georgiab.ttf";
import { Children } from "react";
import Html from "react-pdf-html";

Font.register({
  family: "Georgia-Bold",
  src: georgia,
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    fontFamily: "Helvetica",
  },
  leftColumn: {
    width: "75%",
    padding: 20,
    color: "#364153",
  },
  rightColumn: {
    width: "25%",
    backgroundColor: "#305276",
    color: "white",
    padding: 10,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  nameText: {
    fontSize: 22,
    fontFamily: "Georgia-Bold",
    fontWeight: "heavy",
    color: "#305276",
    textTransform: "uppercase",
  },
  nameBoxContainer: {
    width: 40,
    height: 40,
    border: "1.5 solid #305276",
    transform: "rotate(45deg)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  nameBoxInner: {
    width: 40,
    height: 40,
    border: "1.5 solid #305276",
    transform: "rotate(-45deg)",
    position: "absolute",
  },
  nameInitials: {
    transform: "rotate(-45deg)",
    fontSize: 18,
    fontFamily: "Georgia-Bold",
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#305276",
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Georgia-Bold",
    fontWeight: "bold",
    color: "#305276",
    marginBottom: 10,
    textTransform: "uppercase",
    borderBottom: "1 solid #305276",
    paddingBottom: 3,
  },
  text: {
    fontSize: 9,
    lineHeight: 1.4,
  },
  boldText: {
    fontSize: 9,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#101828",
  },
  listItem: {
    fontSize: 9,
    marginBottom: 5,
    marginLeft: 10,
    lineHeight: 1.4,
  },
  rightText: {
    fontSize: 9,
    marginBottom: 4,
    lineHeight: 1.4,
  },
  rightTitle: {
    fontSize: 11,
    fontFamily: "Georgia-Bold",
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 15,
    textTransform: "uppercase",
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#101828",
  },
  jobDate: {
    fontSize: 9,
  },
  companyInfo: {
    fontSize: 9,
    marginBottom: 5,
    fontStyle: "italic",
  },
  projectTitle: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 3,
    color: "#101828",
  },
  projectUrl: {
    fontSize: 8,
    color: "#305276",
    textDecoration: "none",
  },
});

// Create Document Component
const HalleyPDF = ({ resumeInfo }) => {
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

  const firstName = contactInfo.firstName || "John";
  const lastName = contactInfo.lastName || "Doe";
  const fullName = `${firstName} ${lastName}`.trim();
  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .map((name) => name[0])
    .join("");

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
        {/* Left Column (Main Content) */}
        <View style={styles.leftColumn}>
          {/* Name Section */}
          <View style={styles.nameContainer}>
            <View style={styles.nameBoxContainer}>
              <View style={styles.nameBoxInner} />
              <Text style={styles.nameInitials}>{initials}</Text>
            </View>
            <View>
              <Text style={styles.nameText}>{firstName}</Text>
              <Text style={styles.nameText}>{lastName}</Text>
            </View>
          </View>

          {/* Professional Summary */}
          {(summary || summary === "") && (
            <View>
              <Text style={styles.sectionTitle}>PROFESSIONAL SUMMARY</Text>
              <Text style={styles.text}>{summary}</Text>
            </View>
          )}

          {/* Experience */}
          {experience && (
            <View style={{ marginTop: 15 }}>
              <Text style={styles.sectionTitle}>EXPERIENCE</Text>
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
                        style={[
                          styles.jobHeader,
                          index > 0 && { marginTop: 8 },
                        ]}
                      >
                        <Text style={styles.jobTitle}>{exp.jobTitle}</Text>
                        <Text style={styles.jobDate}>
                          {exp.startMonth} {exp.startYear} -{" "}
                          {exp.present
                            ? "Present"
                            : `${exp.endMonth} ${exp.endYear}`}
                        </Text>
                      </View>
                      <Text style={styles.companyInfo}>{exp.company}</Text>
                      <Html
                        style={{ fontFamily: "Helvetica", fontSize: 9 }}
                        renderers={customRenderers}
                      >
                        {exp.description}
                      </Html>
                    </View>
                  )
              )}
            </View>
          )}

          {/* Projects */}
          {projects && (
            <View style={{ marginTop: 15 }}>
              <Text style={styles.sectionTitle}>PROJECTS</Text>
              {projects.map(
                (project, index) =>
                  (project.title || project.description || project.url) && (
                    <View key={index}>
                      <Text
                        style={[
                          styles.projectTitle,
                          index > 0 && { marginTop: 8 },
                        ]}
                      >
                        {project.title}
                      </Text>
                      <Text style={styles.text}>{project.description}</Text>
                      {project.url && (
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
                      )}
                    </View>
                  )
              )}
            </View>
          )}

          {/* Education */}
          {education && (
            <View style={{ marginTop: 15 }}>
              <Text style={styles.sectionTitle}>EDUCATION</Text>
              {education.map((edu, index) => (
                <View key={index}>
                  {(edu.degree || edu.fieldOfStudy) && (
                    <Text
                      style={[styles.boldText, index > 0 && { marginTop: 8 }]}
                    >
                      {edu.degree}
                      {edu.degree && edu.fieldOfStudy && " in "}
                      {edu.fieldOfStudy}
                    </Text>
                  )}
                  {edu.institution && (
                    <Text style={styles.text}>{edu.institution}</Text>
                  )}
                  {(edu.graduationMonth || edu.graduationYear) && (
                    <Text style={styles.text}>
                      {edu.graduationMonth} {edu.graduationYear}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Languages */}
          {languages && (
            <View style={{ marginTop: 15 }}>
              <Text style={styles.sectionTitle}>LANGUAGES</Text>
              {languages.map(
                (lang, index) =>
                  (lang.language || lang.proficiency) && (
                    <Text
                      key={index}
                      style={[styles.text, { textTransform: "capitalize" }]}
                    >
                      {lang.language}{" "}
                      {lang.proficiency ? `(${lang.proficiency})` : ""}
                    </Text>
                  )
              )}
            </View>
          )}
        </View>

        {/* Right Column (Sidebar) */}
        <View style={styles.rightColumn}>
          {contactInfo.city && contactInfo.country && (
            <Text style={styles.rightText}>
              {contactInfo.city}, {contactInfo.country}
            </Text>
          )}
          {contactInfo.phoneNumber && (
            <Text style={styles.rightText}>
              {contactInfo.phoneNumber}
            </Text>
          )}
          {contactInfo.email && (
            <Text style={styles.rightText}>{contactInfo.email}</Text>
          )}
          {contactInfo.linkedIn && (
            <Link
                  src={
                    contactInfo.linkedIn.startsWith("http")
                      ? contactInfo.linkedIn
                      : `https://${contactInfo.linkedIn}`
                  }
                  style={[styles.rightText, {color: "#fff"}]}
                >
                  {contactInfo.linkedIn}
                </Link>
          )}

          {skills && (
            <>
              <Text style={styles.rightTitle}>SKILLS</Text>
              {skills.map((skill, index) => (
                <Text key={index} style={styles.rightText}>
                  • {skill}
                </Text>
              ))}
            </>
          )}

          {certifications && (
            <View>
              <Text style={styles.rightTitle}>CERTIFICATIONS</Text>
              {certifications.map(
                (cert, index) =>
                  (cert.name || cert.issueYear) && (
                    <Text key={index} style={styles.rightText}>
                      {cert.name} {cert.issueYear && ` (${cert.issueYear})`}
                    </Text>
                  )
              )}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default HalleyPDF;
