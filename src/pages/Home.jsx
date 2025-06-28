import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import halley_template from "../assets/halley.webp";
import iconic_template from "../assets/iconic.webp";
import stalwart_template from "../assets/stalwart.webp";
import vanguard_template from "../assets/vanguard.webp";
import horizon_template from "../assets/horizon.webp";
import apex_template from "../assets/apex.webp";
import impresa_template from "../assets/impresa.webp";
import {
  FileText,
  Bot,
  Download,
  LayoutPanelLeft,
  Palette,
  Monitor,
  CircleUserRound,
  Brush,
  HardDriveDownload,
  Zap,
  CheckCircle,
} from "lucide-react";
import Marquee from "react-fast-marquee";
import Logo from "/logo-resume.svg";

const Home = () => {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="bg-background px-6 py-24 flex flex-col items-center justify-center text-center">
        <div className="max-w-3xl relative z-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Create Stunning Resumes{" "}
            <span className="text-primary">Effortlessly</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Choose a template, customize it with smart features, and download a
            professional resume in minutes.
          </p>
          <Button
          asChild
          size="lg"
          className="text-lg px-12 py-7 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-xl hover:shadow-primary/30 transition-all"
        >
          <Link to="/resume-builder">
            <Zap className="w-5 h-5 mr-2" />
            Start Building
          </Link>
        </Button>
        </div>

        {/* <div className="mt-12 w-full max-w-5xl"> */}
        <Marquee autoFill className="mt-8 py-7">
          <img
            src={halley_template}
            alt="Resume Preview"
            className="rounded-lg shadow-md w-[250px] mx-5"
          />
          <img
            src={iconic_template}
            alt="Resume Preview"
            className="rounded-lg shadow-xl w-[250px] mx-5"
          />
          <img
            src={stalwart_template}
            alt="Resume Preview"
            className="rounded-lg shadow-xl w-[250px] mx-5"
          />
          <img
            src={vanguard_template}
            alt="Resume Preview"
            className="rounded-lg shadow-xl w-[250px] mx-5"
          />
          <img
            src={horizon_template}
            alt="Resume Preview"
            className="rounded-lg shadow-xl w-[250px] mx-5"
          />
          <img
            src={apex_template}
            alt="Resume Preview"
            className="rounded-lg shadow-xl w-[250px] mx-5"
          />
          <img
            src={impresa_template}
            alt="Resume Preview"
            className="rounded-lg shadow-xl w-[250px] mx-5"
          />
          <img
            src={halley_template}
            alt="Resume Preview"
            className="rounded-lg shadow-md w-[250px] mx-5"
          />
          <img
            src={iconic_template}
            alt="Resume Preview"
            className="rounded-lg shadow-xl w-[250px] mx-5"
          />
          <img
            src={stalwart_template}
            alt="Resume Preview"
            className="rounded-lg shadow-xl w-[250px] mx-5"
          />
          <img
            src={vanguard_template}
            alt="Resume Preview"
            className="rounded-lg shadow-xl w-[250px] mx-5"
          />
          <img
            src={horizon_template}
            alt="Resume Preview"
            className="rounded-lg shadow-xl w-[250px] mx-5"
          />
          <img
            src={apex_template}
            alt="Resume Preview"
            className="rounded-lg shadow-xl w-[250px] mx-5"
          />
          <img
            src={impresa_template}
            alt="Resume Preview"
            className="rounded-lg shadow-xl w-[250px] mx-5"
          />
        </Marquee>

        {/* </div> */}
      </section>

      {/* How it works */}
<section className="px-6 py-24 pt-15">
  <div
    className="max-w-4xl mx-auto text-center mb-20"
  >
    <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-4 text-sm font-medium">
      <Zap className="w-4 h-4 mr-2" />
      Simple 3-Step Process
    </div>
    <h2 className="text-4xl md:text-5xl font-bold mb-6">
      Craft Your Perfect Resume in Minutes
    </h2>
    <p className="text-xl text-muted-foreground">
      Our intuitive process makes resume building effortless and effective
    </p>
  </div>

  <div className="flex flex-col lg:flex-row justify-between gap-12 max-w-6xl mx-auto">
    {[
      {
        step: "1",
        icon: (
          <svg className="text-primary size-10" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
          </svg>
        ),
        title: "Tell Us About Yourself",
        description: "Fill in your details using our smart forms that adapt to your experience level and industry.",
        color: "from-blue-500 to-indigo-600"
      },
      {
        step: "2",
        icon: (
          <svg className="text-primary size-10" viewBox="0 0 24 24">
            <path fill="currentColor" d="M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V5H19V19H5V5H7V7Z" />
          </svg>
        ),
        title: "Customize Your Design",
        description: "Choose from our premium templates and personalize colors, fonts, and layouts to match your style.",
        color: "from-purple-500 to-pink-600"
      },
      {
        step: "3",
        icon: (
          <svg className="text-primary size-10" viewBox="0 0 24 24">
            <path fill="currentColor" d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
          </svg>
        ),
        title: "Download & Impress",
        description: "Get your polished resume as a PDF file, ready to land your dream job.",
        color: "from-green-500 to-teal-600"
      }
    ].map((step, i) => (
      <div
        key={i}
        className="flex-1 min-w-[300px] bg-card rounded-3xl p-8 shadow-lg border border-border/50 relative overflow-hidden group"
      >
        <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${step.color} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
        <div className="absolute top-6 right-6 w-8 h-8 rounded-full flex items-center justify-center bg-primary/10 text-primary font-bold">
          {step.step}
        </div>
        <div className="mb-6 flex justify-center">
          <div className="p-4 rounded-xl bg-gradient-to-br from-background to-card border border-border/50 shadow-inner">
            {step.icon}
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
        <p className="text-muted-foreground mb-6">{step.description}</p>
        {/* <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-border/50 to-transparent my-6"></div> */}
        {/* <ul className="space-y-2">
          {[
            "Smart suggestions",
            "Real-time preview",
            "ATS optimized"
          ].map((item, j) => (
            <li key={j} className="flex items-center text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-primary mr-2" />
              {item}
            </li>
          ))}
        </ul> */}
      </div>
    ))}
  </div>
</section>

      {/* Features Section */}
      <section className="bg-muted py-20 px-6">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Packed With Powerful Features
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to craft the perfect resume.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto text-center">
          <div className="bg-background rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <div className="mx-auto mb-4 flex justify-center items-center size-12 bg-blue-500/20 rounded-xl text-white">
              <FileText size={24} className="text-blue-500" />
            </div>
            <h4 className="text-xl font-semibold mb-2">Multiple Templates</h4>
            <p className="text-muted-foreground">
              Choose from a variety of modern, creative, and professional
              templates.
            </p>
          </div>

          <div className="bg-background rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <div className="mx-auto mb-4 flex justify-center items-center size-12 bg-purple-500/20 rounded-xl text-white">
              <Bot size={24} className="text-purple-500" />
            </div>
            <h4 className="text-xl font-semibold mb-2">AI-Generated Summary</h4>
            <p className="text-muted-foreground">
              Let AI help you craft a compelling professional summary that
              stands out.
            </p>
          </div>

          <div className="bg-background rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <div className="mx-auto mb-4 flex justify-center items-center size-12 bg-green-500/20 rounded-xl text-white">
              <Download size={24} className="text-green-500" />
            </div>
            <h4 className="text-xl font-semibold mb-2">
              Download as Editable PDF
            </h4>
            <p className="text-muted-foreground">
              Export your resume in high-quality, editable PDF format — ready
              for submission.
            </p>
          </div>

          <div className="bg-background rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <div className="mx-auto mb-4 flex justify-center items-center size-12 bg-orange-500/20 rounded-xl text-white">
              <LayoutPanelLeft size={24} className="text-orange-500" />
            </div>
            <h4 className="text-xl font-semibold mb-2">
              Customizable Sections
            </h4>
            <p className="text-muted-foreground">
              Add or remove sections like Projects, Certifications, or
              References as needed.
            </p>
          </div>

          <div className="bg-background rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <div className="mx-auto mb-4 flex justify-center items-center size-12 bg-pink-500/20 rounded-xl text-white">
              <Palette size={24} className="text-pink-500" />
            </div>
            <h4 className="text-xl font-semibold mb-2">Theme Color Options</h4>
            <p className="text-muted-foreground">
              Easily change the resume's color scheme to match your style or
              industry.
            </p>
          </div>

          <div className="bg-background rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <div className="mx-auto mb-4 flex justify-center items-center size-12 bg-indigo-500/20 rounded-xl text-white">
              <Monitor size={24} className="text-indigo-500" />
            </div>
            <h4 className="text-xl font-semibold mb-2">Live Preview</h4>
            <p className="text-muted-foreground">
              See updates in real-time as you customize your resume.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-background py-24 text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Build a Resume That Gets You Hired
        </h2>
        <p className="text-muted-foreground mb-8 text-lg">
          Join hundreds of users who have landed interviews using our powerful
          and easy-to-use builder.
        </p>
        <Button
          asChild
          size="lg"
          className="text-lg px-12 py-7 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-xl hover:shadow-primary/30 transition-all"
        >
          <Link to="/resume-builder">
            <Zap className="w-5 h-5 mr-2" />
            Create Yours Now
          </Link>
        </Button>
      </section>

      {/* Footer */}
      <footer className="bg-[#27272a] text-gray-100 py-10 px-6 mt-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <Link to="/">
                <div className="flex items-center gap">
                  <img src={Logo} className="sm:w-[35px] w-5 text-primary"/>
                  <span className="font-extrabold text-lg sm:text-2xl text-white">
                    Resu<span className="text-[#8dc63f]">Flex</span>
                  </span>
                  
                </div>
              </Link>
            <p className="text-sm mt-2">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          <div className="flex gap-6">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/resume-builder" className="hover:underline">
              Get Started
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              className="hover:underline"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
