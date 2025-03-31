import React from "react";

const Template1 = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg">
      <div className="flex">
        <div className="w-3/4 p-10">
          <div className="flex items-center space-x-4">
            <div className="border-2 border-blue-700 p-4">
              <span className="text-blue-700 font-bold text-lg">FG</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-blue-700">FAISAL</h1>
              <h1 className="text-3xl font-bold text-blue-700">GILL</h1>
            </div>
          </div>
          php-template Copy Edit
          <div className="mt-6">
            <h2 className="text-lg font-bold text-blue-700">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-gray-700 mt-2">
              Dynamic Full Stack Web Developer with a proven track record at
              John Snow, specializing in responsive design and RESTful APIs.
              Adept at enhancing team performance through effective code reviews
              and mentorship, ensuring high-quality deliverables. Committed to
              implementing DevOps practices to streamline development processes
              and elevate project outcomes.
            </p>
          </div>
          <div className="mt-6">
            <h2 className="text-lg font-bold text-blue-700">EXPERIENCE</h2>
            <p className="font-bold">John Snow | Lahore, Pakistan, Pakistan</p>
            <p className="text-gray-700">January 2024 - Current</p>
            <p className="text-gray-700">Full Stack Web Developer</p>
            <ul className="list-disc list-inside mt-2 text-gray-700">
              <li>
                Collaborated with designers and development teams to create
                high-quality interactive web experiences.
              </li>
              <li>
                Conducted regular code reviews to maintain high-quality code
                standards across development team.
              </li>
              <li>
                Collaborated with QA team to validate adherence to company and
                client quality standards.
              </li>
              <li>
                Supported scrum team in reviewing pull requests and helped
                junior and mid-level developers with technical tasks.
              </li>
            </ul>
          </div>
          <div className="mt-6">
            <h2 className="text-lg font-bold text-blue-700">EDUCATION</h2>
            <p className="font-bold">Bachelor of Science (B.S.) - Computer</p>
            <p className="text-gray-700">January 2025</p>
            <p className="text-gray-500">The School</p>
          </div>
          <div className="mt-6">
            <h2 className="text-lg font-bold text-blue-700">LANGUAGE</h2>
            <p className="text-gray-700">english - Intermediate (B1)</p>
          </div>
        </div>
        <div className="w-1/4 bg-blue-800 text-white p-6">
          <p className="text-sm">Lahore, Pakistan Pakistan</p>
          <p className="mt-4 text-sm">+923559486525</p>
          <p className="mt-4 text-sm">W: soulzakriagill@gmail.com</p>

          <h2 className="mt-6 text-lg font-bold">SKILLS</h2>
          <ul className="mt-2 text-sm">
            <li>• Responsive design</li>
            <li>• CSS preprocessors</li>
            <li>• DevOps practices</li>
            <li>• RESTful apis</li>
            <li>• Source control</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Template1;
