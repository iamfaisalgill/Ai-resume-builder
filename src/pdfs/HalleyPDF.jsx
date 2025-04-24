import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Register fonts if needed (optional)
Font.register({
  family: 'Serif',
  src: 'https://fonts.gstatic.com/s/opensans/v18/mem8YaGs126MiZpBA-UFVZ0e.ttf',
});
Font.register({
  family: 'Noto Serif',
  src: 'http://fonts.gstatic.com/s/notoserif/v4/eCpfeMZI7q4jLksXVRWPQy3USBnSvpkopQaUR-2r7iU.ttf',
});


// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },
  leftColumn: {
    width: '75%',
    padding: 15,
  },
  rightColumn: {
    width: '25%',
    backgroundColor: '#5F6A8A',
    color: 'white',
    padding: 15,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  nameText: {
    // fontSize: 24,
    fontFamily: 'Noto Serif',
    fontWeight: 'bold',
    color: '#5F6A8A',
  },
  nameBoxContainer: {
    width: 40,
    height: 40,
    border: '2 solid #5F6A8A',
    transform: 'rotate(45deg)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    position: 'relative', // Needed for absolute positioning of inner box
  },
  nameBoxInner: {
    width: 40,
    height: 40,
    border: '2 solid #5F6A8A',
    transform: 'rotate(-45deg)',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  nameInitials: {
    transform: 'rotate(-45deg)',
    fontSize: 16,
    fontFamily: 'Noto Serif',
    color: '#5F6A8A',
    fontWeight: 'bold',
    position: 'relative', // Bring to front
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Serif',
    fontWeight: 'heavy', // or use numeric value like 900
    color: '#5F6A8A',
    marginBottom: 5,
    textTransform: 'uppercase', // optional: makes all letters uppercase for more impact
  },
  text: {
    fontSize: 10,
    marginBottom: 5,
  },
  boldText: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  listItem: {
    fontSize: 10,
    marginBottom: 3,
    marginLeft: 10,
  },
  rightText: {
    fontSize: 10,
    marginBottom: 10,
  },
  rightTitle: {
    fontSize: 14,
    fontFamily: 'Serif',
    fontWeight: 'heavy', // or use numeric value like 900
    marginBottom: 5,
    marginTop: 15,
    textTransform: 'uppercase', // optional
  },
});


const dummyData = {
  firstName: 'FAISAL',
  lastName: 'ZAKRIA',
  initials: 'FC',
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

// Create Document Component
const HalleyPDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Left Column (Main Content) */}
      <View style={styles.leftColumn}>
        {/* Name Section */}

        <View style={styles.nameContainer}>
          <View style={styles.nameBoxContainer}>
            <View style={styles.nameBoxInner} />
            <Text style={styles.nameInitials}>{dummyData.initials}</Text>
          </View>
          <View>
            <Text style={styles.nameText}>{dummyData.firstName}</Text>
            <Text style={styles.nameText}>{dummyData.lastName}</Text>
          </View>
        </View>

        {/* Professional Summary */}
        <View>
          <Text style={styles.sectionTitle}>PROFESSIONAL SUMMARY</Text>
          <Text style={styles.text}>
            {dummyData.summary}
          </Text>
        </View>

        {/* Experience */}
        <View style={{ marginTop: 15 }}>
          <Text style={styles.sectionTitle}>EXPERIENCE</Text>
          {dummyData.experience.map((exp, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <Text style={styles.boldText}>{exp.company} | {exp.location}</Text>
              <Text style={styles.text}>{exp.startDate} - {exp.endDate}</Text>
              <Text style={styles.text}>{exp.position}</Text>
              {exp.responsibilities.map((resp, i) => (
                <Text key={i} style={styles.listItem}>• {resp}</Text>
              ))}
            </View>
          ))}
        </View>

        {/* Projects */}
        <View style={{ marginTop: 15 }}>
          <Text style={styles.sectionTitle}>PROJECTS</Text>
          {dummyData.projects.map((project, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <Text style={styles.boldText}>{project.name}</Text>
              <Text style={styles.text}>{project.technologies} • {project.description}</Text>
            </View>
          ))}
        </View>

        {/* Education */}
        <View style={{ marginTop: 15 }}>
          <Text style={styles.sectionTitle}>EDUCATION</Text>
          {dummyData.education.map((edu, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <Text style={styles.boldText}>{edu.degree}</Text>
              <Text style={styles.text}>{edu.year}</Text>
              <Text style={styles.text}>{edu.institution}</Text>
            </View>
          ))}
        </View>

        {/* Languages */}
        <View style={{ marginTop: 15 }}>
          <Text style={styles.sectionTitle}>LANGUAGES</Text>
          {dummyData.languages.map((lang, index) => (
            <Text key={index} style={styles.text}>{lang.language} - {lang.proficiency}</Text>
          ))}
        </View>
      </View>

      {/* Right Column (Sidebar) */}
      <View style={styles.rightColumn}>
        <Text style={styles.rightText}>{dummyData.address}</Text>
        <Text style={styles.rightText}>{dummyData.phone}</Text>
        <Text style={styles.rightText}>{dummyData.email}</Text>
        <Text style={styles.rightText}>{dummyData.linkedin}</Text>
        <Text style={styles.rightText}>{dummyData.github}</Text>

        <Text style={styles.rightTitle}>TECHNICAL SKILLS</Text>
        {dummyData.skills.map((skill, index) => (
          <Text key={index} style={styles.rightText}>• {skill}</Text>
        ))}

        <Text style={styles.rightTitle}>CERTIFICATIONS</Text>
        {dummyData.certifications.map((cert, index) => (
          <Text key={index} style={styles.rightText}>• {cert}</Text>
        ))}

        <Text style={styles.rightTitle}>VOLUNTEER</Text>
        {dummyData.volunteer.map((vol, index) => (
          <View key={index}>
            <Text style={styles.rightText}>{vol.organization}</Text>
            <Text style={styles.rightText}>{vol.role} ({vol.duration})</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default HalleyPDF