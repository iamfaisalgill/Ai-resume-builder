import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Create styles (same as original)
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 0,
    fontFamily: 'Helvetica',
  },
  header: {
    backgroundColor: '#1E3A5F',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: 'white',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  contactInfo: {
    fontSize: 10,
    marginBottom: 4,
  },
  content: {
    padding: 20,
    color: '#000000',
  },
  section: {
    marginBottom: 15,
    flexDirection: 'row',
  },
  sectionTitle: {
    width: '30%',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1E3A5F',
  },
  sectionContent: {
    width: '70%',
  },
  splitTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  jobDetails: {
    fontSize: 10,
    marginBottom: 5,
  },
  bulletItem: {
    fontSize: 10,
    marginBottom: 3,
    marginLeft: 10,
  },
  skillGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillItem: {
    width: '33%',
    fontSize: 10,
    marginBottom: 5,
  },
  projectTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  projectDesc: {
    fontSize: 10,
  },
  projectUrl: {
    fontSize: 10,
    marginTop: 5,
    color: '#5F6A8A'
  },
  educationItem: {
    marginBottom: 8,
  },
  educationDegree: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  educationDetails: {
    fontSize: 10,
  },
  certifications: {
    fontSize: 10,
    lineHeight: 1.4,
  },
  languageItem: {
    width: '33%',
    marginBottom: 5,
  },
  languageName: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 2
  },
  languageLevel: {
    fontSize: 10,
  },
  summaryText: {
    fontSize: 10,
    lineHeight: 1.4,
  }
});

const IconicPDF = ({resumeInfo}) => {

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.name}>{resumeInfo.firstName} {resumeInfo.lastName}</Text>
          </View>
          <View>
            <Text style={styles.contactInfo}>{resumeInfo.phoneNumber}</Text>
            <Text style={styles.contactInfo}>{resumeInfo.email}</Text>
            <Text style={styles.contactInfo}>{resumeInfo.linkedIn}</Text>
            <Text style={styles.contactInfo}>{resumeInfo.city}, {resumeInfo.country}</Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Professional Summary */}
          <View style={styles.section}>
            <View style={styles.sectionTitle}>
              <Text style={styles.splitTitle}>PROFESSIONAL</Text>
              <Text style={styles.splitTitle}>SUMMARY</Text>
            </View>
            <View style={styles.sectionContent}>
              <Text style={styles.summaryText}>{resumeInfo.summary}</Text>
            </View>
          </View>

          {/* Technical Skills */}
          <View style={styles.section}>
            <View style={styles.sectionTitle}>
              <Text>TECHNICAL SKILLS</Text>
            </View>
            <View style={[styles.sectionContent, styles.skillGrid]}>
              {resumeInfo.skills.map((skill, index) => (
                <Text key={index} style={styles.skillItem}>{skill}</Text>
              ))}
            </View>
          </View>

          {/* Experience */}
          <View style={styles.section}>
            <View style={styles.sectionTitle}>
              <Text>EXPERIENCE</Text>
            </View>
            <View style={styles.sectionContent}>
              {resumeInfo.experience.map((exp, index) => (
                <View key={index} style={{ marginBottom: 10 }}>
                  <Text style={styles.jobTitle}>{exp.jobTitle}</Text>
                  <Text style={styles.jobDetails}>{exp.company}, {exp.startMonth} {exp.startYear} -  {exp.present ? "Present" : `${exp.endMonth} ${exp.endYear}`} </Text>
                  <Text style={styles.bulletItem}>• {exp.description}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Projects */}
          <View style={styles.section}>
            <View style={styles.sectionTitle}>
              <Text>PROJECTS</Text>
            </View>
            <View style={styles.sectionContent}>
              {resumeInfo.projects.map((project, index) => (
                <View key={index} style={{ marginBottom: 10 }}>
                  <Text style={styles.projectTitle}>{project.title}</Text>
                  <Text style={styles.projectDesc}>{project.description}</Text>
                  {project.url && <Text style={styles.projectUrl}>{project.url}</Text>}
                </View>
              ))}
            </View>
          </View>

          {/* Education */}
          <View style={styles.section}>
            <View style={styles.sectionTitle}>
              <Text>EDUCATION</Text>
            </View>
            <View style={styles.sectionContent}>
              {resumeInfo.education.map((edu, index) => (
                <View key={index} style={styles.educationItem}>
                  <Text style={styles.educationDegree}>{edu.degree} in {edu.fieldOfStudy}</Text>
                  <Text style={styles.educationDetails}>{edu.institution}, {edu.graduationMonth} {edu.graduationYear}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Certifications */}
          <View style={styles.section}>
            <View style={styles.sectionTitle}>
              <Text>CERTIFICATIONS</Text>
            </View>
            <View style={styles.sectionContent}>
              {resumeInfo.certifications.map((cert, index) => (
                <Text key={index} style={styles.certifications}>{cert.name} ({cert.issueYear})</Text>
              ))}
            </View>
          </View>

          {/* Languages */}
          <View style={styles.section}>
            <View style={styles.sectionTitle}>
              <Text>LANGUAGES</Text>
            </View>
            <View style={[styles.sectionContent, { flexDirection: 'row', flexWrap: 'wrap' }]}>
              {resumeInfo.languages.map((lang, index) => (
                <View key={index} style={styles.languageItem}>
                  <Text style={styles.languageName}>{lang.language}</Text>
                  <Text style={styles.languageLevel}>{lang.proficiency}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default IconicPDF;