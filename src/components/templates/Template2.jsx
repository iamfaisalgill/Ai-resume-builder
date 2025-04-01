import React from "react";

const Template2 = () => {
  return (
    <div className="text-white max-w-4xl mx-auto">
      <div className="bg-[#1E3A5F] p-6 flex justify-between">
        <h1 className="text-3xl font-bold">JASON CARTER</h1>
        <div>
          <p className="mt-2 text-sm">+1 (555) 123-4567</p>
          <p className="text-sm">jason.carter@example.com</p>
          <p className="text-sm">San Francisco, CA, USA</p>
          <p className="text-sm">linkedin.com/in/jasoncarter</p>
        </div>
      </div>

      <div className="bg-white text-black p-6 space-y-6">
        {/* PROFESSIONAL SUMMARY */}
        <div className="grid grid-cols-3 gap-4">
          <h2 className="text-xl font-bold text-[#1E3A5F]">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="col-span-2 text-sm">
            Senior Full Stack Developer with 8+ years of experience building scalable web applications. 
            Specialized in JavaScript frameworks and cloud architecture. Proven leader in agile development 
            environments with a passion for mentoring junior developers and implementing CI/CD pipelines. 
            Strong focus on performance optimization and security best practices.
          </p>
        </div>

        {/* TECHNICAL SKILLS */}
        <div className="grid grid-cols-3 gap-4">
          <h2 className="text-xl font-bold text-[#1E3A5F] mt-6">TECHNICAL SKILLS</h2>
          <div className="col-span-2 grid grid-cols-3 gap-2 text-sm mt-2">
            <p>React.js/Next.js</p>
            <p>Node.js/Express</p>
            <p>TypeScript</p>
            <p>AWS/Serverless</p>
            <p>Docker/Kubernetes</p>
            <p>GraphQL</p>
            <p>MongoDB/PostgreSQL</p>
            <p>Jest/Cypress</p>
            <p>CI/CD Pipelines</p>
          </div>
        </div>

        {/* EXPERIENCE */}
        <div className="grid grid-cols-3 gap-4">
          <h2 className="text-xl font-bold text-[#1E3A5F] mt-6">EXPERIENCE</h2>
          <div className="col-span-2 space-y-6">
            <div>
              <p className="font-bold mt-2">Senior Software Engineer</p>
              <p className="text-sm">
                TechNova Solutions, San Francisco, CA, Jun 2020 - Present
              </p>
              <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                <li>
                  Led migration of legacy system to microservices architecture, improving scalability by 40%
                </li>
                <li>
                  Implemented CI/CD pipeline reducing deployment time from 2 hours to 15 minutes
                </li>
                <li>
                  Developed React component library used across 12+ company products
                </li>
                <li>
                  Mentored 5 junior developers through code reviews and pair programming sessions
                </li>
              </ul>
            </div>

            <div>
              <p className="font-bold mt-2">Full Stack Developer</p>
              <p className="text-sm">
                Digital Creations Inc, Austin, TX, Mar 2017 - May 2020
              </p>
              <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                <li>
                  Built RESTful APIs serving 10,000+ daily requests with 99.9% uptime
                </li>
                <li>
                  Optimized database queries reducing page load times by 65%
                </li>
                <li>
                  Implemented JWT authentication system for enterprise application
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* PROJECTS */}
        <div className="grid grid-cols-3 gap-4">
          <h2 className="text-xl font-bold text-[#1E3A5F] mt-6">PROJECTS</h2>
          <div className="col-span-2 space-y-4">
            <div>
              <p className="font-bold text-sm">E-commerce Platform</p>
              <p className="text-sm">
                Built with React, Node.js, and MongoDB. Implemented payment gateway integration, 
                inventory management, and analytics dashboard.
              </p>
            </div>
            <div>
              <p className="font-bold text-sm">Healthcare Analytics Dashboard</p>
              <p className="text-sm">
                Developed using D3.js and Express. Visualized complex patient data for hospital administrators.
              </p>
            </div>
          </div>
        </div>

        {/* EDUCATION */}
        <div className="grid grid-cols-3 gap-4">
          <h2 className="text-xl font-bold text-[#1E3A5F] mt-6">EDUCATION</h2>
          <div className="col-span-2 space-y-2">
            <div>
              <p className="font-bold text-sm">
                Master of Science: Computer Science
              </p>
              <p className="text-sm">Stanford University, 2016</p>
            </div>
            <div>
              <p className="font-bold text-sm">
                Bachelor of Science: Software Engineering
              </p>
              <p className="text-sm">University of Texas at Austin, 2014</p>
            </div>
          </div>
        </div>

        {/* CERTIFICATIONS */}
        <div className="grid grid-cols-3 gap-4">
          <h2 className="text-xl font-bold text-[#1E3A5F] mt-6">CERTIFICATIONS</h2>
          <div className="col-span-2 space-y-2">
            <p className="text-sm">AWS Certified Solutions Architect (2022)</p>
            <p className="text-sm">Google Professional Data Engineer (2021)</p>
            <p className="text-sm">Scrum Master Certification (2020)</p>
          </div>
        </div>

        {/* LANGUAGES */}
        <div className="grid grid-cols-3 gap-4">
          <h2 className="text-xl font-bold text-[#1E3A5F] mt-6">LANGUAGES</h2>
          <div className="col-span-2 grid grid-cols-2 gap-4">
            <div>
              <p className="font-bold text-sm">English</p>
              <p className="text-sm">Native</p>
            </div>
            <div>
              <p className="font-bold text-sm">Spanish</p>
              <p className="text-sm">Professional Working</p>
            </div>
          </div>
        </div>

        {/* VOLUNTEER WORK */}
        <div className="grid grid-cols-3 gap-4">
          <h2 className="text-xl font-bold text-[#1E3A5F] mt-6">VOLUNTEER WORK</h2>
          <div className="col-span-2">
            <p className="font-bold text-sm">Code for America</p>
            <p className="text-sm">Developed open-source tools for local government (2018-Present)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template2;