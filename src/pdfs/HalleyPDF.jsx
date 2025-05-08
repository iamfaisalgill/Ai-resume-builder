import { Document, Page, Text, View, StyleSheet, Font,  Svg, Path } from '@react-pdf/renderer';
import georgia from '../assets/fonts/georgiab.ttf';
import { useResume } from '../context/ResumeInfoContext.jsx';
import { useEffect } from 'react';

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
    color: "#364153"
  },
  rightColumn: {
    width: '25%',
    backgroundColor: '#305276',
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
    color: '#305276',
    textTransform: 'uppercase'
  },
  nameBoxContainer: {
    width: 40,
    height: 40,
    border: '1.5 solid #305276',
    transform: 'rotate(45deg)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  nameBoxInner: {
    width: 40,
    height: 40,
    border: '1.5 solid #305276',
    transform: 'rotate(-45deg)',
    position: 'absolute',
  },
  nameInitials: {
    transform: 'rotate(-45deg)',
    fontSize: 18, // reduced from 20
    fontFamily: 'Georgia-Bold',
    fontWeight: 'bold',
    textTransform: "uppercase",
    color: '#305276',
  },
  sectionTitle: {
    fontSize: 11, // reduced from 12
    fontFamily: 'Georgia-Bold',
    fontWeight: 'bold',
    color: '#305276',
    marginBottom: 10,
    textTransform: 'uppercase',
    borderBottom: '1 solid #305276',
    paddingBottom: 3
  },
  text: {
    fontSize: 9, // reduced from 10
    lineHeight: 1.4
  },
  boldText: {
    fontSize: 9, // reduced from 10
    fontWeight: 'bold',
    marginBottom: 5,
    color: "#101828"
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
    fontWeight: 'bold',
    color: "#101828"
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
    marginBottom: 3,
    color: "#101828"
  },
  projectUrl: {
    fontSize: 8, // reduced from 9
    color: '#305276',
    marginBottom: 8,
    textDecoration: 'none'
  }
});


// Create Document Component
const HalleyPDF = ({ resumeInfo }) => {

  // Defensive fallbacks
  const firstName = resumeInfo.contactInfo.firstName || '';
  const lastName = resumeInfo.contactInfo.lastName || '';
  const fullName = `${firstName} ${lastName}`.trim();
  const initials = fullName
    .split(' ')
    .filter(Boolean)
    .map((name) => name[0])
    .join('');

  const skills = Array.isArray(resumeInfo.skills) ? resumeInfo.skills : [];
  const experience = Array.isArray(resumeInfo.experience) ? resumeInfo.experience : [];
  const education = Array.isArray(resumeInfo.education) ? resumeInfo.education : [];
  const projects = Array.isArray(resumeInfo.projects) ? resumeInfo.projects : [];
  const languages = Array.isArray(resumeInfo.languages) ? resumeInfo.languages : [];
  const certifications = Array.isArray(resumeInfo.certifications) ? resumeInfo.certifications : [];

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
          {resumeInfo.summary && (
            <View>
              <Text style={styles.sectionTitle}>PROFESSIONAL SUMMARY</Text>
              <Text style={styles.text}>{resumeInfo.summary}</Text>
            </View>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <View style={{ marginTop: 15 }}>
              <Text style={styles.sectionTitle}>EXPERIENCE</Text>
              {experience.map((exp, index) => (
                <View key={index}>
                  <View style={styles.jobHeader}>
                    <Text style={styles.jobTitle}>{exp.jobTitle}</Text>
                    <Text style={styles.jobDate}>{exp.startMonth} {exp.startYear} - {exp.present ? "Present" : `${exp.endMonth} ${exp.endYear}`}</Text>
                  </View>
                  <Text style={styles.companyInfo}>{exp.company}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 4 }}>
                    <Svg width="10" height="10" viewBox="0 0 24 24">
                      <Path
                        d="M5 12H19M12 5L19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                    <Text style={styles.text}>{exp.description}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <View style={{ marginTop: 15 }}>
              <Text style={styles.sectionTitle}>PROJECTS</Text>
              {projects.map((project, index) => (
                <View key={index}>
                  <Text style={styles.projectTitle}>{project.title}</Text>
                  <Text style={styles.text}>{project.description}</Text>
                  {project.url && <Text style={styles.projectUrl}>{project.url}</Text>}
                </View>
              ))}
            </View>
          )}

          {/* Education */}
          {education.length > 0 && (
            <View style={{ marginTop: 15 }}>
              <Text style={styles.sectionTitle}>EDUCATION</Text>
              {education.map((edu, index) => (
                <View key={index}>
                  <Text style={styles.boldText}>{edu.degree} in {edu.fieldOfStudy}</Text>
                  <Text style={styles.text}>{edu.institution}</Text>
                  <Text style={styles.text}>{edu.graduationMonth} {edu.graduationYear}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <View style={{ marginTop: 15 }}>
              <Text style={styles.sectionTitle}>LANGUAGES</Text>
              {languages.map((lang, index) => (
                <Text key={index} style={styles.text}>{lang.language} ({lang.proficiency})</Text>
              ))}
            </View>
          )}
        </View>

        {/* Right Column (Sidebar) */}
        <View style={styles.rightColumn}>
          {resumeInfo.contactInfo.city && resumeInfo.contactInfo.country && (
            <Text style={styles.rightText}>{resumeInfo.contactInfo.city}, {resumeInfo.contactInfo.country}</Text>
          )}
          {resumeInfo.contactInfo.phoneNumber && <Text style={styles.rightText}>{resumeInfo.contactInfo.phoneNumber}</Text>}
          {resumeInfo.contactInfo.email && <Text style={styles.rightText}>{resumeInfo.contactInfo.email}</Text>}
          {resumeInfo.contactInfo.linkedIn && <Text style={styles.rightText}>{resumeInfo.contactInfo.linkedIn}</Text>}

          {skills.length > 0 && (
            <>
              <Text style={styles.rightTitle}>SKILLS</Text>
              {skills.map((skill, index) => (
                <Text key={index} style={styles.rightText}>• {skill}</Text>
              ))}
            </>
          )}

          {certifications.length > 0 && (
            <View>
              <Text style={styles.rightTitle}>CERTIFICATIONS</Text>
              {certifications.map((cert, index) => (
                <Text key={index} style={styles.rightText}>{cert.name} ({cert.issueYear})</Text>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default HalleyPDF