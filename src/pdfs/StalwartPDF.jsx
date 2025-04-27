import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

Font.register({
  family: 'Roboto',
  src: 'http://fonts.gstatic.com/s/roboto/v16/zN7GBFwfMP4uA6AR0HCoLQ.ttf',
});

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: 'Helvetica',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  contactInfo: {
    fontSize: 9,
    color: '#666666',
    marginBottom: 12,
  },
  sectionHeader: {
    fontSize: 12, // Smaller than original
    fontWeight: 'bold',
    backgroundColor: '#EEEEEE',
    padding: 5, // Less padding
    marginBottom: 5, // Reduced spacing
    marginTop: 8 // Space between sections
  },
  sectionText: {
    fontSize: 10,
    marginBottom: 12,
    lineHeight: 1.4,
  },
  skillGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  skillItem: {
    width: '33%',
    fontSize: 10,
    marginBottom: 4,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  jobDate: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  companyInfo: {
    fontSize: 10,
    marginBottom: 4,
  },
  bulletList: {
    fontSize: 10,
    marginLeft: 10,
    marginBottom: 12,
  },
  bulletItem: {
    marginBottom: 4,
  },
  educationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  educationTitle: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  educationDate: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  educationSchool: {
    fontSize: 10,
    marginBottom: 8,
  },
  certGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  certItem: {
    width: '50%',
    fontSize: 10,
    marginBottom: 4,
  },
  projectTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  projectDesc: {
    fontSize: 10,
    marginBottom: 8,
  },
  languageTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 2,
  },
  languageLevel: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 4,
  },
});


const StalwartPDF = ({resumeInfo}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <Text style={styles.name}>{resumeInfo.fullName}</Text>
      <Text style={styles.contactInfo}>
        {resumeInfo.city}, {resumeInfo.country} • {resumeInfo.phoneNumber} • {resumeInfo.email} • {resumeInfo.linkedIn}
      </Text>

      {/* Professional Summary */}
      <Text style={styles.sectionHeader}>PROFESSIONAL SUMMARY</Text>
      <Text style={styles.sectionText}>{resumeInfo.summary}</Text>

      {/* Technical Skills */}
      <Text style={styles.sectionHeader}>TECHNICAL SKILLS</Text>
      <View style={styles.skillGrid}>
        {resumeInfo.skills.map((skill, index) => (
          <Text key={index} style={styles.skillItem}>• {skill}</Text>
        ))}
      </View>

      {/* Professional Experience */}
      <Text style={styles.sectionHeader}>PROFESSIONAL EXPERIENCE</Text>
      {resumeInfo.experience.map((exp, index) => (
        <View key={index}>
          <View style={styles.jobHeader}>
            <Text style={styles.jobTitle}>{exp.jobTitle}</Text>
            <Text style={styles.jobDate}>{exp.startDate} - {exp.endDate}</Text>
          </View>
          <Text style={styles.companyInfo}>{exp.company}</Text>
          <Text style={styles.sectionText}>{exp.description}</Text>
        </View>
      ))}

      {/* Education */}
      <Text style={styles.sectionHeader}>EDUCATION</Text>
      {resumeInfo.education.map((edu, index) => (
        <View key={index}>
          <View style={styles.educationItem}>
            <Text style={styles.educationTitle}>{edu.degree} in {edu.fieldOfStudy}</Text>
            <Text style={styles.educationDate}>{edu.graduationMonth} {edu.graduationYear}</Text>
          </View>
          <Text style={styles.educationSchool}>{edu.institution}</Text>
        </View>
      ))}

      {/* Certifications */}
      <Text style={styles.sectionHeader}>CERTIFICATIONS</Text>
        <View style={styles.certGrid}>
      {resumeInfo.certifications.map((cert, index) => (
          <Text key={index} style={styles.certItem}>• {cert.name}</Text>
      ))}
        </View>

      {/* Projects */}
      <Text style={styles.sectionHeader}>PROJECTS</Text>
      {resumeInfo.projects.map((project, index) => (
        <View key={index}>
          <Text style={styles.projectTitle}>{project.title}</Text>
          <Text style={styles.projectDesc}>{project.description}</Text>
          {/* {project.url && <Text style={styles.projectUrl}>URL: {project.url}</Text>} */}
        </View>
      ))}

      {/* Languages */}
      <Text style={styles.sectionHeader}>LANGUAGES</Text>
      {resumeInfo.languages.map((lang, index) => (
        <View key={index}>
          <Text style={styles.languageTitle}>{lang.language} ({lang.proficiency})</Text>
          {lang.certification && <Text style={styles.languageCert}>Certification: {lang.certification}</Text>}
          {lang.yearsOfExperience && <Text style={styles.languageExp}>Years of Experience: {lang.yearsOfExperience}</Text>}
        </View>
      ))}
    </Page>
  </Document>
);

export default StalwartPDF;