import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Link,
  Font,
} from "@react-pdf/renderer";
import Inter from "../assets/fonts/Inter/Inter-Regular.ttf";
import Inter_bold from "../assets/fonts/Inter/Inter-Bold.ttf";
import Inter_italic from "../assets/fonts/Inter/Inter-italic.ttf";
import Inter_italicb from "../assets/fonts/Inter/Inter-BoldItalic.ttf";
import { Children } from "react";
import Html from "react-pdf-html";

// Register all required font variants
Font.register({
  family: "Inter",
  fonts: [
    {
      src: Inter, // Regular
      fontWeight: "normal",
      fontStyle: "normal",
    },
    {
      src: Inter_bold, // Bold
      fontWeight: "bold",
    },
    {
      src: Inter_italic, // Italic
      fontStyle: "italic",
    },
    {
      src: Inter_italicb, // Bold Italic
      fontWeight: "bold",
      fontStyle: "italic",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 20,
    paddingBottom: 10,
    fontFamily: "Inter",
    fontSize: 10,
    color: "#1F2937", // Tailwind's gray-800
  },
  section: {
    marginBottom: 12,
  },
  header: {
    borderBottom: "1 solid #10B981", // emerald-500
    paddingBottom: 12,
    marginBottom: 18,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  contactRight: {
    textAlign: "right",
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#10B981",
    borderBottom: "1 solid #D1FAE5", // emerald-100
    paddingBottom: 4,
    marginBottom: 12,
  },
  text: {
    marginBottom: 2,
  },
  skillBadge: {
    backgroundColor: "#D1FAE5",
    color: "#065F46",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    fontSize: 8,
    marginRight: 4,
    marginBottom: 4,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  description: {
    marginTop: 4,
    paddingLeft: 8,
  },
});

export default function VanguardPDF({ resumeInfo }) {
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
    <View style={{ marginLeft: 6, padding: 0 }}>
      {Children.map(children, (child, index) => (
        <View style={{ flexDirection: "row", marginBottom: 2 }}>
          <Text style={{ marginRight: 5 }}>•</Text>
          {child}
        </View>
      ))}
    </View>
  );

  const CustomOl = ({ children }) => (
    <View style={{ marginLeft: 6, padding: 0, counterReset: "item" }}>
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
          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.name}>
                {contactInfo.firstName} {contactInfo.lastName}
              </Text>
            </View>
            <View style={styles.contactRight}>
              {contactInfo.email && (
                <Text style={styles.text}>{contactInfo.email}</Text>
              )}
              {contactInfo.phoneNumber && (
                <Text style={styles.text}>{contactInfo.phoneNumber}</Text>
              )}
              {(contactInfo.city || contactInfo.country) && (
                <Text style={styles.text}>
                  {contactInfo.city}
                  {contactInfo.city && contactInfo.country && ", "}
                  {contactInfo.country}
                </Text>
              )}
              {contactInfo.linkedIn && (
                <Link
                  src={
                    contactInfo.linkedIn.startsWith("http")
                      ? contactInfo.linkedIn
                      : `https://${contactInfo.linkedIn}`
                  }
                  style={{ color: "#10B981" }}
                >
                  {contactInfo.linkedIn}
                </Link>
              )}
            </View>
          </View>
        </View>

        {/* Summary */}
        {(summary || summary === "") && (
          <View style={styles.section}>
            <Text style={styles.subtitle}>SUMMARY</Text>
            <Text>{summary}</Text>
          </View>
        )}

        {/* Skills */}
        {skills && (
          <View style={styles.section}>
            <Text style={styles.subtitle}>TECHNICAL SKILLS</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {skills.map((skill, idx) => (
                <Text key={idx} style={styles.skillBadge}>
                  {skill}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Experience */}
        {experience && (
          <View style={styles.section}>
            <Text style={styles.subtitle}>PROFESSIONAL EXPERIENCE</Text>
            {experience.map((exp, idx) => (
              <View key={idx} style={idx > 0 && { marginTop: 8 }}>
                <View style={styles.rowBetween}>
                  <View>
                    <Text style={{ fontWeight: "bold" }}>{exp.jobTitle}</Text>
                    <Text style={{ marginVertical: 2 }}>{exp.company}</Text>
                  </View>
                  <Text style={{ color: "#6B7280" }}>
                    {exp.startMonth} {exp.startYear} -{" "}
                    {exp.present ? "Present" : `${exp.endMonth} ${exp.endYear}`}
                  </Text>
                </View>
                {exp.description && (
                  <Html
                    style={{ fontFamily: "Inter", fontSize: 9 }}
                    renderers={customRenderers}
                  >
                    {exp.description}
                  </Html>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education && (
          <View style={styles.section}>
            <Text style={styles.subtitle}>EDUCATION</Text>
            {education.map((edu, idx) => (
              <View key={idx} style={idx > 0 && { marginTop: 8 }}>
                <View style={styles.rowBetween}>
                  <View>
                    <Text style={{ fontWeight: "bold" }}>
                      {edu.institution}
                    </Text>
                    <Text>
                      {edu.degree}
                      {edu.degree && edu.fieldOfStudy && " in "}
                      {edu.fieldOfStudy}
                    </Text>
                  </View>
                  {edu.graduationMonth && edu.graduationYear && (
                    <Text style={{ color: "#6B7280" }}>
                      {edu.graduationMonth} {edu.graduationYear}
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {projects && (
          <View style={styles.section}>
            <Text style={styles.subtitle}>PROJECTS</Text>
            {projects.map((project, idx) => (
              <View key={idx} style={idx > 0 && { marginTop: 8 }}>
                {project.title && (
                  <Text style={{ fontWeight: "bold" }}>{project.title}</Text>
                )}
                {project.description && <Text>{project.description}</Text>}
                {project.url && (
                  <Link
                    src={
                      project.url.startsWith("http")
                        ? project.url
                        : `https://${project.url}`
                    }
                    style={{ color: "#10B981" }}
                  >
                    {project.url}
                  </Link>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Certifications */}
        {certifications && (
          <View style={styles.section}>
            <Text style={styles.subtitle}>CERTIFICATIONS</Text>
            {certifications.map((cert, idx) => (
              <View key={idx} style={idx > 0 && { marginTop: 8 }}>
                <View style={styles.rowBetween}>
                  <View>
                    {cert.name && (
                      <Text style={{ fontWeight: "bold" }}>{cert.name}</Text>
                    )}
                    {cert.organization && <Text>{cert.organization}</Text>}
                  </View>
                  {cert.issueMonth && cert.issueYear && (
                    <Text style={{ color: "#6B7280" }}>
                      {cert.issueMonth} {cert.issueYear}
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Languages */}
        {languages && (
          <View style={styles.section}>
            <Text style={styles.subtitle}>LANGUAGES</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {languages.map((lang, idx) => (
                <View key={idx} style={{ marginRight: 8, marginBottom: 4 }}>
                  <Text>
                    <Text style={{ fontWeight: "bold" }}>{lang.language}:</Text>{" "}
                    <Text>{lang.proficiency}</Text>
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
}
