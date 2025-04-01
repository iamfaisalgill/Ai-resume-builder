import React from "react";

// template name: Halley
const Template1 = () => {
  return (
    <div className="mx-auto bg-white max-w-4xl">
      <div className="flex">
        <div className="w-3/4 p-10">
          <div className="flex items-center space-x-4 text-[#5F6A8A]">
            <div className="relative w-16 h-16 flex items-center justify-center border-2 border-[#5F6A8A] rotate-45">
              <div className="absolute w-16 h-16 border-2 border-[#5F6A8A] -rotate-45"></div>
              <span className="text-3xl font-serif font-bold -rotate-45">JC</span>
            </div>
            <div className="font-serif font-bold text-[#5F6A8A]">
              <p className="text-4xl leading-none">JASON</p>
              <p className="text-4xl leading-none">CARTER</p>
            </div>
          </div>
          
          <div className="mt-6">
            <h2 className="text-lg font-bold text-[#5F6A8A]">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-gray-700 mt-2">
              Senior Full Stack Developer with 8+ years of experience building scalable web applications. 
              Specialized in JavaScript frameworks and cloud architecture. Proven leader in agile development 
              environments with expertise in React, Node.js, and AWS. Passionate about creating efficient, 
              maintainable code and mentoring junior developers.
            </p>
          </div>
          
          <div className="mt-6">
            <h2 className="text-lg font-bold text-[#5F6A8A]">EXPERIENCE</h2>
            
            <div className="mb-4">
              <p className="font-bold text-gray-900">TechNova Solutions | San Francisco, CA</p>
              <p className="text-gray-700">June 2020 - Present</p>
              <p className="text-gray-700">Senior Software Engineer</p>
              <ul className="list-disc list-inside mt-2 text-gray-700">
                <li>
                  Led migration of legacy monolith to microservices architecture, improving scalability by 40%
                </li>
                <li>
                  Implemented CI/CD pipeline reducing deployment time by 75%
                </li>
                <li>
                  Developed reusable React component library adopted by 12+ teams
                </li>
                <li>
                  Mentored 5 junior developers through code reviews and pair programming
                </li>
              </ul>
            </div>
            
            <div className="mb-4">
              <p className="font-bold text-gray-900">Digital Creations Inc | Austin, TX</p>
              <p className="text-gray-700">March 2017 - May 2020</p>
              <p className="text-gray-700">Full Stack Developer</p>
              <ul className="list-disc list-inside mt-2 text-gray-700">
                <li>
                  Built RESTful APIs serving 10,000+ daily requests with 99.9% uptime
                </li>
                <li>
                  Optimized database queries reducing page load times by 65%
                </li>
                <li>
                  Implemented JWT authentication for enterprise application
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6">
            <h2 className="text-lg font-bold text-[#5F6A8A]">PROJECTS</h2>
            <div className="mb-4">
              <p className="font-bold text-gray-900">E-commerce Platform</p>
              <p className="text-gray-700">
                React, Node.js, MongoDB • Full-featured online store with payment processing, 
                inventory management, and analytics dashboard
              </p>
            </div>
            <div className="mb-4">
              <p className="font-bold text-gray-900">Healthcare Analytics Dashboard</p>
              <p className="text-gray-700">
                D3.js, Express • Data visualization platform for hospital administrators
              </p>
            </div>
          </div>
          
          <div className="mt-6">
            <h2 className="text-lg font-bold text-[#5F6A8A]">EDUCATION</h2>
            <p className="font-bold text-gray-900">Master of Science - Computer Science</p>
            <p className="text-gray-700">2016</p>
            <p className="text-gray-500">Stanford University</p>
            
            <p className="font-bold text-gray-900 mt-2">Bachelor of Science - Software Engineering</p>
            <p className="text-gray-700">2014</p>
            <p className="text-gray-500">University of Texas at Austin</p>
          </div>
          
          <div className="mt-6">
            <h2 className="text-lg font-bold text-[#5F6A8A]">LANGUAGES</h2>
            <p className="text-gray-700">English - Native</p>
            <p className="text-gray-700">Spanish - Professional Working</p>
          </div>
        </div>
        
        <div className="w-1/4 bg-[#5F6A8A] text-white p-6">
          <p className="text-sm">San Francisco, CA USA</p>
          <p className="mt-4 text-sm">+1 (555) 123-4567</p>
          <p className="mt-4 text-sm">jason.carter@example.com</p>
          <p className="mt-4 text-sm">linkedin.com/in/jasoncarter</p>
          <p className="mt-4 text-sm">github.com/jasoncarter</p>

          <h2 className="mt-6 text-lg font-bold">TECHNICAL SKILLS</h2>
          <ul className="mt-2 text-sm space-y-1">
            <li>• React.js/Next.js</li>
            <li>• Node.js/Express</li>
            <li>• TypeScript</li>
            <li>• AWS/Serverless</li>
            <li>• Docker/Kubernetes</li>
            <li>• GraphQL</li>
            <li>• MongoDB/PostgreSQL</li>
            <li>• Jest/Cypress</li>
            <li>• CI/CD Pipelines</li>
          </ul>

          <h2 className="mt-6 text-lg font-bold">CERTIFICATIONS</h2>
          <ul className="mt-2 text-sm space-y-1">
            <li>• AWS Certified (2022)</li>
            <li>• Google Data Engineer (2021)</li>
            <li>• Scrum Master (2020)</li>
          </ul>

          <h2 className="mt-6 text-lg font-bold">VOLUNTEER</h2>
          <p className="mt-2 text-sm">Code for America</p>
          <p className="text-sm">Open-source contributor (2018-Present)</p>
        </div>
      </div>
    </div>
  );
};

export default Template1;