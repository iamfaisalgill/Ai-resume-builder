import React, { Children } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import Html from "react-pdf-html";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    fontSize: 10,
    fontFamily: "Helvetica",
    flexDirection: "column",
    lineHeight: 1.4,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    backgroundColor: "#1f2937",
    color: "#ffffff",
    padding: 16,
    width: "100%",
  },
  headerName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  headerSub: {
    color: "#d1d5db",
    fontSize: 12,
  },
  contactGrid: {
    width: "50%",
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 8,
  },
  contactItem: {
    width: "50%",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 4,
    fontSize: 10,
  },
  headDot: {
    width: 4,
    height: 4,
    backgroundColor: "#9CA3AF",
    borderRadius: 2,
    marginTop: 4,
  },
  main: {
    flexDirection: "row",
    marginTop: 24,
    padding: 16,
    paddingTop: 0,
    paddingBottom: 0,
  },
  leftCol: {
    width: "35%",
    paddingRight: 16,
    borderRight: "1px solid #e5e7eb",
  },
  rightCol: {
    width: "65%",
    paddingLeft: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    textTransform: "uppercase",
    fontSize: 8,
    fontWeight: "bold",
    letterSpacing: 1,
    color: "#4b5563",
    marginBottom: 6,
  },
  bulletItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 4,
  },
  dot: {
    width: 4,
    height: 4,
    backgroundColor: "#4b5563",
    borderRadius: 2,
    marginTop: 2,
  },
  expBlock: {
    paddingLeft: 8,
    borderLeft: "2px solid #d1d5db",
    marginBottom: 12,
  },
  certLangGrid: {
    flexDirection: "row",
    gap: 24,
  },
});

const HorizonPDF = ({ resumeInfo }) => {
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

  const formatDateRange = (startMonth, startYear, endMonth, endYear, present) => {
    const start = `${startMonth} ${startYear}`;
    const end = present ? "Present" : `${endMonth} ${endYear}`;
    return `${start} - ${end}`;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={{ width: "50%" }}>
            {contactInfo.firstName || contactInfo.lastName ? <Text style={styles.headerName}>
              {contactInfo.firstName} <Text style={{ color: "#d1d5db" }}>{contactInfo.lastName}</Text>
            </Text> : <Text style={styles.headerName}>
              John <Text style={{ color: "#d1d5db" }}>Doe</Text>
            </Text>}
            {/* <Text style={styles.headerSub}>{contactInfo.title || 'Your Profession'}</Text> */}
          </View>
          <View style={styles.contactGrid}>
            {contactInfo.email && (
              <View style={styles.contactItem}>
                <View style={styles.headDot} />
                <Text>{contactInfo.email}</Text>
              </View>
            )}
            {contactInfo.phoneNumber && (
              <View style={styles.contactItem}>
                <View style={styles.headDot} />
                <Text>{contactInfo.phoneNumber}</Text>
              </View>
            )}
            {(contactInfo.city || contactInfo.country) && (
              <View style={styles.contactItem}>
                <View style={styles.headDot} />
                <Text>
                  {[contactInfo.city, contactInfo.country]
                    .filter(Boolean)
                    .join(", ")}
                </Text>
              </View>
            )}
            {contactInfo.linkedIn && (
              <View style={styles.contactItem}>
                <View style={styles.headDot} />
                <Link
                  src={
                    contactInfo.linkedIn.startsWith("http")
                      ? contactInfo.linkedIn
                      : `https://${contactInfo.linkedIn}`
                  }
                  style={{ color: "#fff" }}
                >
                  {contactInfo.linkedIn}
                </Link>
              </View>
            )}
          </View>
        </View>

        <View style={styles.main}>
          <View style={styles.leftCol}>
            {(summary || summary === "") && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Profesional Summary</Text>
                <Text>{summary}</Text>
              </View>
            )}

            {skills && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Skills</Text>
                {skills.map((skill, i) => (
                  <View key={i} style={styles.bulletItem}>
                    <View style={styles.dot} />
                    <Text>{skill}</Text>
                  </View>
                ))}
              </View>
            )}

            {education && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Education</Text>
                {education.map((edu, i) => (
                  <View key={i} style={{ marginBottom: 8 }}>
                    {edu.institution && (
                      <Text style={{ fontWeight: "bold" }}>
                        {edu.institution}
                      </Text>
                    )}
                    {edu.degree && <Text>{edu.degree}</Text>}
                    {(edu.graduationMonth || edu.graduationYear) && (
                      <Text>
                        {edu.graduationMonth} {edu.graduationYear}
                      </Text>
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>

          <View style={styles.rightCol}>
            {experience && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Experience</Text>
                {experience.map(
                  (exp, i) =>
                    (exp.jobTitle ||
                      exp.startMonth ||
                      exp.startYear ||
                      exp.endMonth ||
                      exp.present ||
                      exp.endYear) && (
                      <View key={i} style={styles.expBlock}>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          {exp.jobTitle && (
                            <View>
                              <Text style={{ fontWeight: "bold" }}>
                                {exp.jobTitle}
                              </Text>
                              <Text>{exp.company}</Text>
                            </View>
                          )}
                          <Text>
                          {formatDateRange(exp.startMonth, exp.startYear, exp.endMonth, exp.endYear, exp.present)}
                          </Text>
                        </View>
                        <Html
                          style={{ fontSize: 10 }}
                          renderers={customRenderers}
                        >
                          {exp.description}
                        </Html>
                      </View>
                    )
                )}
              </View>
            )}

            {projects && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Projects</Text>
                {projects.map(
                  (p, i) =>
                    (p.title || p.description || p.url) && (
                      <View key={i} style={{ marginBottom: 8 }}>
                        <Text style={{ fontWeight: "bold" }}>{p.title}</Text>
                        <Text>{p.description}</Text>
                        {p.url && (
                          <Link
                            src={
                              p.url.startsWith("http")
                                ? p.url
                                : `https://${p.url}`
                            }
                            style={{ color: "#6b7280" }}
                          >
                            {p.url}
                          </Link>
                        )}
                      </View>
                    )
                )}
              </View>
            )}

            <View style={styles.certLangGrid}>
              {certifications && (
                <View style={[styles.section, { width: "50%" }]}>
                  <Text style={styles.sectionTitle}>Certifications</Text>
                  {certifications.map(
                    (cert, i) =>
                      (cert.name || cert.organization) && (
                        <View key={i} style={{ marginBottom: 6 }}>
                          {
                            <Text style={{ fontWeight: "bold" }}>
                              {cert.name}
                            </Text>
                          }
                          <Text>{cert.organization}</Text>
                          <Text>
                            {cert.issueMonth || cert.issueYear
                              ? `${cert.issueMonth} ${cert.issueYear}`
                              : ""}
                          </Text>
                        </View>
                      )
                  )}
                </View>
              )}

              {languages && (
                <View style={[styles.section, { width: "50%" }]}>
                  <Text style={styles.sectionTitle}>Languages</Text>
                  {languages.map(
                    (lang, i) =>
                      lang.language && (
                        <View
                          key={i}
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text>{lang.language}</Text>
                          <Text>{lang.proficiency}</Text>
                        </View>
                      )
                  )}
                </View>
              )}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default HorizonPDF;
