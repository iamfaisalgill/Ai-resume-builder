import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import segeo from '../assets/fonts/segoeuithis.ttf';
import segeo_bold from '../assets/fonts/segoeuithibd.ttf';

Font.register({
  family: 'Segeo',
  src: segeo,
});
Font.register({
  family: 'Segeo-Bold',
  src: segeo_bold,
});

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 15,
    fontFamily: 'Segeo',
  },
  name: {
    fontSize: 18, // reduced from 20
    fontFamily: 'Segeo-Bold',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  contactInfo: {
    fontSize: 9, // reduced from 9
    color: '#666666',
    marginBottom: 12,
  },
  sectionHeader: {
    fontSize: 11, // reduced from 12
    fontFamily: 'Segeo-Bold',
    fontWeight: 'bold',
    backgroundColor: '#EEEEEE',
    padding: 5,
    marginBottom: 5,
    marginTop: 8
  },
  sectionText: {
    fontSize: 9, // reduced from 10
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
    fontSize: 9, // reduced from 10
    marginBottom: 4,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 9, // reduced from 10
    fontFamily: 'Segeo-Bold',
    fontWeight: 'bold',
  },
  jobDate: {
    fontSize: 9, // reduced from 10
    fontFamily: 'Segeo-Bold',
    fontWeight: 'bold',
  },
  companyInfo: {
    fontSize: 9, // reduced from 10
    marginBottom: 4,
  },
  bulletList: {
    fontSize: 9, // reduced from 10
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
    fontSize: 9, // reduced from 10
    fontFamily: 'Segeo-Bold',
    fontWeight: 'bold',
  },
  educationDate: {
    fontSize: 9, // reduced from 10
    fontFamily: 'Segeo-Bold',
    fontWeight: 'bold',
  },
  educationSchool: {
    fontSize: 9, // reduced from 10
    marginBottom: 8,
  },
  certGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  certItem: {
    width: '50%',
    fontSize: 9, // reduced from 10
    marginBottom: 4,
  },
  projectTitle: {
    fontSize: 9, // reduced from 10
    fontFamily: 'Segeo-Bold',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  projectDesc: {
    fontSize: 9, // reduced from 10
    marginBottom: 8,
  },
  languageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  languageTitle: {
    width: '33%',
    fontSize: 9, // reduced from 10
    fontFamily: 'Segeo-Bold',
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 2,
  },
  languageLevel: {
    fontSize: 9, // reduced from 10
    color: '#666666',
    marginBottom: 4,
  },
});


const StalwartPDF = ({resumeInfo}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <Text style={styles.name}>{resumeInfo.firstName} {resumeInfo.lastName}</Text>
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
            {/* <Text style={styles.jobDate}>{exp.startDate} - {exp.endDate}</Text> */}
            <Text style={styles.jobDate}>{exp.company}, {exp.startMonth} {exp.startYear} -  {exp.present ? "Present" : `${exp.endMonth} ${exp.endYear}`} </Text>
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
          <Text key={index} style={styles.certItem}>{cert.name} ({cert.issueYear})</Text>
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
        {resumeInfo.languages && <View style={styles.languageGrid}>
      {resumeInfo.languages.map((lang, index) => (
          <Text key={index} style={styles.languageTitle}>{lang.language} ({lang.proficiency})</Text>
      ))}
      {/* {lang.certification && <Text style={styles.languageCert}>Certification: {lang.certification}</Text>}
          {lang.yearsOfExperience && <Text style={styles.languageExp}>Years of Experience: {lang.yearsOfExperience}</Text>} */}
        </View>} 
    </Page>
  </Document>
);

export default StalwartPDF;