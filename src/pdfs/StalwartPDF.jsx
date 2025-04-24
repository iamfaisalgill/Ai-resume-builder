import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: 'Helvetica',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
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

const StalwartPDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <Text style={styles.name}>{dummyData.firstName} {dummyData.lastName}</Text>
      <Text style={styles.contactInfo}>
        {dummyData.address} • {dummyData.phone} • {dummyData.email} • {dummyData.linkedin}
      </Text>

      {/* Professional Summary */}
      <Text style={styles.sectionHeader}>PROFESSIONAL SUMMARY</Text>
      <Text style={styles.sectionText}>{dummyData.summary}</Text>

      {/* Technical Skills */}
      <Text style={styles.sectionHeader}>TECHNICAL SKILLS</Text>
      <View style={styles.skillGrid}>
        {dummyData.skills.map((skill, index) => (
          <Text key={index} style={styles.skillItem}>• {skill}</Text>
        ))}
      </View>

      {/* Professional Experience */}
      <Text style={styles.sectionHeader}>PROFESSIONAL EXPERIENCE</Text>
      {dummyData.experience.map((exp, index) => (
        <View key={index}>
          <View style={styles.jobHeader}>
            <Text style={styles.jobTitle}>{exp.position}</Text>
            <Text style={styles.jobDate}>{exp.startDate} - {exp.endDate}</Text>
          </View>
          <Text style={styles.companyInfo}>{exp.company} | {exp.location}</Text>
          <View style={styles.bulletList}>
            {exp.responsibilities.map((resp, i) => (
              <Text key={i} style={styles.bulletItem}>• {resp}</Text>
            ))}
          </View>
        </View>
      ))}

      {/* Education */}
      <Text style={styles.sectionHeader}>EDUCATION</Text>
      {dummyData.education.map((edu, index) => (
        <View key={index}>
          <View style={styles.educationItem}>
            <Text style={styles.educationTitle}>{edu.degree}</Text>
            <Text style={styles.educationDate}>{edu.year}</Text>
          </View>
          <Text style={styles.educationSchool}>{edu.institution}</Text>
        </View>
      ))}

      {/* Certifications */}
      <Text style={styles.sectionHeader}>CERTIFICATIONS</Text>
      <View style={styles.certGrid}>
        {dummyData.certifications.map((cert, index) => (
          <Text key={index} style={styles.certItem}>• {cert}</Text>
        ))}
      </View>

      {/* Projects */}
      <Text style={styles.sectionHeader}>PROJECTS</Text>
      {dummyData.projects.map((project, index) => (
        <View key={index}>
          <Text style={styles.projectTitle}>{project.name}</Text>
          <Text style={styles.projectDesc}>{project.technologies} - {project.description}</Text>
        </View>
      ))}

      {/* Languages */}
      <Text style={styles.sectionHeader}>LANGUAGES</Text>
      {dummyData.languages.map((lang, index) => (
        <View key={index}>
          <Text style={styles.languageTitle}>{lang.language}</Text>
          <Text style={styles.languageLevel}>{lang.proficiency}</Text>
        </View>
      ))}
    </Page>
  </Document>
);

export default StalwartPDF;