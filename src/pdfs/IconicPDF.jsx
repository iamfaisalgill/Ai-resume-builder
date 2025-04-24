import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Create styles
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
    fontSize: 24,
    fontWeight: 'bold',
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
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E3A5F',
  },
  sectionContent: {
    width: '70%',
  },
  splitTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 12,
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
    marginBottom: 8,
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
  languageItem: {
    width: '50%',
    marginBottom: 5,
  },
  languageName: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  languageLevel: {
    fontSize: 10,
  },
  summaryText: {
    fontSize: 10,
    lineHeight: 1.4,
  }
});

const dummyData = {
  firstName: 'JASON',
  lastName: 'CARTER',
  initials: 'JC',
  summary: 'Senior Full Stack Developer with 8+ years of experience building scalable web applications. Specialized in JavaScript frameworks and cloud architecture. Proven leader in agile development environments with a passion for mentoring junior developers and implementing CI/CD pipelines. Strong focus on performance optimization and security best practices. ',
  address: 'San Francisco, CA USA',
  phone: '+1 (555) 123-4567',
  email: 'jason.carter@example.com',
  linkedin: 'linkedin.com/in/jasoncarter',
  github: 'github.com/jasoncarter',
  experience: [
    {
      company: 'Tech Innovations Inc.',
      location: 'San Francisco, CA',
      position: 'Senior Full Stack Developer',
      startDate: '2018',
      endDate: 'Present',
      responsibilities: [
        'Led a team of 5 developers to build a SaaS platform with React and Node.js',
        'Implemented CI/CD pipeline reducing deployment time by 40%',
        'Optimized database queries improving application performance by 30%'
      ]
    },
    {
      company: 'Digital Solutions LLC',
      location: 'New York, NY',
      position: 'Frontend Developer',
      startDate: '2015',
      endDate: '2018',
      responsibilities: [
        'Developed responsive web applications using React and Redux',
        'Collaborated with UX team to implement design systems',
        'Mentored junior developers on best practices'
      ]
    }
  ],
  projects: [
    {
      name: 'E-commerce Platform',
      technologies: 'React, Node.js, MongoDB',
      description: 'Built a full-featured online store with payment integration'
    },
    {
      name: 'Task Management App',
      technologies: 'React Native, Firebase',
      description: 'Mobile app for team collaboration with real-time updates'
    }
  ],
  education: [
    {
      degree: 'B.S. Computer Science',
      institution: 'Stanford University',
      year: '2015'
    }
  ],
  languages: [
    { language: 'English', proficiency: 'Native' },
    { language: 'Spanish', proficiency: 'Intermediate' }
  ],
  skills: [
    'JavaScript (ES6+)',
    'React & React Native',
    'Node.js',
    'TypeScript',
    'GraphQL',
    'AWS',
    'Docker',
    'CI/CD Pipelines'
  ],
  certifications: [
    'AWS Certified Developer',
    'Google Cloud Professional'
  ],
  volunteer: [
    {
      organization: 'Code for America',
      role: 'Mentor',
      duration: '2019-Present'
    }
  ]
};

const IconicPDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.name}>{dummyData.firstName} {dummyData.lastName}</Text>
        </View>
        <View>
          <Text style={styles.contactInfo}>{dummyData.phone}</Text>
          <Text style={styles.contactInfo}>{dummyData.email}</Text>
          <Text style={styles.contactInfo}>{dummyData.address}</Text>
          <Text style={styles.contactInfo}>{dummyData.linkedin}</Text>
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
            <Text style={styles.summaryText}>{dummyData.summary}</Text>
          </View>
        </View>

        {/* Technical Skills */}
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <Text>TECHNICAL SKILLS</Text>
          </View>
          <View style={[styles.sectionContent, styles.skillGrid]}>
            {dummyData.skills.map((skill, index) => (
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
            {dummyData.experience.map((exp, index) => (
              <View key={index} style={{ marginBottom: 15 }}>
                <Text style={styles.jobTitle}>{exp.position}</Text>
                <Text style={styles.jobDetails}>{exp.company}, {exp.location}, {exp.startDate} - {exp.endDate}</Text>
                {exp.responsibilities.map((resp, i) => (
                  <Text key={i} style={styles.bulletItem}>• {resp}</Text>
                ))}
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
            {dummyData.projects.map((project, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={styles.projectTitle}>{project.name}</Text>
                <Text style={styles.projectDesc}>{project.technologies} • {project.description}</Text>
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
            {dummyData.education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <Text style={styles.educationDegree}>{edu.degree}</Text>
                <Text style={styles.educationDetails}>{edu.institution}, {edu.year}</Text>
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
            {dummyData.certifications.map((cert, index) => (
              <Text key={index} style={{ fontSize: 10, marginBottom: 5 }}>• {cert}</Text>
            ))}
          </View>
        </View>

        {/* Languages */}
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <Text>LANGUAGES</Text>
          </View>
          <View style={[styles.sectionContent, { flexDirection: 'row', flexWrap: 'wrap' }]}>
            {dummyData.languages.map((lang, index) => (
              <View key={index} style={styles.languageItem}>
                <Text style={styles.languageName}>{lang.language}</Text>
                <Text style={styles.languageLevel}>{lang.proficiency}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Volunteer Work */}
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <Text>VOLUNTEER WORK</Text>
          </View>
          <View style={styles.sectionContent}>
            {dummyData.volunteer.map((vol, index) => (
              <View key={index}>
                <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 2 }}>{vol.organization}</Text>
                <Text style={{ fontSize: 10 }}>{vol.role} ({vol.duration})</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default IconicPDF;