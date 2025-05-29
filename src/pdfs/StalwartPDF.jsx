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




const StalwartPDF = ({resumeInfo}) => {

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
    marginLeft: 8,
  },
  bulletItem: {
    fontSize: 10,
    marginBottom: 2, // Reduced from 3
    marginLeft: 8,
    lineHeight: 1.3, // Better readability
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

  const skills = Array.isArray(resumeInfo.skills) ? resumeInfo.skills : [];
  const experience = Array.isArray(resumeInfo.experience) ? resumeInfo.experience : [];
  const education = Array.isArray(resumeInfo.education) ? resumeInfo.education : [];
  const projects = Array.isArray(resumeInfo.projects) ? resumeInfo.projects : [];
  const languages = Array.isArray(resumeInfo.languages) ? resumeInfo.languages : [];
  const certifications = Array.isArray(resumeInfo.certifications) ? resumeInfo.certifications : [];
  
 return (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <Text style={styles.name}>{resumeInfo.contactInfo.firstName} {resumeInfo.contactInfo.lastName}</Text>
      <Text style={styles.contactInfo}>
        {resumeInfo.contactInfo.city}, {resumeInfo.contactInfo.country} • {resumeInfo.contactInfo.phoneNumber} • {resumeInfo.contactInfo.email} • {resumeInfo.contactInfo.linkedIn}
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
              <Text key={index} style={styles.skillItem}>• {skill}</Text>
            ))}
          </View>
        </>
      )}

      {/* Professional Experience */}
      { experience.length > 0 && (
        <>
        <Text style={styles.sectionHeader}>PROFESSIONAL EXPERIENCE</Text>
        {resumeInfo.experience.map((exp, index) => (
          <View key={index}>
            <View style={styles.jobHeader}>
              <Text style={styles.jobTitle}>{exp.jobTitle}</Text>
              {/* <Text style={styles.jobDate}>{exp.startDate} - {exp.endDate}</Text> */}
              <Text style={styles.jobDate}>{exp.company}, {exp.startMonth} {exp.startYear} -  {exp.present ? "Present" : `${exp.endMonth} ${exp.endYear}`} </Text>
            </View>
            <Text style={styles.companyInfo}>{exp.company}</Text>
            {exp.description && exp.description.split('. ').map((item,i)=>(
              <Text style={styles.bulletItem} key={i}>
                • {item.trim()}{!item.endsWith('.') && '.'}
              </Text>
            ))}
          </View>
        ))}
      </>)}

      {/* Education */}
      {education.length > 0 &&(<>
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
      </>)}

      {/* Certifications */}
      {certifications.length > 0 && (<>
        <Text style={styles.sectionHeader}>CERTIFICATIONS</Text>
          <View style={styles.certGrid}>
        {resumeInfo.certifications.map((cert, index) => (
            <Text key={index} style={styles.certItem}>{cert.name} ({cert.issueYear})</Text>
        ))}
          </View>
      </>)}

      {/* Projects */}
      { projects.length > 0 && (<>
        <Text style={styles.sectionHeader}>PROJECTS</Text>
        {resumeInfo.projects.map((project, index) => (
          <View key={index}>
            <Text style={styles.projectTitle}>{project.title}</Text>
            <Text style={styles.projectDesc}>{project.description}</Text>
            {/* {project.url && <Text style={styles.projectUrl}>URL: {project.url}</Text>} */}
          </View>
        ))}
      </>)}

      {/* Languages */}
      {languages.length > 0 && (<>
        <Text style={styles.sectionHeader}>LANGUAGES</Text>
          <View style={styles.languageGrid}>
        {resumeInfo.languages.map((lang, index) => (
            <Text key={index} style={styles.languageTitle}>{lang.language} ({lang.proficiency})</Text>
        ))}
        {/* {lang.certification && <Text style={styles.languageCert}>Certification: {lang.certification}</Text>}
            {lang.yearsOfExperience && <Text style={styles.languageExp}>Years of Experience: {lang.yearsOfExperience}</Text>} */}
          </View>
      </>)}
    </Page>
  </Document>
)}

export default StalwartPDF;