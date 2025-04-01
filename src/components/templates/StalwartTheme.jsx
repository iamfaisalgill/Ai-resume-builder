import React from "react";

// Template name: stalwart
const StalwartTheme = () => {
  return (
    <div className="bg-white text-black p-8 max-w-4xl mx-auto font-sans">
      <h1 className="text-3xl font-bold">JASON CARTER</h1>
      <p className="text-sm text-gray-600">San Francisco, CA • +1 (555) 123-4567 • jason.carter@example.com • linkedin.com/in/jasoncarter</p>
      
      <div className="mt-8">
        <h2 className="text-lg font-bold bg-gray-200 p-2">PROFESSIONAL SUMMARY</h2>
        <p className="mt-2 text-sm">
          Senior Full Stack Developer with 8+ years of experience building scalable web applications. 
          Specialized in JavaScript frameworks (React, Node.js) and cloud architecture (AWS). 
          Proven track record of leading development teams and delivering high-performance solutions. 
          Passionate about clean code architecture, performance optimization, and mentoring junior developers.
        </p>
      </div>
      
      <div className="mt-8">
        <h2 className="text-lg font-bold bg-gray-200 p-2">TECHNICAL SKILLS</h2>
        <div className="grid grid-cols-3 gap-2 text-sm mt-2">
          <p>• React.js/Next.js</p>
          <p>• Node.js/Express</p>
          <p>• TypeScript</p>
          <p>• AWS/Serverless</p>
          <p>• Docker/Kubernetes</p>
          <p>• GraphQL</p>
          <p>• MongoDB/PostgreSQL</p>
          <p>• Jest/Cypress</p>
          <p>• CI/CD Pipelines</p>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-lg font-bold bg-gray-200 p-2">PROFESSIONAL EXPERIENCE</h2>
        
        <div className="mb-6">
          <div className="flex justify-between text-sm font-bold mt-2">
            <p>Senior Software Engineer</p>
            <p>June 2020 - Present</p>
          </div>
          <p className="text-sm">TechNova Solutions | San Francisco, CA</p>
          <ul className="list-disc list-inside text-sm mt-2 space-y-1">
            <li>Led migration from monolithic to microservices architecture, improving system scalability by 40%</li>
            <li>Implemented CI/CD pipeline reducing deployment time from 2 hours to 15 minutes</li>
            <li>Developed reusable React component library adopted by 12+ product teams</li>
            <li>Mentored 5 junior developers through code reviews and technical guidance</li>
          </ul>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between text-sm font-bold mt-2">
            <p>Full Stack Developer</p>
            <p>March 2017 - May 2020</p>
          </div>
          <p className="text-sm">Digital Creations Inc | Austin, TX</p>
          <ul className="list-disc list-inside text-sm mt-2 space-y-1">
            <li>Built RESTful APIs handling 10,000+ daily requests with 99.9% uptime</li>
            <li>Optimized database queries reducing page load times by 65%</li>
            <li>Implemented JWT authentication system for enterprise application</li>
            <li>Collaborated with UX team to improve customer satisfaction scores by 30%</li>
          </ul>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-lg font-bold bg-gray-200 p-2">EDUCATION</h2>
        <div className="flex justify-between text-sm font-bold mt-2">
          <p>Master of Science - Computer Science</p>
          <p>2016</p>
        </div>
        <p className="text-sm">Stanford University</p>
        
        <div className="flex justify-between text-sm font-bold mt-2">
          <p>Bachelor of Science - Software Engineering</p>
          <p>2014</p>
        </div>
        <p className="text-sm">University of Texas at Austin</p>
      </div>
      
      <div className="mt-8">
        <h2 className="text-lg font-bold bg-gray-200 p-2">CERTIFICATIONS</h2>
        <div className="grid grid-cols-2 gap-2 text-sm mt-2">
          <p>• AWS Certified Solutions Architect</p>
          <p>• Google Professional Data Engineer</p>
          <p>• Certified Scrum Master</p>
          <p>• Microsoft Certified: Azure Fundamentals</p>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-lg font-bold bg-gray-200 p-2">PROJECTS</h2>
        <div className="text-sm mt-2">
          <p className="font-bold">E-commerce Platform</p>
          <p>React, Node.js, MongoDB - Full-featured online store with payment processing and analytics</p>
          
          <p className="font-bold mt-2">Healthcare Analytics Dashboard</p>
          <p>D3.js, Express - Data visualization platform for hospital administrators</p>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-lg font-bold bg-gray-200 p-2">LANGUAGES</h2>
        <p className="font-bold mt-2 text-sm">English</p>
        <p className="text-sm text-gray-600">Native</p>
        
        <p className="font-bold mt-2 text-sm">Spanish</p>
        <p className="text-sm text-gray-600">Professional Working Proficiency</p>
      </div>
    </div>
  );
};

export default StalwartTheme;