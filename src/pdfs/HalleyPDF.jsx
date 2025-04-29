import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import georgia from '../assets/fonts/georgiab.ttf';

Font.register({
     family: 'Georgia-Bold',
     src: georgia,
  });

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica'
  },
  leftColumn: {
    width: '75%',
    padding: 20,
  },
  rightColumn: {
    width: '25%',
    backgroundColor: '#5F6A8A',
    color: 'white',
    padding: 10,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  nameText: {
    fontSize: 22, // reduced from 24
    fontFamily: 'Georgia-Bold',
    fontWeight: 'heavy',
    color: '#5F6A8A',
    textTransform: 'uppercase'
  },
  nameBoxContainer: {
    width: 40,
    height: 40,
    border: '1.5 solid #5F6A8A',
    transform: 'rotate(45deg)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  nameBoxInner: {
    width: 40,
    height: 40,
    border: '1.5 solid #5F6A8A',
    transform: 'rotate(-45deg)',
    position: 'absolute',
  },
  nameInitials: {
    transform: 'rotate(-45deg)',
    fontSize: 18, // reduced from 20
    fontFamily: 'Georgia-Bold',
    fontWeight: 'bold',
    textTransform: "uppercase",
    color: '#5F6A8A',
  },
  sectionTitle: {
    fontSize: 11, // reduced from 12
    fontFamily: 'Georgia-Bold',
    fontWeight: 'bold',
    color: '#5F6A8A',
    marginBottom: 10,
    textTransform: 'uppercase',
    borderBottom: '1 solid #5F6A8A',
    paddingBottom: 3
  },
  text: {
    fontSize: 9, // reduced from 10
    lineHeight: 1.4
  },
  boldText: {
    fontSize: 9, // reduced from 10
    fontWeight: 'bold',
    marginBottom: 5
  },
  listItem: {
    fontSize: 9, // reduced from 10
    marginBottom: 5,
    marginLeft: 10,
    lineHeight: 1.4
  },
  rightText: {
    fontSize: 9, // reduced from 9
    marginBottom: 4,
    lineHeight: 1.4
  },
  rightTitle: {
    fontSize: 11, // reduced from 12
    fontFamily: 'Georgia-Bold',
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 15,
    textTransform: 'uppercase'
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  jobTitle: {
    fontSize: 10, // reduced from 11
    fontWeight: 'bold'
  },
  jobDate: {
    fontSize: 9 // reduced from 10
  },
  companyInfo: {
    fontSize: 9, // reduced from 10
    marginBottom: 5,
    fontStyle: 'italic'
  },
  projectTitle: {
    fontSize: 10, // reduced from 11
    fontWeight: 'bold',
    marginBottom: 3
  },
  projectUrl: {
    fontSize: 8, // reduced from 9
    color: '#5F6A8A',
    marginBottom: 8,
    textDecoration: 'none'
  }
});


// Create Document Component
const HalleyPDF = ({resumeInfo}) => {

  const fullName = `${resumeInfo.firstName} ${resumeInfo.lastName}`

  const initials = fullName.split(' ') // ["Emily", "Johnson"]
  .map(name => name[0]).join('');
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
          {/* <Text style={styles.nameText}>{resumeInfo.fullName}</Text> */}
          <View>
            <Text style={styles.nameText}>{resumeInfo.firstName}</Text>
            <Text style={styles.nameText}>{resumeInfo.lastName}</Text>
          </View>
        </View>

        {/* Professional Summary */}
        <View>
          <Text style={styles.sectionTitle}>PROFESSIONAL SUMMARY</Text>
          <Text style={styles.text}>{resumeInfo.summary}</Text>
        </View>

        {/* Experience */}
        <View style={{ marginTop: 15 }}>
          <Text style={styles.sectionTitle}>EXPERIENCE</Text>
          {resumeInfo.experience.map((exp, index) => (
            <View key={index}>
              <View style={styles.jobHeader}>
                <Text style={styles.jobTitle}>{exp.jobTitle}</Text>
                <Text style={styles.jobDate}>{exp.startDate} - {exp.endDate}</Text>
              </View>
              <Text style={styles.companyInfo}>{exp.company}</Text>
              <Text style={styles.text}>{exp.description}</Text>
            </View>
          ))}
        </View>

        {/* Projects */}
        <View style={{ marginTop: 15 }}>
          <Text style={styles.sectionTitle}>PROJECTS</Text>
          {resumeInfo.projects.map((project, index) => (
            <View key={index}>
              <Text style={styles.projectTitle}>{project.title}</Text>
              <Text style={styles.text}>{project.description}</Text>
              {project.url && <Text style={styles.projectUrl}>{project.url}</Text>}
            </View>
          ))}
        </View>

        {/* Education */}
        <View style={{ marginTop: 15 }}>
          <Text style={styles.sectionTitle}>EDUCATION</Text>
          {resumeInfo.education.map((edu, index) => (
            <View key={index}>
              <Text style={styles.boldText}>{edu.degree} in {edu.fieldOfStudy}</Text>
              <Text style={styles.text}>{edu.institution}</Text>
              <Text style={styles.text}>{edu.graduationMonth} {edu.graduationYear}</Text>
            </View>
          ))}
        </View>

        {/* Languages */}
        <View style={{ marginTop: 15 }}>
          <Text style={styles.sectionTitle}>LANGUAGES</Text>
          {resumeInfo.languages.map((lang, index) => (
            <Text key={index} style={styles.text}>{lang.language} ({lang.proficiency})</Text>
          ))}
        </View>
      </View>

      {/* Right Column (Sidebar) */}
      <View style={styles.rightColumn}>
        <Text style={styles.rightText}>{resumeInfo.city}, {resumeInfo.country}</Text>
        <Text style={styles.rightText}>{resumeInfo.phoneNumber}</Text>
        <Text style={styles.rightText}>{resumeInfo.email}</Text>
        <Text style={styles.rightText}>{resumeInfo.linkedIn}</Text>

        <Text style={styles.rightTitle}>TECHNICAL SKILLS</Text>
        {resumeInfo.skills.map((skill, index) => (
          <Text key={index} style={styles.rightText}>• {skill}</Text>
        ))}

        <Text style={styles.rightTitle}>CERTIFICATIONS</Text>
        {resumeInfo.certifications.map((cert, index) => (
          <Text key={index} style={styles.rightText}>{cert.name} ({cert.issueYear})
          </Text>
        ))}
      </View>
    </Page>
  </Document>
)};

export default HalleyPDF